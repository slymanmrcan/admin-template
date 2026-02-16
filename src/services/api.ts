import { toast } from "sonner"
import { useAuthStore } from "@/store/auth-store"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

type RequestOptions = {
  headers?: Record<string, string>
  noAuth?: boolean
  retry?: boolean
  credentials?: RequestCredentials
}

class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = "ApiError"
  }
}

let refreshPromise: Promise<string | null> | null = null

async function refreshToken(): Promise<string | null> {
  if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
    const token = useAuthStore.getState().token
    const user = useAuthStore.getState().user
    if (user) {
      useAuthStore.getState().updateUser(user)
    }
    return token
  }

  const existingToken = useAuthStore.getState().token
  const refreshHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (existingToken) {
    refreshHeaders["Authorization"] = `Bearer ${existingToken}`
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: refreshHeaders,
      credentials: "include",
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    const newToken = data?.data?.token ?? data?.token ?? null
    const refreshedUser = data?.data?.user ?? data?.user ?? null

    if (newToken) {
      useAuthStore.getState().setToken(newToken)
      if (typeof document !== "undefined") {
        document.cookie = `token=${newToken}; path=/; max-age=86400`
      }
      if (refreshedUser) {
        useAuthStore.getState().updateUser(refreshedUser)
      } else {
        try {
          const meRes = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
            credentials: "include",
          })
          if (meRes.ok) {
            const meData = await meRes.json()
            const meUser = meData?.data ?? meData?.user ?? null
            if (meUser) {
              useAuthStore.getState().updateUser(meUser)
            }
          }
        } catch {
          return newToken
        }
      }
    }

    return newToken
  } catch {
    return null
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit & RequestOptions = {}
): Promise<T> {
  const { headers: customHeaders, noAuth, retry, ...restOptions } = options

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (customHeaders) {
    Object.entries(customHeaders).forEach(([key, value]) => {
      headers[key] = value
    })
  }

  // 1. Auth Interceptor: Add token if available and not explicitly disabled
  if (!noAuth) {
    const token = useAuthStore.getState().token
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...restOptions,
    })

    // 2. Error Handling Interceptor
    if (!res.ok) {
      // Handle 401 Unauthorized
      if (res.status === 401) {
        if (!noAuth && !retry) {
          if (!refreshPromise) {
            refreshPromise = refreshToken()
          }

          const newToken = await refreshPromise
          refreshPromise = null

          if (newToken) {
            return request<T>(endpoint, { ...options, retry: true })
          }
        }

        useAuthStore.getState().logout()
        throw new ApiError(401, "Oturum süresi doldu. Lütfen tekrar giriş yapın.")
      }

      // Try to parse error message from response
      let errorMessage = `API Error: ${res.status}`
      let errorData = null

      try {
        const errorBody = await res.json()
        errorMessage = errorBody.message || errorBody.error || errorMessage
        errorData = errorBody
      } catch {
        // Response wasn't JSON, use status text
        errorMessage = res.statusText || errorMessage
      }

      throw new ApiError(res.status, errorMessage, errorData)
    }

    // 3. Response Interceptor
    // For 204 No Content, return null
    if (res.status === 204) {
      return null as unknown as T
    }

    return res.json() as Promise<T>
  } catch (error) {
    // 4. Global Error Handler (Toast)
    if (error instanceof ApiError) {
      console.error(`API Request Failed (${error.status}):`, error)
      toast.error(error.message)
    } else {
      console.error("Network/Unexpected Error:", error)
      toast.error("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.")
    }
    throw error
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body), ...options }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body), ...options }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { method: "PATCH", body: JSON.stringify(body), ...options }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: "DELETE", ...options }),
}

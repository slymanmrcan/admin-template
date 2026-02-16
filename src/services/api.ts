import { toast } from "sonner"
import { useAuthStore } from "@/store/auth-store"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

type RequestOptions = {
  headers?: Record<string, string>
  noAuth?: boolean
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

async function request<T>(
  endpoint: string,
  options: RequestInit & RequestOptions = {}
): Promise<T> {
  const { headers: customHeaders, noAuth, ...restOptions } = options
  
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
        useAuthStore.getState().logout()
        // Optional: Redirect to login page
        // window.location.href = "/login"
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

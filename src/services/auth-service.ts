import { api } from "./api"
import type { ApiResponse, User } from "@/types"

type LoginCredentials = {
  email: string
  password: string
}

type RegisterData = {
  email: string
  password: string
  name: string
  // diğer gerekli alanlar...
}

type AuthResponse = {
  user: User
  token: string
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    // MOCK LOGIN IMPLEMENTATION
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Fake delay
      
      const mockUser: User = {
        id: "1",
        name: "Demo User",
        email: credentials.email,
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      const mockToken = "mock-jwt-token-12345"
      
      // Cookie'ye token yaz (Middleware için gerekli)
      document.cookie = `token=${mockToken}; path=/; max-age=86400`
      
      return { user: mockUser, token: mockToken }
    }

    // API isteği
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", credentials, {
      noAuth: true,
    })
    
    return response.data
  },

  register: async (data: RegisterData) => {
    return api.post<ApiResponse<User>>("/auth/register", data, {
      noAuth: true,
    })
  },

  logout: async () => {
    try {
      if (process.env.NEXT_PUBLIC_MOCK_AUTH !== "true") {
        await api.post("/auth/logout", null)
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Her durumda client tarafında temizlik yap
      // Store temizliği store.logout() ile yapılacak (çağıran yer halletmeli)
      // Cookie sil
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
  },

  getCurrentUser: async () => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
       // Mock user dön
       const mockUser: User = {
        id: "1",
        name: "Demo User",
        email: "demo@example.com",
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return mockUser
    }

    const response = await api.get<ApiResponse<User>>("/auth/me")
    return response.data
  },

  refreshToken: async () => {
    // Refresh token implementasyonu buraya
  }
}

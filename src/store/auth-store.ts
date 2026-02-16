import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User, LoginCredentials } from "@/types"
import { authService } from "@/services"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Kullanıcı bilgilerini güncelle (Token değişmeden)
      updateUser: (user) => set({ user }),

      login: async (credentials) => {
        set({ isLoading: true })
        try {
          const response = await authService.login(credentials)
          set({ 
            user: response.user, 
            token: response.token, 
            isAuthenticated: true, 
            isLoading: false 
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        authService.logout()
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: "auth-storage", // local storage key
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)

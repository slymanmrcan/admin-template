"use client"

import { useEffect } from "react"
import { authService } from "@/services"
import { useAuthStore } from "@/store/auth-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token)
  const updateUser = useAuthStore((state) => state.updateUser)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    if (!token) {
      return
    }

    const validateToken = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        updateUser(currentUser)
      } catch {
        logout()
      }
    }

    validateToken()
  }, [token, updateUser, logout])

  return <>{children}</>
}

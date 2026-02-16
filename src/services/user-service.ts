import { api } from "./api"
import type { User, PaginatedResponse } from "@/types"

// Mock data generator
const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: (i + 1).toString(),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "admin" : "user",
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

const MOCK_USERS = generateMockUsers(50)

type GetUsersParams = {
  page?: number
  limit?: number
  search?: string
}

export const userService = {
  getUsers: async (params: GetUsersParams = {}) => {
    // MOCK IMPLEMENTATION
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      await new Promise((resolve) => setTimeout(resolve, 800)) // Fake delay

      const { page = 1, limit = 10, search = "" } = params
      
      let filteredUsers = [...MOCK_USERS]
      
      if (search) {
        const lowerSearch = search.toLowerCase()
        filteredUsers = filteredUsers.filter(
          (user) => 
            user.name.toLowerCase().includes(lowerSearch) || 
            user.email.toLowerCase().includes(lowerSearch)
        )
      }
      
      const total = filteredUsers.length
      const start = (page - 1) * limit
      const end = start + limit
      const paginatedUsers = filteredUsers.slice(start, end)
      
      return {
        success: true,
        message: "Users fetched successfully",
        data: paginatedUsers,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        }
      } as PaginatedResponse<User>
    }

    // REAL API IMPLEMENTATION
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append("page", params.page.toString())
    if (params.limit) queryParams.append("limit", params.limit.toString())
    if (params.search) queryParams.append("search", params.search)

    return api.get<PaginatedResponse<User>>(`/users?${queryParams.toString()}`)
  },
  
  getUser: async (id: string) => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return MOCK_USERS.find(u => u.id === id) || null
    }
    return api.get<User>(`/users/${id}`)
  }
}

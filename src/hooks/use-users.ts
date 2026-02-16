import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { userService } from "@/services"
import type { User, PaginatedResponse } from "@/types"

type UseUsersParams = {
  page?: number
  limit?: number
  search?: string
}

export function useUsers(params: UseUsersParams = {}) {
  const { page = 1, limit = 10, search = "" } = params

  return useQuery<PaginatedResponse<User>>({
    queryKey: ["users", page, limit, search],
    queryFn: () => userService.getUsers({ page, limit, search }),
    placeholderData: keepPreviousData, // Sayfa geçişlerinde eski veriyi göster (loading flicker'ı önler)
  })
}

export function useUser(id: string) {
  return useQuery<User | null>({
    queryKey: ["user", id],
    queryFn: () => userService.getUser(id),
    enabled: !!id, // ID varsa çalıştır
  })
}

// Global type definitions
// Add project-wide types here

/**
 * Standard API response wrapper
 */
export type ApiResponse<T> = {
  data: T
  success: boolean
  message?: string
}

/**
 * Paginated API response
 */
/**
 * Paginated API response
 */
export type PaginatedResponse<T> = {
  success: boolean
  message?: string
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

/**
 * Generic entity with common fields
 */
export type BaseEntity = {
  id: string
  createdAt: string
  updatedAt: string
}

/**
 * User type example
 */
export type User = BaseEntity & {
  name: string
  email: string
  avatar?: string
  role: "admin" | "user" | "editor"
}

export type SupportRequestInput = {
  fullName: string
  email: string
  topic: "support" | "sales" | "feedback"
  message: string
}

export type InviteMemberInput = {
  email: string
  role: "admin" | "editor" | "viewer"
}

export type Preferences = {
  language: "tr" | "en"
  timezone: "Europe/Istanbul" | "UTC"
  marketingOptIn: boolean
  weeklySummary: boolean
}

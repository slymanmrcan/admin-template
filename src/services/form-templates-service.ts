"use client"

import { api } from "@/services"
import type {
  ApiResponse,
  InviteMemberInput,
  Preferences,
  SupportRequestInput,
} from "@/types"

type SupportRequestResult = {
  id: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let mockPreferences: Preferences = {
  language: "tr",
  timezone: "Europe/Istanbul",
  marketingOptIn: false,
  weeklySummary: true,
}

export const formTemplatesService = {
  createSupportRequest: async (data: SupportRequestInput) => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      await delay(700)
      return {
        success: true,
        data: { id: `req-${Date.now()}` },
        message: "Talep oluşturuldu",
      } as ApiResponse<SupportRequestResult>
    }

    return api.post<ApiResponse<SupportRequestResult>>("/support-requests", data)
  },

  inviteMember: async (data: InviteMemberInput) => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      await delay(700)
      return {
        success: true,
        data: { id: `invite-${Date.now()}` },
        message: "Davet gönderildi",
      } as ApiResponse<SupportRequestResult>
    }

    return api.post<ApiResponse<SupportRequestResult>>("/invites", data)
  },

  getPreferences: async () => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      await delay(400)
      return {
        success: true,
        data: mockPreferences,
      } as ApiResponse<Preferences>
    }

    return api.get<ApiResponse<Preferences>>("/preferences")
  },

  updatePreferences: async (data: Preferences) => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      await delay(600)
      mockPreferences = { ...mockPreferences, ...data }
      return {
        success: true,
        data: mockPreferences,
        message: "Tercihler güncellendi",
      } as ApiResponse<Preferences>
    }

    return api.put<ApiResponse<Preferences>>("/preferences", data)
  },
}

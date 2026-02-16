"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { formTemplatesService } from "@/services/form-templates-service"
import type { InviteMemberInput, Preferences, SupportRequestInput } from "@/types"

export function useCreateSupportRequest() {
  return useMutation({
    mutationFn: (data: SupportRequestInput) =>
      formTemplatesService.createSupportRequest(data),
    onSuccess: () => {
      toast.success("Talep gönderildi")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Talep gönderilemedi")
    },
  })
}

export function useInviteMember() {
  return useMutation({
    mutationFn: (data: InviteMemberInput) =>
      formTemplatesService.inviteMember(data),
    onSuccess: () => {
      toast.success("Davet gönderildi")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Davet gönderilemedi")
    },
  })
}

export function usePreferences() {
  return useQuery({
    queryKey: ["preferences"],
    queryFn: () => formTemplatesService.getPreferences(),
  })
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Preferences) =>
      formTemplatesService.updatePreferences(data),
    onSuccess: (response) => {
      queryClient.setQueryData(["preferences"], response)
      toast.success("Tercihler güncellendi")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Tercihler güncellenemedi")
    },
  })
}

"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  useCreateSupportRequest,
  useInviteMember,
  usePreferences,
  useUpdatePreferences,
} from "@/hooks/use-form-templates"

const supportSchema = z.object({
  fullName: z.string().min(2, "Ad en az 2 karakter olmalı"),
  email: z.string().email("Geçersiz e-posta adresi"),
  topic: z.enum(["support", "sales", "feedback"]),
  message: z
    .string()
    .min(10, "Mesaj en az 10 karakter olmalı")
    .max(500, "Mesaj en fazla 500 karakter olmalı"),
})

const inviteSchema = z.object({
  email: z.string().email("Geçersiz e-posta adresi"),
  role: z.enum(["admin", "editor", "viewer"]),
})

const preferencesSchema = z.object({
  language: z.enum(["tr", "en"]),
  timezone: z.enum(["Europe/Istanbul", "UTC"]),
  marketingOptIn: z.boolean(),
  weeklySummary: z.boolean(),
})

type SupportFormValues = z.infer<typeof supportSchema>
type InviteFormValues = z.infer<typeof inviteSchema>
type PreferencesFormValues = z.infer<typeof preferencesSchema>

export default function FormsPage() {
  const supportForm = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      fullName: "",
      email: "",
      topic: "support",
      message: "",
    },
  })

  const inviteForm = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "viewer",
    },
  })

  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      language: "tr",
      timezone: "Europe/Istanbul",
      marketingOptIn: false,
      weeklySummary: true,
    },
  })

  const createSupportRequest = useCreateSupportRequest()
  const inviteMember = useInviteMember()
  const preferencesQuery = usePreferences()
  const updatePreferences = useUpdatePreferences()

  useEffect(() => {
    const data = preferencesQuery.data?.data
    if (data) {
      preferencesForm.reset(data)
    }
  }, [preferencesForm, preferencesQuery.data])

  const onSubmitSupport = async (values: SupportFormValues) => {
    await createSupportRequest.mutateAsync(values)
    supportForm.reset({ fullName: "", email: "", topic: "support", message: "" })
  }

  const onSubmitInvite = async (values: InviteFormValues) => {
    await inviteMember.mutateAsync(values)
    inviteForm.reset({ email: "", role: "viewer" })
  }

  const onSubmitPreferences = async (values: PreferencesFormValues) => {
    await updatePreferences.mutateAsync(values)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Form Şablonları</h1>
        <p className="text-muted-foreground">
          React Hook Form, Zod ve React Query ile uzun vadeli kullanım için örnekler.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Destek Talebi</CardTitle>
            <CardDescription>Müşteri desteği için temel form akışı.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...supportForm}>
              <form onSubmit={supportForm.handleSubmit(onSubmitSupport)} className="space-y-4">
                <FormField
                  control={supportForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Soyad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ahmet Yılmaz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={supportForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={supportForm.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konu</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Konu seç" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="support">Destek</SelectItem>
                          <SelectItem value="sales">Satış</SelectItem>
                          <SelectItem value="feedback">Geri bildirim</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={supportForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mesaj</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className={cn(
                            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:bg-input/30 min-h-[120px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                          )}
                          placeholder="Sorununuzu kısaca anlatın"
                        />
                      </FormControl>
                      <FormDescription>En fazla 500 karakter.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={createSupportRequest.isPending}>
                  {createSupportRequest.isPending ? "Gönderiliyor..." : "Talep gönder"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Takım Daveti</CardTitle>
            <CardDescription>Yeni ekip üyesi davet etme akışı.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...inviteForm}>
              <form onSubmit={inviteForm.handleSubmit(onSubmitInvite)} className="space-y-4">
                <FormField
                  control={inviteForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="uye@ornek.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={inviteForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Rol seç" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Yönetici</SelectItem>
                          <SelectItem value="editor">Editör</SelectItem>
                          <SelectItem value="viewer">Görüntüleyici</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={inviteMember.isPending}>
                  {inviteMember.isPending ? "Davet gönderiliyor..." : "Davet gönder"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Tercihler</CardTitle>
          <CardDescription>Form verisini React Query ile yükleme ve güncelleme.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...preferencesForm}>
            <form onSubmit={preferencesForm.handleSubmit(onSubmitPreferences)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={preferencesForm.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dil</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Dil seç" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tr">Türkçe</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={preferencesForm.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saat Dilimi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Saat dilimi seç" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Europe/Istanbul">Europe/Istanbul</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={preferencesForm.control}
                  name="marketingOptIn"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-md border px-4 py-3">
                      <div>
                        <FormLabel>Ürün duyuruları</FormLabel>
                        <FormDescription>Pazarlama e-postaları al.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={preferencesForm.control}
                  name="weeklySummary"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-md border px-4 py-3">
                      <div>
                        <FormLabel>Haftalık özet</FormLabel>
                        <FormDescription>Haftalık kullanım özetini al.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={updatePreferences.isPending || preferencesQuery.isLoading}
                >
                  {updatePreferences.isPending ? "Kaydediliyor..." : "Tercihleri kaydet"}
                </Button>
                {preferencesQuery.isLoading && (
                  <span className="text-sm text-muted-foreground">Tercihler yükleniyor...</span>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

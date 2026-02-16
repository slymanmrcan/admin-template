"use client"

import { useState } from "react"
import { useAuthStore } from "@/store"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Şemalar
const profileSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalı"),
  email: z.string().email("Geçersiz e-posta adresi"),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "En az 6 karakter olmalı"),
  newPassword: z.string().min(6, "En az 6 karakter olmalı"),
  confirmPassword: z.string().min(6, "En az 6 karakter olmalı"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
})

export default function ProfilePage() {
  const { user} = useAuthStore()
  const { setTheme, theme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  // Profile Form
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  })

  // Password Form
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  })

  async function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true)
    // Mock API update
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Auth Store güncelle
    if (user) {
        useAuthStore.getState().updateUser({ ...user, ...values })
    }
    
    setIsLoading(false)
    toast.success("Profil başarıyla güncellendi")
  }

  async function onPasswordSubmit() {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    toast.success("Şifre başarıyla güncellendi")
    passwordForm.reset()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Ayarlar</h2>
        <p className="text-muted-foreground">
          Hesap ayarlarını ve tercihlerini yönet.
        </p>
      </div>
      <Separator className="my-6" />
      
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 px-4">
             {/* Buraya yan menü linkleri gelebilir, şimdilik Tabs kullanıyoruz */}
          </nav>
        </aside>
        
        <div className="flex-1 lg:max-w-2xl">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Genel</TabsTrigger>
              <TabsTrigger value="security">Güvenlik</TabsTrigger>
              <TabsTrigger value="appearance">Görünüm</TabsTrigger>
              <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profil</CardTitle>
                  <CardDescription>
                    Kişisel bilgilerini güncelle.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={`https://avatar.vercel.sh/${user?.email}`} />
                            <AvatarFallback>Kullanıcı</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Avatarı değiştir</Button>
                    </div>
                
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Görünen Ad</Label>
                        <Input id="name" {...profileForm.register("name")} />
                        {profileForm.formState.errors.name && (
                            <p className="text-sm text-destructive">{profileForm.formState.errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input id="email" {...profileForm.register("email")} />
                        {profileForm.formState.errors.email && (
                            <p className="text-sm text-destructive">{profileForm.formState.errors.email.message}</p>
                        )}
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Kaydediliyor..." : "Değişiklikleri kaydet"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
               <Card>
                <CardHeader>
                  <CardTitle>Şifre</CardTitle>
                  <CardDescription>
                    Şifreni değiştir.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                        <Input id="currentPassword" type="password" {...passwordForm.register("currentPassword")} />
                         {passwordForm.formState.errors.currentPassword && (
                            <p className="text-sm text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">Yeni Şifre</Label>
                        <Input id="newPassword" type="password" {...passwordForm.register("newPassword")} />
                         {passwordForm.formState.errors.newPassword && (
                            <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Şifreyi Doğrula</Label>
                        <Input id="confirmPassword" type="password" {...passwordForm.register("confirmPassword")} />
                         {passwordForm.formState.errors.confirmPassword && (
                            <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <Button type="submit" disabled={isLoading}>Şifreyi değiştir</Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                  <CardHeader>
                      <CardTitle>İki Aşamalı Doğrulama</CardTitle>
                      <CardDescription>Hesabına ek bir güvenlik katmanı ekle.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                      <div className="space-y-0.5">
                          <Label className="text-base">2FA&apos;yı etkinleştir</Label>
                          <p className="text-sm text-muted-foreground">Hesabını TOTP ile koru.</p>
                      </div>
                      <Switch />
                  </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
             <TabsContent value="appearance" className="space-y-4">
               <Card>
                <CardHeader>
                  <CardTitle>Tema</CardTitle>
                  <CardDescription>
                    Uygulamanın görünümünü özelleştir.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                            <Label className="text-base">Koyu Mod</Label>
                            <p className="text-sm text-muted-foreground">Koyu modu aç veya kapat.</p>
                        </div>
                        <Switch 
                            checked={theme === 'dark'} 
                            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                        />
                    </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
             <TabsContent value="notifications" className="space-y-4">
               <Card>
                <CardHeader>
                  <CardTitle>E-posta Bildirimleri</CardTitle>
                  <CardDescription>
                    E-posta tercihlerini yönet.
                  </CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">İletişim E-postaları</Label>
                            <p className="text-sm text-muted-foreground">Hesap etkinliği hakkında e-posta al.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                     <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Pazarlama E-postaları</Label>
                            <p className="text-sm text-muted-foreground">Yeni ürün ve özellikler hakkında e-posta al.</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
              </Card>
            </TabsContent>
            
          </Tabs>
        </div>
      </div>
    </div>
  )
}

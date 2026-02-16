"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/auth-store"

const formSchema = z.object({
  email: z.string().email("Geçersiz e-posta adresi"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
})

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await login(values)
      toast.success("Giriş başarılı")

      const from = searchParams.get("from") || "/dashboard"
      router.push(from)
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="name@example.com" 
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Şifre</Label>
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Şifremi unuttum
          </Link>
        </div>
        <Input 
          id="password" 
          type="password" 
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? "Giriş yapılıyor..." : "Giriş yap"}
      </Button>
    </form>
  )
}

export function LoginCard() {
  return (
    <Card className="border-0 shadow-none sm:border sm:shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Tekrar hoş geldin</CardTitle>
        <CardDescription>Hesabına erişmek için bilgilerini gir</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Form yükleniyor...</div>}>
          <LoginForm />
        </Suspense>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Hesabın yok mu?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Kayıt ol
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

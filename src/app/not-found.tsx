"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <div className="text-6xl font-bold">404</div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Sayfa Bulunamadı</h1>
        <p className="text-muted-foreground">
          Aradığın sayfayı bulamadık. Ana sayfaya dönebilirsin.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Ana sayfaya dön</Link>
      </Button>
    </div>
  )
}

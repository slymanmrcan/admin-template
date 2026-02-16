// src/components/sidebar/brand.tsx
import Image from "next/image"
import { siteConfig } from "@/config"

export function SidebarBrand() {
  return (
    <div className="flex h-16 items-center gap-3 border-b px-6 bg-gradient-to-r from-primary/10 to-transparent">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shadow-lg">
        <Image src="/logo.png" alt={siteConfig.name} width={28} height={28} />
      </div>
      <div>
        <h2 className="text-lg font-bold">{siteConfig.name}</h2>
        <p className="text-xs text-muted-foreground">Dashboard v1.0</p>
      </div>
    </div>
  )
}

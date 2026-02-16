// src/components/sidebar/brand.tsx
import { Layers } from "lucide-react"

export function SidebarBrand() {
  return (
    <div className="flex h-16 items-center gap-3 border-b px-6 bg-gradient-to-r from-primary/10 to-transparent">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
        <Layers className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-lg font-bold">Admin Template</h2>
        <p className="text-xs text-muted-foreground">Dashboard v1.0</p>
      </div>
    </div>
  )
}
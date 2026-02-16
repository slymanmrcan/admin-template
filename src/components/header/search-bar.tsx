// src/components/header/search-bar.tsx
"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Her şeyi ara..."
        className="pl-10 h-10 bg-muted/50 border-0 focus-visible:ring-1"
      />
    </div>
  )
}

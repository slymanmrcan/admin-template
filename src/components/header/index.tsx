// src/components/header/index.tsx
"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

import { SearchBar } from "./search-bar"
import { Notifications } from "./notifications"
import { UserMenu } from "./user-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Button } from "../ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Left: Search */}
        <div className="flex-1">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Notifications />
          <Separator orientation="vertical" className="h-6" />
          <ThemeToggle />
          <Separator orientation="vertical" className="h-6" />
          <UserMenu />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
// src/components/header/notifications.tsx
"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const notifications = [
  { id: 1, title: "Yeni sipariş alındı", time: "5 dk önce" },
  { id: 2, title: "Yeni kullanıcı kaydoldu", time: "10 dk önce" },
  { id: 3, title: "Ödeme başarılı", time: "1 saat önce" },
]

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9 hover:bg-accent"
        >
          <Bell className="h-5 w-5" />
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            variant="destructive"
          >
            {notifications.length}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-semibold">
          Bildirimler
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
              <span className="font-medium text-sm">{notification.title}</span>
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-primary justify-center cursor-pointer">
          Tüm bildirimleri gör
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

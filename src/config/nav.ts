// Navigation configuration
// Edit this file to change sidebar menu items per project

import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  LogIn,
  UserPlus,
  KeyRound,
  Type,
  LayoutGrid,
  Layers,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  badge?: string
  disabled?: boolean
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const navConfig: NavGroup[] = [
  {
    label: "Genel",
    items: [
      { title: "Panel", icon: LayoutDashboard, url: "/dashboard" },
      { title: "Analitik", icon: BarChart3, url: "/dashboard/analytics" },
      { title: "Tipografi", icon: Type, url: "/dashboard/typography" },
      { title: "Layout", icon: LayoutGrid, url: "/dashboard/layout" },
      { title: "Bileşenler", icon: Layers, url: "/dashboard/components" },
    ],
  },
  {
    label: "Yönetim",
    items: [
      { title: "Kullanıcılar", icon: Users, url: "/dashboard/users" },
      { title: "Formlar", icon: FileText, url: "/dashboard/forms" },
      { title: "Ürünler", icon: ShoppingCart, url: "/dashboard/products" },
      { title: "Dosyalar", icon: FileText, url: "/dashboard/files" },
    ],
  },
  {
    label: "Sistem",
    items: [
      { title: "Ayarlar", icon: Settings, url: "/dashboard/settings" },
    ],
  },
  {
    label: "Kimlik Doğrulama",
    items: [
      { title: "Giriş", icon: LogIn, url: "/dashboard/auth/login" },
      { title: "Kayıt Ol", icon: UserPlus, url: "/dashboard/auth/register" },
      { title: "Şifre Sıfırla", icon: KeyRound, url: "/forgot-password" },
    ],
  },
]

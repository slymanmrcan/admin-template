// Site-wide configuration
// Change these values when starting a new project

export const siteConfig = {
  name: "Admin Panel",
  description: "Modern admin dashboard template",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  locale: "en",
} as const

export type SiteConfig = typeof siteConfig

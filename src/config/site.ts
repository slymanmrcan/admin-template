// Site-wide configuration
// Change these values when starting a new project

export const siteConfig = {
  name: "Opsboard",
  description: "Operasyonları tek ekranda yöneten modern admin panel",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  locale: "tr",
} as const

export type SiteConfig = typeof siteConfig

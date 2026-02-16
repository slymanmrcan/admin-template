import type { MetadataRoute } from "next"
import { siteConfig } from "@/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const lastModified = new Date()

  return [
    { url: `${baseUrl}/`, lastModified },
    { url: `${baseUrl}/dashboard`, lastModified },
    { url: `${baseUrl}/dashboard/analytics`, lastModified },
    { url: `${baseUrl}/dashboard/typography`, lastModified },
    { url: `${baseUrl}/dashboard/layout`, lastModified },
    { url: `${baseUrl}/dashboard/components`, lastModified },
    { url: `${baseUrl}/dashboard/users`, lastModified },
    { url: `${baseUrl}/dashboard/forms`, lastModified },
    { url: `${baseUrl}/dashboard/products`, lastModified },
    { url: `${baseUrl}/dashboard/files`, lastModified },
    { url: `${baseUrl}/dashboard/settings`, lastModified },
  ]
}

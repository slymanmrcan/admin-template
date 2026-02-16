"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Verilerin bayatlama süresi (default 0)
            staleTime: 60 * 1000, 
            // Pencere odağı kaybedip geri gelince tekrar çekme (default true)
            refetchOnWindowFocus: false,
            // Hata durumunda kaç kere denesin (default 3)
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

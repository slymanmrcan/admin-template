// src/app/dashboard/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Content */}
          <main className="flex-1 p-8 bg-gradient-to-br from-background via-background to-muted/20">
            <div className="mb-6 flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
            </div>
            <div className="max-w-screen-2xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
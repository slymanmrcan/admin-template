// src/components/sidebar/index.tsx
import { 
  Sidebar, 
  SidebarContent 
} from "@/components/ui/sidebar"  // ⬅️ Shadcn base component
import { SidebarBrand } from "./brand"
import { NavMenu } from "./nav-menu"
import { Separator } from "@/components/ui/separator"

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarBrand />
        <Separator className="my-2" />
        <div className="py-4 space-y-4">
          <NavMenu />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
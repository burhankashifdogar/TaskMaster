"use client"

import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { RegisterSW } from "../register-sw"
import { useAuth } from "@/components/auth-provider"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { MobileHeader } from "@/components/mobile-header"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Get page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/" || pathname === "/dashboard") return "Dashboard"
    if (pathname === "/today") return "Today's Tasks"
    if (pathname === "/calendar") return "Calendar"
    if (pathname === "/analytics") return "Analytics"
    if (pathname === "/overdue") return "Overdue Tasks"
    if (pathname.startsWith("/categories/")) {
      const category = pathname.split("/").pop()
      return category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Tasks` : "Tasks"
    }
    return "TaskMaster"
  }

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Don't render the app layout until authentication check is complete
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  // Don't render the app layout if user is not authenticated
  if (!user) {
    return null
  }

  return (
    <SidebarProvider>
      <RegisterSW />
      <div className="flex flex-col md:flex-row h-screen bg-background">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <MobileHeader title={getPageTitle()} />
          <div className="flex-1 overflow-auto pb-safe">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}

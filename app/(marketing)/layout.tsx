import type React from "react"
import { RegisterSW } from "../register-sw"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <RegisterSW />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {children}
    </>
  )
}

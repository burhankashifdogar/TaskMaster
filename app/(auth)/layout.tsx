import type React from "react"
import { RegisterSW } from "../register-sw"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <RegisterSW />
      {children}
    </>
  )
}

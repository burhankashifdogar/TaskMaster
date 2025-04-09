"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isPublicRoute } from "@/lib/routes"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Export the useAuth hook that uses this context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to validate the token
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Update the useEffect hook that handles redirects
  useEffect(() => {
    if (!isLoading && !user && !isPublicRoute(pathname)) {
      router.push("/login")
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    // Simulating API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email === "demo@example.com" && password === "password") {
          const userData = {
            id: "user_123",
            name: "Demo User",
            email: "demo@example.com",
          }
          setUser(userData)
          localStorage.setItem("user", JSON.stringify(userData))
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call
    // Simulating API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock registration
        const userData = {
          id: "user_" + Date.now(),
          name,
          email,
        }
        // In a real app, we would store this in a database
        localStorage.setItem("registeredUser", JSON.stringify(userData))
        resolve()
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

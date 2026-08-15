"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const persistSession = (nextUser: User, token: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(nextUser))
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
  }

  const clearSession = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax"
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (token) {
      try {
        if (storedUser) {
          setUser(JSON.parse(storedUser) as User)
        } else {
          setUser({
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: "user",
          })
        }
      } catch (error) {
        console.error("Failed to verify token:", error)
        clearSession()
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, you would make an API call to /api/auth/login
      // For demo purposes, we'll use a mock response
      const mockResponse = {
        user: {
          id: "1",
          name: email.includes("admin") ? "AviaServe Admin" : email.split("@")[0] || "Guest",
          email,
          role: email.includes("admin") ? "admin" : "user",
        } as User,
        token: "mock-jwt-token",
      }

      persistSession(mockResponse.user, mockResponse.token)
      setUser(mockResponse.user)

      toast({
        title: "Login successful",
        description: `Welcome back, ${mockResponse.user.name}!`,
      })

      const from = new URLSearchParams(window.location.search).get("from")
      if (from && from.startsWith("/") && !from.startsWith("//")) {
        router.push(from)
      } else if (mockResponse.user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, you would make an API call to /api/auth/register
      // For demo purposes, we'll use a mock response
      const mockResponse = {
        user: {
          id: "2",
          name,
          email,
          role: "user" as const,
        },
        token: "mock-jwt-token",
      }

      persistSession(mockResponse.user, mockResponse.token)
      setUser(mockResponse.user)

      toast({
        title: "Registration successful",
        description: `Welcome to AviaServe, ${name}!`,
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearSession()
    setUser(null)
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  // Protect routes
  useEffect(() => {
    if (!loading) {
      // Admin routes protection
      if (pathname?.startsWith("/admin") && (!user || user.role !== "admin")) {
        router.push("/auth/login")
        toast({
          title: "Access denied",
          description: "You need admin privileges to access this page.",
          variant: "destructive",
        })
      }

      // User routes protection (dashboard)
      if (pathname?.startsWith("/dashboard") && !user) {
        router.push("/auth/login")
        toast({
          title: "Authentication required",
          description: "Please log in to access this page.",
          variant: "destructive",
        })
      }

      // Redirect logged in users away from auth pages
      if (pathname?.startsWith("/auth") && user) {
        router.push("/dashboard")
      }
    }
  }, [pathname, user, loading, router, toast])

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

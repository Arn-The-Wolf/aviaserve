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

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (token) {
      // In a real app, you would verify the token with your backend
      try {
        // For demo purposes, we'll use a mock user
        const mockUser = {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "user" as const,
        }
        setUser(mockUser)
      } catch (error) {
        console.error("Failed to verify token:", error)
        localStorage.removeItem("token")
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
          name: "John Doe",
          email,
          role: email.includes("admin") ? "admin" : "user",
        } as User,
        token: "mock-jwt-token",
      }

      // Store the token in localStorage
      localStorage.setItem("token", mockResponse.token)
      setUser(mockResponse.user)

      toast({
        title: "Login successful",
        description: `Welcome back, ${mockResponse.user.name}!`,
      })

      // Redirect based on role
      if (mockResponse.user.role === "admin") {
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

      // Store the token in localStorage
      localStorage.setItem("token", mockResponse.token)
      setUser(mockResponse.user)

      toast({
        title: "Registration successful",
        description: `Welcome to SkyWings, ${name}!`,
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
    localStorage.removeItem("token")
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

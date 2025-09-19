"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email?: string
  phone?: string
  userType: "rider" | "driver"
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (contact: string, otp: string) => Promise<boolean>
  signUp: (userData: any) => Promise<boolean>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("carpoviz_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (contact: string, otp: string): Promise<boolean> => {
    // Mock authentication - in real app, verify OTP with backend
    if (otp === "123456") {
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email: contact.includes("@") ? contact : undefined,
        phone: !contact.includes("@") ? contact : undefined,
        userType: "rider",
        isVerified: true,
      }
      setUser(mockUser)
      localStorage.setItem("carpoviz_user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const signUp = async (userData: any): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      userType: userData.userType || "rider",
      isVerified: true,
    }
    setUser(newUser)
    localStorage.setItem("carpoviz_user", JSON.stringify(newUser))
    return true
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("carpoviz_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import { useAuth } from "@/lib/auth-context"

export default function DriverDashboardPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Driver Dashboard</h1>
        <p className="text-xl">Welcome, {user?.name}!</p>
        <p className="text-lg">Your user type is: {user?.userType}</p>
      </div>
    </div>
  )
}

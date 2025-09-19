"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function AuthButtons() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
            Dashboard
        </Button>
        <Button variant="ghost" size="sm" onClick={() => {
          logout()
          router.push('/')
        }}>
          Logout
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
        </Button>
        <Button size="sm" asChild>
            <Link href="/auth/signup">Sign Up</Link>
        </Button>
    </div>
  )
}

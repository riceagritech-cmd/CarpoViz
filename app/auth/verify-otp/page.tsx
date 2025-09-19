"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, ArrowLeft, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyOTPPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const phone = searchParams.get("phone")
  const email = searchParams.get("email")
  const isSignup = searchParams.get("signup") === "true"

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join("")
    if (otpString.length !== 6) {
      alert("Please enter complete OTP")
      return
    }

    setIsLoading(true)
    // This page is now mainly for demo purposes
    if (otpString === "123456") {
      router.push("/dashboard")
    } else {
      alert("Invalid OTP. Please try again.")
    }
    setIsLoading(false)
  }

  const handleResendOtp = () => {
    setCountdown(30)
    setCanResend(false)
    // Mock resend OTP
    alert("OTP sent successfully!")
  }

  const contactInfo = phone || email
  const contactType = phone ? "phone" : "email"

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Link href="/sign-in" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>

        <Card className="border-border/50">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">CarpoViz</h1>
            </div>
            <CardTitle className="text-2xl">Verify OTP</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              {contactType === "phone" ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              We've sent a 6-digit code to {contactInfo}
            </CardDescription>
            <p className="text-xs text-muted-foreground mt-2">Demo: Use 123456 as OTP</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-center block">Enter OTP</Label>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold"
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : isSignup ? "Complete Registration" : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Didn't receive the code?</p>
              {canResend ? (
                <Button variant="link" onClick={handleResendOtp} className="p-0 h-auto">
                  Resend OTP
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">Resend in {countdown}s</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

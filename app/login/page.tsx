"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Loader2 } from "lucide-react"
import Link from "next/link"
import { authUtils } from "@/lib/localStorage-auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = authUtils.login(email, password)

    if (!result.success) {
      setError(result.error || "Login failed")
      setLoading(false)
      return
    }

    // Redirect based on onboarding status
    if (result.onboarding_completed) {
      router.push("/dashboard")
    } else {
      router.push("/onboarding")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-6000"></div>
      </div>

      <Card className="w-full max-w-md mx-auto p-6 shadow-2xl relative z-10 bg-white backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-space-grotesk">
              TeamForge
            </span>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 font-space-grotesk">Welcome Back!</CardTitle>
          <CardDescription className="text-gray-600 font-outfit">
            Sign in to your account to continue your journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-poppins">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-lg text-gray-900 border-2 border-gray-200 focus:border-indigo-500 font-outfit bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-poppins">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 text-lg text-gray-900 border-2 border-gray-200 focus:border-indigo-500 font-outfit bg-white"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center font-outfit">{error}</p>}
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-outfit disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <p className="mt-6 text-center text-gray-600 font-outfit">
            Don't have an account?{" "}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

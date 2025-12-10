"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutButton } from "@/components/logout-button"
import { MapPin, Sparkles } from "lucide-react"
import Link from "next/link"
import { authUtils } from "@/lib/localStorage-auth"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = authUtils.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }

    if (!currentUser.onboarding_completed) {
      router.push("/onboarding")
      return
    }

    setUser(currentUser)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-outfit">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const categoryColors: Record<string, string> = {
    Music: "bg-blue-100 text-blue-700",
    Arts: "bg-purple-100 text-purple-700",
    Dance: "bg-pink-100 text-pink-700",
    Development: "bg-green-100 text-green-700",
    Design: "bg-indigo-100 text-indigo-700",
    Writing: "bg-amber-100 text-amber-700",
    Photography: "bg-red-100 text-red-700",
    Business: "bg-cyan-100 text-cyan-700",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600 font-space-grotesk">TeamForge</h1>
          <div className="flex items-center gap-4">
            <Link href="/discover">
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Discover Teammates
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Profile Card */}
        <Card className="shadow-2xl mb-12 bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="h-32 w-32 ring-4 ring-indigo-100">
                  <AvatarImage src={user.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-4xl font-bold">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-4xl mb-2 font-space-grotesk">{user.name}</CardTitle>
                  <CardDescription className="text-lg mb-4">{user.email}</CardDescription>
                  {user.category && (
                    <Badge
                      className={`${categoryColors[user.category] || "bg-gray-100 text-gray-700"} text-base px-4 py-2`}
                    >
                      {user.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {user.bio && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600">{user.bio}</p>
                </div>
              )}

              <div className="space-y-3">
                {user.city && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{user.city}</span>
                  </div>
                )}
                {user.age && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">{user.age} years old</span>
                  </div>
                )}
                {user.gender && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">{user.gender}</span>
                  </div>
                )}
              </div>
            </div>

            {user.interests && user.interests.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="bg-white">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center py-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-space-grotesk">Ready to Find Your Teammates?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-outfit">
            Swipe through 10 amazing creators from Music, Arts, Dance, Development, Design, Writing, Photography, and
            Business categories. Discover who sparks your creativity!
          </p>
          <Link href="/discover">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg h-14 px-8"
            >
              Start Swiping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

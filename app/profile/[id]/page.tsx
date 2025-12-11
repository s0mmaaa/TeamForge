"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, MessageCircle, Share2 } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  id: string
  name: string
  email: string
  bio: string
  category_id: number
  category_name: string
  category_color: string
  highlights: string[]
  rating: number
  total_ratings: number
  experience_level: string
  availability_status: string
}

export default function ProfilePage() {
  const params = useParams()
  const userId = params.id as string
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchUserProfile()
  }, [userId])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const { data } = await supabase
        .from("users")
        .select(`
          id,
          name,
          email,
          bio,
          category_id,
          highlights,
          rating,
          total_ratings,
          experience_level,
          availability_status,
          categories:categories(name, color)
        `)
        .eq("id", userId)
        .single()

      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          bio: data.bio,
          category_id: data.category_id,
          category_name: data.categories?.name || "Uncategorized",
          category_color: data.categories?.color || "gray",
          highlights: data.highlights || [],
          rating: data.rating || 0,
          total_ratings: data.total_ratings || 0,
          experience_level: data.experience_level,
          availability_status: data.availability_status,
        })
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: "bg-purple-100 text-purple-700",
      pink: "bg-pink-100 text-pink-700",
      red: "bg-red-100 text-red-700",
      blue: "bg-blue-100 text-blue-700",
      cyan: "bg-cyan-100 text-cyan-700",
      orange: "bg-orange-100 text-orange-700",
      amber: "bg-amber-100 text-amber-700",
      green: "bg-green-100 text-green-700",
      gray: "bg-gray-100 text-gray-700",
    }
    return colorMap[color] || colorMap.gray
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700"
      case "busy":
        return "bg-yellow-100 text-yellow-700"
      case "unavailable":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile Not Found</h1>
          <Link href="/discover">
            <Button className="bg-purple-600 hover:bg-purple-700">Back to Discover</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/discover" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft size={20} />
          Back to Discover
        </Link>

        {/* Main Profile Card */}
        <Card className="bg-slate-700/50 border-slate-600 mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <CardTitle className="text-3xl mb-2">{user.name}</CardTitle>
                    <Badge className={`${getColorClass(user.category_color)} text-sm mb-4`}>{user.category_name}</Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 bg-yellow-400/20 px-4 py-2 rounded-lg mb-4">
                  <Star size={24} className="text-yellow-400 fill-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold">{user.rating.toFixed(1)}</div>
                    <div className="text-xs text-gray-400">{user.total_ratings} ratings</div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Bio Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-200">About</h3>
              <p className="text-gray-300 leading-relaxed">{user.bio}</p>
            </div>

            {/* Status and Level */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Availability</p>
                <Badge className={`${getAvailabilityColor(user.availability_status)} capitalize`}>
                  {user.availability_status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Experience Level</p>
                <Badge variant="secondary" className="capitalize">
                  {user.experience_level}
                </Badge>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {user.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-slate-600/50 rounded-lg p-4 border border-slate-500">
                    <p className="text-white font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-600">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2">
                <MessageCircle size={18} />
                Send Message
              </Button>
              <Button variant="outline" className="flex-1 border-slate-500 hover:bg-slate-600/50 gap-2 bg-transparent">
                <Share2 size={18} />
                Share Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="text-white">{user.email}</p>
              </div>
              <div className="pt-4 border-t border-slate-600">
                <p className="text-sm text-gray-400">Ready to collaborate? Send a message to get started!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

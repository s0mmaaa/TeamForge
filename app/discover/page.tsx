"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ThumbsUp, ThumbsDown, X, Filter } from "lucide-react"
import { authUtils, type DiscoveryUser } from "@/lib/localStorage-auth"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DiscoverPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [users, setUsers] = useState<DiscoveryUser[]>([])
  const [selectedUser, setSelectedUser] = useState<DiscoveryUser | null>(null)
  const [accepted, setAccepted] = useState<string[]>([])
  const [rejected, setRejected] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string>("All Skills")
  const [filteredUsers, setFilteredUsers] = useState<DiscoveryUser[]>([])
  const [allSkills, setAllSkills] = useState<string[]>([])

  const categoryColors: Record<string, string> = {
    Music: "bg-blue-100 text-blue-700 border-blue-200",
    Arts: "bg-purple-100 text-purple-700 border-purple-200",
    Dance: "bg-pink-100 text-pink-700 border-pink-200",
    Development: "bg-green-100 text-green-700 border-green-200",
    Design: "bg-indigo-100 text-indigo-700 border-indigo-200",
    Writing: "bg-amber-100 text-amber-700 border-amber-200",
    Photography: "bg-red-100 text-red-700 border-red-200",
    Business: "bg-cyan-100 text-cyan-700 border-cyan-200",
  }

  useEffect(() => {
    const currentUser = authUtils.getCurrentUser()
    if (!currentUser || !currentUser.onboarding_completed) {
      router.push("/login")
      return
    }

    const allUsers = authUtils.getDiscoveryUsers()
    const skills = authUtils.getAllSkills()
    const acceptedIds = authUtils.getAcceptedProfiles()
    const rejectedIds = authUtils.getRejectedProfiles()

    setUsers(allUsers)
    setFilteredUsers(allUsers)
    setAllSkills(skills)
    setAccepted(acceptedIds)
    setRejected(rejectedIds)
    setLoading(false)
  }, [router])

  const handleReject = () => {
    if (currentIndex >= filteredUsers.length) return

    const userId = filteredUsers[currentIndex].id
    authUtils.rejectProfile(userId)
    setRejected([...rejected, userId])
    setSwipeDirection("left")

    setTimeout(() => {
      setCurrentIndex(currentIndex + 1)
      setSwipeDirection(null)
    }, 300)
  }

  const handleAccept = () => {
    if (currentIndex >= filteredUsers.length) return

    const userId = filteredUsers[currentIndex].id
    authUtils.acceptProfile(userId)
    setAccepted([...accepted, userId])
    setSwipeDirection("right")

    setTimeout(() => {
      setCurrentIndex(currentIndex + 1)
      setSwipeDirection(null)
    }, 300)
  }

  const handleSkillFilter = (skill: string) => {
    setSelectedSkill(skill)
    setCurrentIndex(0)

    if (skill === "All Skills") {
      setFilteredUsers(users)
    } else {
      setFilteredUsers(authUtils.getDiscoveryUsersBySkill(skill))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-outfit">Loading profiles...</p>
        </div>
      </div>
    )
  }

  const currentUser = filteredUsers[currentIndex]
  const isFinished = currentIndex >= filteredUsers.length
  const remainingCount = filteredUsers.length - currentIndex
  const acceptedCount = accepted.length
  const rejectedCount = rejected.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative">
        {/* Header with Filter */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-indigo-600">
                  <X className="h-5 w-5 mr-2" />
                  Back
                </Button>
              </Link>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>
                    Accepted: <span className="font-bold text-green-600">{acceptedCount}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>
                    Rejected: <span className="font-bold text-red-600">{rejectedCount}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Skill Filter */}
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-600" />
              <Select value={selectedSkill} onValueChange={handleSkillFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Skills">All Skills</SelectItem>
                  {allSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
          {!isFinished ? (
            <>
              {/* Swipe Card Stack */}
              <div className="w-full max-w-md mx-auto mb-12">
                <div className="relative h-96">
                  {/* Card Animation Container */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      swipeDirection === "right"
                        ? "translate-x-96 opacity-0 rotate-12"
                        : swipeDirection === "left"
                          ? "-translate-x-96 opacity-0 -rotate-12"
                          : ""
                    }`}
                  >
                    {currentUser && (
                      <Card className="h-full shadow-2xl overflow-hidden bg-white border-0">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={currentUser.profileImage || "/placeholder.svg?height=256&width=320&query=profile"}
                            alt={currentUser.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <Badge
                              className={`${
                                categoryColors[currentUser.category] || "bg-gray-100 text-gray-700"
                              } text-sm font-semibold px-4 py-2`}
                            >
                              {currentUser.category}
                            </Badge>
                          </div>

                          {/* Rating Badge */}
                          <div className="absolute top-4 left-4 flex items-center gap-1 bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 font-bold">
                            ⭐ {currentUser.rating.toFixed(1)}
                          </div>
                        </div>

                        <CardContent className="p-6 space-y-4">
                          {/* Name and Age/Location */}
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                              {currentUser.name}, {currentUser.age}
                            </h2>
                            <p className="text-gray-600 font-medium flex items-center gap-1">📍 {currentUser.city}</p>
                          </div>

                          {/* Bio */}
                          <p className="text-gray-700 line-clamp-2">{currentUser.bio}</p>

                          {/* Interests */}
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-600">Interests:</p>
                            <div className="flex flex-wrap gap-2">
                              {currentUser.interests.slice(0, 3).map((interest, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="bg-indigo-50 text-indigo-700 border-indigo-200"
                                >
                                  {interest}
                                </Badge>
                              ))}
                              {currentUser.interests.length > 3 && (
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                  +{currentUser.interests.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* View Full Profile Button */}
                          <Button
                            onClick={() => setSelectedUser(currentUser)}
                            variant="outline"
                            className="w-full mt-4 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                          >
                            View Full Profile
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6 justify-center">
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="h-16 w-16 rounded-full border-3 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center bg-transparent"
                  title="Reject"
                >
                  <ThumbsDown className="h-7 w-7" />
                </Button>

                <Button
                  onClick={handleAccept}
                  className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg"
                  title="Accept"
                >
                  <ThumbsUp className="h-7 w-7" />
                </Button>
              </div>
            </>
          ) : (
            // Finished State
            <div className="text-center max-w-md">
              <div className="mb-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-space-grotesk">
                  You've Swiped Through All Profiles!
                </h2>
                <p className="text-gray-600 font-outfit mb-8">
                  You accepted <span className="font-bold text-green-600">{acceptedCount}</span> profiles and rejected{" "}
                  <span className="font-bold text-red-600">{rejectedCount}</span>.
                </p>
              </div>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-8 p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Accepted Profiles:</span>
                    <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">{acceptedCount}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Rejected Profiles:</span>
                    <Badge className="bg-red-100 text-red-700 text-lg px-4 py-2">{rejectedCount}</Badge>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg">Back to Dashboard</Button>
                </Link>
                <Button
                  onClick={() => {
                    setCurrentIndex(0)
                    localStorage.removeItem("teamforge_accepted")
                    localStorage.removeItem("teamforge_rejected")
                    setAccepted([])
                    setRejected([])
                  }}
                  variant="outline"
                  className="flex-1 h-12 text-lg border-2 border-indigo-200"
                >
                  Swipe Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Profile Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-space-grotesk">Full Profile</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              {/* Profile Image and Basic Info */}
              <div className="space-y-4">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedUser.profileImage || "/placeholder.svg?height=256&width=512"}
                    alt={selectedUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {selectedUser.name}, {selectedUser.age}
                      </h2>
                      <p className="text-gray-600 text-lg">📍 {selectedUser.city}</p>
                    </div>
                    <Badge
                      className={`${
                        categoryColors[selectedUser.category] || "bg-gray-100 text-gray-700"
                      } text-base px-4 py-2`}
                    >
                      {selectedUser.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span className="font-bold text-lg">{selectedUser.rating.toFixed(1)}</span>
                    </div>
                    <Badge variant="outline">{selectedUser.gender}</Badge>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.skills.map((skill, idx) => (
                    <Badge key={idx} className="bg-blue-100 text-blue-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Domain Preference */}
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Domain Preference</p>
                    <p className="font-semibold text-gray-900">{selectedUser.domainPreference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Primary Skill</p>
                    <p className="font-semibold text-gray-900">{selectedUser.primarySkill}</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700 leading-relaxed">{selectedUser.bio}</p>
              </div>

              {/* Interests */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.interests.map((interest, idx) => (
                    <Badge key={idx} className="bg-indigo-100 text-indigo-700 border-indigo-200">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => {
                    handleReject()
                    setSelectedUser(null)
                  }}
                  variant="outline"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                >
                  <ThumbsDown className="h-5 w-5 mr-2" />
                  Pass
                </Button>
                <Button
                  onClick={() => {
                    handleAccept()
                    setSelectedUser(null)
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  Connect
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

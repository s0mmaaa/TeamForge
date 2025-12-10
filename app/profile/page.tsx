"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Calendar,
  Star,
  Edit,
  Save,
  X,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Trophy,
  Target,
  Users,
  Zap,
  Camera,
  Award,
  TrendingUp,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [roles, setRoles] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    experience_level: "",
    availability_status: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setUser(user)

      // Load user profile
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Profile error:", profileError)
      } else if (profileData) {
        setProfile(profileData)
        setEditForm({
          name: profileData.name || "",
          bio: profileData.bio || "",
          experience_level: profileData.experience_level || "",
          availability_status: profileData.availability_status || "available",
          location: profileData.location || "",
          website: profileData.website || "",
          github: profileData.github || "",
          linkedin: profileData.linkedin || "",
        })
      }

      // Load user skills
      const { data: userSkills } = await supabase
        .from("user_skills")
        .select(`
          skills (
            name
          )
        `)
        .eq("user_id", user.id)

      if (userSkills) {
        setSkills(userSkills.map((us: any) => us.skills.name))
      }

      // Load user interests
      const { data: userInterests } = await supabase
        .from("user_interests")
        .select(`
          interests (
            name
          )
        `)
        .eq("user_id", user.id)

      if (userInterests) {
        setInterests(userInterests.map((ui: any) => ui.interests.name))
      }

      // Load user roles
      const { data: userRoles } = await supabase
        .from("user_roles")
        .select(`
          roles (
            name
          )
        `)
        .eq("user_id", user.id)

      if (userRoles) {
        setRoles(userRoles.map((ur: any) => ur.roles.name))
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from("users").upsert({
        id: user.id,
        ...editForm,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      setProfile({ ...profile, ...editForm })
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("Error saving profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "unavailable":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case "available":
        return "Available for projects"
      case "busy":
        return "Currently busy"
      case "unavailable":
        return "Not available"
      default:
        return "Status unknown"
    }
  }

  const getCompletionPercentage = () => {
    let completed = 0
    const total = 8

    if (profile?.name) completed++
    if (profile?.bio) completed++
    if (profile?.experience_level) completed++
    if (skills.length > 0) completed++
    if (interests.length > 0) completed++
    if (roles.length > 0) completed++
    if (profile?.location) completed++
    if (profile?.avatar_url) completed++

    return Math.round((completed / total) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-8 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Profile Not Found</h3>
            <p className="text-gray-600 mb-6">Complete your profile setup to get started.</p>
            <Button onClick={() => router.push("/onboarding")} className="w-full">
              Complete Profile Setup
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const completionPercentage = getCompletionPercentage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-1">Manage your profile and preferences</p>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)} disabled={saving}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative mb-6">
                    <Avatar className="h-24 w-24 mx-auto ring-4 ring-white shadow-lg">
                      <AvatarImage src={profile.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                        {profile.name?.charAt(0) || user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${getAvailabilityColor(profile.availability_status)} shadow-sm`}
                    />
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Your name"
                        className="text-center font-semibold"
                      />
                      <Select
                        value={editForm.availability_status}
                        onValueChange={(value) => setEditForm({ ...editForm, availability_status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="busy">Busy</SelectItem>
                          <SelectItem value="unavailable">Unavailable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h2>
                      <Badge
                        variant="secondary"
                        className="mb-4 bg-gradient-to-r from-green-100 to-blue-100 text-green-800"
                      >
                        {getAvailabilityText(profile.availability_status)}
                      </Badge>
                    </>
                  )}

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {user.email}
                    </div>

                    {profile.location && (
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {profile.location}
                      </div>
                    )}

                    <div className="flex items-center justify-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined {new Date(profile.created_at).toLocaleDateString()}
                    </div>

                    <div className="flex items-center justify-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                      4.8 rating (24 reviews)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2 text-indigo-600" />
                  Profile Strength
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Completion</span>
                    <span className="text-indigo-600 font-semibold">{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Profile picture</span>
                    <Badge variant={profile.avatar_url ? "default" : "outline"} className="text-xs">
                      {profile.avatar_url ? "✓" : "+10%"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bio & experience</span>
                    <Badge variant={profile.bio ? "default" : "outline"} className="text-xs">
                      {profile.bio ? "✓" : "+15%"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Skills & interests</span>
                    <Badge variant={skills.length > 0 ? "default" : "outline"} className="text-xs">
                      {skills.length > 0 ? "✓" : "+20%"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">12</div>
                    <div className="text-xs text-gray-600">Events Joined</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-xs text-gray-600">Teams Formed</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-xs text-gray-600">Match Rate</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">4.8</div>
                    <div className="text-xs text-gray-600">Avg Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  Skills & Interests
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  Achievements
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-indigo-600" />
                      About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            className="mt-2"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="experience">Experience Level</Label>
                            <Select
                              value={editForm.experience_level}
                              onValueChange={(value) => setEditForm({ ...editForm, experience_level: value })}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={editForm.location}
                              onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                              placeholder="City, Country"
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {profile.bio ||
                              "No bio added yet. Click edit to add one and help others understand your background and interests!"}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {profile.experience_level && (
                            <Badge
                              variant="secondary"
                              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800"
                            >
                              {profile.experience_level} level
                            </Badge>
                          )}
                          {profile.location && (
                            <Badge variant="outline" className="px-3 py-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {profile.location}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                      Links & Social
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={editForm.website}
                            onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                            placeholder="https://yourwebsite.com"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            value={editForm.github}
                            onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                            placeholder="github.com/username"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={editForm.linkedin}
                            onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                            placeholder="linkedin.com/in/username"
                            className="mt-2"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {profile.website && (
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <Globe className="h-5 w-5 mr-3 text-gray-400" />
                            <a
                              href={profile.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:underline font-medium"
                            >
                              {profile.website}
                            </a>
                          </div>
                        )}
                        {profile.github && (
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <Github className="h-5 w-5 mr-3 text-gray-400" />
                            <a
                              href={`https://${profile.github}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:underline font-medium"
                            >
                              {profile.github}
                            </a>
                          </div>
                        )}
                        {profile.linkedin && (
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <Linkedin className="h-5 w-5 mr-3 text-gray-400" />
                            <a
                              href={`https://${profile.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:underline font-medium"
                            >
                              {profile.linkedin}
                            </a>
                          </div>
                        )}
                        {!profile.website && !profile.github && !profile.linkedin && (
                          <p className="text-gray-500 text-center py-8">
                            No links added yet. Add your social profiles to help others connect with you!
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                        Skills
                      </CardTitle>
                      <CardDescription>Your technical and professional skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="default"
                              className="bg-gradient-to-r from-blue-500 to-indigo-500"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No skills added yet.</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-purple-500" />
                        Interests
                      </CardTitle>
                      <CardDescription>What you're passionate about</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {interests.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {interests.map((interest) => (
                            <Badge
                              key={interest}
                              variant="secondary"
                              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No interests added yet.</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Users className="h-5 w-5 mr-2 text-green-500" />
                        Preferred Roles
                      </CardTitle>
                      <CardDescription>Roles you'd like to take on</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {roles.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {roles.map((role) => (
                            <Badge key={role} variant="outline" className="border-green-200 text-green-700">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No preferred roles added yet.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <Button onClick={() => router.push("/onboarding")} variant="outline" size="lg">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Skills & Interests
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-500" />
                      Achievements & Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center mb-2">
                          <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                          <span className="font-semibold text-yellow-800">Team Player</span>
                        </div>
                        <p className="text-sm text-yellow-700">Completed 5+ successful team projects</p>
                      </div>

                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <div className="flex items-center mb-2">
                          <Zap className="h-6 w-6 text-blue-500 mr-2" />
                          <span className="font-semibold text-blue-800">Quick Starter</span>
                        </div>
                        <p className="text-sm text-blue-700">Joined teams within 24 hours</p>
                      </div>

                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="flex items-center mb-2">
                          <Star className="h-6 w-6 text-green-500 mr-2" />
                          <span className="font-semibold text-green-800">Top Rated</span>
                        </div>
                        <p className="text-sm text-green-700">Maintained 4.5+ star rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive notifications about team invites and matches</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Privacy Settings</h4>
                        <p className="text-sm text-gray-600">Control who can see your profile and contact you</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <h4 className="font-medium text-red-800">Delete Account</h4>
                        <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

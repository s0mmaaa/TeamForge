"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Star, MapPin, Calendar, Users } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    experience: "any",
    availability: "any",
    skills: [] as string[],
    interests: [] as string[],
    roles: [] as string[],
  })
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [allSkills, setAllSkills] = useState<string[]>([])
  const [allInterests, setAllInterests] = useState<string[]>([])
  const [allRoles, setAllRoles] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    loadUsers()
    loadFilterOptions()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [searchQuery, filters, users])

  const loadUsers = async () => {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setCurrentUser(user)

      // Load all users except current user with their skills, interests, and roles
      const { data: usersData } = await supabase
        .from("users")
        .select(`
          id,
          name,
          bio,
          experience_level,
          availability_status,
          location,
          avatar_url,
          created_at,
          user_skills (
            skills (
              name
            )
          ),
          user_interests (
            interests (
              name
            )
          ),
          user_roles (
            roles (
              name
            )
          )
        `)
        .neq("id", user.id)
        .not("name", "is", null) // Only users who have completed their profile

      const formattedUsers = (usersData || []).map((user) => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar_url,
        bio: user.bio || "No bio available",
        skills: user.user_skills?.map((us: any) => us.skills.name) || [],
        experience: user.experience_level || "Not specified",
        rating: 4.5 + Math.random() * 0.5, // Placeholder until we implement real ratings
        availability: user.availability_status || "available",
        interests: user.user_interests?.map((ui: any) => ui.interests.name) || [],
        roles: user.user_roles?.map((ur: any) => ur.roles.name) || [],
        location: user.location || "Location not specified",
        joinedDate: user.created_at,
      }))

      setUsers(formattedUsers)
      setFilteredUsers(formattedUsers)
    } catch (error) {
      console.error("Error loading users:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadFilterOptions = async () => {
    try {
      // Load all skills
      const { data: skillsData } = await supabase.from("skills").select("name").order("name")

      setAllSkills(skillsData?.map((s) => s.name) || [])

      // Load all interests
      const { data: interestsData } = await supabase.from("interests").select("name").order("name")

      setAllInterests(interestsData?.map((i) => i.name) || [])

      // Load all roles
      const { data: rolesData } = await supabase.from("roles").select("name").order("name")

      setAllRoles(rolesData?.map((r) => r.name) || [])
    } catch (error) {
      console.error("Error loading filter options:", error)
    }
  }

  const filterUsers = () => {
    let filtered = users

    // Text search
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.skills.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Experience filter
    if (filters.experience !== "any") {
      filtered = filtered.filter((user) => user.experience === filters.experience)
    }

    // Availability filter
    if (filters.availability !== "any") {
      filtered = filtered.filter((user) => user.availability === filters.availability)
    }

    // Skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter((user) => filters.skills.some((skill) => user.skills.includes(skill)))
    }

    // Interests filter
    if (filters.interests.length > 0) {
      filtered = filtered.filter((user) => filters.interests.some((interest) => user.interests.includes(interest)))
    }

    // Roles filter
    if (filters.roles.length > 0) {
      filtered = filtered.filter((user) => filters.roles.some((role) => user.roles.includes(role)))
    }

    setFilteredUsers(filtered)
  }

  const toggleFilter = (value: string, filterType: "skills" | "interests" | "roles") => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }))
  }

  const clearFilters = () => {
    setFilters({
      experience: "any",
      availability: "any",
      skills: [],
      interests: [],
      roles: [],
    })
    setSearchQuery("")
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading teammates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Real Teammates</h1>
              <p className="text-gray-600 mt-1">Connect with {users.length} active developers and designers</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-lg border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, skills, or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:w-auto h-12">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <Select
                    value={filters.experience}
                    onValueChange={(value) => setFilters({ ...filters, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any level</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Availability</label>
                  <Select
                    value={filters.availability}
                    onValueChange={(value) => setFilters({ ...filters, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Skills</label>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {allSkills.slice(0, 6).map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={filters.skills.includes(skill)}
                          onCheckedChange={() => toggleFilter(skill, "skills")}
                        />
                        <label htmlFor={`skill-${skill}`} className="text-sm">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Roles</label>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {allRoles.slice(0, 4).map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${role}`}
                          checked={filters.roles.includes(role)}
                          onCheckedChange={() => toggleFilter(role, "roles")}
                        />
                        <label htmlFor={`role-${role}`} className="text-sm">
                          {role}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
                <span className="text-sm text-gray-600">{filteredUsers.length} results found</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {filteredUsers.length > 0 ? (
          <div className="space-y-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="relative">
                        <Avatar className="h-16 w-16 ring-2 ring-white shadow-lg">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg">
                            {user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getAvailabilityColor(user.availability)}`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">{user.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {user.experience}
                          </Badge>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{user.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-3 line-clamp-2">{user.bio}</p>

                        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {user.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Joined {new Date(user.joinedDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {user.skills.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-gray-700">Skills: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {user.skills.slice(0, 5).map((skill: string) => (
                                  <Badge
                                    key={skill}
                                    variant="outline"
                                    className="text-xs border-indigo-200 text-indigo-700"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                                {user.skills.length > 5 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{user.skills.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {user.interests.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-gray-700">Interests: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {user.interests.slice(0, 3).map((interest: string) => (
                                  <Badge key={interest} variant="secondary" className="text-xs">
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {user.roles.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-gray-700">Preferred Roles: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {user.roles.slice(0, 2).map((role: string) => (
                                  <Badge key={role} variant="default" className="text-xs">
                                    {role}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        Send Invite
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              {users.length === 0 ? (
                <>
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No users found</h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to complete your profile and start connecting with teammates!
                  </p>
                </>
              ) : (
                <>
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No teammates found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or filters to find more results.
                  </p>
                </>
              )}
              <Button onClick={clearFilters} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

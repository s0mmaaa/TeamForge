"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Zap,
  Eye,
  EyeOff,
  CheckCircle,
  Users,
  Shield,
  Sparkles,
  TrendingUp,
  Award,
  Lock,
  User,
  AtSign,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authUtils } from "@/lib/localStorage-auth"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [skills, setSkills] = useState<string[]>([])
  const [primarySkill, setPrimarySkill] = useState("")
  const [domainPreference, setDomainPreference] = useState("")

  const availableDomains = ["Frontend", "Backend", "Design", "AI/ML", "DevOps", "Mobile"]
  const availableSkills = [
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "Go",
    "Rust",
    "Figma",
    "Adobe XD",
    "Sketch",
    "UI Design",
    "UX Research",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Azure",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "React Native",
    "Swift",
    "Kotlin",
  ]

  const router = useRouter()

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setFormData({ ...formData, password })
    setPasswordStrength(calculatePasswordStrength(password))
  }

  const handleSkillToggle = (skill: string) => {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name.trim()) {
      setError("Please enter your full name")
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (skills.length === 0) {
      setError("Please select at least one skill")
      return
    }

    if (!primarySkill) {
      setError("Please select your primary skill")
      return
    }

    if (!domainPreference) {
      setError("Please select your domain preference")
      return
    }

    setLoading(true)
    const result = authUtils.register(formData.email, formData.password, formData.name)

    if (!result.success) {
      setError(result.error || "Failed to create account")
      setLoading(false)
      return
    }

    authUtils.updateProfile({
      skills,
      primarySkill,
      domainPreference,
    })

    router.push("/onboarding")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      <div className="relative flex min-h-screen">
        {/* Left Side - Enhanced Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
          {/* Additional background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full filter blur-2xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full filter blur-2xl animate-pulse animation-delay-2000"></div>
          </div>

          <div className="relative max-w-md">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4 mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-white/30 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                <div className="relative bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/30">
                  <Zap className="h-10 w-10 text-white" />
                </div>
              </div>
              <div>
                <span className="text-4xl font-black text-white font-space-grotesk">TeamForge</span>
                <div className="text-white/80 text-sm font-medium font-outfit">Build. Connect. Succeed.</div>
              </div>
            </div>

            <h1 className="text-5xl font-black text-white mb-8 leading-tight font-space-grotesk">
              Join the Future of
              <span className="block text-yellow-300 animate-text-shimmer">Team Building</span>
            </h1>

            <p className="text-xl text-white/90 mb-12 leading-relaxed font-outfit">
              Connect with amazing teammates, join exciting events, and build something incredible together. Your next
              breakthrough project starts here.
            </p>

            {/* Enhanced Stats */}
            <div className="space-y-6 mb-12">
              {[
                { icon: Users, text: "25,000+ active developers", color: "text-blue-300" },
                { icon: Award, text: "500+ successful events", color: "text-green-300" },
                { icon: TrendingUp, text: "98% match success rate", color: "text-yellow-300" },
                { icon: Shield, text: "Trusted by top companies", color: "text-purple-300" },
              ].map((stat, index) => (
                <div key={index} className="flex items-center space-x-4 text-white/90 group">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className="font-medium font-outfit group-hover:text-white transition-colors">{stat.text}</span>
                </div>
              ))}
            </div>

            {/* Social Proof Avatars */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar
                    key={i}
                    className="h-12 w-12 border-3 border-white shadow-lg hover:scale-110 transition-transform"
                  >
                    <AvatarImage src={`/placeholder-icon.png?height=48&width=48&text=${i}`} />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold">
                      U{i}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-white/90">
                <div className="font-bold font-poppins">Join 25K+ developers</div>
                <div className="text-sm text-white/70 font-outfit">building the future</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Signup Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
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
              <Badge
                variant="outline"
                className="mb-4 px-4 py-2 text-indigo-600 border-indigo-200 bg-white/50 backdrop-blur-sm font-outfit"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Join 25,000+ developers
              </Badge>
            </div>

            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-4xl font-black text-gray-900 mb-4 font-space-grotesk">
                  Create Account
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed font-outfit">
                  Join thousands of developers and designers building amazing projects together
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Enhanced Name Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700 flex items-center font-poppins"
                    >
                      <User className="h-4 w-4 mr-2 text-indigo-600" />
                      Full Name
                    </Label>
                    <div className="relative group">
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-14 text-lg border-2 transition-all duration-300 font-outfit bg-white text-gray-900 hover:border-gray-300"
                        required
                      />
                      {formData.name && (
                        <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  {/* Enhanced Email Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700 flex items-center font-poppins"
                    >
                      <AtSign className="h-4 w-4 mr-2 text-indigo-600" />
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-14 text-lg border-2 transition-all duration-300 font-outfit bg-white text-gray-900 hover:border-gray-300"
                        required
                      />
                      {formData.email && formData.email.includes("@") && (
                        <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  {/* Enhanced Password Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700 flex items-center font-poppins"
                    >
                      <Lock className="h-4 w-4 mr-2 text-indigo-600" />
                      Password
                    </Label>
                    <div className="relative group">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        className="h-14 text-lg border-2 transition-all duration-300 pr-12 font-outfit bg-white text-gray-900 hover:border-gray-300"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            passwordStrength < 40
                              ? "bg-red-500"
                              : passwordStrength < 70
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Enhanced Confirm Password Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold text-gray-700 flex items-center font-poppins"
                    >
                      <Shield className="h-4 w-4 mr-2 text-indigo-600" />
                      Confirm Password
                    </Label>
                    <div className="relative group">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="h-14 text-lg border-2 transition-all duration-300 pr-12 font-outfit bg-white text-gray-900 hover:border-gray-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Domain Preference Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center">Domain Preference</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableDomains.map((domain) => (
                        <Button
                          key={domain}
                          type="button"
                          onClick={() => setDomainPreference(domain)}
                          className={`${domainPreference === domain ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        >
                          {domain}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Skill Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">Primary Skill</Label>
                    <select
                      value={primarySkill}
                      onChange={(e) => setPrimarySkill(e.target.value)}
                      className="w-full p-2 border-2 rounded-lg"
                    >
                      <option value="">Select primary skill</option>
                      {availableSkills.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Skills Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">Select Your Skills</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${skills.includes(skill) ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                      <p className="text-red-700 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        {error}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                    Sign In
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

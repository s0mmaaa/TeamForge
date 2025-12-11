"use client"

import React from "react"

import type { ReactElement } from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, User, Heart, Users, CheckCircle, ArrowLeft, ArrowRight, Rocket, Loader2 } from "lucide-react"
import { authUtils } from "@/lib/localStorage-auth"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: any
}

const steps: OnboardingStep[] = [
  { id: "profile", title: "Basic Profile", description: "Let's start with your basic information", icon: User },
  { id: "interests", title: "Interests & Category", description: "What are you passionate about?", icon: Heart },
  { id: "preferences", title: "Team Preferences", description: "How do you like to work?", icon: Users },
]

const CATEGORIES = ["Music", "Arts", "Dance", "Development", "Design", "Writing", "Photography", "Business"]

export default function OnboardingPage(): ReactElement {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
    bio: "",
    category: "",
    interests: [] as string[],
    teamSize: "",
    workStyle: "",
    availability: "",
  })

  useEffect(() => {
    const currentUser = authUtils.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setFormData((prev) => ({ ...prev, name: currentUser.name }))
  }, [router])

  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100)
  }, [currentStep])

  const handleNext = () => {
    if (currentStep === 0 && (!formData.name || !formData.age || !formData.gender || !formData.city)) {
      alert("Please fill in all required fields")
      return
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async () => {
    setSaving(true)

    const profileUpdate = {
      age: Number.parseInt(formData.age),
      gender: formData.gender,
      city: formData.city,
      bio: formData.bio,
      interests: formData.interests,
      onboarding_completed: true,
    }

    authUtils.updateProfile(profileUpdate)
    setSaving(false)

    // Small delay to ensure data is saved
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-outfit">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden py-12">
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-space-grotesk">
              TeamForge
            </span>
          </div>

          <h1 className="text-4xl font-black text-gray-900 mb-4 font-space-grotesk">Complete Your Profile</h1>
          <p className="text-xl text-gray-600 mb-8 font-outfit">Help us find your perfect teammates</p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 font-outfit">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-indigo-600 font-jetbrains-mono">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isCurrent
                          ? "bg-indigo-600 border-indigo-600 text-white scale-110"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <StepIcon className="h-6 w-6" />}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 transition-all ${isCompleted ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              {React.createElement(steps[currentStep].icon, {
                className: "h-8 w-8 text-indigo-600",
              })}
              <CardTitle className="text-2xl font-bold text-gray-900 font-space-grotesk">
                {steps[currentStep].title}
              </CardTitle>
            </div>
            <CardDescription className="text-lg text-gray-600 font-outfit">
              {steps[currentStep].description}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Step 1: Basic Profile */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 font-poppins">Full Name</Label>
                    <Input
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 text-lg text-gray-900 border-2 border-gray-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 font-poppins">Age *</Label>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="h-12 text-lg text-gray-900 border-2 border-gray-200"
                      min="18"
                      max="100"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 font-poppins">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    >
                      <SelectTrigger className="h-12 text-lg text-gray-900 border-2 border-gray-200">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 font-poppins">City *</Label>
                    <Input
                      placeholder="e.g., Mumbai, Delhi, Bangalore"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-12 text-lg text-gray-900 border-2 border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700 font-poppins">Bio</Label>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="min-h-[100px] text-lg text-gray-900 border-2 border-gray-200 resize-none"
                    maxLength={300}
                  />
                  <div className="text-right text-sm text-gray-500">{formData.bio.length}/300</div>
                </div>
              </div>
            )}

            {/* Step 2: Category & Interests */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700 font-poppins">Primary Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="h-12 text-lg text-gray-900 border-2 border-gray-200">
                      <SelectValue placeholder="Select your category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700 font-poppins">
                    Interests (select multiple)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center space-x-2 p-3 rounded-lg border-2 border-gray-200 hover:border-indigo-500 cursor-pointer transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, interests: [...formData.interests, interest] })
                            } else {
                              setFormData({
                                ...formData,
                                interests: formData.interests.filter((i) => i !== interest),
                              })
                            }
                          }}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Team Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 font-poppins">Team Size Preference</Label>
                    <Select
                      value={formData.teamSize}
                      onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
                    >
                      <SelectTrigger className="h-12 text-lg text-gray-900 border-2 border-gray-200">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Solo">Solo (1 person)</SelectItem>
                        <SelectItem value="Small">Small (2-3 people)</SelectItem>
                        <SelectItem value="Medium">Medium (4-6 people)</SelectItem>
                        <SelectItem value="Large">Large (7+ people)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 font-poppins">Work Style</Label>
                    <Select
                      value={formData.workStyle}
                      onValueChange={(value) => setFormData({ ...formData, workStyle: value })}
                    >
                      <SelectTrigger className="h-12 text-lg text-gray-900 border-2 border-gray-200">
                        <SelectValue placeholder="Select work style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Collaborative">Highly Collaborative</SelectItem>
                        <SelectItem value="Independent">Independent</SelectItem>
                        <SelectItem value="Mixed">Mixed Approach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700 font-poppins">Availability</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) => setFormData({ ...formData, availability: value })}
                  >
                    <SelectTrigger className="h-12 text-lg text-gray-900 border-2 border-gray-200">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time (40+ hours/week)</SelectItem>
                      <SelectItem value="Part-time">Part-time (20-40 hours/week)</SelectItem>
                      <SelectItem value="Casual">Casual (10-20 hours/week)</SelectItem>
                      <SelectItem value="Weekends">Weekends only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <div className="flex justify-between px-8 pb-8 border-t pt-6">
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="h-12 px-6 border-2 border-gray-300 bg-transparent"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Previous
                </Button>
              )}
            </div>

            <div className="flex space-x-3">
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  Continue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={saving}
                  className="h-12 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  {saving ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Completing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Rocket className="h-5 w-5" />
                      <span>Complete Setup</span>
                    </div>
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

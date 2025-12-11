"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, Clock, Plus } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const { data: eventsData } = await supabase.from("events").select("*").order("start_date", { ascending: true })

      setEvents(eventsData || [])

      // Mock registered events for demo
      setRegisteredEvents([
        {
          id: 1,
          title: "Global Hackathon 2024",
          status: "registered",
        },
      ])
    } catch (error) {
      console.error("Error loading events:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDaysUntil = (dateString: string) => {
    const days = Math.ceil((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return days
  }

  const getEventStatus = (event: any) => {
    const now = new Date()
    const startDate = new Date(event.start_date)
    const endDate = new Date(event.end_date)
    const registrationDeadline = new Date(event.registration_deadline)

    if (now > endDate) return "completed"
    if (now >= startDate && now <= endDate) return "active"
    if (now > registrationDeadline) return "registration_closed"
    return "upcoming"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="default">Upcoming</Badge>
      case "active":
        return <Badge variant="destructive">Live Now</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "registration_closed":
        return <Badge variant="outline">Registration Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const isRegistered = (eventId: number) => {
    return registeredEvents.some((re) => re.id === eventId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p>Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Events</h1>
              <p className="text-gray-600 mt-1">Discover hackathons, competitions, and collaborative projects</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="registered">My Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="active">Live Now</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => {
                const status = getEventStatus(event)
                const daysUntil = getDaysUntil(event.start_date)

                return (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                        </div>
                        {getStatusBadge(status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(event.start_date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {formatTime(event.start_date)} - {formatTime(event.end_date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          Max {event.max_team_size} members per team
                        </div>
                      </div>

                      {daysUntil > 0 && status === "upcoming" && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>{daysUntil} days</strong> until event starts
                          </p>
                          {event.registration_deadline && (
                            <p className="text-xs text-blue-600 mt-1">
                              Registration closes {formatDate(event.registration_deadline)}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {isRegistered(event.id) ? (
                          <Badge variant="default">Registered</Badge>
                        ) : status === "upcoming" ? (
                          <Button size="sm">Register</Button>
                        ) : (
                          <Button size="sm" disabled>
                            {status === "registration_closed" ? "Closed" : "Unavailable"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="registered" className="space-y-6">
            {registeredEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events
                  .filter((event) => isRegistered(event.id))
                  .map((event) => {
                    const status = getEventStatus(event)
                    const daysUntil = getDaysUntil(event.start_date)

                    return (
                      <Card key={event.id} className="hover:shadow-lg transition-shadow border-indigo-200">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                              <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                            </div>
                            <Badge variant="default">Registered</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              {formatDate(event.start_date)}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              {formatTime(event.start_date)} - {formatTime(event.end_date)}
                            </div>
                          </div>

                          {daysUntil > 0 && (
                            <div className="bg-indigo-50 p-3 rounded-lg">
                              <p className="text-sm text-indigo-800">
                                <strong>{daysUntil} days</strong> until event starts
                              </p>
                              <p className="text-xs text-indigo-600 mt-1">Time to find your team!</p>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4">
                            <Button variant="outline" size="sm">
                              Event Details
                            </Button>
                            <Button size="sm">Find Team</Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No registered events</h3>
                  <p className="text-gray-600 mb-4">
                    Browse available events and register to start building amazing projects.
                  </p>
                  <Button>Browse Events</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter((event) => getEventStatus(event) === "upcoming")
                .map((event) => {
                  const daysUntil = getDaysUntil(event.start_date)

                  return (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(event.start_date)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {formatTime(event.start_date)} - {formatTime(event.end_date)}
                          </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>{daysUntil} days</strong> until event starts
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                          <Button size="sm">Register Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter((event) => getEventStatus(event) === "active")
                .map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow border-red-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                        </div>
                        <Badge variant="destructive">Live Now</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-red-800 font-medium">Event is currently active!</p>
                        <p className="text-xs text-red-600 mt-1">Ends {formatDate(event.end_date)}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Join Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, MapPin, Star, Clock, Car, User, Bell, Settings, Brain, Zap, MessageCircle, Shield } from "lucide-react"
import Link from "next/link"
import { RealTimeMap } from "@/components/real-time-map"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [showLiveMap, setShowLiveMap] = useState(false)

  const userStats = {
    rating: 4.8,
    greenPoints: 245,
    totalRides: 23,
    co2Saved: 12.5,
  }

  const recentRides = [
    {
      id: 1,
      from: "Vizag Railway Station",
      to: "GITAM University",
      date: "Today, 9:00 AM",
      type: "offered",
      passengers: 2,
      earnings: 150,
    },
    {
      id: 2,
      from: "MVP Colony",
      to: "Rushikonda Beach",
      date: "Yesterday, 6:30 PM",
      type: "taken",
      driver: "Priya Sharma",
      cost: 80,
    },
  ]

  const liveNotifications = [
    { id: 1, type: "ride-request", message: "New ride request from Dwaraka Nagar", time: "2 mins ago" },
    { id: 2, type: "ai-suggestion", message: "AI suggests offering ride to IT Hub at 6 PM", time: "5 mins ago" },
    { id: 3, type: "green-points", message: "You earned 15 green points!", time: "1 hour ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">CarpoViz</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                3
              </div>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Link href="/profile">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
          <p className="text-muted-foreground">Ready to make Vizag greener today?</p>
        </div>

        <div className="mb-8">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI-Powered Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <Zap className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Optimal ride time to IT Hub</p>
                    <p className="text-xs text-muted-foreground">6:00 PM - High demand expected</p>
                  </div>
                  <Button size="sm" className="ml-auto">
                    Offer
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-medium text-sm">3 riders near you</p>
                    <p className="text-xs text-muted-foreground">MVP Colony → Beach Road</p>
                  </div>
                  <Button size="sm" variant="secondary">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Green Points</CardTitle>
                <Leaf className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userStats.greenPoints}</div>
              <p className="text-xs text-muted-foreground">+15 from last ride</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
                <Car className="w-4 h-4 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalRides}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <Star className="w-4 h-4 text-accent-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.rating}</div>
              <p className="text-xs text-muted-foreground">Based on 23 reviews</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
                <Leaf className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.co2Saved}kg</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Live Vehicle Tracking
              </CardTitle>
              <CardDescription>See real-time vehicles and book instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-3" onClick={() => setShowLiveMap(!showLiveMap)}>
                <MapPin className="w-4 h-4 mr-2" />
                {showLiveMap ? "Hide Live Map" : "Show Live Map"}
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/rides/find">
                  <Brain className="w-4 h-4 mr-2" />
                  AI-Powered Search
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-secondary" />
                Smart Ride Offering
              </CardTitle>
              <CardDescription>AI suggests optimal routes and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full mb-3" asChild>
                <Link href="/rides/offer">
                  <Car className="w-4 h-4 mr-2" />
                  Offer Smart Ride
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with Riders
              </Button>
            </CardContent>
          </Card>
        </div>

        {showLiveMap && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Live Vehicle Map - Visakhapatnam
                </CardTitle>
                <CardDescription>Real-time vehicle locations with booking options</CardDescription>
              </CardHeader>
              <CardContent>
                <RealTimeMap userLocation={{ lat: 17.6868, lng: 83.2185 }} showVehicles={true} />
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-muted-foreground" />
                Live Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liveNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-2 bg-muted/50 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === "ride-request"
                          ? "bg-primary"
                          : notification.type === "ai-suggestion"
                            ? "bg-secondary"
                            : "bg-accent"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                My Profile
              </CardTitle>
              <CardDescription>Manage your account and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/profile">
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-muted-foreground" />
                Safety Center
              </CardTitle>
              <CardDescription>Emergency contacts and safety features</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                <Shield className="w-4 h-4 mr-2" />
                Safety Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Rides</CardTitle>
            <CardDescription>Your latest carpooling activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRides.map((ride) => (
                <div key={ride.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        ride.type === "offered" ? "bg-primary/10" : "bg-secondary/10"
                      }`}
                    >
                      {ride.type === "offered" ? (
                        <Car className="w-5 h-5 text-primary" />
                      ) : (
                        <User className="w-5 h-5 text-secondary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {ride.from} → {ride.to}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {ride.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {ride.type === "offered" ? (
                      <>
                        <Badge variant="secondary" className="mb-1">
                          {ride.passengers} passengers
                        </Badge>
                        <div className="text-sm font-medium text-primary">+₹{ride.earnings}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-muted-foreground">with {ride.driver}</div>
                        <div className="text-sm font-medium">₹{ride.cost}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, TrendingUp, Users, Car, Star, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function ProfileStatsPage() {
  // Mock detailed stats
  const stats = {
    overview: {
      totalRides: 47,
      ridesOffered: 28,
      ridesTaken: 19,
      rating: 4.8,
      totalReviews: 35,
      greenPoints: 1250,
      co2Saved: 45.2,
      moneyEarned: 3200,
      moneySaved: 1800,
      totalDistance: 1250,
    },
    monthly: {
      rides: [12, 8, 15, 11, 9, 14],
      earnings: [450, 320, 680, 520, 380, 650],
      greenPoints: [85, 60, 120, 95, 70, 110],
    },
    achievements: [
      { id: 1, title: "Eco Warrior", description: "Saved 50kg CO₂", icon: Leaf, earned: true },
      { id: 2, title: "Super Driver", description: "50+ rides offered", icon: Car, earned: true },
      { id: 3, title: "5-Star Hero", description: "Maintain 4.8+ rating", icon: Star, earned: true },
      { id: 4, title: "Community Builder", description: "100+ rides", icon: Users, earned: false },
      { id: 5, title: "Distance Master", description: "5000km traveled", icon: MapPin, earned: false },
      { id: 6, title: "Time Saver", description: "Save 100 hours", icon: Clock, earned: false },
    ],
    topRoutes: [
      { route: "Railway Station → GITAM", count: 12, earnings: 960 },
      { route: "MVP Colony → IT Park", count: 8, earnings: 480 },
      { route: "Beach Road → Airport", count: 6, earnings: 720 },
      { route: "Rushikonda → City Center", count: 4, earnings: 320 },
    ],
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">CarpoViz</h1>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/profile" className="text-muted-foreground hover:text-foreground">
              Back to Profile
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">My Statistics</h2>
          <p className="text-muted-foreground">Detailed insights into your carpooling journey</p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.overview.totalRides}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Green Points</CardTitle>
                <Leaf className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.overview.greenPoints}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>+85 this month</span>
              </div>
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
              <div className="text-2xl font-bold text-primary">{stats.overview.co2Saved}kg</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>+8.2kg this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Net Earnings</CardTitle>
                <Leaf className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.overview.moneyEarned - stats.overview.moneySaved}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>+₹420 this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trends */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Monthly Activity</CardTitle>
              <CardDescription>Your ride activity over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {months.map((month, index) => (
                  <div key={month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{month}</span>
                      <span className="font-medium">{stats.monthly.rides[index]} rides</span>
                    </div>
                    <Progress value={(stats.monthly.rides[index] / 20) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Routes */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Top Routes</CardTitle>
              <CardDescription>Your most frequently traveled routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topRoutes.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{route.route}</div>
                      <div className="text-xs text-muted-foreground">{route.count} rides</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm text-primary">₹{route.earnings}</div>
                      <div className="text-xs text-muted-foreground">earned</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Your carpooling milestones and badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {stats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 border rounded-lg text-center ${
                    achievement.earned ? "border-primary/50 bg-primary/5" : "border-border/50 bg-muted/30 opacity-60"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      achievement.earned ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <achievement.icon
                      className={`w-6 h-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <h4 className="font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && (
                    <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800 border-green-200">
                      Earned
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>As a Driver</CardTitle>
              <CardDescription>Your performance offering rides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rides Offered</span>
                <span className="font-medium">{stats.overview.ridesOffered}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Money Earned</span>
                <span className="font-medium text-primary">₹{stats.overview.moneyEarned}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">{stats.overview.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Completion Rate</span>
                <span className="font-medium">96%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>As a Rider</CardTitle>
              <CardDescription>Your experience taking rides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rides Taken</span>
                <span className="font-medium">{stats.overview.ridesTaken}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Money Saved</span>
                <span className="font-medium text-primary">₹{stats.overview.moneySaved}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Rating Given</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">4.9</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">On-time Rate</span>
                <span className="font-medium">98%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Car,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Ban,
  CheckCircle,
  Eye,
  MessageSquare,
  DollarSign,
  Activity,
} from "lucide-react"

export default function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")

  const stats = {
    totalUsers: 2847,
    activeRides: 156,
    completedRides: 8934,
    reportedIssues: 12,
    revenue: 45670,
    co2Saved: 1234.5,
  }

  const recentUsers = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya@email.com",
      type: "Driver",
      status: "Active",
      joinDate: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh@email.com",
      type: "Rider",
      status: "Active",
      joinDate: "2024-01-14",
      verified: true,
    },
    {
      id: 3,
      name: "Anita Reddy",
      email: "anita@email.com",
      type: "Driver",
      status: "Pending",
      joinDate: "2024-01-13",
      verified: false,
    },
    {
      id: 4,
      name: "Suresh Babu",
      email: "suresh@email.com",
      type: "Rider",
      status: "Suspended",
      joinDate: "2024-01-12",
      verified: true,
    },
  ]

  const activeRides = [
    {
      id: 1,
      driver: "Priya Sharma",
      rider: "Rajesh Kumar",
      from: "Dwaraka Nagar",
      to: "IT Park",
      status: "In Progress",
      startTime: "09:30 AM",
    },
    {
      id: 2,
      driver: "Anita Reddy",
      rider: "Multiple",
      from: "MVP Colony",
      to: "Steel Plant",
      status: "Starting Soon",
      startTime: "10:00 AM",
    },
    {
      id: 3,
      driver: "Suresh Babu",
      rider: "Kavya Singh",
      from: "Beach Road",
      to: "Airport",
      status: "Completed",
      startTime: "08:45 AM",
    },
  ]

  const reportedIssues = [
    {
      id: 1,
      reporter: "Rajesh Kumar",
      type: "Safety Concern",
      description: "Driver was speeding",
      priority: "High",
      status: "Under Review",
    },
    {
      id: 2,
      reporter: "Priya Sharma",
      type: "Payment Issue",
      description: "Payment not received",
      priority: "Medium",
      status: "Resolved",
    },
    {
      id: 3,
      reporter: "Anita Reddy",
      type: "User Behavior",
      description: "Rider was rude",
      priority: "Low",
      status: "Pending",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">CarpoViz Platform Management</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Rides</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeRides}</p>
                </div>
                <Car className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Rides</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedRides.toLocaleString()}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reported Issues</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.reportedIssues}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CO2 Saved</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.co2Saved}kg</p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rides" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="rides" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Rides</CardTitle>
                <CardDescription>Monitor ongoing and recent rides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Car className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-semibold">
                            {ride.driver} → {ride.rider}
                          </p>
                          <p className="text-sm text-gray-600">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            {ride.from} to {ride.to}
                          </p>
                        </div>
                        <Badge
                          variant={
                            ride.status === "In Progress"
                              ? "default"
                              : ride.status === "Starting Soon"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {ride.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{ride.startTime}</p>
                        <Button size="sm" variant="outline" className="mt-1 bg-transparent">
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reported Issues</CardTitle>
                <CardDescription>Handle user reports and safety concerns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportedIssues.map((issue) => (
                    <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <AlertTriangle
                          className={`h-8 w-8 ${
                            issue.priority === "High"
                              ? "text-red-600"
                              : issue.priority === "Medium"
                                ? "text-yellow-600"
                                : "text-gray-600"
                          }`}
                        />
                        <div>
                          <p className="font-semibold">{issue.type}</p>
                          <p className="text-sm text-gray-600">Reported by: {issue.reporter}</p>
                          <p className="text-sm text-gray-500">{issue.description}</p>
                        </div>
                        <Badge
                          variant={
                            issue.priority === "High"
                              ? "destructive"
                              : issue.priority === "Medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {issue.priority}
                        </Badge>
                        <Badge
                          variant={
                            issue.status === "Resolved"
                              ? "default"
                              : issue.status === "Under Review"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {issue.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ride Statistics</CardTitle>
                  <CardDescription>Daily ride completions and cancellations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <Car className="h-16 w-16 mb-4" />
                    <p>Chart visualization would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Popular Routes</CardTitle>
                <CardDescription>Most frequently used pickup and drop-off locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Dwaraka Nagar → IT Park</span>
                    <Badge>234 rides</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>MVP Colony → Steel Plant</span>
                    <Badge>189 rides</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Beach Road → Airport</span>
                    <Badge>156 rides</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure platform-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Maintenance Mode</span>
                    <Button variant="outline" size="sm">
                      Toggle
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage admin notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>New User Alerts</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Safety Report Alerts</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>System Error Alerts</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

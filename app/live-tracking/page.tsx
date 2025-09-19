"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RealTimeMap } from "@/components/real-time-map"
import { ChatSystem } from "@/components/chat-system"
import {
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  AlertTriangle,
  Star,
  Clock,
  Car,
  Users,
  Shield,
  Leaf,
} from "lucide-react"
import Link from "next/link"

export default function LiveTrackingPage() {
  const [currentRide, setCurrentRide] = useState({
    id: "1",
    status: "in-progress",
    driver: {
      name: "Rajesh Kumar",
      rating: 4.8,
      phone: "+91 9876543210",
      avatar: "/placeholder.svg",
      vehicleType: "Sedan",
      licensePlate: "AP39 AB 1234",
    },
    passenger: {
      name: "You",
      pickup: "Dwaraka Nagar Main Road",
      destination: "GITAM University",
    },
    route: {
      distance: "12.5 km",
      estimatedTime: "25 mins",
      currentLocation: { lat: 17.6878, lng: 83.2195 },
      destination: { lat: 17.72, lng: 83.26 },
    },
    fare: 120,
    greenPoints: 15,
    startTime: new Date(Date.now() - 600000), // 10 minutes ago
    estimatedArrival: new Date(Date.now() + 900000), // 15 minutes from now
  })

  const [showChat, setShowChat] = useState(false)
  const [rideProgress, setRideProgress] = useState(40)

  useEffect(() => {
    // Simulate ride progress
    const interval = setInterval(() => {
      setRideProgress((prev) => Math.min(prev + 1, 100))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSOS = () => {
    alert("SOS Alert sent! Emergency services have been notified.")
  }

  const handleCompleteRide = () => {
    alert("Ride completed! Please rate your experience.")
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">CarpoViz</h1>
          </Link>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800">Ride in Progress</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Ride Status */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Live Ride Tracking</h2>
          <p className="text-muted-foreground">Track your journey in real-time</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map and Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  Live Location Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RealTimeMap
                  userLocation={currentRide.route.currentLocation}
                  destination={currentRide.route.destination}
                  showVehicles={false}
                  trackingRideId={currentRide.id}
                />
              </CardContent>
            </Card>

            {/* Route Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  Route Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{rideProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${rideProgress}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="ml-2 font-medium">{currentRide.route.distance}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ETA:</span>
                      <span className="ml-2 font-medium">{currentRide.route.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ride Details Sidebar */}
          <div className="space-y-6">
            {/* Driver Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-primary" />
                  Your Driver
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={currentRide.driver.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {currentRide.driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{currentRide.driver.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{currentRide.driver.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span>{currentRide.driver.vehicleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License:</span>
                    <span>{currentRide.driver.licensePlate}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowChat(!showChat)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trip Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Pickup
                    </div>
                    <p className="font-medium">{currentRide.passenger.pickup}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Destination
                    </div>
                    <p className="font-medium">{currentRide.passenger.destination}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Fare:</span>
                      <span className="font-bold text-lg">₹{currentRide.fare}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Green Points:</span>
                      <div className="flex items-center gap-1">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="font-medium text-primary">+{currentRide.greenPoints}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety & Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-destructive" />
                  Safety & Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="destructive" className="w-full" onClick={handleSOS}>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency SOS
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Share Trip
                  </Button>
                  {rideProgress >= 95 && (
                    <Button className="w-full" onClick={handleCompleteRide}>
                      <Clock className="w-4 h-4 mr-2" />
                      Complete Ride
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Modal */}
        {showChat && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Chat with {currentRide.driver.name}</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                  ×
                </Button>
              </div>
              <div className="h-[500px]">
                <ChatSystem
                  rideId={currentRide.id}
                  otherUser={{
                    id: `driver-${currentRide.id}`,
                    name: currentRide.driver.name,
                    rating: currentRide.driver.rating,
                    isDriver: true,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

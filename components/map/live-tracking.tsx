"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Phone, MessageCircle, Clock, Car } from "lucide-react"
import LeafletMap from "./leaflet-map"

interface LiveTrackingProps {
  rideId: string
  userType: "driver" | "rider"
}

export default function LiveTracking({ rideId, userType }: LiveTrackingProps) {
  const [rideStatus, setRideStatus] = useState("in-progress")
  const [driverLocation, setDriverLocation] = useState<[number, number]>([17.69, 83.23])
  const [estimatedArrival, setEstimatedArrival] = useState("12 mins")

  // Mock ride data
  const rideData = {
    driver: {
      name: "Priya Sharma",
      phone: "+91 9876543210",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      carModel: "Maruti Swift",
      carNumber: "AP 39 AB 1234",
    },
    rider: {
      name: "Rajesh Kumar",
      phone: "+91 9876543211",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    pickup: { location: "Vizag Railway Station", coordinates: [17.6868, 83.2185] as [number, number] },
    dropoff: { location: "GITAM University", coordinates: [17.72, 83.26] as [number, number] },
    route: [
      [17.6868, 83.2185], // Start
      [17.69, 83.23], // Current driver position
      [17.695, 83.232], // MVP Colony
      [17.71, 83.25], // Rushikonda
      [17.72, 83.26], // End
    ],
  }

  // Mock real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => [prev[0] + (Math.random() - 0.5) * 0.001, prev[1] + (Math.random() - 0.5) * 0.001])

      // Mock ETA updates
      const etas = ["12 mins", "11 mins", "10 mins", "9 mins", "8 mins"]
      setEstimatedArrival(etas[Math.floor(Math.random() * etas.length)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const markers = [
    { position: rideData.pickup.coordinates, popup: rideData.pickup.location, type: "pickup" as const },
    { position: rideData.dropoff.coordinates, popup: rideData.dropoff.location, type: "dropoff" as const },
    { position: driverLocation, popup: "Driver Location", type: "driver" as const },
  ]

  const handleSOS = () => {
    alert("SOS Alert sent! Emergency contacts and local authorities have been notified.")
  }

  return (
    <div className="space-y-6">
      {/* Ride Status */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Live Tracking
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              In Progress
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={userType === "rider" ? rideData.driver.avatar : rideData.rider.avatar}
                  alt={userType === "rider" ? rideData.driver.name : rideData.rider.name}
                />
                <AvatarFallback>
                  {(userType === "rider" ? rideData.driver.name : rideData.rider.name)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{userType === "rider" ? rideData.driver.name : rideData.rider.name}</div>
                {userType === "rider" && (
                  <div className="text-sm text-muted-foreground">
                    {rideData.driver.carModel} • {rideData.driver.carNumber}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <Clock className="w-3 h-3" />
                ETA: {estimatedArrival}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Map */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <LeafletMap
            center={driverLocation}
            zoom={14}
            markers={markers}
            route={rideData.route}
            showRoute={true}
            height="400px"
            trackingMode={true}
            showCurrentLocation={true}
          />
        </CardContent>
      </Card>

      {/* Trip Details */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <div>
                <div className="font-medium">{rideData.pickup.location}</div>
                <div className="text-sm text-muted-foreground">Pickup location</div>
              </div>
            </div>
            <div className="ml-1.5 border-l-2 border-dashed border-muted h-4"></div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <div>
                <div className="font-medium">{rideData.dropoff.location}</div>
                <div className="text-sm text-muted-foreground">Drop-off location</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency SOS */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            Emergency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600 mb-4">
            In case of emergency, press the SOS button to alert your emergency contacts and local authorities.
          </p>
          <Button onClick={handleSOS} className="w-full bg-red-600 hover:bg-red-700 text-white">
            <AlertTriangle className="w-4 h-4 mr-2" />
            SOS - Emergency Alert
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

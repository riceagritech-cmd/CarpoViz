"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, MessageCircle, AlertTriangle, Star, Car, Users } from "lucide-react"

interface Vehicle {
  id: string
  driverName: string
  rating: number
  vehicleType: string
  licensePlate: string
  lat: number
  lng: number
  heading: number
  speed: number
  availableSeats: number
  pricePerKm: number
  route: string
  eta: string
  isOnline: boolean
}

interface RealTimeMapProps {
  userLocation?: { lat: number; lng: number }
  destination?: { lat: number; lng: number }
  showVehicles?: boolean
  trackingRideId?: string
}

export function RealTimeMap({ userLocation, destination, showVehicles = true, trackingRideId }: RealTimeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [userPosition, setUserPosition] = useState(userLocation || { lat: 17.6868, lng: 83.2185 })
  const [sosActive, setSosActive] = useState(false)

  // Mock real-time vehicle data
  useEffect(() => {
    const mockVehicles: Vehicle[] = [
      {
        id: "1",
        driverName: "Rajesh Kumar",
        rating: 4.8,
        vehicleType: "Sedan",
        licensePlate: "AP39 AB 1234",
        lat: 17.6878,
        lng: 83.2195,
        heading: 45,
        speed: 35,
        availableSeats: 3,
        pricePerKm: 8,
        route: "Dwaraka Nagar → MVP Colony",
        eta: "5 mins",
        isOnline: true,
      },
      {
        id: "2",
        driverName: "Priya Sharma",
        rating: 4.9,
        vehicleType: "Hatchback",
        licensePlate: "AP39 CD 5678",
        lat: 17.6858,
        lng: 83.2175,
        heading: 120,
        speed: 28,
        availableSeats: 2,
        pricePerKm: 6,
        route: "Beach Road → IT Hub",
        eta: "8 mins",
        isOnline: true,
      },
      {
        id: "3",
        driverName: "Anil Reddy",
        rating: 4.7,
        vehicleType: "SUV",
        licensePlate: "AP39 EF 9012",
        lat: 17.6888,
        lng: 83.2205,
        heading: 270,
        speed: 42,
        availableSeats: 5,
        pricePerKm: 12,
        route: "Gajuwaka → Rushikonda",
        eta: "3 mins",
        isOnline: true,
      },
    ]

    setVehicles(mockVehicles)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((vehicle) => ({
          ...vehicle,
          lat: vehicle.lat + (Math.random() - 0.5) * 0.001,
          lng: vehicle.lng + (Math.random() - 0.5) * 0.001,
          heading: (vehicle.heading + Math.random() * 10 - 5) % 360,
          speed: Math.max(0, vehicle.speed + Math.random() * 10 - 5),
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleSOS = () => {
    setSosActive(true)
    // In real app, this would trigger emergency services
    console.log("SOS activated - Emergency services contacted")
    setTimeout(() => setSosActive(false), 5000)
  }

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType.toLowerCase()) {
      case "sedan":
        return "🚗"
      case "hatchback":
        return "🚙"
      case "suv":
        return "🚐"
      default:
        return "🚗"
    }
  }

  return (
    <div className="relative w-full h-[600px] bg-card rounded-lg overflow-hidden border">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23e5e7eb fillOpacity=0.3%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        {/* User Location */}
        <div
          className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg z-10 transform -translate-x-2 -translate-y-2"
          style={{
            left: `${((userPosition.lng - 83.2) / 0.05) * 100}%`,
            top: `${((17.7 - userPosition.lat) / 0.05) * 100}%`,
          }}
        >
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
        </div>

        {/* Destination */}
        {destination && (
          <div
            className="absolute w-6 h-6 z-10 transform -translate-x-3 -translate-y-6"
            style={{
              left: `${((destination.lng - 83.2) / 0.05) * 100}%`,
              top: `${((17.7 - destination.lat) / 0.05) * 100}%`,
            }}
          >
            <MapPin className="w-6 h-6 text-destructive fill-destructive" />
          </div>
        )}

        {/* Vehicles */}
        {showVehicles &&
          vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="absolute z-20 cursor-pointer transform -translate-x-4 -translate-y-4"
              style={{
                left: `${((vehicle.lng - 83.2) / 0.05) * 100}%`,
                top: `${((17.7 - vehicle.lat) / 0.05) * 100}%`,
                transform: `translate(-50%, -50%) rotate(${vehicle.heading}deg)`,
              }}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className="relative">
                <div className="text-2xl">{getVehicleIcon(vehicle.vehicleType)}</div>
                {vehicle.isOnline && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
            </div>
          ))}

        {/* Route Line (mock) */}
        {destination && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
            <line
              x1={`${((userPosition.lng - 83.2) / 0.05) * 100}%`}
              y1={`${((17.7 - userPosition.lat) / 0.05) * 100}%`}
              x2={`${((destination.lng - 83.2) / 0.05) * 100}%`}
              y2={`${((17.7 - destination.lat) / 0.05) * 100}%`}
              stroke="#4CAF50"
              strokeWidth="3"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
        )}
      </div>

      {/* SOS Button */}
      <Button
        onClick={handleSOS}
        className={`absolute top-4 right-4 z-30 ${sosActive ? "bg-destructive animate-pulse" : "bg-destructive hover:bg-destructive/90"}`}
        size="lg"
      >
        <AlertTriangle className="w-5 h-5 mr-2" />
        {sosActive ? "SOS ACTIVE" : "SOS"}
      </Button>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-2">
        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
          <Navigation className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
          +
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
          -
        </Button>
      </div>

      {/* Vehicle Info Panel */}
      {selectedVehicle && (
        <Card className="absolute bottom-4 left-4 z-30 w-80 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{selectedVehicle.driverName}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedVehicle(null)} className="h-6 w-6 p-0">
                ×
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm ml-1">{selectedVehicle.rating}</span>
              </div>
              <Badge variant="secondary">{selectedVehicle.vehicleType}</Badge>
              <Badge variant="outline">{selectedVehicle.licensePlate}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Available Seats:</span>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {selectedVehicle.availableSeats}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">₹{selectedVehicle.pricePerKm}/km</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">ETA:</span>
                <span className="font-medium text-primary">{selectedVehicle.eta}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Route:</span>
                <p className="font-medium">{selectedVehicle.route}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Car className="w-4 h-4 mr-1" />
                  Book Now
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Stats */}
      <div className="absolute top-4 left-4 z-30 flex gap-2">
        <Badge className="bg-white/90 text-foreground border">
          {vehicles.filter((v) => v.isOnline).length} vehicles nearby
        </Badge>
        <Badge className="bg-primary/90 text-primary-foreground">Live Tracking</Badge>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  MapPin,
  Users,
  Star,
  Car,
  MessageCircle,
  CalendarIcon,
  Search,
  Filter,
  Leaf,
  Phone,
  Map,
  Brain,
  Zap,
  Clock,
  Shield,
} from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { RealTimeMap } from "@/components/real-time-map"
import { AIRideMatcher } from "@/components/ai-ride-matcher"
import { ChatSystem } from "@/components/chat-system"

export default function FindRidePage() {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: new Date(),
    passengers: "1",
    time: "",
  })
  const [showResults, setShowResults] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showAIMatcher, setShowAIMatcher] = useState(false)
  const [selectedRideForChat, setSelectedRideForChat] = useState<number | null>(null)

  // Mock ride data
  const availableRides = [
    {
      id: 1,
      driver: {
        name: "Priya Sharma",
        rating: 4.8,
        reviews: 45,
        avatar: "/placeholder.svg?height=40&width=40",
        phone: "+91 9876543210",
        verified: true,
      },
      from: "Vizag Railway Station",
      to: "GITAM University",
      fromCoords: [17.6868, 83.2185] as [number, number],
      toCoords: [17.72, 83.26] as [number, number],
      departureTime: "09:00 AM",
      arrivalTime: "09:45 AM",
      date: "Today",
      availableSeats: 3,
      pricePerSeat: 80,
      car: "Maruti Swift",
      route: ["Railway Station", "MVP Colony", "Rushikonda", "GITAM"],
      greenPoints: 15,
      distance: "12 km",
      isLive: true,
      currentLocation: [17.6878, 83.2195] as [number, number],
      eta: "5 mins",
      preferences: ["Non-smoking", "Music OK", "AC"],
    },
    {
      id: 2,
      driver: {
        name: "Rajesh Kumar",
        rating: 4.9,
        reviews: 67,
        avatar: "/placeholder.svg?height=40&width=40",
        phone: "+91 9876543211",
        verified: true,
      },
      from: "Vizag Railway Station",
      to: "GITAM University",
      fromCoords: [17.6868, 83.2185] as [number, number],
      toCoords: [17.72, 83.26] as [number, number],
      departureTime: "08:30 AM",
      arrivalTime: "09:20 AM",
      date: "Today",
      availableSeats: 2,
      pricePerSeat: 90,
      car: "Honda City",
      route: ["Railway Station", "Beach Road", "Rushikonda", "GITAM"],
      greenPoints: 18,
      distance: "14 km",
      isLive: true,
      currentLocation: [17.6858, 83.2175] as [number, number],
      eta: "8 mins",
      preferences: ["Non-smoking", "Quiet ride"],
    },
    {
      id: 3,
      driver: {
        name: "Anitha Reddy",
        rating: 4.7,
        reviews: 32,
        avatar: "/placeholder.svg?height=40&width=40",
        phone: "+91 9876543212",
        verified: true,
      },
      from: "MVP Colony",
      to: "IT Park",
      fromCoords: [17.695, 83.232] as [number, number],
      toCoords: [17.7, 83.24] as [number, number],
      departureTime: "10:00 AM",
      arrivalTime: "10:30 AM",
      date: "Today",
      availableSeats: 1,
      pricePerSeat: 60,
      car: "Hyundai i20",
      route: ["MVP Colony", "Siripuram", "IT Park"],
      greenPoints: 12,
      distance: "8 km",
      isLive: false,
      currentLocation: [17.695, 83.232] as [number, number],
      eta: "Available at 10 AM",
      preferences: ["Family-friendly", "Pet-friendly"],
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
    if (searchData.from && searchData.to) {
      setShowAIMatcher(true)
    }
  }

  const handleBookRide = (rideId: number) => {
    // Mock booking
    alert("Ride booked successfully! You'll receive confirmation details shortly.")
    // Redirect to tracking page
    window.location.href = `/rides/track/${rideId}`
  }

  const handleInstantBook = (rideId: number) => {
    const ride = availableRides.find((r) => r.id === rideId)
    if (ride?.isLive) {
      alert(`Instant booking confirmed! ${ride.driver.name} will pick you up in ${ride.eta}.`)
      window.location.href = `/rides/track/${rideId}`
    }
  }

  // Create markers for map view
  const mapMarkers = availableRides.flatMap((ride) => [
    { position: ride.fromCoords, popup: ride.from, type: "pickup" as const },
    { position: ride.toCoords, popup: ride.to, type: "dropoff" as const },
  ])

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
            <Button variant="outline" size="sm" asChild>
              <Link href="/rides/offer">Offer Ride</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Find a Ride</h2>
          <p className="text-muted-foreground">AI-powered ride matching in Visakhapatnam</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Smart Ride Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="from"
                      placeholder="Pickup location"
                      value={searchData.from}
                      onChange={(e) => setSearchData((prev) => ({ ...prev, from: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="to"
                      placeholder="Drop location"
                      value={searchData.to}
                      onChange={(e) => setSearchData((prev) => ({ ...prev, to: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(searchData.date, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={searchData.date}
                        onSelect={(date) => date && setSearchData((prev) => ({ ...prev, date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Departure Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={searchData.time}
                    onChange={(e) => setSearchData((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select
                    value={searchData.passengers}
                    onValueChange={(value) => setSearchData((prev) => ({ ...prev, passengers: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Smart Search
                </Button>
                <Button type="button" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowAIMatcher(!showAIMatcher)}>
                  <Zap className="w-4 h-4 mr-2" />
                  Instant Match
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {showAIMatcher && searchData.from && searchData.to && (
          <div className="mb-8">
            <AIRideMatcher
              pickup={searchData.from}
              destination={searchData.to}
              departureTime={searchData.time}
              passengers={Number.parseInt(searchData.passengers)}
            />
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Available Rides</h3>
                <p className="text-muted-foreground">
                  {availableRides.length} rides found • {availableRides.filter((r) => r.isLive).length} live now
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowMap(!showMap)}>
                  <Map className="w-4 h-4 mr-2" />
                  {showMap ? "Hide Map" : "Live Map"}
                </Button>
              </div>
            </div>

            {showMap && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Live Vehicle Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <RealTimeMap
                    userLocation={{ lat: 17.6868, lng: 83.2185 }}
                    destination={searchData.to ? { lat: 17.72, lng: 83.26 } : undefined}
                    showVehicles={true}
                  />
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {availableRides.map((ride) => (
                <Card key={ride.id} className="border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} alt={ride.driver.name} />
                            <AvatarFallback>
                              {ride.driver.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {ride.isLive && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{ride.driver.name}</h4>
                            {ride.driver.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {ride.isLive && <Badge className="text-xs bg-green-100 text-green-800">Live</Badge>}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            {ride.driver.rating} ({ride.driver.reviews} reviews)
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₹{ride.pricePerSeat}</div>
                        <div className="text-sm text-muted-foreground">per seat</div>
                        {ride.isLive && (
                          <div className="text-xs text-green-600 font-medium mt-1">
                            <Clock className="w-3 h-3 inline mr-1" />
                            ETA: {ride.eta}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <div>
                            <div className="font-medium">{ride.from}</div>
                            <div className="text-sm text-muted-foreground">{ride.departureTime}</div>
                          </div>
                        </div>
                        <div className="ml-1.5 border-l-2 border-dashed border-muted h-4"></div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-secondary rounded-full"></div>
                          <div>
                            <div className="font-medium">{ride.to}</div>
                            <div className="text-sm text-muted-foreground">{ride.arrivalTime}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Car className="w-4 h-4 text-muted-foreground" />
                          <span>{ride.car}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{ride.availableSeats} seats available</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Leaf className="w-4 h-4 text-primary" />
                          <span>+{ride.greenPoints} Green Points</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{ride.distance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Driver Preferences</div>
                      <div className="flex flex-wrap gap-1">
                        {ride.preferences.map((pref, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex gap-3">
                      {ride.isLive ? (
                        <Button className="flex-1" onClick={() => handleInstantBook(ride.id)}>
                          <Zap className="w-4 h-4 mr-2" />
                          Instant Book
                        </Button>
                      ) : (
                        <Button className="flex-1" onClick={() => handleBookRide(ride.id)}>
                          Book Now
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedRideForChat(ride.id)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                      <Button variant="outline" size="icon">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline">Load More Rides</Button>
            </div>
          </div>
        )}

        {selectedRideForChat && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Chat with Driver</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRideForChat(null)}>
                  ×
                </Button>
              </div>
              <div className="h-[500px]">
                <ChatSystem
                  rideId={selectedRideForChat.toString()}
                  otherUser={{
                    id: `driver-${selectedRideForChat}`,
                    name: availableRides.find((r) => r.id === selectedRideForChat)?.driver.name || "Driver",
                    rating: availableRides.find((r) => r.id === selectedRideForChat)?.driver.rating || 4.5,
                    isDriver: true,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* No Results State */}
        {showResults && availableRides.length === 0 && (
          <Card className="text-center py-12 border-border/50">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No rides found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or check back later for new rides.
              </p>
              <Button asChild>
                <Link href="/rides/offer">Offer a Ride Instead</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

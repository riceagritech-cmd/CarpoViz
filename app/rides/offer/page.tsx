"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Car, CalendarIcon, Plus, Leaf, Route, Repeat, Map } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import RoutePlanner from "@/components/map/route-planner"

export default function OfferRidePage() {
  const [rideData, setRideData] = useState({
    from: "",
    to: "",
    date: new Date(),
    departureTime: "",
    returnTime: "",
    availableSeats: "1",
    pricePerSeat: "",
    carModel: "",
    carNumber: "",
    route: "",
    notes: "",
    isRecurring: false,
    recurringDays: [] as string[],
    allowSmoking: false,
    allowPets: false,
    musicPreference: "any",
  })

  const [waypoints, setWaypoints] = useState<string[]>([])
  const [newWaypoint, setNewWaypoint] = useState("")
  const [showRoutePlanner, setShowRoutePlanner] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setRideData((prev) => ({ ...prev, [field]: value }))
  }

  const addWaypoint = () => {
    if (newWaypoint.trim()) {
      setWaypoints((prev) => [...prev, newWaypoint.trim()])
      setNewWaypoint("")
    }
  }

  const removeWaypoint = (index: number) => {
    setWaypoints((prev) => prev.filter((_, i) => i !== index))
  }

  const handleRecurringDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setRideData((prev) => ({
        ...prev,
        recurringDays: [...prev.recurringDays, day],
      }))
    } else {
      setRideData((prev) => ({
        ...prev,
        recurringDays: prev.recurringDays.filter((d) => d !== day),
      }))
    }
  }

  const handleRouteCalculated = (route: any) => {
    // Auto-fill pricing based on distance
    if (route.distance) {
      const distanceKm = Number.parseFloat(route.distance.replace(" km", ""))
      const suggestedPrice = Math.round(distanceKm * 7) // ₹7 per km
      setRideData((prev) => ({ ...prev, pricePerSeat: suggestedPrice.toString() }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock ride posting
    alert("Ride posted successfully! You'll be notified when riders book your ride.")
    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

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
              <Link href="/rides/find">Find Ride</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Offer a Ride</h2>
          <p className="text-muted-foreground">Share your journey and earn green points</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Route Information */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="w-5 h-5" />
                    Route Details
                  </CardTitle>
                  <CardDescription>Where are you going?</CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={() => setShowRoutePlanner(!showRoutePlanner)}>
                  <Map className="w-4 h-4 mr-2" />
                  {showRoutePlanner ? "Hide" : "Show"} Route Planner
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="from"
                      placeholder="Starting location"
                      value={rideData.from}
                      onChange={(e) => handleInputChange("from", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="to"
                      placeholder="Destination"
                      value={rideData.to}
                      onChange={(e) => handleInputChange("to", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Waypoints */}
              <div className="space-y-2">
                <Label>Waypoints (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a stop along the way"
                    value={newWaypoint}
                    onChange={(e) => setNewWaypoint(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addWaypoint())}
                  />
                  <Button type="button" onClick={addWaypoint} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {waypoints.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {waypoints.map((waypoint, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeWaypoint(index)}
                      >
                        {waypoint} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Route Planner */}
          {showRoutePlanner && (
            <RoutePlanner
              initialFrom={rideData.from}
              initialTo={rideData.to}
              onRouteCalculated={handleRouteCalculated}
            />
          )}

          {/* Date & Time */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Schedule
              </CardTitle>
              <CardDescription>When are you traveling?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(rideData.date, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={rideData.date}
                        onSelect={(date) => date && handleInputChange("date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departureTime">Departure Time *</Label>
                  <Input
                    id="departureTime"
                    type="time"
                    value={rideData.departureTime}
                    onChange={(e) => handleInputChange("departureTime", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnTime">Return Time (Optional)</Label>
                  <Input
                    id="returnTime"
                    type="time"
                    value={rideData.returnTime}
                    onChange={(e) => handleInputChange("returnTime", e.target.value)}
                  />
                </div>
              </div>

              {/* Recurring Ride */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recurring"
                    checked={rideData.isRecurring}
                    onCheckedChange={(checked) => handleInputChange("isRecurring", checked)}
                  />
                  <Label htmlFor="recurring" className="flex items-center gap-2">
                    <Repeat className="w-4 h-4" />
                    This is a recurring ride
                  </Label>
                </div>

                {rideData.isRecurring && (
                  <div className="space-y-2">
                    <Label>Repeat on</Label>
                    <div className="flex flex-wrap gap-2">
                      {weekDays.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={rideData.recurringDays.includes(day)}
                            onCheckedChange={(checked) => handleRecurringDayChange(day, checked as boolean)}
                          />
                          <Label htmlFor={day} className="text-sm">
                            {day.slice(0, 3)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle & Capacity */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Vehicle Details
              </CardTitle>
              <CardDescription>Tell riders about your vehicle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carModel">Car Model *</Label>
                  <Input
                    id="carModel"
                    placeholder="e.g., Maruti Swift"
                    value={rideData.carModel}
                    onChange={(e) => handleInputChange("carModel", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carNumber">Car Number *</Label>
                  <Input
                    id="carNumber"
                    placeholder="e.g., AP 39 AB 1234"
                    value={rideData.carNumber}
                    onChange={(e) => handleInputChange("carNumber", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableSeats">Available Seats *</Label>
                  <Select
                    value={rideData.availableSeats}
                    onValueChange={(value) => handleInputChange("availableSeats", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Seat</SelectItem>
                      <SelectItem value="2">2 Seats</SelectItem>
                      <SelectItem value="3">3 Seats</SelectItem>
                      <SelectItem value="4">4 Seats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Pricing
              </CardTitle>
              <CardDescription>Set your price per seat</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerSeat">Price per Seat (₹) *</Label>
                <Input
                  id="pricePerSeat"
                  type="number"
                  placeholder="e.g., 80"
                  value={rideData.pricePerSeat}
                  onChange={(e) => handleInputChange("pricePerSeat", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Recommended: ₹6-8 per km. This helps cover fuel and maintenance costs.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Ride Preferences</CardTitle>
              <CardDescription>Set your ride preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smoking"
                    checked={rideData.allowSmoking}
                    onCheckedChange={(checked) => handleInputChange("allowSmoking", checked)}
                  />
                  <Label htmlFor="smoking">Allow smoking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pets"
                    checked={rideData.allowPets}
                    onCheckedChange={(checked) => handleInputChange("allowPets", checked)}
                  />
                  <Label htmlFor="pets">Allow pets</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="music">Music Preference</Label>
                  <Select
                    value={rideData.musicPreference}
                    onValueChange={(value) => handleInputChange("musicPreference", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any music is fine</SelectItem>
                      <SelectItem value="no-music">Prefer no music</SelectItem>
                      <SelectItem value="soft">Soft music only</SelectItem>
                      <SelectItem value="discuss">Let's discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Any special instructions or notes for riders</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., I'll be leaving from the main gate, please be on time..."
                value={rideData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Leaf className="w-4 h-4 mr-2" />
              Post Ride
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

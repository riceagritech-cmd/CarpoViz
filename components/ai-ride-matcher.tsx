"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, MapPin, Clock, Zap, Star, Leaf } from "lucide-react"

interface RideMatch {
  id: string
  driverName: string
  rating: number
  matchScore: number
  carbonSaved: number
  pricePerKm: number
  departureTime: string
  availableSeats: number
  route: string
  vehicleType: string
  preferences: string[]
  estimatedTime: string
  distance: string
}

interface AIRideMatcherProps {
  pickup: string
  destination: string
  departureTime: string
  passengers: number
}

export function AIRideMatcher({ pickup, destination, departureTime, passengers }: AIRideMatcherProps) {
  const [matches, setMatches] = useState<RideMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [aiAnalysis, setAiAnalysis] = useState("")

  useEffect(() => {
    // Simulate AI matching process
    setLoading(true)
    setAiAnalysis("Analyzing your preferences and route...")

    setTimeout(() => {
      setAiAnalysis("Finding optimal matches based on compatibility...")

      setTimeout(() => {
        setAiAnalysis("Calculating carbon footprint and cost savings...")

        setTimeout(() => {
          const mockMatches: RideMatch[] = [
            {
              id: "1",
              driverName: "Rajesh Kumar",
              rating: 4.8,
              matchScore: 95,
              carbonSaved: 2.4,
              pricePerKm: 8,
              departureTime: "09:15 AM",
              availableSeats: 3,
              route: "Dwaraka Nagar → MVP Colony → IT Hub",
              vehicleType: "Sedan",
              preferences: ["Non-smoking", "Music OK", "Pet-friendly"],
              estimatedTime: "25 mins",
              distance: "12.5 km",
            },
            {
              id: "2",
              driverName: "Priya Sharma",
              rating: 4.9,
              matchScore: 88,
              carbonSaved: 1.8,
              pricePerKm: 6,
              departureTime: "09:30 AM",
              availableSeats: 2,
              route: "Beach Road → Siripuram → IT Hub",
              vehicleType: "Hatchback",
              preferences: ["Non-smoking", "Quiet ride"],
              estimatedTime: "30 mins",
              distance: "15.2 km",
            },
            {
              id: "3",
              driverName: "Anil Reddy",
              rating: 4.7,
              matchScore: 82,
              carbonSaved: 3.1,
              pricePerKm: 12,
              departureTime: "09:00 AM",
              availableSeats: 5,
              route: "Gajuwaka → Rushikonda → IT Hub",
              vehicleType: "SUV",
              preferences: ["Family-friendly", "Music OK", "AC"],
              estimatedTime: "35 mins",
              distance: "18.7 km",
            },
          ]

          setMatches(mockMatches)
          setAiAnalysis("Found 3 perfect matches for your journey!")
          setLoading(false)
        }, 1000)
      }, 1000)
    }, 1000)
  }, [pickup, destination, departureTime, passengers])

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-orange-600"
  }

  const getMatchBadge = (score: number) => {
    if (score >= 90) return "Excellent Match"
    if (score >= 80) return "Good Match"
    return "Fair Match"
  }

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI-Powered Ride Matching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">{aiAnalysis}</p>
              {loading && <Progress value={loading ? 75 : 100} className="h-2" />}
            </div>
            {loading && (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ride Matches */}
      {!loading && matches.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Best Matches for You</h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Zap className="w-3 h-3 mr-1" />
              AI Optimized
            </Badge>
          </div>

          {matches.map((match, index) => (
            <Card key={match.id} className={`${index === 0 ? "border-primary/50 shadow-lg" : "border-border"}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {match.driverName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{match.driverName}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{match.rating}</span>
                        </div>
                        <Badge variant="outline">{match.vehicleType}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getMatchColor(match.matchScore)}`}>{match.matchScore}%</div>
                    <Badge
                      variant={match.matchScore >= 90 ? "default" : "secondary"}
                      className={match.matchScore >= 90 ? "bg-green-100 text-green-800" : ""}
                    >
                      {getMatchBadge(match.matchScore)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Route and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Route:</span>
                    </div>
                    <p className="text-sm font-medium">{match.route}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Departure:</span>
                    </div>
                    <p className="text-sm font-medium">{match.departureTime}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 py-3 border-t border-b">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">₹{match.pricePerKm}</div>
                    <div className="text-xs text-muted-foreground">per km</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary">{match.availableSeats}</div>
                    <div className="text-xs text-muted-foreground">seats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{match.carbonSaved}kg</div>
                    <div className="text-xs text-muted-foreground">CO₂ saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{match.estimatedTime}</div>
                    <div className="text-xs text-muted-foreground">duration</div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Driver Preferences:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.preferences.map((pref, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {pref}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    Book Ride - ₹{Math.round(Number.parseFloat(match.distance) * match.pricePerKm)}
                  </Button>
                  <Button variant="outline">Message</Button>
                  <Button variant="outline">
                    <Leaf className="w-4 h-4" />
                  </Button>
                </div>

                {index === 0 && (
                  <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <Zap className="w-4 h-4" />
                      AI Recommendation: Best overall match based on your preferences, route efficiency, and
                      environmental impact!
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

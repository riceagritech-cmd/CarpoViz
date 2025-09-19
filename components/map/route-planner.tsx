"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, Route, Fuel } from "lucide-react"
import LeafletMap from "./leaflet-map"

interface RoutePlannerProps {
  onRouteCalculated?: (route: any) => void
  initialFrom?: string
  initialTo?: string
}

export default function RoutePlanner({ onRouteCalculated, initialFrom = "", initialTo = "" }: RoutePlannerProps) {
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [route, setRoute] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Mock route calculation using OpenRoute Service
  const calculateRoute = async () => {
    if (!from || !to) return

    setIsCalculating(true)

    // Mock API call to OpenRoute Service
    setTimeout(() => {
      const mockRoute = {
        distance: "12.5 km",
        duration: "25 mins",
        fuelCost: "₹85",
        coordinates: [
          [17.6868, 83.2185], // Vizag Railway Station
          [17.695, 83.232], // MVP Colony
          [17.71, 83.25], // Rushikonda
          [17.72, 83.26], // GITAM University
        ],
        instructions: [
          "Head northeast on Station Road",
          "Turn right onto Beach Road",
          "Continue on Rushikonda Road",
          "Turn left to reach GITAM University",
        ],
      }

      setRoute(mockRoute)
      setIsCalculating(false)
      onRouteCalculated?.(mockRoute)
    }, 2000)
  }

  const markers = route
    ? [
        { position: route.coordinates[0] as [number, number], popup: from, type: "pickup" as const },
        {
          position: route.coordinates[route.coordinates.length - 1] as [number, number],
          popup: to,
          type: "dropoff" as const,
        },
        ...route.coordinates.slice(1, -1).map((coord: [number, number], index: number) => ({
          position: coord,
          popup: `Waypoint ${index + 1}`,
          type: "waypoint" as const,
        })),
      ]
    : []

  return (
    <div className="space-y-6">
      {/* Route Input */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="w-5 h-5" />
            Route Planner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Starting location"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Destination" value={to} onChange={(e) => setTo(e.target.value)} className="pl-10" />
              </div>
            </div>
          </div>

          <Button onClick={calculateRoute} disabled={!from || !to || isCalculating} className="w-full">
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Calculating Route...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Calculate Route
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Map */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <LeafletMap
            center={[17.6868, 83.2185]}
            zoom={12}
            markers={markers}
            route={route?.coordinates || []}
            showRoute={!!route}
            height="400px"
          />
        </CardContent>
      </Card>

      {/* Route Details */}
      {route && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Route Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Distance</span>
                </div>
                <div className="text-lg font-semibold">{route.distance}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Duration</span>
                </div>
                <div className="text-lg font-semibold">{route.duration}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Fuel className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Fuel Cost</span>
                </div>
                <div className="text-lg font-semibold text-primary">{route.fuelCost}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Turn-by-turn directions</h4>
              <div className="space-y-2">
                {route.instructions.map((instruction: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {index + 1}
                    </Badge>
                    <span>{instruction}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

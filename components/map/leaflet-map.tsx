"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Zap } from "lucide-react"

// Mock Leaflet implementation since we can't install packages
interface MapProps {
  center?: [number, number]
  zoom?: number
  markers?: Array<{
    position: [number, number]
    popup?: string
    type?: "pickup" | "dropoff" | "waypoint" | "driver" | "rider"
  }>
  route?: Array<[number, number]>
  showRoute?: boolean
  height?: string
  onLocationSelect?: (lat: number, lng: number) => void
  showCurrentLocation?: boolean
  trackingMode?: boolean
}

export default function LeafletMap({
  center = [17.6868, 83.2185], // Visakhapatnam coordinates
  zoom = 13,
  markers = [],
  route = [],
  showRoute = false,
  height = "400px",
  onLocationSelect,
  showCurrentLocation = false,
  trackingMode = false,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock map initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Mock getting current location
    if (showCurrentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.log("Location access denied")
          // Use Vizag as fallback
          setCurrentLocation(center)
        },
      )
    }

    return () => clearTimeout(timer)
  }, [center, showCurrentLocation])

  const handleMapClick = (e: React.MouseEvent) => {
    if (onLocationSelect) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Mock coordinate calculation
      const lat = center[0] + (0.5 - y / rect.height) * 0.1
      const lng = center[1] + (x / rect.width - 0.5) * 0.1

      onLocationSelect(lat, lng)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-muted rounded-lg flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-border/50 relative overflow-hidden cursor-pointer"
        style={{ height }}
        onClick={handleMapClick}
      >
        {/* Mock map background with Vizag-like layout */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-green-100/30">
          {/* Mock roads */}
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300"></div>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300"></div>
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-1 bg-gray-300"></div>

          {/* Mock coastline */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-blue-200/50"></div>
        </div>

        {/* Route visualization */}
        {showRoute && route.length > 1 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={`M ${route.map((_, i) => `${(i / (route.length - 1)) * 100}% ${50 + Math.sin(i) * 10}%`).join(" L ")}`}
              stroke="#4CAF50"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
        )}

        {/* Markers */}
        {markers.map((marker, index) => {
          const x = (marker.position[1] - center[1]) * 1000 + 50
          const y = (center[0] - marker.position[0]) * 1000 + 50

          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: `${Math.max(5, Math.min(95, x))}%`,
                top: `${Math.max(5, Math.min(95, y))}%`,
              }}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  marker.type === "pickup"
                    ? "bg-primary"
                    : marker.type === "dropoff"
                      ? "bg-secondary"
                      : marker.type === "driver"
                        ? "bg-accent"
                        : marker.type === "rider"
                          ? "bg-purple-500"
                          : "bg-gray-500"
                }`}
              >
                <MapPin className="w-3 h-3 text-white" />
              </div>
              {marker.popup && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap border">
                  {marker.popup}
                </div>
              )}
            </div>
          )
        })}

        {/* Current location */}
        {currentLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute inset-0 w-4 h-4 bg-blue-500/30 rounded-full animate-ping"></div>
          </div>
        )}

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {showCurrentLocation && (
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
              <Navigation className="w-4 h-4" />
            </Button>
          )}
          <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
            +
          </Button>
          <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
            -
          </Button>
        </div>

        {/* Tracking mode indicator */}
        {trackingMode && (
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <Zap className="w-3 h-3 mr-1" />
              Live Tracking
            </Badge>
          </div>
        )}
      </div>

      {/* Map legend */}
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        {markers.some((m) => m.type === "pickup") && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Pickup</span>
          </div>
        )}
        {markers.some((m) => m.type === "dropoff") && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span>Drop-off</span>
          </div>
        )}
        {markers.some((m) => m.type === "driver") && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Driver</span>
          </div>
        )}
        {showRoute && (
          <div className="flex items-center gap-1">
            <div className="w-4 h-0.5 bg-primary"></div>
            <span>Route</span>
          </div>
        )}
      </div>
    </div>
  )
}

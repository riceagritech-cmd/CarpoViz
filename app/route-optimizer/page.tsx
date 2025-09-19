"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Route, ExternalLink, MapPin, Clock, Fuel } from "lucide-react"
import Link from "next/link"

export default function RouteOptimizerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Route className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Route Optimizer</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered route optimization for efficient carpooling and multi-hop journeys
          </p>
        </div>

        {/* Main Card */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Quantum Path Setup</CardTitle>
            <CardDescription className="text-lg">
              Click the button below to access our advanced route optimization platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <Button
              size="lg"
              className="px-8 py-3"
              asChild
            >
              <Link href="https://quanta-path-setup.vercel.app/" target="_blank">
                <ExternalLink className="h-5 w-5 mr-2" />
                Go to Route Optimizer
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Multi-Stop Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Optimize routes with multiple pickup and drop-off points for maximum efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Real-Time Traffic</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                AI-powered traffic analysis to find the fastest routes at any time of day.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Fuel className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Fuel Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Minimize fuel consumption and carbon footprint with smart route planning.</p>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Why Use Our Route Optimizer?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Save up to 30% on fuel costs with optimized routes
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Reduce travel time by avoiding traffic congestion
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Lower carbon emissions through efficient carpooling
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                AI-powered matching for compatible travel companions
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

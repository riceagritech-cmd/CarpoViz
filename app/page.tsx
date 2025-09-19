import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Leaf, Shield, Star, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">CarpoViz</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#safety" className="text-muted-foreground hover:text-foreground transition-colors">
              Safety
            </a>
            <a href="#rewards" className="text-muted-foreground hover:text-foreground transition-colors">
              Rewards
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-6 bg-accent/20 text-accent-foreground border-accent/30">
            🌱 Eco-Friendly Transportation for Vizag
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-foreground">
            Share Rides. Save Fuel. Support Vizag.
          </h2>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Join Visakhapatnam's eco-friendly carpooling community. Find rides, offer rides, and earn green points while
            reducing traffic and pollution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/dashboard">
                <MapPin className="w-5 h-5 mr-2" />
                Find a Ride
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <a href="/dashboard">
                <Users className="w-5 h-5 mr-2" />
                Offer a Ride
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 text-foreground">How CarpoViz Works</h3>
            <p className="text-muted-foreground text-lg">Simple steps to start your eco-friendly journey</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center border-border/50">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Start finding or offering rides right away. No account needed!</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-border/50">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Find or Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Search for rides or post your available seats with route details</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-border/50">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Track & Travel</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Real-time GPS tracking with SOS button for safe journeys</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-border/50">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Earn Green Points</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Get rewarded for eco-friendly rides and reduce your carbon footprint</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section id="safety" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">Your Safety is Our Priority</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Verified Profiles</h4>
                    <p className="text-muted-foreground">
                      All drivers verified with Aadhar. Phone and email verification for all users.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Rating System</h4>
                    <p className="text-muted-foreground">
                      5-star rating system with comments to build trust in the community.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Live Tracking & SOS</h4>
                    <p className="text-muted-foreground">
                      Real-time GPS tracking with emergency SOS button for instant help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border/50">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-2xl font-bold mb-4">Trusted by 10,000+ Users</h4>
                <p className="text-muted-foreground mb-6">Join Vizag's most trusted carpooling community</p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">4.8/5 average rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Green Rewards */}
      <section id="rewards" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Earn Green Points & Rewards</h3>
            <p className="text-muted-foreground text-lg">Get rewarded for making eco-friendly choices</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Share Rides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Earn 10 points for every shared ride</p>
                <Badge variant="secondary">+10 Points</Badge>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Refer Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Get 50 points for each successful referral</p>
                <Badge variant="secondary">+50 Points</Badge>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>Regular Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Bonus points for frequent carpooling</p>
                <Badge variant="secondary">+5-25 Points</Badge>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Redeem your green points for fuel discounts, shopping coupons, and exclusive rewards!
            </p>
            <Button size="lg" variant="outline">
              Learn More About Rewards
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-4 text-foreground">Ready to Start Your Eco Journey?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of Vizag residents making a difference, one ride at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/dashboard">Get Started Now</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              Download App
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}

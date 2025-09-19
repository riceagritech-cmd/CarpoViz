"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Leaf, Star, Shield, Car, Phone, Mail, Calendar, Edit, Camera, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    bio: "Eco-conscious driver passionate about reducing traffic in Vizag. Love meeting new people and sharing rides!",
    location: "MVP Colony, Visakhapatnam",
    joinDate: "March 2024",
    profilePicture: "/placeholder.svg?height=120&width=120",
    // Driver specific
    aadharNumber: "1234 5678 9012",
    aadharVerified: true,
    drivingLicense: "AP 39 20240001234",
    licenseVerified: true,
    // Vehicle details
    vehicles: [
      {
        id: 1,
        model: "Maruti Swift",
        number: "AP 39 AB 1234",
        year: "2020",
        color: "White",
        verified: true,
      },
    ],
    // Preferences
    allowSmoking: false,
    allowPets: true,
    musicPreference: "soft",
    // Privacy
    showPhone: true,
    showEmail: false,
    showLocation: true,
  })

  // Mock user stats
  const userStats = {
    totalRides: 47,
    ridesOffered: 28,
    ridesTaken: 19,
    rating: 4.8,
    totalReviews: 35,
    greenPoints: 1250,
    co2Saved: 45.2,
    moneyEarned: 3200,
    moneySaved: 1800,
  }

  // Mock recent reviews
  const recentReviews = [
    {
      id: 1,
      reviewer: "Priya Sharma",
      rating: 5,
      comment: "Great driver! Very punctual and friendly. Clean car and smooth ride.",
      date: "2 days ago",
      rideType: "offered",
    },
    {
      id: 2,
      reviewer: "Anitha Reddy",
      rating: 4,
      comment: "Good experience overall. Would ride again!",
      date: "1 week ago",
      rideType: "offered",
    },
    {
      id: 3,
      reviewer: "Suresh Babu",
      rating: 5,
      comment: "Excellent co-passenger. Very respectful and on time.",
      date: "2 weeks ago",
      rideType: "taken",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Mock save
    alert("Profile updated successfully!")
  }

  const handleProfilePictureChange = () => {
    // Mock file upload
    alert("Profile picture updated!")
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
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">My Profile</h2>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={profileData.profilePicture || "/placeholder.svg"} alt={profileData.name} />
                      <AvatarFallback className="text-2xl">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-transparent"
                      onClick={handleProfilePictureChange}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{profileData.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium">{userStats.rating}</span>
                    <span className="text-muted-foreground">({userStats.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Phone</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Email</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  {profileData.aadharVerified && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Aadhar</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  )}
                  {profileData.licenseVerified && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">License</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{userStats.totalRides}</div>
                    <div className="text-xs text-muted-foreground">Total Rides</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{userStats.greenPoints}</div>
                    <div className="text-xs text-muted-foreground">Green Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal" className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Personal Information</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Driver Verification */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Driver Verification</CardTitle>
                    <CardDescription>Required for offering rides</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Aadhar Number</Label>
                        <div className="flex items-center gap-2">
                          <Input value={profileData.aadharNumber} disabled />
                          {profileData.aadharVerified ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Driving License</Label>
                        <div className="flex items-center gap-2">
                          <Input value={profileData.drivingLicense} disabled />
                          {profileData.licenseVerified ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Vehicle Information */}
              <TabsContent value="vehicle" className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>My Vehicles</CardTitle>
                        <CardDescription>Manage your registered vehicles</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Car className="w-4 h-4 mr-2" />
                        Add Vehicle
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profileData.vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="border border-border/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Car className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{vehicle.model}</h4>
                                <p className="text-sm text-muted-foreground">{vehicle.number}</p>
                              </div>
                            </div>
                            {vehicle.verified ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Year:</span> {vehicle.year}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Color:</span> {vehicle.color}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Reviews & Ratings</CardTitle>
                    <CardDescription>What others say about you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Rating Summary */}
                    <div className="flex items-center gap-6 mb-6 p-4 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{userStats.rating}</div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(userStats.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">{userStats.totalReviews} reviews</div>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold">{userStats.ridesOffered}</div>
                          <div className="text-sm text-muted-foreground">As Driver</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold">{userStats.ridesTaken}</div>
                          <div className="text-sm text-muted-foreground">As Rider</div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Recent Reviews</h4>
                      {recentReviews.map((review) => (
                        <div key={review.id} className="border border-border/50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">
                                  {review.reviewer
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{review.reviewer}</div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="text-xs">
                                {review.rideType === "offered" ? "As Driver" : "As Rider"}
                              </Badge>
                              <div className="text-xs text-muted-foreground mt-1">{review.date}</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control what information is visible to other users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-phone">Show phone number</Label>
                        <p className="text-sm text-muted-foreground">Allow other users to see your phone number</p>
                      </div>
                      <Switch
                        id="show-phone"
                        checked={profileData.showPhone}
                        onCheckedChange={(checked) => setProfileData((prev) => ({ ...prev, showPhone: checked }))}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-email">Show email address</Label>
                        <p className="text-sm text-muted-foreground">Allow other users to see your email</p>
                      </div>
                      <Switch
                        id="show-email"
                        checked={profileData.showEmail}
                        onCheckedChange={(checked) => setProfileData((prev) => ({ ...prev, showEmail: checked }))}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-location">Show location</Label>
                        <p className="text-sm text-muted-foreground">Show your general location to other users</p>
                      </div>
                      <Switch
                        id="show-location"
                        checked={profileData.showLocation}
                        onCheckedChange={(checked) => setProfileData((prev) => ({ ...prev, showLocation: checked }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Ride Preferences</CardTitle>
                    <CardDescription>Set your default preferences for rides</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-smoking">Allow smoking</Label>
                        <p className="text-sm text-muted-foreground">Allow smoking in your vehicle</p>
                      </div>
                      <Switch
                        id="allow-smoking"
                        checked={profileData.allowSmoking}
                        onCheckedChange={(checked) => setProfileData((prev) => ({ ...prev, allowSmoking: checked }))}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-pets">Allow pets</Label>
                        <p className="text-sm text-muted-foreground">Allow pets in your vehicle</p>
                      </div>
                      <Switch
                        id="allow-pets"
                        checked={profileData.allowPets}
                        onCheckedChange={(checked) => setProfileData((prev) => ({ ...prev, allowPets: checked }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

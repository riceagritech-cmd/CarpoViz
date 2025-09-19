"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Trophy, Gift, Star, Zap, Target, Award, TreePine } from "lucide-react"

export default function RewardsPage() {
  const [userPoints] = useState(1250)
  const [userLevel] = useState("Eco Warrior")
  const [nextLevelPoints] = useState(1500)

  const achievements = [
    {
      id: 1,
      title: "First Ride",
      description: "Complete your first carpooling ride",
      points: 50,
      unlocked: true,
      icon: Star,
    },
    {
      id: 2,
      title: "Eco Saver",
      description: "Save 10kg CO2 through carpooling",
      points: 100,
      unlocked: true,
      icon: Leaf,
    },
    {
      id: 3,
      title: "Social Rider",
      description: "Complete 10 rides with different people",
      points: 200,
      unlocked: true,
      icon: Trophy,
    },
    {
      id: 4,
      title: "Green Champion",
      description: "Save 50kg CO2 through carpooling",
      points: 300,
      unlocked: false,
      icon: TreePine,
    },
    {
      id: 5,
      title: "Community Builder",
      description: "Refer 5 friends to CarpoViz",
      points: 250,
      unlocked: false,
      icon: Award,
    },
    {
      id: 6,
      title: "Consistency King",
      description: "Complete rides for 30 consecutive days",
      points: 400,
      unlocked: false,
      icon: Target,
    },
  ]

  const rewards = [
    {
      id: 1,
      title: "Free Coffee",
      description: "Get a free coffee at partner cafes",
      points: 100,
      category: "Food & Drink",
    },
    { id: 2, title: "₹50 Ride Credit", description: "Get ₹50 off your next ride", points: 200, category: "Rides" },
    {
      id: 3,
      title: "Movie Ticket",
      description: "Free movie ticket at partner theaters",
      points: 300,
      category: "Entertainment",
    },
    { id: 4, title: "₹100 Ride Credit", description: "Get ₹100 off your next ride", points: 400, category: "Rides" },
    {
      id: 5,
      title: "Eco-Friendly Kit",
      description: "Sustainable products starter kit",
      points: 500,
      category: "Lifestyle",
    },
    {
      id: 6,
      title: "Premium Membership",
      description: "1 month premium features access",
      points: 750,
      category: "Premium",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Priya Sharma", points: 2850, level: "Eco Legend" },
    { rank: 2, name: "Rajesh Kumar", points: 2340, level: "Green Master" },
    { rank: 3, name: "Anita Reddy", points: 1980, level: "Eco Champion" },
    { rank: 4, name: "You", points: 1250, level: "Eco Warrior" },
    { rank: 5, name: "Suresh Babu", points: 1120, level: "Eco Warrior" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Green Rewards</h1>
          <p className="text-gray-600">Earn points for every eco-friendly ride and unlock amazing rewards!</p>
        </div>

        {/* Points Overview */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{userPoints} Green Points</h2>
                <p className="text-green-100">Current Level: {userLevel}</p>
              </div>
              <div className="text-right">
                <Leaf className="h-12 w-12 mb-2" />
                <p className="text-sm text-green-100">{nextLevelPoints - userPoints} points to next level</p>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={(userPoints / nextLevelPoints) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="achievements" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="impact">My Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon
                return (
                  <Card
                    key={achievement.id}
                    className={`${achievement.unlocked ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <IconComponent
                          className={`h-6 w-6 ${achievement.unlocked ? "text-green-600" : "text-gray-400"}`}
                        />
                        <Badge variant={achievement.unlocked ? "default" : "secondary"}>{achievement.points} pts</Badge>
                      </div>
                      <CardTitle className={`text-lg ${achievement.unlocked ? "text-green-800" : "text-gray-500"}`}>
                        {achievement.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-sm ${achievement.unlocked ? "text-green-700" : "text-gray-500"}`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked && <Badge className="mt-2 bg-green-600">Unlocked!</Badge>}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rewards.map((reward) => (
                <Card key={reward.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Gift className="h-6 w-6 text-blue-600" />
                      <Badge variant="outline">{reward.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-600">{reward.points} points</span>
                      <Button
                        size="sm"
                        disabled={userPoints < reward.points}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {userPoints >= reward.points ? "Redeem" : "Need More Points"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Monthly Leaderboard
                </CardTitle>
                <CardDescription>Top eco-warriors in Visakhapatnam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${user.name === "You" ? "bg-green-50 border border-green-200" : "bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1
                              ? "bg-yellow-500 text-white"
                              : user.rank === 2
                                ? "bg-gray-400 text-white"
                                : user.rank === 3
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {user.rank}
                        </div>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{user.points} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">CO2 Saved</h3>
                  <p className="text-2xl font-bold text-green-600">23.5 kg</p>
                  <p className="text-sm text-green-700">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800">Fuel Saved</h3>
                  <p className="text-2xl font-bold text-blue-600">12.3 L</p>
                  <p className="text-sm text-blue-700">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-800">Rides Completed</h3>
                  <p className="text-2xl font-bold text-purple-600">18</p>
                  <p className="text-sm text-purple-700">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-orange-800">Money Saved</h3>
                  <p className="text-2xl font-bold text-orange-600">₹890</p>
                  <p className="text-sm text-orange-700">This month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Timeline</CardTitle>
                <CardDescription>Your contribution to a greener Visakhapatnam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Planted 2 virtual trees</p>
                      <p className="text-sm text-gray-600">Equivalent to your CO2 savings this month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Reduced traffic congestion</p>
                      <p className="text-sm text-gray-600">18 fewer cars on Visakhapatnam roads</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Community impact</p>
                      <p className="text-sm text-gray-600">Connected with 12 new eco-conscious riders</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

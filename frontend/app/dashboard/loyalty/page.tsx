"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Gift, Plane, Star, Crown, Diamond, Calendar, ArrowRight } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LoyaltyPage() {
  const [currentTier, setCurrentTier] = useState("Silver")
  const [currentPoints, setCurrentPoints] = useState(5280)

  const tiers = [
    {
      name: "Bronze",
      minPoints: 0,
      color: "from-amber-600 to-amber-700",
      icon: Award,
      benefits: ["5% bonus points", "Priority customer service", "Free seat selection"],
    },
    {
      name: "Silver",
      minPoints: 2500,
      color: "from-gray-400 to-gray-500",
      icon: Star,
      benefits: ["10% bonus points", "Free checked bag", "Priority boarding", "Lounge access (2 visits/year)"],
    },
    {
      name: "Gold",
      minPoints: 7500,
      color: "from-yellow-400 to-yellow-500",
      icon: Crown,
      benefits: ["15% bonus points", "2 free checked bags", "Premium seat selection", "Unlimited lounge access"],
    },
    {
      name: "Platinum",
      minPoints: 15000,
      color: "from-purple-400 to-purple-500",
      icon: Diamond,
      benefits: ["20% bonus points", "3 free checked bags", "Complimentary upgrades", "Concierge service"],
    },
  ]

  const currentTierIndex = tiers.findIndex((tier) => tier.name === currentTier)
  const nextTier = tiers[currentTierIndex + 1]
  const progressToNext = nextTier
    ? ((currentPoints - tiers[currentTierIndex].minPoints) / (nextTier.minPoints - tiers[currentTierIndex].minPoints)) *
      100
    : 100

  const recentActivity = [
    {
      date: "2025-05-15",
      description: "Flight AVS1234 (JFK → LAX)",
      points: 1250,
      type: "earned",
    },
    {
      date: "2025-05-10",
      description: "Bonus points promotion",
      points: 500,
      type: "earned",
    },
    {
      date: "2025-05-05",
      description: "Lounge access redemption",
      points: -200,
      type: "redeemed",
    },
    {
      date: "2025-04-28",
      description: "Flight AVS5678 (LAX → JFK)",
      points: 1180,
      type: "earned",
    },
  ]

  const availableRewards = [
    {
      title: "Free Domestic Flight",
      points: 15000,
      description: "Redeem for any domestic flight within the US",
      category: "flights",
    },
    {
      title: "Seat Upgrade",
      points: 5000,
      description: "Upgrade to premium economy on your next flight",
      category: "upgrades",
    },
    {
      title: "Lounge Day Pass",
      points: 2500,
      description: "Access to AviaServe lounges worldwide",
      category: "experiences",
    },
    {
      title: "Extra Baggage",
      points: 1500,
      description: "Additional 23kg checked baggage allowance",
      category: "services",
    },
    {
      title: "Hotel Discount",
      points: 3000,
      description: "20% off at partner hotels worldwide",
      category: "partners",
    },
    {
      title: "Car Rental Credit",
      points: 2000,
      description: "$50 credit for car rentals",
      category: "partners",
    },
  ]

  return (
    <div className="container py-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">AviaServe Rewards</h1>
        <p className="text-gray-600">Earn points, unlock benefits, and enjoy exclusive perks</p>
      </motion.div>

      {/* Current Status */}
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <Card className="overflow-hidden">
          <div className={`bg-gradient-to-r ${tiers[currentTierIndex].color} text-white p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{currentTier} Member</h2>
                <p className="text-white/90">Current Status</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentPoints.toLocaleString()}</div>
                <div className="text-white/90">Points</div>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            {nextTier ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress to {nextTier.name}</span>
                  <span className="text-sm text-gray-600">{nextTier.minPoints - currentPoints} points to go</span>
                </div>
                <Progress value={progressToNext} className="h-3" />
                <p className="text-sm text-gray-600">
                  Earn {nextTier.minPoints - currentPoints} more points to reach {nextTier.name} status and unlock
                  additional benefits.
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <Crown className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-slate-900">Congratulations!</p>
                <p className="text-sm text-gray-600">You've reached our highest tier</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="benefits" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="tiers">Tiers</TabsTrigger>
        </TabsList>

        <TabsContent value="benefits" className="space-y-6">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <Card>
              <CardHeader>
                <CardTitle>Your {currentTier} Benefits</CardTitle>
                <CardDescription>Enjoy these exclusive perks as a {currentTier} member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {tiers[currentTierIndex].benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Gift className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium text-slate-900">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {nextTier && (
            <motion.div initial="initial" animate="animate" variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Unlock {nextTier.name} Benefits</CardTitle>
                  <CardDescription>
                    Earn {nextTier.minPoints - currentPoints} more points to access these additional benefits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {nextTier.benefits
                      .filter((benefit) => !tiers[currentTierIndex].benefits.includes(benefit))
                      .map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg opacity-60">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <Gift className="h-4 w-4 text-gray-400" />
                          </div>
                          <span className="font-medium text-gray-600">{benefit}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableRewards.map((reward, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-slate-900">{reward.title}</h3>
                        <Badge variant="outline">{reward.points.toLocaleString()} pts</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                      <Button
                        className="w-full"
                        variant={currentPoints >= reward.points ? "default" : "outline"}
                        disabled={currentPoints < reward.points}
                      >
                        {currentPoints >= reward.points ? "Redeem" : "Not enough points"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest points transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === "earned" ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {activity.type === "earned" ? (
                            <Plane className="h-5 w-5 text-green-600" />
                          ) : (
                            <Gift className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{activity.description}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className={`text-right ${activity.type === "earned" ? "text-green-600" : "text-red-600"}`}>
                        <span className="font-semibold">
                          {activity.type === "earned" ? "+" : ""}
                          {activity.points.toLocaleString()}
                        </span>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-6">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <div className="space-y-6">
              {tiers.map((tier, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={`overflow-hidden ${tier.name === currentTier ? "ring-2 ring-blue-600" : ""}`}>
                    <div className={`bg-gradient-to-r ${tier.color} text-white p-4`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <tier.icon className="h-8 w-8" />
                          <div>
                            <h3 className="text-xl font-bold">{tier.name}</h3>
                            <p className="text-white/90">{tier.minPoints.toLocaleString()}+ points</p>
                          </div>
                        </div>
                        {tier.name === currentTier && <Badge className="bg-white/20 text-white">Current</Badge>}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="grid gap-2 md:grid-cols-2">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2">
                            <ArrowRight className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, Gift } from "lucide-react"

export default function LoyaltyCard() {
  // Mock loyalty data
  const loyaltyPoints = 5280
  const nextRewardThreshold = 6000
  const progress = (loyaltyPoints / nextRewardThreshold) * 100
  const tier = "Silver"
  const tierColor = "bg-gradient-to-r from-gray-300 to-gray-400"

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>SkyWings Rewards</span>
          <Award className="h-5 w-5 text-orange" />
        </CardTitle>
        <CardDescription>Your loyalty program status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Current Tier</p>
            <div className="flex items-center">
              <div className={`mr-2 h-3 w-3 rounded-full ${tierColor}`} />
              <p className="text-xl font-bold">{tier}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Points</p>
            <p className="text-xl font-bold">{loyaltyPoints.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress to next reward</span>
            <span>
              {loyaltyPoints} / {nextRewardThreshold}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mt-4 rounded-lg bg-sky-blue/10 p-3">
          <div className="flex items-start space-x-3">
            <Gift className="mt-0.5 h-5 w-5 text-sky-blue" />
            <div>
              <p className="font-medium text-navy-blue">Next Reward Available</p>
              <p className="text-sm text-gray-500">
                {nextRewardThreshold - loyaltyPoints} more points for a free companion ticket
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

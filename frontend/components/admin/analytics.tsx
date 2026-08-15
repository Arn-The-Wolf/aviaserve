"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Users, Plane, Calendar } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

// Mock analytics data
const analyticsData = {
  revenue: {
    current: 2400000,
    previous: 2100000,
    change: 14.3,
  },
  bookings: {
    current: 8942,
    previous: 7654,
    change: 16.8,
  },
  passengers: {
    current: 45231,
    previous: 38976,
    change: 16.0,
  },
  flights: {
    current: 1247,
    previous: 1156,
    change: 7.9,
  },
}

const topRoutes = [
  { route: "JFK → LAX", bookings: 1234, revenue: 456789 },
  { route: "LAX → JFK", bookings: 1156, revenue: 423456 },
  { route: "ORD → MIA", bookings: 987, revenue: 234567 },
  { route: "SFO → JFK", bookings: 876, revenue: 345678 },
  { route: "LHR → JFK", bookings: 765, revenue: 567890 },
]

const monthlyData = [
  { month: "Jan", revenue: 180000, bookings: 650 },
  { month: "Feb", revenue: 195000, bookings: 720 },
  { month: "Mar", revenue: 210000, bookings: 780 },
  { month: "Apr", revenue: 225000, bookings: 850 },
  { month: "May", revenue: 240000, bookings: 920 },
  { month: "Jun", revenue: 255000, bookings: 980 },
]

export default function Analytics() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <motion.div initial="initial" animate="animate" variants={fadeInUp}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
            <p className="text-gray-600">Monitor performance metrics and business insights</p>
          </div>
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Revenue",
              value: formatCurrency(analyticsData.revenue.current),
              change: analyticsData.revenue.change,
              icon: DollarSign,
              color: "text-green-600",
              bgColor: "bg-green-100",
            },
            {
              title: "Total Bookings",
              value: formatNumber(analyticsData.bookings.current),
              change: analyticsData.bookings.change,
              icon: Calendar,
              color: "text-blue-600",
              bgColor: "bg-blue-100",
            },
            {
              title: "Total Passengers",
              value: formatNumber(analyticsData.passengers.current),
              change: analyticsData.passengers.change,
              icon: Users,
              color: "text-purple-600",
              bgColor: "bg-purple-100",
            },
            {
              title: "Active Flights",
              value: formatNumber(analyticsData.flights.current),
              change: analyticsData.flights.change,
              icon: Plane,
              color: "text-orange-600",
              bgColor: "bg-orange-100",
            },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                      <div className={`flex items-center text-sm ${getChangeColor(metric.change)}`}>
                        {getChangeIcon(metric.change)}
                        <span className="ml-1">
                          {metric.change >= 0 ? "+" : ""}
                          {metric.change.toFixed(1)}% from last period
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${metric.bgColor}`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="routes">Top Routes</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Flight Tickets", amount: 1800000, percentage: 75 },
                      { category: "Extras & Add-ons", amount: 360000, percentage: 15 },
                      { category: "Seat Upgrades", amount: 240000, percentage: 10 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-gray-600">{formatCurrency(item.amount)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Status</CardTitle>
                  <CardDescription>Current booking status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: "Confirmed", count: 7654, color: "bg-green-600" },
                      { status: "Pending", count: 892, color: "bg-yellow-600" },
                      { status: "Cancelled", count: 396, color: "bg-red-600" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-sm font-medium">{item.status}</span>
                        </div>
                        <span className="text-sm text-gray-600">{formatNumber(item.count)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Routes</CardTitle>
                <CardDescription>Most popular flight routes by bookings and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRoutes.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{route.route}</p>
                          <p className="text-sm text-gray-600">{formatNumber(route.bookings)} bookings</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900">{formatCurrency(route.revenue)}</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Revenue and booking trends over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {monthlyData.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{month.month}</span>
                        <div className="text-right">
                          <span className="text-sm font-medium">{formatCurrency(month.revenue)}</span>
                          <span className="text-xs text-gray-500 ml-2">({month.bookings} bookings)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(month.revenue / 300000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}

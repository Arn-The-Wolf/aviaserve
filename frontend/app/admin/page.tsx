"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plane,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Settings,
  BarChart3,
  Activity,
  Shield,
} from "lucide-react"
import Link from "next/link"
import FlightManagement from "@/components/admin/flight-management"
import UserManagement from "@/components/admin/user-management"
import BookingManagement from "@/components/admin/booking-management"
import Analytics from "@/components/admin/analytics"

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Flights",
      value: "1,247",
      change: "+12%",
      icon: Plane,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: "45,231",
      change: "+8%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Revenue",
      value: "$2.4M",
      change: "+15%",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Bookings",
      value: "8,942",
      change: "+23%",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      message: "Flight AVS1234 delayed by 30 minutes",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "info",
      message: "New user registration spike detected",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "error",
      message: "Payment gateway timeout reported",
      time: "1 hour ago",
    },
  ]

  return (
    <div className="container py-8">
      <motion.div initial="initial" animate="animate" variants={staggerContainer}>
        <motion.div className="mb-8" variants={fadeInUp}>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your airline operations and monitor performance</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerContainer}>
              {stats.map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                          <p className="text-sm text-green-600 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Recent Activity */}
              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "New flight AVS2468 scheduled",
                        "User John Doe completed booking",
                        "Payment processed for booking #12345",
                        "Flight AVS1357 departed on time",
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <p className="text-sm text-gray-600">{activity}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Alerts */}
              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              alert.type === "error"
                                ? "bg-red-500"
                                : alert.type === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/operations">
                      <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700">
                        <Shield className="mr-2 h-4 w-4" />
                        Operations Center
                      </Button>
                    </Link>
                    <Button className="w-full justify-start" variant="outline">
                      <Plane className="mr-2 h-4 w-4" />
                      Add New Flight
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Reports
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="flights">
            <FlightManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Plane,
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Activity,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { label: "Active Flights", value: "24", icon: Plane, color: "bg-blue-500", change: "+12%" },
    { label: "Active Crew", value: "156", icon: Users, color: "bg-green-500", change: "+5%" },
    { label: "Active Disruptions", value: "3", icon: AlertTriangle, color: "bg-orange-500", change: "-2%" },
    { label: "Security Checks", value: "48", icon: Shield, color: "bg-purple-500", change: "+8%" },
  ]

  const recentDisruptions = [
    {
      id: 1,
      flight: "AS-1234",
      type: "DELAY",
      severity: "MEDIUM",
      reason: "Weather conditions",
      status: "ACTION_TAKEN",
    },
    {
      id: 2,
      flight: "AS-5678",
      type: "MECHANICAL_ISSUE",
      severity: "HIGH",
      reason: "Engine inspection required",
      status: "INVESTIGATING",
    },
    { id: 3, flight: "AS-9012", type: "DELAY", severity: "LOW", reason: "ATC delay", status: "RESOLVED" },
  ]

  const crewStatus = [
    { role: "Captains", available: 45, assigned: 32, training: 3, onLeave: 10 },
    { role: "First Officers", available: 58, assigned: 42, training: 6, onLeave: 10 },
    { role: "Flight Attendants", available: 120, assigned: 96, training: 12, onLeave: 12 },
    { role: "Engineers", available: 28, assigned: 18, training: 4, onLeave: 6 },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "LOW":
        return "bg-blue-100 text-blue-800"
      case "MEDIUM":
        return "bg-orange-100 text-orange-800"
      case "HIGH":
        return "bg-red-100 text-red-800"
      case "CRITICAL":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "RESOLVED":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "ACTION_TAKEN":
        return <Activity className="h-4 w-4 text-blue-600" />
      case "INVESTIGATING":
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Aviation Operations Center</h1>
          <p className="text-gray-600">
            Real-time monitoring and management of airline operations across all departments
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change} from last week
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crew">Crew Management</TabsTrigger>
            <TabsTrigger value="disruptions">Disruptions</TabsTrigger>
            <TabsTrigger value="safety">Safety & Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Disruptions</CardTitle>
                  <CardDescription>Current operational disruptions requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDisruptions.map((disruption) => (
                      <div key={disruption.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(disruption.status)}
                          <div>
                            <p className="font-semibold text-slate-900">{disruption.flight}</p>
                            <p className="text-sm text-gray-600">{disruption.reason}</p>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(disruption.severity)}>{disruption.severity}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View All Disruptions
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Flight Operations Status</CardTitle>
                  <CardDescription>Current operational metrics and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">On-Time Performance</span>
                      <span className="text-lg font-semibold text-green-600">94.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "94.2%" }}></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-600">Pre-Flight Checks Completed</span>
                      <span className="text-lg font-semibold text-blue-600">23/24</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "95.8%" }}></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-600">Security Checks Passed</span>
                      <span className="text-lg font-semibold text-purple-600">48/48</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="crew" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crew Status by Role</CardTitle>
                <CardDescription>Current crew availability and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {crewStatus.map((crew) => (
                    <div key={crew.role} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-slate-900">{crew.role}</h3>
                        <span className="text-sm text-gray-600">
                          {crew.available} total
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{crew.assigned}</div>
                          <div className="text-xs text-gray-600">Assigned</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {crew.available - crew.assigned - crew.training - crew.onLeave}
                          </div>
                          <div className="text-xs text-gray-600">Available</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{crew.training}</div>
                          <div className="text-xs text-gray-600">Training</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-600">{crew.onLeave}</div>
                          <div className="text-xs text-gray-600">On Leave</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disruptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Disruption Management</CardTitle>
                <CardDescription>Monitor and resolve operational disruptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
                      <div className="text-2xl font-bold text-red-600">1</div>
                      <div className="text-sm text-gray-600">Critical Disruptions</div>
                    </div>
                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
                      <div className="text-2xl font-bold text-orange-600">2</div>
                      <div className="text-sm text-gray-600">Under Investigation</div>
                    </div>
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">15</div>
                      <div className="text-sm text-gray-600">Resolved Today</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">Recent Disruptions</h4>
                    {recentDisruptions.map((disruption) => (
                      <div key={disruption.id} className="mb-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-semibold text-slate-900">Flight {disruption.flight}</h5>
                            <p className="text-sm text-gray-600">{disruption.type.replace("_", " ")}</p>
                          </div>
                          <Badge className={getSeverityColor(disruption.severity)}>{disruption.severity}</Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{disruption.reason}</p>
                        <div className="flex items-center text-sm">
                          {getStatusIcon(disruption.status)}
                          <span className="ml-2 text-gray-600">{disruption.status.replace("_", " ")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Safety Incidents</CardTitle>
                  <CardDescription>Recent safety incident reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-slate-900">No Critical Incidents</p>
                          <p className="text-sm text-gray-600">Last 30 days</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Minor Incidents</span>
                        <span className="font-semibold">3 (All Closed)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Under Investigation</span>
                        <span className="font-semibold">1</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pending Reports</span>
                        <span className="font-semibold">0</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Checks</CardTitle>
                  <CardDescription>Daily security screening status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">48</div>
                        <div className="text-xs text-gray-600">Total Checks</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">48</div>
                        <div className="text-xs text-gray-600">Passed</div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Aircraft Screening</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Cargo Screening</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Passenger Screening</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Baggage Screening</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

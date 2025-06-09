"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plane, Eye, Edit, Trash2 } from "lucide-react"

// Mock booking data
const bookings = [
  {
    id: "AVS001234",
    passengerName: "John Doe",
    email: "john.doe@example.com",
    flightNumber: "AVS1234",
    route: "JFK → LAX",
    date: "2025-06-15",
    status: "confirmed",
    amount: 624,
    bookingDate: "2025-05-15",
    passengers: 2,
  },
  {
    id: "AVS005678",
    passengerName: "Sarah Johnson",
    email: "sarah.j@example.com",
    flightNumber: "AVS5678",
    route: "LAX → JFK",
    date: "2025-06-22",
    status: "pending",
    amount: 329,
    bookingDate: "2025-05-20",
    passengers: 1,
  },
  {
    id: "AVS009012",
    passengerName: "Michael Chen",
    email: "m.chen@example.com",
    flightNumber: "AVS9012",
    route: "ORD → MIA",
    date: "2025-06-10",
    status: "cancelled",
    amount: 249,
    bookingDate: "2025-05-10",
    passengers: 1,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <motion.div initial="initial" animate="animate" variants={fadeInUp}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Booking Management</h2>
            <p className="text-gray-600">Monitor and manage all flight bookings</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by booking ID, passenger name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
            <CardDescription>Manage customer bookings and reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Plane className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{booking.id}</h3>
                        <p className="text-sm text-gray-600">{booking.flightNumber}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                      <div>
                        <p className="text-sm text-gray-500">Passenger</p>
                        <p className="font-medium">{booking.passengerName}</p>
                        <p className="text-xs text-gray-500">{booking.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Route & Date</p>
                        <p className="font-medium">{booking.route}</p>
                        <p className="text-xs text-gray-500">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Passengers</p>
                        <p className="font-medium">{booking.passengers}</p>
                        <p className="text-xs text-gray-500">Total</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium">${booking.amount}</p>
                        <p className="text-xs text-gray-500">Booked: {booking.bookingDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

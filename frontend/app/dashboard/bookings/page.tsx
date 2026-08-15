"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plane, Calendar, MapPin, Search, Download, Mail } from "lucide-react"

// Mock booking data
const bookings = [
  {
    id: "AVS001234",
    status: "confirmed",
    outbound: {
      flightNumber: "AVS1234",
      origin: "JFK",
      destination: "LAX",
      departureDate: "2025-06-15T08:30:00",
      arrivalDate: "2025-06-15T11:45:00",
    },
    return: {
      flightNumber: "AVS5678",
      origin: "LAX",
      destination: "JFK",
      departureDate: "2025-06-22T16:15:00",
      arrivalDate: "2025-06-22T23:30:00",
    },
    passengers: [
      { name: "John Doe", seat: "12A" },
      { name: "Jane Doe", seat: "12B" },
    ],
    totalPrice: 1248,
    bookingDate: "2025-05-15T10:30:00",
  },
  {
    id: "AVS005678",
    status: "completed",
    outbound: {
      flightNumber: "AVS9012",
      origin: "JFK",
      destination: "MIA",
      departureDate: "2025-05-10T10:00:00",
      arrivalDate: "2025-05-10T13:15:00",
    },
    passengers: [{ name: "John Doe", seat: "8A" }],
    totalPrice: 324,
    bookingDate: "2025-04-20T14:20:00",
  },
]

const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-green text-white"
      case "completed":
        return "bg-gray-500 text-white"
      case "cancelled":
        return "bg-crimson-red text-white"
      default:
        return "bg-sky-blue text-white"
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.outbound.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-navy-blue">My Bookings</h1>
        <p className="text-gray-500">Manage your flight reservations and travel history</p>
      </motion.div>

      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Search Bookings</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by booking reference or flight number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Trips</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-sky-blue/5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-sky-blue" />
                        Booking {booking.id}
                      </CardTitle>
                      <CardDescription>Booked on {formatDateTime(booking.bookingDate).date}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Outbound Flight */}
                    <div>
                      <h4 className="font-medium text-navy-blue mb-3">Outbound Flight</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-sky-blue/10 flex items-center justify-center">
                            <Plane className="h-6 w-6 text-sky-blue" />
                          </div>
                          <div>
                            <div className="font-medium">{booking.outbound.flightNumber}</div>
                            <div className="text-sm text-gray-500">AVIASERVE Airlines</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">
                              {booking.outbound.origin} → {booking.outbound.destination}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDateTime(booking.outbound.departureDate).time} -{" "}
                              {formatDateTime(booking.outbound.arrivalDate).time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{formatDateTime(booking.outbound.departureDate).date}</div>
                            <div className="text-sm text-gray-500">Departure Date</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Return Flight */}
                    {booking.return && (
                      <div>
                        <h4 className="font-medium text-navy-blue mb-3">Return Flight</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-sky-blue/10 flex items-center justify-center">
                              <Plane className="h-6 w-6 text-sky-blue" />
                            </div>
                            <div>
                              <div className="font-medium">{booking.return.flightNumber}</div>
                              <div className="text-sm text-gray-500">AVIASERVE Airlines</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <div>
                              <div className="font-medium">
                                {booking.return.origin} → {booking.return.destination}
                              </div>
                              <div className="text-sm text-gray-500">
                                {formatDateTime(booking.return.departureDate).time} -{" "}
                                {formatDateTime(booking.return.arrivalDate).time}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <div>
                              <div className="font-medium">{formatDateTime(booking.return.departureDate).date}</div>
                              <div className="text-sm text-gray-500">Departure Date</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Passengers */}
                    <div>
                      <h4 className="font-medium text-navy-blue mb-3">Passengers</h4>
                      <div className="space-y-2">
                        {booking.passengers.map((passenger, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">{passenger.name}</span>
                            <span className="text-sm text-gray-500">Seat {passenger.seat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download E-ticket
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Itinerary
                      </Button>
                      {booking.status === "confirmed" && (
                        <>
                          <Button size="sm" className="bg-sky-blue hover:bg-sky-blue/90 text-white">
                            Check-in
                          </Button>
                          <Button variant="outline" size="sm">
                            Modify Booking
                          </Button>
                        </>
                      )}
                      <div className="ml-auto text-right">
                        <div className="text-lg font-bold text-navy-blue">${booking.totalPrice}</div>
                        <div className="text-sm text-gray-500">Total Paid</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="upcoming">
          {filteredBookings
            .filter((b) => b.status === "confirmed")
            .map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Same booking card structure */}
              </motion.div>
            ))}
        </TabsContent>

        <TabsContent value="past">
          {filteredBookings
            .filter((b) => b.status === "completed")
            .map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Same booking card structure */}
              </motion.div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

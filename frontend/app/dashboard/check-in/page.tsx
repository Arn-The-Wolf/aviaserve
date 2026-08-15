"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plane, Clock, User, Luggage, Wifi, Coffee, QrCode } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function CheckInPage() {
  const [bookingRef, setBookingRef] = useState("")
  const [lastName, setLastName] = useState("")
  const [checkedIn, setCheckedIn] = useState(false)
  const [showBoardingPass, setShowBoardingPass] = useState(false)

  // Mock flight data
  const flightData = {
    bookingRef: "AVS001234",
    flightNumber: "AVS1234",
    origin: "JFK",
    destination: "LAX",
    departureDate: "2025-06-15T08:30:00",
    arrivalDate: "2025-06-15T11:45:00",
    gate: "A12",
    seat: "12A",
    passenger: "John Doe",
    boardingTime: "2025-06-15T07:45:00",
    terminal: "Terminal 4",
  }

  const handleCheckIn = () => {
    if (bookingRef && lastName) {
      setCheckedIn(true)
      setTimeout(() => setShowBoardingPass(true), 1000)
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  if (showBoardingPass) {
    return (
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-navy-blue">Boarding Pass</h1>
            <p className="text-gray-500">Check-in successful! Your boarding pass is ready.</p>
          </div>

          <Card className="overflow-hidden border-2 border-dashed border-sky-blue">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-sky-blue text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">AVIASERVE</h2>
                    <p className="text-sky-100">Airlines</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{flightData.flightNumber}</div>
                    <div className="text-sky-100">Flight</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Side */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-500">PASSENGER</Label>
                      <div className="text-xl font-bold text-navy-blue">{flightData.passenger}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">FROM</Label>
                        <div className="text-lg font-bold">{flightData.origin}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">TO</Label>
                        <div className="text-lg font-bold">{flightData.destination}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">DATE</Label>
                        <div className="font-medium">{formatDateTime(flightData.departureDate).date}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">DEPARTURE</Label>
                        <div className="font-medium">{formatDateTime(flightData.departureDate).time}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">SEAT</Label>
                        <div className="text-lg font-bold text-orange">{flightData.seat}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">GATE</Label>
                        <div className="text-lg font-bold text-orange">{flightData.gate}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">TERMINAL</Label>
                        <div className="font-medium">{flightData.terminal}</div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm text-gray-500">BOARDING TIME</Label>
                      <div className="font-medium">{formatDateTime(flightData.boardingTime).time}</div>
                    </div>
                  </div>

                  {/* Right Side - QR Code */}
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-navy-blue">{flightData.bookingRef}</div>
                      <div className="text-sm text-gray-500">Booking Reference</div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="text-center space-y-4">
                  <div className="flex justify-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Wifi className="h-4 w-4 mr-1" />
                      Free Wi-Fi
                    </div>
                    <div className="flex items-center">
                      <Coffee className="h-4 w-4 mr-1" />
                      Complimentary Meals
                    </div>
                    <div className="flex items-center">
                      <Luggage className="h-4 w-4 mr-1" />
                      30kg Baggage
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="bg-sky-blue hover:bg-sky-blue/90 text-white">Download PDF</Button>
                    <Button variant="outline">Add to Wallet</Button>
                    <Button variant="outline">Email Boarding Pass</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Please arrive at the gate at least 30 minutes before boarding time.</p>
          </div>
        </motion.div>
      </div>
    )
  }

  if (checkedIn) {
    return (
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-emerald-green rounded-full flex items-center justify-center mx-auto mb-6">
            <Plane className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-navy-blue mb-4">Check-in Successful!</h1>
          <p className="text-gray-500 mb-8">
            You're all set for your flight. Your boarding pass will be generated shortly.
          </p>
          <motion.div
            className="w-16 h-16 border-4 border-sky-blue border-t-transparent rounded-full animate-spin mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-blue">Online Check-in</h1>
          <p className="text-gray-500">Check-in online and get your boarding pass</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Flight Check-in</CardTitle>
            <CardDescription>Enter your booking details to check-in for your flight</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="booking-ref">Booking Reference</Label>
              <Input
                id="booking-ref"
                placeholder="e.g., AVS001234"
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Enter passenger's last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <Button
              onClick={handleCheckIn}
              className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white"
              disabled={!bookingRef || !lastName}
            >
              Check-in Now
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>Check-in opens 24 hours before departure</p>
              <p>Check-in closes 1 hour before departure for domestic flights</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Check-in Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-green/10 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-emerald-green" />
                </div>
                <div>
                  <h4 className="font-medium">Save Time</h4>
                  <p className="text-sm text-gray-500">Skip the airport check-in queues</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-green/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-emerald-green" />
                </div>
                <div>
                  <h4 className="font-medium">Choose Seats</h4>
                  <p className="text-sm text-gray-500">Select your preferred seats</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-green/10 rounded-full flex items-center justify-center">
                  <QrCode className="h-4 w-4 text-emerald-green" />
                </div>
                <div>
                  <h4 className="font-medium">Mobile Boarding Pass</h4>
                  <p className="text-sm text-gray-500">Get your boarding pass on your phone</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-green/10 rounded-full flex items-center justify-center">
                  <Luggage className="h-4 w-4 text-emerald-green" />
                </div>
                <div>
                  <h4 className="font-medium">Baggage Info</h4>
                  <p className="text-sm text-gray-500">View your baggage allowance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, Plane, Calendar, MapPin, Users, CreditCard, Download, Mail, Printer } from "lucide-react"
import { useBookingStore } from "@/lib/stores/booking-store"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const bookingId =
    searchParams.get("bookingId") ||
    "AVS" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
  const bookingStore = useBookingStore()
  const { selectedFlight, passengers, totalPrice, paymentId, selectedSeats } = bookingStore

  useEffect(() => {
    // Simulate API call to get booking confirmation
    setTimeout(() => {
      if (!selectedFlight || !paymentId) {
        toast({
          variant: "destructive",
          title: "Booking information not found",
          description: "We couldn't find your booking details. Please contact customer support.",
        })
      }
      setIsLoading(false)
    }, 1000)
  }, [selectedFlight, paymentId, toast])

  if (isLoading) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Finalizing your booking...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Booking Confirmed!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your booking has been confirmed and your payment has been processed successfully. Your booking reference is{" "}
          <span className="font-semibold text-blue-600">{bookingId}</span>.
        </p>
      </motion.div>

      {selectedFlight && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden border-2 border-green-500 mb-8">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">AviaServe</h2>
                    <p className="text-blue-100">Booking Confirmation</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{selectedFlight.flightNumber}</div>
                    <div className="text-blue-100">Booking Ref: {bookingId}</div>
                  </div>
                </div>
              </div>

              {/* Flight Details */}
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Plane className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Flight Details</h3>
                      <p className="text-sm text-gray-600">{selectedFlight.airline || "AviaServe Airlines"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{selectedFlight.departureTime}</p>
                      <p className="text-sm text-gray-600">{selectedFlight.origin}</p>
                    </div>
                    <div className="flex flex-col items-center px-4">
                      <div className="w-24 h-px bg-gray-300"></div>
                      <p className="text-xs text-gray-500 my-1">Direct</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{selectedFlight.arrivalTime}</p>
                      <p className="text-sm text-gray-600">{selectedFlight.destination}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Date and Passengers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Date</p>
                      <p className="text-gray-600">{selectedFlight.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Gate</p>
                      <p className="text-gray-600">{selectedFlight.gate || "TBA"}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Passengers</p>
                      <p className="text-gray-600">{passengers.length} passenger(s)</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Passenger Details */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Passenger Information</h3>
                  <div className="space-y-3">
                    {passengers.map((passenger, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{passenger.name}</p>
                          <p className="text-sm text-gray-600">{passenger.type || "Adult"}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">
                            Seat{" "}
                            {selectedSeats[index] ||
                              `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 30) + 1}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Payment Information */}
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-start space-x-3">
                    <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Payment</p>
                      <p className="text-gray-600">Payment ID: {paymentId.substring(0, 8)}...</p>
                      <p className="text-gray-600">Status: Confirmed</p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-sm text-gray-600">Total Paid</p>
                    <p className="text-2xl font-bold text-slate-900">${totalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Important:</span> Please arrive at the airport at least 2 hours before
                    your scheduled departure time. Don't forget to bring a valid ID or passport.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="mr-2 h-4 w-4" />
              Download E-Ticket
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Email Itinerary
            </Button>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Confirmation
            </Button>
          </div>

          {/* Next Steps */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">What's Next?</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-slate-900">Check-in Online</h4>
                  <p className="text-sm text-gray-600">Available 24 hours before departure</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-slate-900">Select Seats</h4>
                  <p className="text-sm text-gray-600">Choose your preferred seats</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Plane className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-slate-900">Manage Booking</h4>
                  <p className="text-sm text-gray-600">View or modify your booking</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/dashboard/bookings">
              <Button variant="outline">Go to My Bookings</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}

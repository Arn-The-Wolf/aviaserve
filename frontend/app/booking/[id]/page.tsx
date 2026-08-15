"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Plane, Calendar, Clock, Users, CreditCard, ArrowLeft, Loader2 } from "lucide-react"
import { useBookingStore } from "@/lib/stores/booking-store"
import PassengerForm from "@/components/booking/passenger-form"
import SeatSelection from "@/components/booking/seat-selection"
import ExtrasSelection from "@/components/booking/extras-selection"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function BookingPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("passengers")
  const [isLoading, setIsLoading] = useState(true)
  const bookingStore = useBookingStore()
  const { selectedFlight, passengers, totalPrice, updateTotalPrice } = bookingStore

  // In a real app, you would fetch the flight details from your API
  useEffect(() => {
    // Simulate API call to get flight details
    setTimeout(() => {
      if (!selectedFlight) {
        toast({
          variant: "destructive",
          title: "Flight not found",
          description: "We couldn't find the flight you're looking for. Please try searching again.",
        })
        router.push("/flights")
      }
      setIsLoading(false)
    }, 1000)

    // Update total price whenever relevant state changes
    updateTotalPrice()
  }, [selectedFlight, passengers, router, toast, updateTotalPrice])

  const handleContinueToPayment = () => {
    // Validate that we have all required information
    if (passengers.length === 0 || passengers.some((p) => !p.name.trim())) {
      toast({
        variant: "destructive",
        title: "Missing passenger information",
        description: "Please add at least one passenger with a full name.",
      })
      setActiveTab("passengers")
      return
    }

    // In a real app, you would create a booking in your database here
    // and get a booking ID back
    const bookingId = "temp-" + Math.random().toString(36).substring(2, 10)

    // Navigate to payment page
    router.push(`/booking/payment?bookingId=${bookingId}`)
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-gray-600">Loading flight details...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Flights
        </Button>
        <h1 className="text-3xl font-bold text-slate-900">Complete Your Booking</h1>
        <p className="text-gray-600">Enter passenger details, select seats, and add extras</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="passengers">Passengers</TabsTrigger>
              <TabsTrigger value="seats">Seats</TabsTrigger>
              <TabsTrigger value="extras">Extras</TabsTrigger>
            </TabsList>
            <TabsContent value="passengers" className="space-y-4 pt-4">
              <PassengerForm />
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (passengers.length === 0 || passengers.some((p) => !p.name.trim())) {
                      toast({
                        variant: "destructive",
                        title: "Missing passenger information",
                        description: "Please add at least one passenger with a full name.",
                      })
                      return
                    }
                    setActiveTab("seats")
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue to Seat Selection
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="seats" className="space-y-4 pt-4">
              <SeatSelection />
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("passengers")}>
                  Back to Passengers
                </Button>
                <Button onClick={() => setActiveTab("extras")} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Continue to Extras
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="extras" className="space-y-4 pt-4">
              <ExtrasSelection />
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("seats")}>
                  Back to Seats
                </Button>
                <Button onClick={handleContinueToPayment} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Continue to Payment
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your flight details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedFlight && (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Plane className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">{selectedFlight.flightNumber}</p>
                      <p className="text-sm text-gray-600">
                        {selectedFlight.origin} → {selectedFlight.destination}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Date</p>
                      <p className="text-sm text-gray-600">{selectedFlight.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Time</p>
                      <p className="text-sm text-gray-600">
                        {selectedFlight.departureTime} - {selectedFlight.arrivalTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Passengers</p>
                      <p className="text-sm text-gray-600">{passengers.length} passenger(s)</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base fare</span>
                      <span>${selectedFlight.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & fees</span>
                      <span>${(selectedFlight.price * 0.12).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passenger(s)</span>
                      <span>× {passengers.length}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="rounded-md bg-blue-50 p-3">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium">Secure Payment</p>
                        <p>Your payment information is protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

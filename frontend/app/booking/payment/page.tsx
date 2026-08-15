"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Plane, Calendar, Users, CreditCard, ArrowLeft, Loader2 } from "lucide-react"
import PaymentProvider from "@/components/payment/payment-provider"
import PaymentForm from "@/components/payment/payment-form"
import { useBookingStore } from "@/lib/stores/booking-store"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const bookingId = searchParams.get("bookingId")
  const bookingStore = useBookingStore()
  const { selectedFlight, passengers, totalPrice } = bookingStore

  // In a real app, you would fetch the booking details from your API
  useEffect(() => {
    // Simulate API call to get booking details
    setTimeout(() => {
      if (!selectedFlight) {
        toast({
          variant: "destructive",
          title: "Booking not found",
          description: "We couldn't find your booking details. Please start the booking process again.",
        })
        router.push("/flights")
      }
      setIsLoading(false)
    }, 1000)
  }, [selectedFlight, router, toast])

  const handlePaymentSuccess = (paymentId: string) => {
    // In a real app, you would update the booking status in your database
    console.log("Payment successful:", paymentId)

    // Store the payment ID in the booking store
    bookingStore.setPaymentId(paymentId)

    // Navigate to the confirmation page
    setTimeout(() => {
      router.push(`/booking/confirmation?bookingId=${bookingId}`)
    }, 2000)
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
    // You might want to log this error or handle it in some way
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-gray-600">Loading booking details...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-slate-900">Complete Your Payment</h1>
        <p className="text-gray-600">Secure payment to confirm your flight booking</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PaymentProvider>
            <PaymentForm
              amount={totalPrice}
              bookingDetails={{
                id: bookingId || "temp-booking-id",
                passengerName: passengers[0]?.name || "Guest",
                flightNumber: selectedFlight?.flightNumber || "",
              }}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </PaymentProvider>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your booking details</CardDescription>
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
                      <p className="text-sm text-gray-600">
                        {selectedFlight.departureTime} - {selectedFlight.arrivalTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Flight Date</p>
                      <p className="text-sm text-gray-600">{selectedFlight.date}</p>
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
                        <p>Your payment information is encrypted and secure.</p>
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

export default function PaymentPageWithSuspense() {
  return (
    <Suspense fallback={<div className="container py-12">Loading payment...</div>}>
      <PaymentPage />
    </Suspense>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CreditCard, CheckCircle2 } from "lucide-react"

interface PaymentFormProps {
  amount: number
  bookingDetails: any
  onPaymentSuccess: (paymentId: string) => void
  onPaymentError: (error: string) => void
}

const isStripeConfigured = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function PaymentForm(props: PaymentFormProps) {
  if (!isStripeConfigured) {
    return <DemoPaymentForm {...props} />
  }

  return <StripePaymentForm {...props} />
}

function PaymentSuccess({ onViewBookings }: { onViewBookings: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-10"
    >
      <div className="rounded-full bg-green-100 p-6 mb-4">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-6 text-center">
        Your payment has been processed successfully. Your booking is now confirmed.
      </p>
      <Button onClick={onViewBookings} className="bg-blue-600 hover:bg-blue-700 text-white">
        View My Bookings
      </Button>
    </motion.div>
  )
}

function DemoPaymentForm({ amount, bookingDetails, onPaymentSuccess, onPaymentError }: PaymentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [cardholderName, setCardholderName] = useState("")
  const [billingEmail, setBillingEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const response = await fetch("/api/payment/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "usd",
          metadata: {
            bookingId: bookingDetails.id,
            passengerName: bookingDetails.passengerName,
            flightNumber: bookingDetails.flightNumber,
          },
        }),
      })

      const data = await response.json()
      const paymentId = data.paymentIntentId || `demo_${Date.now()}`

      await fetch("/api/payment/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: paymentId,
          bookingId: bookingDetails.id,
        }),
      })

      setPaymentSuccess(true)
      toast({
        title: "Payment successful",
        description: "Demo payment completed. Your booking is confirmed!",
      })
      onPaymentSuccess(paymentId)
    } catch (error: any) {
      console.error("Payment error:", error)
      toast({
        variant: "destructive",
        title: "Payment error",
        description: error.message || "An unexpected error occurred during payment processing.",
      })
      onPaymentError(error.message || "Payment processing error")
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentSuccess) {
    return <PaymentSuccess onViewBookings={() => router.push("/dashboard/bookings")} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
        <CardDescription>Demo checkout — no real card is charged</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="Name on card"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email for receipt"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              required
            />
          </div>

          <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            Stripe is not configured. This demo confirms the booking without charging a card.
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-slate-900">${amount.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

function StripePaymentForm({ amount, bookingDetails, onPaymentSuccess, onPaymentError }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [cardholderName, setCardholderName] = useState("")
  const [billingEmail, setBillingEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) return

    setIsProcessing(true)

    try {
      const response = await fetch("/api/payment/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "usd",
          metadata: {
            bookingId: bookingDetails.id,
            passengerName: bookingDetails.passengerName,
            flightNumber: bookingDetails.flightNumber,
          },
        }),
      })

      const { clientSecret, paymentIntentId, demo } = await response.json()

      if (demo) {
        setPaymentSuccess(true)
        toast({
          title: "Payment successful",
          description: "Demo payment completed. Your booking is confirmed!",
        })
        onPaymentSuccess(paymentIntentId || `demo_${Date.now()}`)
        return
      }

      if (!clientSecret) {
        throw new Error("Failed to create payment intent")
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName,
            email: billingEmail,
          },
        },
      })

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Payment failed",
          description: result.error.message || "Your payment was not successful, please try again.",
        })
        onPaymentError(result.error.message || "Payment failed")
      } else if (result.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true)
        toast({
          title: "Payment successful",
          description: "Your payment was processed successfully. Your booking is confirmed!",
        })
        onPaymentSuccess(result.paymentIntent.id)

        await fetch("/api/payment/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId,
            bookingId: bookingDetails.id,
          }),
        })
      }
    } catch (error: any) {
      console.error("Payment error:", error)
      toast({
        variant: "destructive",
        title: "Payment error",
        description: error.message || "An unexpected error occurred during payment processing.",
      })
      onPaymentError(error.message || "Payment processing error")
    } finally {
      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  }

  if (paymentSuccess) {
    return <PaymentSuccess onViewBookings={() => router.push("/dashboard/bookings")} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
        <CardDescription>Enter your card information to complete your booking</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="Name on card"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email for receipt"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-element">Card Details</Label>
            <div className="border rounded-md p-3">
              <CardElement id="card-element" options={cardElementOptions} />
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-slate-900">${amount.toFixed(2)}</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>Secure payment powered by</p>
              <p className="font-medium">Stripe</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isProcessing || !stripe}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

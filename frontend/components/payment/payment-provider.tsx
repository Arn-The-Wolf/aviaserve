"use client"

import type { ReactNode } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface PaymentProviderProps {
  children: ReactNode
}

export default function PaymentProvider({ children }: PaymentProviderProps) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "",
    appearance: {
      theme: "stripe",
    },
  }

  return <Elements stripe={stripePromise}>{children}</Elements>
}

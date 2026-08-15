"use client"

import type { ReactNode } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

interface PaymentProviderProps {
  children: ReactNode
}

export default function PaymentProvider({ children }: PaymentProviderProps) {
  if (!stripePromise) {
    return <>{children}</>
  }

  return <Elements stripe={stripePromise}>{children}</Elements>
}

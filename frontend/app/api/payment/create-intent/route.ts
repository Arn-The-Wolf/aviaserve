import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency = "usd", paymentMethodType = "card", metadata = {} } = body

    // Create a payment intent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amounts in cents
      currency,
      payment_method_types: [paymentMethodType],
      metadata: {
        ...metadata,
        bookingSystem: "AviaServe",
      },
      description: "AviaServe Flight Booking",
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error: any) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: { message: error.message || "An unknown error occurred" } }, { status: 400 })
  }
}

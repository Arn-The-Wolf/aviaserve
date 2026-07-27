import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key (optional for demo)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
  : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { paymentIntentId, bookingId } = body

    // Return demo response if Stripe is not configured
    if (!stripe) {
      return NextResponse.json({
        success: true,
        status: "succeeded",
        bookingId,
        message: "Payment successful (Demo mode - Stripe not configured)",
      })
    }

    // Retrieve the payment intent to check its status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // Update booking status in your database based on payment status
    // This is where you would update your booking record
    // For now, we'll just return the payment status

    if (paymentIntent.status === "succeeded") {
      // Here you would update your booking record to "confirmed" status
      return NextResponse.json({
        success: true,
        status: paymentIntent.status,
        bookingId,
        message: "Payment successful. Your booking is confirmed.",
      })
    } else if (["requires_payment_method", "requires_action", "requires_confirmation"].includes(paymentIntent.status)) {
      return NextResponse.json({
        success: false,
        status: paymentIntent.status,
        bookingId,
        message: "Payment requires additional action.",
      })
    } else {
      return NextResponse.json({
        success: false,
        status: paymentIntent.status,
        bookingId,
        message: "Payment processing failed. Please try again.",
      })
    }
  } catch (error: any) {
    console.error("Error confirming payment:", error)
    return NextResponse.json({ error: { message: error.message || "An unknown error occurred" } }, { status: 400 })
  }
}

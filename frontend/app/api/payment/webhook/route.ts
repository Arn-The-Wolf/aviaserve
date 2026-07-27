import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"

// Initialize Stripe with your secret key (optional for demo)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
  : null

// This is your Stripe webhook secret for testing your endpoint locally
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: Request) {
  try {
    // Return demo response if Stripe is not configured
    if (!stripe) {
      return NextResponse.json({ received: true, demo: true })
    }

    const body = await request.text()
    const signature = headers().get("stripe-signature") || ""

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed: ${err.message}`)
      return NextResponse.json({ error: err.message }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
        // Then define and call a function to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break
      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`PaymentIntent for ${failedPaymentIntent.amount} failed!`)
        // Then define and call a function to handle the failed payment intent.
        // handlePaymentIntentFailed(failedPaymentIntent);
        break
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`)
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

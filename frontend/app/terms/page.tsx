"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function TermsPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600">Last updated: January 1, 2025</p>
      </motion.div>

      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <Card>
          <CardContent className="p-8 prose prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using AviaServe Airlines services, you accept and agree to be bound by the terms and
              provision of this agreement. These Terms of Service govern your use of our website, mobile applications,
              and all related services.
            </p>

            <h2>2. Booking and Reservations</h2>
            <h3>2.1 Booking Process</h3>
            <p>
              All bookings are subject to availability and confirmation. A booking is only confirmed when you receive a
              confirmation email with your booking reference number.
            </p>
            <h3>2.2 Payment</h3>
            <p>
              Full payment is required at the time of booking. We accept major credit cards and other payment methods as
              indicated on our website. All prices are subject to change until payment is completed.
            </p>

            <h2>3. Cancellations and Refunds</h2>
            <h3>3.1 Cancellation Policy</h3>
            <p>
              Cancellation policies vary by fare type. Please review the specific terms of your ticket before booking.
              Some fares may be non-refundable or subject to cancellation fees.
            </p>
            <h3>3.2 Refund Processing</h3>
            <p>
              Eligible refunds will be processed within 7-14 business days to the original payment method. Processing
              times may vary depending on your financial institution.
            </p>

            <h2>4. Passenger Responsibilities</h2>
            <h3>4.1 Travel Documents</h3>
            <p>
              Passengers are responsible for ensuring they have valid travel documents, including passports, visas, and
              any required health certificates. AviaServe is not responsible for denied boarding due to invalid
              documentation.
            </p>
            <h3>4.2 Check-in Requirements</h3>
            <p>
              Passengers must check in within the specified time limits. Failure to check in on time may result in
              cancellation of your reservation without refund.
            </p>

            <h2>5. Baggage Policy</h2>
            <h3>5.1 Carry-on Baggage</h3>
            <p>
              Each passenger is allowed one carry-on bag and one personal item. Size and weight restrictions apply and
              are available on our website.
            </p>
            <h3>5.2 Checked Baggage</h3>
            <p>
              Checked baggage allowances vary by fare type and destination. Additional fees may apply for excess
              baggage. We are not liable for fragile items in checked baggage.
            </p>

            <h2>6. Flight Changes and Disruptions</h2>
            <h3>6.1 Schedule Changes</h3>
            <p>
              AviaServe reserves the right to change flight schedules. We will notify passengers of significant changes
              and offer rebooking options or refunds as appropriate.
            </p>
            <h3>6.2 Weather and Extraordinary Circumstances</h3>
            <p>
              AviaServe is not liable for delays or cancellations due to weather, natural disasters, government actions,
              or other circumstances beyond our control.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              AviaServe's liability is limited to the terms set forth in applicable international conventions and local
              laws. We are not liable for indirect, consequential, or punitive damages.
            </p>

            <h2>8. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
              protect your personal information.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of the United States. Any disputes will be resolved in the
              courts of New York, NY.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              AviaServe reserves the right to modify these terms at any time. Changes will be posted on our website and
              will take effect immediately upon posting.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@aviaserve.com
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Address: 123 AviaServe Tower, Aviation Blvd, New York, NY 10001
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

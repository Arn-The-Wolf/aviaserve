"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function PrivacyPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600">Last updated: January 1, 2025</p>
      </motion.div>

      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <Card>
          <CardContent className="p-8 prose prose-slate max-w-none">
            <h2>1. Information We Collect</h2>
            <h3>1.1 Personal Information</h3>
            <p>We collect personal information that you provide to us, including but not limited to:</p>
            <ul>
              <li>Name, email address, phone number, and postal address</li>
              <li>Passport and travel document information</li>
              <li>Payment information and billing details</li>
              <li>Travel preferences and special requirements</li>
              <li>Loyalty program information</li>
            </ul>

            <h3>1.2 Automatically Collected Information</h3>
            <p>When you use our services, we automatically collect certain information, including:</p>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your personal information for the following purposes:</p>
            <ul>
              <li>Processing bookings and providing travel services</li>
              <li>Communicating with you about your travel plans</li>
              <li>Improving our services and customer experience</li>
              <li>Marketing and promotional communications (with your consent)</li>
              <li>Compliance with legal and regulatory requirements</li>
              <li>Fraud prevention and security purposes</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <h3>3.1 Service Providers</h3>
            <p>
              We may share your information with trusted third-party service providers who assist us in operating our
              business, including:
            </p>
            <ul>
              <li>Payment processors</li>
              <li>Technology service providers</li>
              <li>Customer service providers</li>
              <li>Marketing and analytics partners</li>
            </ul>

            <h3>3.2 Legal Requirements</h3>
            <p>
              We may disclose your information when required by law, regulation, or legal process, or to protect our
              rights, property, or safety.
            </p>

            <h3>3.3 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of
              the transaction.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              policy, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>

            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our website. You can control cookie
              settings through your browser preferences, but disabling cookies may affect website functionality.
            </p>

            <h2>8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. We
              ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal
              information from children under 13.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new policy on our website and updating the "Last updated" date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us at:
              <br />
              Email: privacy@aviaserve.com
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

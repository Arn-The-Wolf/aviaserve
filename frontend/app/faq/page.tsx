"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, HelpCircle, Plane, CreditCard, Luggage, User } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All", icon: HelpCircle },
    { id: "booking", name: "Booking", icon: Plane },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "baggage", name: "Baggage", icon: Luggage },
    { id: "account", name: "Account", icon: User },
  ]

  const faqs = [
    {
      category: "booking",
      question: "How can I book a flight?",
      answer:
        "You can book a flight through our website, mobile app, or by calling our customer service. Simply enter your departure and arrival cities, select your travel dates, choose your preferred flight, and complete the payment process.",
    },
    {
      category: "booking",
      question: "Can I change my booking after confirmation?",
      answer:
        "Yes, you can change your booking depending on your fare type. Some fares allow free changes, while others may incur a change fee. You can modify your booking online through your account or contact our customer service.",
    },
    {
      category: "booking",
      question: "How early should I arrive at the airport?",
      answer:
        "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights. This allows sufficient time for check-in, security screening, and boarding procedures.",
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment system.",
    },
    {
      category: "payment",
      question: "When will my payment be charged?",
      answer:
        "Your payment will be charged immediately upon booking confirmation. For some promotional fares, payment may be processed within 24 hours of booking.",
    },
    {
      category: "payment",
      question: "Can I get a refund for my ticket?",
      answer:
        "Refund eligibility depends on your fare type. Flexible fares are usually refundable, while basic economy fares may be non-refundable. Check your booking details or contact us for specific refund policies.",
    },
    {
      category: "baggage",
      question: "What is the baggage allowance?",
      answer:
        "Each passenger is allowed one carry-on bag (up to 10kg) and one personal item. Checked baggage allowance varies by fare type and destination. Premium fares typically include free checked baggage.",
    },
    {
      category: "baggage",
      question: "What items are prohibited in carry-on baggage?",
      answer:
        "Prohibited items include liquids over 100ml, sharp objects, firearms, and flammable materials. Please check our detailed baggage policy or TSA guidelines for a complete list of restricted items.",
    },
    {
      category: "baggage",
      question: "What should I do if my baggage is lost?",
      answer:
        "Report lost baggage immediately at the airport baggage service counter. You'll receive a reference number to track your baggage. We'll work to locate and return your baggage as quickly as possible.",
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click the 'Register' button on our website or app, provide your email address, create a password, and fill in your personal details. You'll receive a confirmation email to activate your account.",
    },
    {
      category: "account",
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
    },
    {
      category: "account",
      question: "How does the loyalty program work?",
      answer:
        "Our AviaServe Rewards program allows you to earn points for every flight. Points can be redeemed for free flights, upgrades, and other benefits. Higher tiers unlock additional perks like priority boarding and lounge access.",
    },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about booking, payments, baggage, and more. Can't find what you're looking
          for? Contact our customer support team.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 ${
                selectedCategory === category.id ? "bg-blue-600 text-white" : "hover:bg-blue-50 hover:text-blue-600"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* FAQ List */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="max-w-4xl mx-auto space-y-4"
      >
        {filteredFAQs.map((faq, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Collapsible>
              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CollapsibleTrigger className="w-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-left">
                      <h3 className="font-medium text-slate-900 pr-4">{faq.question}</h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </motion.div>
        ))}
      </motion.div>

      {filteredFAQs.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search terms or browse different categories.</p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      )}

      {/* Contact Support */}
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mt-16 text-center">
        <Card className="bg-blue-50">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Still need help?</h2>
            <p className="text-gray-600 mb-6">
              Our customer support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Support
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-colors"
              >
                Call +1 (555) 123-4567
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

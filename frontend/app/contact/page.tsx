"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HelpCircle, Luggage } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
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

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+1 (555) 123-4567",
      description: "Available 24/7 for urgent matters",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "support@aviaserve.com",
      description: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: "123 AviaServe Tower, Aviation Blvd",
      description: "New York, NY 10001",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 8AM-8PM EST",
      description: "Weekend: 9AM-5PM EST",
    },
  ]

  const supportCategories = [
    {
      icon: HelpCircle,
      title: "General Inquiry",
      description: "Questions about our services",
    },
    {
      icon: Luggage,
      title: "Baggage Support",
      description: "Lost, delayed, or damaged baggage",
    },
    {
      icon: MessageCircle,
      title: "Booking Assistance",
      description: "Help with reservations and changes",
    },
  ]

  return (
    <div className="container py-8">
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're here to help! Get in touch with our customer support team for any questions, concerns, or assistance you
          may need.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="booking">Booking Assistance</SelectItem>
                          <SelectItem value="baggage">Baggage Support</SelectItem>
                          <SelectItem value="refund">Refund Request</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="compliment">Compliment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with us through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div key={index} variants={fadeInUp} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <info.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{info.title}</h3>
                      <p className="text-blue-600 font-medium">{info.details}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Support</CardTitle>
                <CardDescription>Common support categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleInputChange("category", category.title.toLowerCase().replace(" ", ""))}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <category.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{category.title}</h4>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <h3 className="font-medium text-slate-900 mb-2">Emergency Support</h3>
                <p className="text-sm text-gray-600 mb-4">
                  For urgent matters requiring immediate assistance, please call our 24/7 emergency hotline.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mt-16"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  question: "How can I change my booking?",
                  answer: "You can modify your booking online through your account or contact our support team.",
                },
                {
                  question: "What is your baggage policy?",
                  answer:
                    "Each passenger is allowed one carry-on and one personal item. Checked baggage fees may apply.",
                },
                {
                  question: "How early should I arrive at the airport?",
                  answer:
                    "We recommend arriving 2 hours early for domestic flights and 3 hours for international flights.",
                },
                {
                  question: "Can I get a refund for my ticket?",
                  answer:
                    "Refund eligibility depends on your ticket type. Please check your booking details or contact us.",
                },
              ].map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium text-slate-900">{faq.question}</h4>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

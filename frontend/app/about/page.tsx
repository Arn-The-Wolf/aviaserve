"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Users, Award, Globe, Shield, Heart, Zap, Leaf } from "lucide-react"

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

export default function AboutPage() {
  const stats = [
    { icon: Plane, value: "500+", label: "Aircraft Fleet" },
    { icon: Globe, value: "150+", label: "Destinations" },
    { icon: Users, value: "50M+", label: "Happy Passengers" },
    { icon: Award, value: "25+", label: "Industry Awards" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety is our top priority. We maintain the highest safety standards in the industry.",
    },
    {
      icon: Heart,
      title: "Customer Care",
      description: "We're committed to providing exceptional service and creating memorable travel experiences.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously invest in new technologies to enhance your travel experience.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We're dedicated to reducing our environmental impact and promoting sustainable travel.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "With over 20 years in aviation, Sarah leads AviaServe with vision and passion.",
    },
    {
      name: "Michael Chen",
      role: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Michael ensures our operations run smoothly and efficiently across all destinations.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Experience",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Emily is dedicated to making every passenger's journey exceptional and memorable.",
    },
  ]

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">About AviaServe</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Since 1995, AviaServe has been connecting people and places around the world with safe, reliable, and
          comfortable air travel. We're more than just an airline – we're your partner in creating unforgettable
          journeys.
        </p>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="relative h-96 rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=600&fit=crop"
            alt="AviaServe Aircraft"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Your Journey Begins Here</h2>
            <p className="text-lg">Experience the AviaServe difference</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Our Story */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-16"
      >
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 1995 with a single aircraft and a dream to make air travel accessible to everyone, AviaServe
                has grown to become one of the world's leading airlines. Our journey began with a simple mission: to
                connect people and places while providing exceptional service and safety.
              </p>
              <p>
                Over the years, we've expanded our fleet, increased our destinations, and continuously improved our
                services. Today, we operate over 500 modern aircraft, serving more than 150 destinations across six
                continents, and we're proud to have carried over 50 million passengers safely to their destinations.
              </p>
              <p>
                Our commitment to innovation, sustainability, and customer satisfaction has earned us numerous industry
                awards and, more importantly, the trust of millions of travelers worldwide.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600&h=400&fit=crop"
              alt="AviaServe History"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Our Values */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do and shape the way we serve our customers and communities.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leadership Team */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the experienced leaders who guide AviaServe's mission to provide exceptional air travel experiences.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{member.name}</h3>
                  <Badge variant="outline" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Awards & Recognition */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-16"
      >
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              We're honored to be recognized by industry leaders and passengers alike for our commitment to excellence.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="text-2xl font-bold">2024</div>
                <div className="text-sm">Best Airline Service</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2023</div>
                <div className="text-sm">Safety Excellence Award</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2022</div>
                <div className="text-sm">Customer Choice Award</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Fly with Us?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience the AviaServe difference on your next journey. Book your flight today and discover why millions of
          travelers choose us for their adventures around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/flights"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Book Your Flight
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

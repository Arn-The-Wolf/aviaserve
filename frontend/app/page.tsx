"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Check, Globe, Shield, Star } from "lucide-react"
import AnimatedHero from "@/components/animations/animated-hero"
import TestimonialCard from "@/components/home/testimonial-card"
import PartnerLogos from "@/components/home/partner-logos"
import FlightSearchWidget from "@/components/home/flight-search-widget"
import StatsSection from "@/components/home/stats-section"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-slate-50 py-20 md:py-32 overflow-hidden">
        <motion.div className="container px-4 md:px-6" initial="initial" animate="animate" variants={staggerContainer}>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <motion.div className="flex flex-col justify-center space-y-4" variants={fadeInUp}>
              <div className="space-y-2">
                <motion.div className="inline-block" variants={fadeInUp}>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    Your Journey Begins Here
                  </span>
                </motion.div>
                <motion.h1
                  className="text-4xl font-bold tracking-tighter text-slate-900 sm:text-5xl xl:text-6xl/none"
                  variants={fadeInUp}
                >
                  Fly Beyond Expectations with{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                    AviaServe
                  </span>
                </motion.h1>
                <motion.p className="max-w-[600px] text-gray-600 md:text-xl" variants={fadeInUp}>
                  Experience premium travel with comfort, reliability, and exceptional service. Book your next adventure
                  and discover destinations worldwide with our award-winning airline.
                </motion.p>
              </div>
              <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={fadeInUp}>
                <Link href="/flights">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/auth/login">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      Sign In
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div className="flex items-center justify-center" variants={scaleIn}>
              <AnimatedHero />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Flight Search Widget */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <FlightSearchWidget />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 md:py-24">
        <StatsSection />
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <motion.div
          className="container px-4 md:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" variants={fadeInUp}>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl">
                Why Choose AviaServe
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience the difference with our premium airline services and state-of-the-art operations management.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12"
            variants={staggerContainer}
          >
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "Advanced safety management system with real-time incident tracking and 24/7 security monitoring.",
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
              },
              {
                icon: Star,
                title: "Premium Comfort",
                description: "Spacious seating, gourmet meals, and professional crew trained to the highest standards.",
                image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
              },
              {
                icon: Globe,
                title: "Global Network",
                description: "150+ destinations with advanced operations center managing every flight in real-time.",
                image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <motion.div
                      className="absolute bottom-4 left-4 rounded-full bg-white/20 backdrop-blur-sm p-3"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Destinations Showcase */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <motion.div
          className="container px-4 md:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl">
              Popular Destinations
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
              Discover amazing destinations around the world with AviaServe Airlines.
            </p>
          </motion.div>

          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
            {[
              {
                city: "Paris",
                country: "France",
                price: "From $599",
                image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=400&fit=crop",
              },
              {
                city: "Tokyo",
                country: "Japan",
                price: "From $899",
                image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=400&fit=crop",
              },
              {
                city: "New York",
                country: "USA",
                price: "From $399",
                image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop",
              },
              {
                city: "Dubai",
                country: "UAE",
                price: "From $799",
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=400&fit=crop",
              },
              {
                city: "London",
                country: "UK",
                price: "From $549",
                image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop",
              },
              {
                city: "Sydney",
                country: "Australia",
                price: "From $1,299",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
              },
            ].map((destination, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.city}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{destination.city}</h3>
                      <p className="text-white/90">{destination.country}</p>
                      <p className="text-blue-300 font-semibold mt-1">{destination.price}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Link href="/destinations">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                View All Destinations
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Loyalty Program */}
      <section className="w-full bg-slate-900 py-12 md:py-24 lg:py-32 text-white">
        <motion.div
          className="container px-4 md:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.div className="flex flex-col justify-center space-y-4" variants={fadeInUp}>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  AviaServe Rewards Program
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our loyalty program and enjoy exclusive benefits, earn points with every flight, and redeem them
                  for free flights and upgrades.
                </p>
              </div>
              <motion.ul className="grid gap-2" variants={staggerContainer}>
                {[
                  "Earn points with every flight",
                  "Priority boarding and check-in",
                  "Access to exclusive lounges",
                  "Free upgrades and companion tickets",
                ].map((benefit, index) => (
                  <motion.li key={index} className="flex items-center gap-2" variants={fadeInUp}>
                    <Check className="h-5 w-5 text-green-400" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeInUp}>
                <Link href="/auth/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Join Now</Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div className="flex items-center justify-center" variants={scaleIn}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image
                  src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600&h=400&fit=crop"
                  width={600}
                  height={400}
                  alt="Loyalty Program"
                  className="rounded-lg object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <motion.div
          className="container px-4 md:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" variants={fadeInUp}>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl">
                What Our Passengers Say
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our satisfied customers about their experience flying with AviaServe Airlines.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12"
            variants={staggerContainer}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Business Traveler",
                content:
                  "AviaServe has transformed my business travel experience. The comfort, punctuality, and service are unmatched.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
              },
              {
                name: "Michael Chen",
                role: "Frequent Flyer",
                content:
                  "As a frequent flyer, I appreciate the consistency and quality of service. The loyalty program benefits are excellent.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
              },
              {
                name: "Emma Rodriguez",
                role: "Family Traveler",
                content:
                  "Traveling with kids can be challenging, but AviaServe made it easy and enjoyable. The staff was incredibly helpful.",
                rating: 4,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Partner Airlines */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <motion.div
          className="container px-4 md:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" variants={fadeInUp}>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900">Our Trusted Partners</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We partner with leading airlines to provide you with the best global connectivity.
              </p>
            </div>
          </motion.div>
          <motion.div className="mx-auto py-8" variants={fadeInUp}>
            <PartnerLogos />
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-blue-600 py-12 md:py-24 lg:py-32 text-white">
        <motion.div
          className="container px-4 md:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" variants={fadeInUp}>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready for Your Next Adventure?
              </h2>
              <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Book your flight today and experience the AviaServe difference. Your journey begins here.
              </p>
            </div>
            <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={fadeInUp}>
              <Link href="/flights">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">Search Flights</Button>
                </motion.div>
              </Link>
              <Link href="/auth/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Create Account
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

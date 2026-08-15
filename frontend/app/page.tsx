"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Check, Globe, Shield, Star, Plane } from "lucide-react"
import AnimatedHero from "@/components/animations/animated-hero"
import TestimonialCard from "@/components/home/testimonial-card"
import PartnerLogos from "@/components/home/partner-logos"
import FlightSearchWidget from "@/components/home/flight-search-widget"
import StatsSection from "@/components/home/stats-section"

const destinations = [
  {
    city: "Paris",
    country: "France",
    price: "From $599",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
  },
  {
    city: "Tokyo",
    country: "Japan",
    price: "From $899",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
  },
  {
    city: "New York",
    country: "USA",
    price: "From $399",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
  },
  {
    city: "Dubai",
    country: "UAE",
    price: "From $799",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
  },
  {
    city: "London",
    country: "UK",
    price: "From $549",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
  },
  {
    city: "Sydney",
    country: "Australia",
    price: "From $1,299",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  },
]

const features = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Advanced safety management with real-time incident tracking and 24/7 monitoring.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
  },
  {
    icon: Star,
    title: "Premium Comfort",
    description: "Spacious seating, gourmet meals, and crew trained to the highest standards.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "150+ destinations with an operations center managing every flight in real time.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-[#04101f] pb-28 pt-10 text-white md:pb-32 md:pt-16">
        <div className="starfield pointer-events-none absolute inset-0">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              style={{
                top: `${8 + ((i * 17) % 80)}%`,
                left: `${4 + ((i * 23) % 92)}%`,
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>
        <div className="avia-aurora pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="avia-aurora pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <Plane className="avia-fly pointer-events-none absolute top-16 z-20 h-10 w-10 text-sky-200" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="avia-rise avia-rise-delay-1 mb-4 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                Your journey begins here
              </p>
              <h1 className="avia-rise avia-rise-delay-2 text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                Fly beyond expectations with{" "}
                <span className="bg-gradient-to-r from-sky-300 to-blue-200 bg-clip-text text-transparent">
                  AviaServe
                </span>
              </h1>
              <p className="avia-rise avia-rise-delay-3 mt-4 max-w-xl text-lg text-slate-300">
                Search, book, check in, and follow your trip — with an operations center built for real airline workflows.
              </p>
              <div className="avia-rise avia-rise-delay-4 mt-8 flex flex-wrap gap-3">
                <Link href="/flights">
                  <Button className="h-12 bg-sky-500 px-6 text-white hover:bg-sky-400">
                    Book now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/operations">
                  <Button variant="outline" className="h-12 border-white/20 bg-white/5 text-white hover:bg-white/10">
                    Operations center
                  </Button>
                </Link>
              </div>
            </div>
            <div className="avia-rise avia-rise-delay-3">
              <AnimatedHero />
            </div>
          </div>
        </div>

        <div className="avia-rise avia-rise-delay-4 relative z-20 mx-auto mt-12 w-full max-w-6xl px-4">
          <FlightSearchWidget />
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <StatsSection />
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-kicker">Why fly with us</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Why choose AviaServe</h2>
            <p className="mt-3 text-lg text-slate-600">
              Premium passenger service paired with airline-grade operations.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="overflow-hidden border-slate-100 shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="section-kicker">Explore</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Popular destinations</h2>
            <p className="mt-3 text-lg text-slate-600">Discover cities around the world with AviaServe.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link key={destination.city} href={`/flights?destination=${encodeURIComponent(destination.city)}`}>
                <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.city}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{destination.city}</h3>
                      <p className="text-white/85">{destination.country}</p>
                      <p className="mt-1 font-semibold text-sky-300">{destination.price}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/destinations">
              <Button variant="outline" className="border-sky-300 text-sky-700 hover:bg-sky-50">
                View all destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#071a33] py-16 text-white md:py-24">
        <div className="avia-aurora pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="container relative grid items-center gap-10 px-4 md:px-6 lg:grid-cols-2">
          <div>
            <p className="section-kicker border-sky-400/20 bg-sky-400/10 text-sky-200">Rewards</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">AviaServe Rewards</h2>
            <p className="mt-4 max-w-xl text-lg text-slate-300">
              Earn points on every flight and unlock lounge access, upgrades, and priority boarding.
            </p>
            <ul className="mt-6 grid gap-3">
              {[
                "Earn points with every flight",
                "Priority boarding and check-in",
                "Access to exclusive lounges",
                "Free upgrades and companion tickets",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-slate-100">
                  <Check className="h-5 w-5 text-emerald-400" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link href="/auth/register" className="mt-8 inline-block">
              <Button className="bg-sky-500 text-white hover:bg-sky-400">Join now</Button>
            </Link>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1200&h=800&fit=crop"
              width={600}
              height={400}
              alt="Loyalty program"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="section-kicker">Stories</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What our passengers say</h2>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
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
            ].map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Trusted partners</h2>
            <p className="mt-2 text-slate-600">Global connectivity through leading airline alliances.</p>
          </div>
          <PartnerLogos />
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-sky-600 to-blue-700 py-16 text-white md:py-24">
        <Plane className="avia-float pointer-events-none absolute right-10 top-8 h-16 w-16 text-white/20" />
        <div className="container relative px-4 text-center md:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready for your next adventure?</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-sky-50">
            Book today and walk the full passenger flow — search, seats, extras, and checkout.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/flights">
              <Button className="h-12 bg-white text-sky-700 hover:bg-sky-50">Search flights</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" className="h-12 border-white/40 bg-transparent text-white hover:bg-white/10">
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

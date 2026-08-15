"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Plane } from "lucide-react"

const destinations = [
  {
    id: 1,
    city: "Paris",
    country: "France",
    continent: "Europe",
    airportCode: "CDG",
    description: "The City of Light awaits with its iconic landmarks, world-class museums, and romantic atmosphere.",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop",
    price: 599,
    rating: 4.8,
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"],
    bestTime: "Apr-Jun, Sep-Oct",
    flightTime: "7h 30m",
  },
  {
    id: 2,
    city: "Tokyo",
    country: "Japan",
    continent: "Asia",
    airportCode: "HND",
    description: "Experience the perfect blend of traditional culture and cutting-edge technology.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    price: 899,
    rating: 4.9,
    attractions: ["Senso-ji Temple", "Tokyo Skytree", "Shibuya Crossing"],
    bestTime: "Mar-May, Sep-Nov",
    flightTime: "14h 20m",
  },
  {
    id: 3,
    city: "New York",
    country: "USA",
    continent: "North America",
    airportCode: "JFK",
    description: "The city that never sleeps offers endless entertainment, culture, and dining experiences.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
    price: 399,
    rating: 4.7,
    attractions: ["Statue of Liberty", "Central Park", "Times Square"],
    bestTime: "Apr-Jun, Sep-Nov",
    flightTime: "5h 45m",
  },
  {
    id: 4,
    city: "Dubai",
    country: "UAE",
    continent: "Asia",
    airportCode: "DXB",
    description: "A modern oasis in the desert with luxury shopping, stunning architecture, and world-class dining.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    price: 799,
    rating: 4.6,
    attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah"],
    bestTime: "Nov-Mar",
    flightTime: "12h 15m",
  },
  {
    id: 5,
    city: "London",
    country: "UK",
    continent: "Europe",
    airportCode: "LHR",
    description: "Rich history meets modern culture in this vibrant capital city.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
    price: 549,
    rating: 4.5,
    attractions: ["Big Ben", "British Museum", "Tower Bridge"],
    bestTime: "May-Sep",
    flightTime: "6h 50m",
  },
  {
    id: 6,
    city: "Sydney",
    country: "Australia",
    continent: "Oceania",
    airportCode: "SYD",
    description: "Beautiful harbors, iconic landmarks, and stunning beaches await in this vibrant city.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    price: 1299,
    rating: 4.8,
    attractions: ["Sydney Opera House", "Harbour Bridge", "Bondi Beach"],
    bestTime: "Sep-Nov, Mar-May",
    flightTime: "19h 30m",
  },
]

const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [continentFilter, setContinentFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const filteredDestinations = destinations
    .filter((dest) => {
      const matchesSearch =
        dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesContinent = continentFilter === "all" || dest.continent === continentFilter
      return matchesSearch && matchesContinent
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="pb-16">
      <section className="page-hero mb-8">
        <div className="container">
          <p className="mb-3 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
            Network
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Explore destinations</h1>
          <p className="mt-2 max-w-2xl text-slate-200">
            From city lights to coastlines, AviaServe takes you there in comfort.
          </p>
        </div>
      </section>
      <div className="container">

      {/* Search and Filters */}
      <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={continentFilter} onValueChange={setContinentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Continents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Continents</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Destinations Grid */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredDestinations.map((destination, index) => (
          <motion.div key={destination.id} variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.city}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-slate-900">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {destination.rating}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{destination.city}</h3>
                  <p className="text-white/90 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.country}
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Top Attractions</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {destination.attractions.slice(0, 2).map((attraction, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {attraction}
                        </Badge>
                      ))}
                      {destination.attractions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{destination.attractions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Best Time</p>
                      <p className="font-medium">{destination.bestTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Flight Time</p>
                      <p className="font-medium flex items-center">
                        <Plane className="h-3 w-3 mr-1" />
                        {destination.flightTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-blue-600">${destination.price}</p>
                  </div>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/flights?origin=JFK&destination=${destination.airportCode}`}>
                      Book Flight
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredDestinations.length === 0 && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </motion.div>
      )}
      </div>
    </div>
  )
}

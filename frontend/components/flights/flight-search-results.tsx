"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Wifi, Coffee, Monitor, Loader2 } from "lucide-react"
import FlightCard from "@/components/flights/flight-card"

// Mock flight data
const generateFlights = (origin: string, destination: string, date?: Date) => {
  if (!origin || !destination || !date) return []

  const airlines = [
    { code: "SW", name: "SkyWings Airlines" },
    { code: "DL", name: "Delta Airlines" },
    { code: "UA", name: "United Airlines" },
    { code: "AA", name: "American Airlines" },
    { code: "BA", name: "British Airways" },
  ]

  const flights = []
  const baseDate = date ? new Date(date) : new Date()

  for (let i = 0; i < 8; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)]
    const flightNumber = `${airline.code}${Math.floor(Math.random() * 1000) + 1000}`

    const departureHour = 6 + Math.floor(Math.random() * 12)
    const departureMinute = Math.floor(Math.random() * 60)
    const departureDate = new Date(baseDate)
    departureDate.setHours(departureHour, departureMinute, 0)

    const durationHours = 1 + Math.floor(Math.random() * 5)
    const durationMinutes = Math.floor(Math.random() * 60)

    const arrivalDate = new Date(departureDate)
    arrivalDate.setHours(departureDate.getHours() + durationHours, departureDate.getMinutes() + durationMinutes)

    const price = 150 + Math.floor(Math.random() * 500)

    flights.push({
      id: `flight-${i}`,
      flightNumber,
      airline: airline.name,
      origin,
      destination,
      departureDate: departureDate.toISOString(),
      arrivalDate: arrivalDate.toISOString(),
      duration: { hours: durationHours, minutes: durationMinutes },
      price,
      stops: Math.random() > 0.7 ? 1 : 0,
      amenities: {
        wifi: Math.random() > 0.5,
        entertainment: Math.random() > 0.3,
        power: Math.random() > 0.4,
        food: Math.random() > 0.6,
      },
    })
  }

  return flights.sort((a, b) => a.price - b.price)
}

interface FlightSearchResultsProps {
  origin: string
  destination: string
  departureDate?: Date
  returnDate?: Date
  cabinClass: string
}

export default function FlightSearchResults({
  origin,
  destination,
  departureDate,
  returnDate,
  cabinClass,
}: FlightSearchResultsProps) {
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("price")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedStops, setSelectedStops] = useState<number[]>([])

  // Generate mock flights
  const outboundFlights = generateFlights(origin, destination, departureDate)
  const returnFlights = returnDate ? generateFlights(destination, origin, returnDate) : []

  // Simulate API loading
  useState(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  })

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-sky-blue" />
        <p className="mt-4 text-lg font-medium">Searching for the best flights...</p>
        <p className="text-gray-500">This may take a few moments</p>
      </div>
    )
  }

  // Get airport names from codes
  const getAirportName = (code: string) => {
    const airports = {
      JFK: "New York",
      LAX: "Los Angeles",
      ORD: "Chicago",
      MIA: "Miami",
      SFO: "San Francisco",
      LHR: "London",
      CDG: "Paris",
      DXB: "Dubai",
      HND: "Tokyo",
      SYD: "Sydney",
    }
    return airports[code as keyof typeof airports] || code
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-navy-blue">
          Flights from {getAirportName(origin)} to {getAirportName(destination)}
        </h2>
        <p className="text-gray-500">
          {departureDate?.toLocaleDateString()}
          {returnDate ? ` - ${returnDate.toLocaleDateString()}` : ""}
          {" • "}
          {cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1)}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filter Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-medium">Sort by</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price (Lowest first)</SelectItem>
                    <SelectItem value="duration">Duration (Shortest first)</SelectItem>
                    <SelectItem value="departure">Departure (Earliest first)</SelectItem>
                    <SelectItem value="arrival">Arrival (Earliest first)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Stops</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedStops.includes(0) ? "default" : "outline"}
                    size="sm"
                    className={selectedStops.includes(0) ? "bg-sky-blue text-white" : ""}
                    onClick={() => {
                      if (selectedStops.includes(0)) {
                        setSelectedStops(selectedStops.filter((s) => s !== 0))
                      } else {
                        setSelectedStops([...selectedStops, 0])
                      }
                    }}
                  >
                    Nonstop
                  </Button>
                  <Button
                    variant={selectedStops.includes(1) ? "default" : "outline"}
                    size="sm"
                    className={selectedStops.includes(1) ? "bg-sky-blue text-white" : ""}
                    onClick={() => {
                      if (selectedStops.includes(1)) {
                        setSelectedStops(selectedStops.filter((s) => s !== 1))
                      } else {
                        setSelectedStops([...selectedStops, 1])
                      }
                    }}
                  >
                    1 Stop
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Airlines</h3>
                <div className="space-y-2">
                  {["SkyWings Airlines", "Delta Airlines", "United Airlines"].map((airline) => (
                    <Button
                      key={airline}
                      variant={selectedAirlines.includes(airline) ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-start ${selectedAirlines.includes(airline) ? "bg-sky-blue text-white" : ""}`}
                      onClick={() => {
                        if (selectedAirlines.includes(airline)) {
                          setSelectedAirlines(selectedAirlines.filter((a) => a !== airline))
                        } else {
                          setSelectedAirlines([...selectedAirlines, airline])
                        }
                      }}
                    >
                      {airline}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Amenities</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-sky-blue" />
                    <span className="text-sm">Wi-Fi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4 text-sky-blue" />
                    <span className="text-sm">In-flight Entertainment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coffee className="h-4 w-4 text-sky-blue" />
                    <span className="text-sm">Complimentary Meals</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div>
            <h3 className="mb-4 text-xl font-bold text-navy-blue">Outbound Flight</h3>
            <div className="space-y-4">
              {outboundFlights.length > 0 ? (
                outboundFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={() => {
                      // In a real app, you would store the selected flight
                      // and navigate to the next step
                    }}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <p className="text-center">No flights found for the selected criteria.</p>
                    <p className="text-center text-gray-500">Try adjusting your search parameters.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {returnDate && (
            <div>
              <h3 className="mb-4 text-xl font-bold text-navy-blue">Return Flight</h3>
              <div className="space-y-4">
                {returnFlights.length > 0 ? (
                  returnFlights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      onSelect={() => {
                        // In a real app, you would store the selected flight
                        // and navigate to the next step
                      }}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <p className="text-center">No flights found for the selected criteria.</p>
                      <p className="text-center text-gray-500">Try adjusting your search parameters.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search } from "lucide-react"
import FlightSearchResults from "@/components/flights/flight-search-results"

const airports = [
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles" },
  { code: "ORD", name: "O'Hare International Airport", city: "Chicago" },
  { code: "MIA", name: "Miami International Airport", city: "Miami" },
  { code: "SFO", name: "San Francisco International Airport", city: "San Francisco" },
  { code: "LHR", name: "Heathrow Airport", city: "London" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris" },
  { code: "DXB", name: "Dubai International Airport", city: "Dubai" },
  { code: "HND", name: "Haneda Airport", city: "Tokyo" },
  { code: "SYD", name: "Sydney Airport", city: "Sydney" },
]

const cityToCode: Record<string, string> = {
  Paris: "CDG",
  Tokyo: "HND",
  "New York": "JFK",
  Dubai: "DXB",
  London: "LHR",
  Sydney: "SYD",
  "Los Angeles": "LAX",
  Chicago: "ORD",
  Miami: "MIA",
  "San Francisco": "SFO",
}

const startOfToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

function parseFlightSearch(searchParams: URLSearchParams) {
  const destinationParam = searchParams.get("destination") || ""
  const resolvedDestination = cityToCode[destinationParam] || destinationParam
  const originParam = searchParams.get("origin") || (resolvedDestination ? "JFK" : "")
  const dateParam = searchParams.get("date")
  const passengersParam = searchParams.get("passengers") || "1"
  let departureDate: Date | undefined
  if (dateParam) {
    const parsed = new Date(`${dateParam}T12:00:00`)
    if (!Number.isNaN(parsed.getTime())) departureDate = parsed
  } else if (originParam && resolvedDestination) {
    departureDate = new Date()
    departureDate.setDate(departureDate.getDate() + 7)
  }
  return {
    origin: originParam,
    destination: resolvedDestination,
    departureDate,
    passengers: passengersParam,
    showResults: Boolean(originParam && resolvedDestination && departureDate),
  }
}

function FlightsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initial = parseFlightSearch(searchParams)
  const [tripType, setTripType] = useState("roundTrip")
  const [origin, setOrigin] = useState(initial.origin)
  const [destination, setDestination] = useState(initial.destination)
  const [departureDate, setDepartureDate] = useState<Date | undefined>(initial.departureDate)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  const [passengers, setPassengers] = useState(initial.passengers)
  const [cabinClass, setCabinClass] = useState("economy")
  const [showResults, setShowResults] = useState(initial.showResults)

  useEffect(() => {
    const next = parseFlightSearch(searchParams)
    setOrigin(next.origin)
    setDestination(next.destination)
    setDepartureDate(next.departureDate)
    setPassengers(next.passengers)
    if (next.showResults) setShowResults(true)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!origin || !destination || !departureDate) {
      return
    }
    const params = new URLSearchParams({
      origin,
      destination,
      date: format(departureDate, "yyyy-MM-dd"),
      passengers,
    })
    router.replace(`/flights?${params.toString()}`)
    setShowResults(true)
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-blue">Find Your Flight</h1>
        <p className="text-gray-500">Search for flights to destinations worldwide</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Flight Search</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roundTrip" onValueChange={setTripType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="roundTrip">Round Trip</TabsTrigger>
              <TabsTrigger value="oneWay">One Way</TabsTrigger>
              <TabsTrigger value="multiCity">Multi-City</TabsTrigger>
            </TabsList>
            <TabsContent value="roundTrip">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="origin">From</Label>
                    <Select value={origin} onValueChange={setOrigin} required>
                      <SelectTrigger id="origin" className="w-full">
                        <SelectValue placeholder="Select departure airport" />
                      </SelectTrigger>
                      <SelectContent>
                        {airports.map((airport) => (
                          <SelectItem key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">To</Label>
                    <Select value={destination} onValueChange={setDestination} required>
                      <SelectTrigger id="destination" className="w-full">
                        <SelectValue placeholder="Select arrival airport" />
                      </SelectTrigger>
                      <SelectContent>
                        {airports.map((airport) => (
                          <SelectItem key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="departureDate"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? format(departureDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={departureDate}
                          onSelect={setDepartureDate}
                          initialFocus
                          disabled={(date) => date < startOfToday()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="returnDate">Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="returnDate"
                          disabled={tripType === "oneWay"}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                          disabled={(date) => date < startOfToday() || (departureDate ? date < departureDate : false)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Passengers</Label>
                    <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger id="passengers" className="w-full">
                        <SelectValue placeholder="Select number of passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Passenger" : "Passengers"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cabinClass">Cabin Class</Label>
                    <Select value={cabinClass} onValueChange={setCabinClass}>
                      <SelectTrigger id="cabinClass" className="w-full">
                        <SelectValue placeholder="Select cabin class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premiumEconomy">Premium Economy</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="first">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white">
                  <Search className="mr-2 h-4 w-4" />
                  Search Flights
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="oneWay">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="origin-one-way">From</Label>
                    <Select value={origin} onValueChange={setOrigin} required>
                      <SelectTrigger id="origin-one-way" className="w-full">
                        <SelectValue placeholder="Select departure airport" />
                      </SelectTrigger>
                      <SelectContent>
                        {airports.map((airport) => (
                          <SelectItem key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination-one-way">To</Label>
                    <Select value={destination} onValueChange={setDestination} required>
                      <SelectTrigger id="destination-one-way" className="w-full">
                        <SelectValue placeholder="Select arrival airport" />
                      </SelectTrigger>
                      <SelectContent>
                        {airports.map((airport) => (
                          <SelectItem key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate-one-way">Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="departureDate-one-way"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? format(departureDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={departureDate}
                          onSelect={setDepartureDate}
                          initialFocus
                          disabled={(date) => date < startOfToday()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="passengers-one-way">Passengers</Label>
                      <Select value={passengers} onValueChange={setPassengers}>
                        <SelectTrigger id="passengers-one-way" className="w-full">
                          <SelectValue placeholder="Passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cabinClass-one-way">Class</Label>
                      <Select value={cabinClass} onValueChange={setCabinClass}>
                        <SelectTrigger id="cabinClass-one-way" className="w-full">
                          <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="premiumEconomy">Premium Economy</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="first">First Class</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white">
                  <Search className="mr-2 h-4 w-4" />
                  Search Flights
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="multiCity">
              <div className="p-4 text-center">
                <p>Multi-city search coming soon!</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && origin && destination && departureDate && (
        <FlightSearchResults
          origin={origin}
          destination={destination}
          departureDate={departureDate}
          returnDate={returnDate}
          cabinClass={cabinClass}
        />
      )}
    </div>
  )
}

export default function FlightsPageWithSuspense() {
  return (
    <Suspense fallback={<div className="container py-8">Loading flights...</div>}>
      <FlightsPage />
    </Suspense>
  )
}

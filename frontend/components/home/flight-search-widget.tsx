"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search, ArrowLeftRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const airports = [
  { code: "JFK", name: "New York" },
  { code: "LAX", name: "Los Angeles" },
  { code: "ORD", name: "Chicago" },
  { code: "MIA", name: "Miami" },
  { code: "SFO", name: "San Francisco" },
  { code: "LHR", name: "London" },
  { code: "CDG", name: "Paris" },
  { code: "DXB", name: "Dubai" },
]

export default function FlightSearchWidget() {
  const router = useRouter()
  const { toast } = useToast()
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)
  const [passengers, setPassengers] = useState("1")

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      toast({
        title: "Complete your search",
        description: "Please choose origin, destination, and departure date.",
        variant: "destructive",
      })
      return
    }
    const params = new URLSearchParams({
      origin,
      destination,
      date: format(departureDate, "yyyy-MM-dd"),
      passengers,
    })
    router.push(`/flights?${params.toString()}`)
  }

  const swapAirports = () => {
    const temp = origin
    setOrigin(destination)
    setDestination(temp)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-5 md:gap-2">
            <div className="space-y-2">
              <Label htmlFor="origin-widget" className="text-sm font-medium">
                From
              </Label>
              <Select value={origin} onValueChange={setOrigin}>
                <SelectTrigger id="origin-widget" className="w-full">
                  <SelectValue placeholder="Origin" />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end justify-center">
              <motion.button
                onClick={swapAirports}
                className="p-2 rounded-full hover:bg-sky-blue/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeftRight className="h-4 w-4 text-sky-blue" />
              </motion.button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination-widget" className="text-sm font-medium">
                To
              </Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="destination-widget" className="w-full">
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Departure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? format(departureDate, "MMM dd") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Passengers</Label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Passengers" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <motion.div className="mt-6 flex justify-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSearch}
              className="bg-orange hover:bg-orange/90 text-white px-8 py-3 text-lg font-medium"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Flights
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
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
    setOrigin(destination)
    setDestination(origin)
  }

  return (
    <Card className="border-0 bg-white/95 shadow-2xl shadow-slate-900/20 backdrop-blur-xl">
      <CardContent className="p-5 md:p-7">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">Book a flight</p>
          <p className="text-xs text-slate-500">One-way search • Demo inventory</p>
        </div>
        <div className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto]">
          <div className="space-y-2">
            <Label htmlFor="origin-widget">From</Label>
            <Select value={origin} onValueChange={setOrigin}>
              <SelectTrigger id="origin-widget" className="h-12 w-full bg-slate-50">
                <SelectValue placeholder="Origin" />
              </SelectTrigger>
              <SelectContent>
                {airports.map((airport) => (
                  <SelectItem key={airport.code} value={airport.code}>
                    {airport.name} ({airport.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={swapAirports}
            className="mb-1 hidden h-12 w-12 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-sky-600 transition hover:bg-sky-100 md:flex"
            aria-label="Swap origin and destination"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>

          <div className="space-y-2">
            <Label htmlFor="destination-widget">To</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger id="destination-widget" className="h-12 w-full bg-slate-50">
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                {airports.map((airport) => (
                  <SelectItem key={airport.code} value={airport.code}>
                    {airport.name} ({airport.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Departure</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-12 w-full justify-start bg-slate-50 font-normal">
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
            <Label>Passengers</Label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className="h-12 w-full bg-slate-50">
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

          <Button onClick={handleSearch} className="h-12 bg-sky-500 px-6 text-white hover:bg-sky-400">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

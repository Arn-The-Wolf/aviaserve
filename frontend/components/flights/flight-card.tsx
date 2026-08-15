"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, ArrowRight, Wifi, Coffee, Monitor, Power } from "lucide-react"

interface Flight {
  id: string
  flightNumber: string
  airline: string
  origin: string
  destination: string
  departureDate: string
  arrivalDate: string
  duration: { hours: number; minutes: number }
  price: number
  stops: number
  amenities: {
    wifi: boolean
    entertainment: boolean
    power: boolean
    food: boolean
  }
}

interface FlightCardProps {
  flight: Flight
  onSelect: () => void
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const departureDate = new Date(flight.departureDate)
  const arrivalDate = new Date(flight.arrivalDate)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
    <Card className="overflow-hidden border-slate-100 shadow-lg shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-sky-blue/10 flex items-center justify-center">
                  <Plane className="h-4 w-4 text-sky-blue" />
                </div>
                <div className="ml-2">
                  <div className="font-medium">{flight.airline}</div>
                  <div className="text-xs text-gray-500">{flight.flightNumber}</div>
                </div>
              </div>
              {flight.stops === 0 ? (
                <Badge className="bg-emerald-green text-white">Nonstop</Badge>
              ) : (
                <Badge variant="outline">{flight.stops} Stop</Badge>
              )}
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex flex-col space-y-1">
                <div className="text-2xl font-bold">{formatTime(departureDate)}</div>
                <div className="text-sm text-gray-500">{getAirportName(flight.origin)}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500">
                  {flight.duration.hours}h {flight.duration.minutes}m
                </div>
                <div className="relative w-24 md:w-32">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div className="text-xs text-gray-500">{flight.stops === 0 ? "Direct" : `${flight.stops} Stop`}</div>
              </div>
              <div className="flex flex-col space-y-1 text-right">
                <div className="text-2xl font-bold">{formatTime(arrivalDate)}</div>
                <div className="text-sm text-gray-500">{getAirportName(flight.destination)}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {flight.amenities.wifi && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Wifi className="h-3 w-3" />
                  <span>Wi-Fi</span>
                </Badge>
              )}
              {flight.amenities.entertainment && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Monitor className="h-3 w-3" />
                  <span>Entertainment</span>
                </Badge>
              )}
              {flight.amenities.power && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Power className="h-3 w-3" />
                  <span>Power</span>
                </Badge>
              )}
              {flight.amenities.food && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Coffee className="h-3 w-3" />
                  <span>Meals</span>
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-between bg-sky-50 p-4 md:w-48 md:flex-col">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">${flight.price}</div>
              <div className="text-xs text-gray-500">per passenger</div>
            </div>
            <Button onClick={onSelect} className="bg-sky-500 text-white hover:bg-sky-400">
              Select
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

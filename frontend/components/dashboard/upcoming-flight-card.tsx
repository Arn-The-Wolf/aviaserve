import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Calendar, ArrowRight } from "lucide-react"

interface Flight {
  id: string
  flightNumber: string
  origin: string
  destination: string
  departureDate: string
  arrivalDate: string
  status: string
}

interface UpcomingFlightCardProps {
  flight: Flight
}

export default function UpcomingFlightCard({ flight }: UpcomingFlightCardProps) {
  const departureDate = new Date(flight.departureDate)
  const arrivalDate = new Date(flight.arrivalDate)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-green text-white"
      case "completed":
        return "bg-gray-500 text-white"
      case "cancelled":
        return "bg-crimson-red text-white"
      default:
        return "bg-sky-blue text-white"
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-sky-blue/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plane className="h-4 w-4 text-sky-blue" />
              <span className="font-medium">{flight.flightNumber}</span>
            </div>
            <Badge className={getStatusColor(flight.status)}>{flight.status}</Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex flex-col space-y-1">
              <div className="text-2xl font-bold">{formatTime(departureDate)}</div>
              <div className="text-sm text-gray-500">{flight.origin}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500">
                {Math.round((arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60))}h{" "}
                {Math.round(((arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60)) % 60)}m
              </div>
              <div className="relative w-24">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="text-xs text-gray-500">Direct</div>
            </div>
            <div className="flex flex-col space-y-1 text-right">
              <div className="text-2xl font-bold">{formatTime(arrivalDate)}</div>
              <div className="text-sm text-gray-500">{flight.destination}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(departureDate)}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {flight.status === "Confirmed" && (
              <>
                <Link href={`/dashboard/bookings/${flight.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <Link href={`/dashboard/check-in/${flight.id}`}>
                  <Button size="sm" className="bg-sky-blue hover:bg-sky-blue/90 text-white">
                    Check-in
                  </Button>
                </Link>
              </>
            )}
            {flight.status === "Completed" && (
              <Link href={`/dashboard/bookings/${flight.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

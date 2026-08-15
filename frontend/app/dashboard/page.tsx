"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, CreditCard, MapPin, Award, Ticket } from "lucide-react"
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton"
import UpcomingFlightCard from "@/components/dashboard/upcoming-flight-card"
import LoyaltyCard from "@/components/dashboard/loyalty-card"

// Mock data
const upcomingFlights = [
  {
    id: "1",
    flightNumber: "SW1234",
    origin: "New York (JFK)",
    destination: "Los Angeles (LAX)",
    departureDate: "2025-06-15T08:30:00",
    arrivalDate: "2025-06-15T11:45:00",
    status: "Confirmed",
  },
  {
    id: "2",
    flightNumber: "SW5678",
    origin: "Los Angeles (LAX)",
    destination: "New York (JFK)",
    departureDate: "2025-06-22T16:15:00",
    arrivalDate: "2025-06-22T23:30:00",
    status: "Confirmed",
  },
]

const recentBookings = [
  {
    id: "3",
    flightNumber: "SW9012",
    origin: "New York (JFK)",
    destination: "Miami (MIA)",
    departureDate: "2025-05-10T10:00:00",
    arrivalDate: "2025-05-10T13:15:00",
    status: "Completed",
  },
  {
    id: "4",
    flightNumber: "SW3456",
    origin: "Miami (MIA)",
    destination: "New York (JFK)",
    departureDate: "2025-05-17T14:30:00",
    arrivalDate: "2025-05-17T17:45:00",
    status: "Completed",
  },
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    if (!loading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  if (loading || isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="container py-8">
      <div className="mb-8 rounded-3xl bg-[#071a33] p-8 text-white shadow-xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Passenger hub</p>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
        <p className="mt-2 text-slate-300">Manage bookings, check-in, loyalty, and your profile.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Flights</CardTitle>
            <Plane className="h-4 w-4 text-sky-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingFlights.length}</div>
            <p className="text-xs text-gray-500">
              Your next flight is on {new Date(upcomingFlights[0].departureDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            <Award className="h-4 w-4 text-sky-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,280</div>
            <p className="text-xs text-gray-500">720 points until your next reward</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequent Flyer Status</CardTitle>
            <Award className="h-4 w-4 text-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Silver</div>
            <p className="text-xs text-gray-500">2 flights to Gold status</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Flights</TabsTrigger>
              <TabsTrigger value="recent">Recent Bookings</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4 pt-4">
              {upcomingFlights.map((flight) => (
                <UpcomingFlightCard key={flight.id} flight={flight} />
              ))}
              <div className="flex justify-center">
                <Link href="/flights">
                  <Button variant="outline" className="mt-2">
                    Book a New Flight
                  </Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="recent" className="space-y-4 pt-4">
              {recentBookings.map((flight) => (
                <UpcomingFlightCard key={flight.id} flight={flight} />
              ))}
              <div className="flex justify-center">
                <Link href="/dashboard/bookings">
                  <Button variant="outline" className="mt-2">
                    View All Bookings
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-6">
          <LoyaltyCard />
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to do</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/dashboard/check-in">
                <Button variant="outline" className="w-full justify-start">
                  <Ticket className="mr-2 h-4 w-4" />
                  Check-in for Flight
                </Button>
              </Link>
              <Link href="/dashboard/profile">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Payment Methods
                </Button>
              </Link>
              <Link href="/dashboard/loyalty">
                <Button variant="outline" className="w-full justify-start">
                  <Award className="mr-2 h-4 w-4" />
                  View Loyalty Benefits
                </Button>
              </Link>
              <Link href="/flights">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Explore Destinations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

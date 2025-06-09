"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, Edit, Trash2, Plane, Search } from "lucide-react"

// Mock flight data
const flights = [
  {
    id: "AVS1234",
    origin: "JFK",
    destination: "LAX",
    departureTime: "08:30",
    arrivalTime: "11:45",
    date: "2025-06-15",
    aircraft: "Boeing 737-800",
    status: "Scheduled",
    passengers: 156,
    capacity: 180,
    price: 299,
  },
  {
    id: "AVS5678",
    origin: "LAX",
    destination: "JFK",
    departureTime: "16:15",
    arrivalTime: "23:30",
    date: "2025-06-15",
    aircraft: "Airbus A320",
    status: "Boarding",
    passengers: 142,
    capacity: 160,
    price: 329,
  },
  {
    id: "AVS9012",
    origin: "ORD",
    destination: "MIA",
    departureTime: "10:00",
    arrivalTime: "13:15",
    date: "2025-06-16",
    aircraft: "Boeing 737-900",
    status: "Delayed",
    passengers: 98,
    capacity: 190,
    price: 249,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function FlightManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isAddFlightOpen, setIsAddFlightOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "boarding":
        return "bg-green-100 text-green-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredFlights = flights.filter(
    (flight) =>
      flight.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <motion.div initial="initial" animate="animate" variants={fadeInUp}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Flight Management</h2>
            <p className="text-gray-600">Manage flight schedules, aircraft assignments, and operations</p>
          </div>
          <Dialog open={isAddFlightOpen} onOpenChange={setIsAddFlightOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Flight
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Flight</DialogTitle>
                <DialogDescription>Create a new flight schedule with all necessary details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="flightNumber">Flight Number</Label>
                    <Input id="flightNumber" placeholder="AVS1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aircraft">Aircraft</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select aircraft" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boeing-737">Boeing 737-800</SelectItem>
                        <SelectItem value="airbus-a320">Airbus A320</SelectItem>
                        <SelectItem value="boeing-777">Boeing 777-300</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select origin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JFK">New York (JFK)</SelectItem>
                        <SelectItem value="LAX">Los Angeles (LAX)</SelectItem>
                        <SelectItem value="ORD">Chicago (ORD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JFK">New York (JFK)</SelectItem>
                        <SelectItem value="LAX">Los Angeles (LAX)</SelectItem>
                        <SelectItem value="ORD">Chicago (ORD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departureTime">Departure</Label>
                    <Input id="departureTime" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrivalTime">Arrival</Label>
                    <Input id="arrivalTime" type="time" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="180" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Base Price ($)</Label>
                    <Input id="price" type="number" placeholder="299" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddFlightOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Flight</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search flights by number, origin, or destination..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Flights</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="boarding">Boarding</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Flights Table */}
        <Card>
          <CardHeader>
            <CardTitle>Flight Schedule</CardTitle>
            <CardDescription>Manage and monitor all flight operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Plane className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{flight.id}</h3>
                        <p className="text-sm text-gray-600">{flight.aircraft}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                      <div>
                        <p className="text-sm text-gray-500">Route</p>
                        <p className="font-medium">
                          {flight.origin} → {flight.destination}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Schedule</p>
                        <p className="font-medium">
                          {flight.departureTime} - {flight.arrivalTime}
                        </p>
                        <p className="text-xs text-gray-500">{flight.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Passengers</p>
                        <p className="font-medium">
                          {flight.passengers}/{flight.capacity}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(flight.passengers / flight.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">${flight.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(flight.status)}>{flight.status}</Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

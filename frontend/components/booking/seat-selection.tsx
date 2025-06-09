"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Plane, User } from "lucide-react"
import { useBookingStore } from "@/lib/stores/booking-store"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

// Generate a mock airplane seat map
const generateSeatMap = () => {
  const rows = 20
  const seatsPerRow = 6
  const seatMap: { id: string; status: "available" | "occupied" | "selected"; type: "economy" | "premium" }[][] = []

  for (let row = 1; row <= rows; row++) {
    const seatRow: { id: string; status: "available" | "occupied" | "selected"; type: "economy" | "premium" }[] = []
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const seatLetter = String.fromCharCode(65 + seat)
      const seatId = `${row}${seatLetter}`

      // Randomly mark some seats as occupied
      const isOccupied = Math.random() < 0.3
      const isPremium = row <= 3 // First 3 rows are premium

      seatRow.push({
        id: seatId,
        status: isOccupied ? "occupied" : "available",
        type: isPremium ? "premium" : "economy",
      })
    }
    seatMap.push(seatRow)
  }

  return seatMap
}

export default function SeatSelection() {
  const { toast } = useToast()
  const { passengers, selectedSeats, selectSeat } = useBookingStore()
  const [seatMap, setSeatMap] = useState(generateSeatMap())

  const handleSeatSelect = (seatId: string) => {
    const flatSeatMap = seatMap.flat()
    const seat = flatSeatMap.find((s) => s.id === seatId)

    if (!seat) return

    if (seat.status === "occupied") {
      toast({
        variant: "destructive",
        title: "Seat unavailable",
        description: "This seat is already taken. Please select another seat.",
      })
      return
    }

    if (selectedSeats.includes(seatId)) {
      const passengerIndex = selectedSeats.indexOf(seatId)

      const newSeatMap = [...seatMap]
      for (let row = 0; row < newSeatMap.length; row++) {
        for (let col = 0; col < newSeatMap[row].length; col++) {
          if (newSeatMap[row][col].id === seatId) {
            newSeatMap[row][col].status = "available"
          }
        }
      }
      setSeatMap(newSeatMap)

      selectSeat(passengerIndex, "")

      toast({
        title: "Seat unselected",
        description: `Seat ${seatId} has been unselected.`,
      })
      return
    }

    const nextPassengerIndex = selectedSeats.findIndex((s) => !s)

    if (nextPassengerIndex === -1) {
      toast({
        variant: "destructive",
        title: "All passengers have seats",
        description: "You've already selected seats for all passengers.",
      })
      return
    }

    const newSeatMap = [...seatMap]
    for (let row = 0; row < newSeatMap.length; row++) {
      for (let col = 0; col < newSeatMap[row].length; col++) {
        if (newSeatMap[row][col].id === seatId) {
          newSeatMap[row][col].status = "selected"
        }
      }
    }
    setSeatMap(newSeatMap)

    selectSeat(nextPassengerIndex, seatId)

    toast({
      title: "Seat selected",
      description: `Seat ${seatId} selected for ${passengers[nextPassengerIndex]?.name || `Passenger ${nextPassengerIndex + 1}`}.`,
    })
  }

  const getSeatColor = (seat: any) => {
    switch (seat.status) {
      case "occupied":
        return "bg-gray-400 cursor-not-allowed"
      case "selected":
        return "bg-blue-600 text-white"
      case "available":
        return seat.type === "premium"
          ? "bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
          : "bg-green-100 hover:bg-green-200 border-green-300"
      default:
        return "bg-gray-100"
    }
  }

  return (
    <motion.div initial="initial" animate="animate" variants={fadeInUp}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Select Your Seats
          </CardTitle>
          <CardDescription>Choose your preferred seats for all passengers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Passenger Status */}
          <div className="space-y-2">
            <h3 className="font-medium">Passengers</h3>
            <div className="grid gap-2">
              {passengers.map((passenger, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{passenger.name || `Passenger ${index + 1}`}</span>
                  </div>
                  <Badge variant={selectedSeats[index] ? "default" : "outline"}>
                    {selectedSeats[index] || "No seat selected"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
              <span>Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span>Occupied</span>
            </div>
          </div>

          {/* Seat Map */}
          <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <div className="text-center mb-4 text-sm text-gray-600">Front of Aircraft</div>
            <div className="space-y-2 min-w-max">
              {seatMap.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-2">
                  <div className="w-8 text-center text-sm font-medium text-gray-600">{rowIndex + 1}</div>
                  <div className="flex gap-1">
                    {row.slice(0, 3).map((seat) => (
                      <Button
                        key={seat.id}
                        variant="outline"
                        size="sm"
                        className={`w-8 h-8 p-0 text-xs ${getSeatColor(seat)}`}
                        onClick={() => handleSeatSelect(seat.id)}
                        disabled={seat.status === "occupied"}
                      >
                        {seat.id.slice(-1)}
                      </Button>
                    ))}
                  </div>
                  <div className="w-8"></div> {/* Aisle */}
                  <div className="flex gap-1">
                    {row.slice(3, 6).map((seat) => (
                      <Button
                        key={seat.id}
                        variant="outline"
                        size="sm"
                        className={`w-8 h-8 p-0 text-xs ${getSeatColor(seat)}`}
                        onClick={() => handleSeatSelect(seat.id)}
                        disabled={seat.status === "occupied"}
                      >
                        {seat.id.slice(-1)}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 text-sm text-gray-600">Back of Aircraft</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { User, Plus, Trash2 } from "lucide-react"
import { useBookingStore } from "@/lib/stores/booking-store"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function PassengerForm() {
  const { toast } = useToast()
  const { passengers, addPassenger, updatePassenger, removePassenger } = useBookingStore()

  const handleAddPassenger = () => {
    addPassenger({
      name: "",
      type: "adult",
    })
  }

  const handleUpdatePassenger = (index: number, field: string, value: string) => {
    const updatedPassenger = { ...passengers[index], [field]: value }
    updatePassenger(index, updatedPassenger)
  }

  const handleRemovePassenger = (index: number) => {
    removePassenger(index)
    toast({
      title: "Passenger removed",
      description: "The passenger has been removed from your booking.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900">Passenger Information</h2>
        <Button onClick={handleAddPassenger} variant="outline" className="gap-1">
          <Plus className="h-4 w-4" /> Add Passenger
        </Button>
      </div>

      {passengers.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No passengers added yet.</p>
            <p className="text-gray-500 mb-4">Click the "Add Passenger" button to get started.</p>
            <Button onClick={handleAddPassenger} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" /> Add Passenger
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {passengers.map((passenger, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Passenger {index + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemovePassenger(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Enter passenger details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${index}`}>Full Name (as on ID/Passport)</Label>
                      <Input
                        id={`name-${index}`}
                        value={passenger.name}
                        onChange={(e) => handleUpdatePassenger(index, "name", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`type-${index}`}>Passenger Type</Label>
                      <Select
                        value={passenger.type}
                        onValueChange={(value) => handleUpdatePassenger(index, "type", value)}
                      >
                        <SelectTrigger id={`type-${index}`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adult">Adult (12+ years)</SelectItem>
                          <SelectItem value="child">Child (2-11 years)</SelectItem>
                          <SelectItem value="infant">Infant (under 2 years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`email-${index}`}>Email</Label>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        value={passenger.email || ""}
                        onChange={(e) => handleUpdatePassenger(index, "email", e.target.value)}
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                      <Input
                        id={`phone-${index}`}
                        value={passenger.phone || ""}
                        onChange={(e) => handleUpdatePassenger(index, "phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`dob-${index}`}>Date of Birth</Label>
                      <Input
                        id={`dob-${index}`}
                        type="date"
                        value={passenger.dateOfBirth || ""}
                        onChange={(e) => handleUpdatePassenger(index, "dateOfBirth", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`passport-${index}`}>Passport/ID Number</Label>
                      <Input
                        id={`passport-${index}`}
                        value={passenger.passportNumber || ""}
                        onChange={(e) => handleUpdatePassenger(index, "passportNumber", e.target.value)}
                        placeholder="AB1234567"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

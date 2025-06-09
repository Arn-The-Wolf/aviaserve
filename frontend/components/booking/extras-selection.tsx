"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Luggage, Utensils, Shield, Star, Wifi, Coffee } from "lucide-react"
import { useBookingStore } from "@/lib/stores/booking-store"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function ExtrasSelection() {
  const { passengers, extras, updateExtras, updateTotalPrice } = useBookingStore()

  const handleExtraChange = (key: string, value: any) => {
    updateExtras({ [key]: value })
    // Update total price when extras change
    setTimeout(updateTotalPrice, 0)
  }

  const extrasOptions = [
    {
      id: "baggage",
      title: "Extra Baggage",
      description: "Add checked baggage allowance",
      icon: Luggage,
      type: "select",
      options: [
        { value: 0, label: "No extra baggage", price: 0 },
        { value: 1, label: "1 extra bag (23kg)", price: 30 },
        { value: 2, label: "2 extra bags (23kg each)", price: 55 },
        { value: 3, label: "3 extra bags (23kg each)", price: 75 },
      ],
      current: extras.baggage,
    },
    {
      id: "meals",
      title: "Special Meals",
      description: "Pre-order your in-flight meal",
      icon: Utensils,
      type: "switch",
      price: 15,
      current: extras.meals,
    },
    {
      id: "insurance",
      title: "Travel Insurance",
      description: "Comprehensive travel protection",
      icon: Shield,
      type: "switch",
      price: 25,
      current: extras.insurance,
    },
    {
      id: "priorityBoarding",
      title: "Priority Boarding",
      description: "Board the aircraft first",
      icon: Star,
      type: "switch",
      price: 20,
      current: extras.priorityBoarding,
    },
  ]

  return (
    <motion.div initial="initial" animate="animate" variants={fadeInUp}>
      <Card>
        <CardHeader>
          <CardTitle>Add Extras to Your Trip</CardTitle>
          <CardDescription>Enhance your travel experience with our optional services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {extrasOptions.map((extra, index) => (
            <motion.div
              key={extra.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <extra.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900">{extra.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{extra.description}</p>

                    {extra.type === "select" && extra.id === "baggage" && (
                      <Select
                        value={extra.current.toString()}
                        onValueChange={(value) => handleExtraChange(extra.id, Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-full max-w-xs">
                          <SelectValue placeholder="Select baggage option" />
                        </SelectTrigger>
                        <SelectContent>
                          {extra.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value.toString()}>
                              {option.label} {option.price > 0 && `(+$${option.price})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {extra.type === "switch" && (
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={extra.id}
                          checked={extra.current as boolean}
                          onCheckedChange={(checked) => handleExtraChange(extra.id, checked)}
                        />
                        <Label htmlFor={extra.id} className="text-sm">
                          Add to booking (+${extra.price} per passenger)
                        </Label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {extra.type === "select" && extra.id === "baggage" && (
                    <div className="text-lg font-semibold text-slate-900">
                      {extra.current > 0 && `+$${extra.options?.find((o) => o.value === extra.current)?.price || 0}`}
                    </div>
                  )}
                  {extra.type === "switch" && extra.current && (
                    <div className="text-lg font-semibold text-slate-900">
                      +${(extra.price * passengers.length).toFixed(0)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Included Services */}
          <div className="border-t pt-6">
            <h3 className="font-medium text-slate-900 mb-4">Included in Your Booking</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Wifi className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Free Wi-Fi</p>
                  <p className="text-sm text-gray-600">Stay connected during your flight</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Coffee className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Complimentary Drinks</p>
                  <p className="text-sm text-gray-600">Soft drinks and coffee included</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

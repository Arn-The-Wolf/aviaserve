import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Passenger {
  name: string
  email?: string
  phone?: string
  dateOfBirth?: string
  passportNumber?: string
  type?: "adult" | "child" | "infant"
}

interface Flight {
  id: string
  flightNumber: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  date: string
  price: number
  airline?: string
  gate?: string
  terminal?: string
}

interface BookingStore {
  // Flight selection
  selectedFlight: Flight | null
  setSelectedFlight: (flight: Flight) => void

  // Passenger information
  passengers: Passenger[]
  addPassenger: (passenger: Passenger) => void
  updatePassenger: (index: number, passenger: Passenger) => void
  removePassenger: (index: number) => void

  // Seat selection
  selectedSeats: string[]
  selectSeat: (index: number, seat: string) => void

  // Extras and add-ons
  extras: {
    baggage: number
    meals: boolean
    insurance: boolean
    priorityBoarding: boolean
  }
  updateExtras: (extras: Partial<BookingStore["extras"]>) => void

  // Payment
  totalPrice: number
  updateTotalPrice: () => void
  paymentId: string
  setPaymentId: (id: string) => void

  // Booking status
  bookingStatus: "draft" | "pending" | "confirmed" | "cancelled"
  setBookingStatus: (status: BookingStore["bookingStatus"]) => void

  // Reset store
  resetStore: () => void
}

// Calculate base price based on flight and passengers
const calculateBasePrice = (flight: Flight | null, passengers: Passenger[]) => {
  if (!flight) return 0
  return flight.price * passengers.length
}

// Calculate extras price
const calculateExtrasPrice = (extras: BookingStore["extras"], passengerCount: number) => {
  let extrasTotal = 0
  extrasTotal += extras.baggage * 30 * passengerCount
  extrasTotal += extras.meals ? 15 * passengerCount : 0
  extrasTotal += extras.insurance ? 25 * passengerCount : 0
  extrasTotal += extras.priorityBoarding ? 20 * passengerCount : 0
  return extrasTotal
}

// Calculate taxes and fees (typically around 12% of base fare)
const calculateTaxesAndFees = (basePrice: number) => {
  return basePrice * 0.12
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      // Flight selection
      selectedFlight: null,
      setSelectedFlight: (flight) => set({ selectedFlight: flight }),

      // Passenger information
      passengers: [],
      addPassenger: (passenger) =>
        set((state) => ({
          passengers: [...state.passengers, passenger],
          selectedSeats: [...state.selectedSeats, ""],
        })),
      updatePassenger: (index, passenger) =>
        set((state) => ({
          passengers: state.passengers.map((p, i) => (i === index ? passenger : p)),
        })),
      removePassenger: (index) =>
        set((state) => ({
          passengers: state.passengers.filter((_, i) => i !== index),
          selectedSeats: state.selectedSeats.filter((_, i) => i !== index),
        })),

      // Seat selection
      selectedSeats: [],
      selectSeat: (index, seat) =>
        set((state) => {
          const seats = [...state.selectedSeats]
          while (seats.length <= index) seats.push("")
          seats[index] = seat
          return { selectedSeats: seats }
        }),

      // Extras and add-ons
      extras: {
        baggage: 0,
        meals: false,
        insurance: false,
        priorityBoarding: false,
      },
      updateExtras: (extras) => set((state) => ({ extras: { ...state.extras, ...extras } })),

      // Payment
      totalPrice: 0,
      updateTotalPrice: () => {
        const { selectedFlight, passengers, extras } = get()
        const basePrice = calculateBasePrice(selectedFlight, passengers)
        const extrasPrice = calculateExtrasPrice(extras, passengers.length)
        const taxesAndFees = calculateTaxesAndFees(basePrice)
        const total = basePrice + extrasPrice + taxesAndFees
        set({ totalPrice: total })
      },
      paymentId: "",
      setPaymentId: (id) => set({ paymentId: id }),

      // Booking status
      bookingStatus: "draft",
      setBookingStatus: (status) => set({ bookingStatus: status }),

      // Reset store
      resetStore: () =>
        set({
          selectedFlight: null,
          passengers: [],
          selectedSeats: [],
          extras: {
            baggage: 0,
            meals: false,
            insurance: false,
            priorityBoarding: false,
          },
          totalPrice: 0,
          paymentId: "",
          bookingStatus: "draft",
        }),
    }),
    {
      name: "aviaserve-booking-store",
    },
  ),
)

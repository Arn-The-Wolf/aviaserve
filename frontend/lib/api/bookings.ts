import { apiClient } from "../api-client";
import { Flight } from "./flights";

export interface Booking {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  flight: Flight;
  bookingReference: string;
  bookingDate: string;
  numberOfPassengers: number;
  totalPrice: number;
  status: BookingStatus;
  specialRequests?: string;
  seatNumbers?: string;
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export interface CreateBookingRequest {
  flightId: number;
  numberOfPassengers: number;
  specialRequests?: string;
}

export const bookingsApi = {
  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await apiClient.post<Booking>("/bookings", data);
    return response.data;
  },

  getUserBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get<Booking[]>("/bookings/my-bookings");
    return response.data;
  },

  getBookingByReference: async (bookingReference: string): Promise<Booking> => {
    const response = await apiClient.get<Booking>(
      `/bookings/${bookingReference}`
    );
    return response.data;
  },

  updateBookingStatus: async (
    bookingReference: string,
    status: BookingStatus
  ): Promise<Booking> => {
    const response = await apiClient.patch<Booking>(
      `/bookings/${bookingReference}/status`,
      null,
      {
        params: { status },
      }
    );
    return response.data;
  },

  cancelBooking: async (bookingReference: string): Promise<void> => {
    await apiClient.post(`/bookings/${bookingReference}/cancel`);
  },
};

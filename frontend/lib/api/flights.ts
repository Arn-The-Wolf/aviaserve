import { apiClient } from "../api-client";

export interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  availableSeats: number;
  price: number;
  status: FlightStatus;
  aircraftType: string;
  gate?: string;
}

export enum FlightStatus {
  SCHEDULED = "SCHEDULED",
  DELAYED = "DELAYED",
  CANCELLED = "CANCELLED",
  BOARDING = "BOARDING",
  IN_FLIGHT = "IN_FLIGHT",
  LANDED = "LANDED",
}

export interface FlightSearchParams {
  departureAirport: string;
  arrivalAirport: string;
  startDate: string;
  endDate: string;
}

export const flightsApi = {
  searchFlights: async (params: FlightSearchParams): Promise<Flight[]> => {
    const response = await apiClient.get<Flight[]>("/flights/search", {
      params,
    });
    return response.data;
  },

  getAvailableFlights: async (): Promise<Flight[]> => {
    const response = await apiClient.get<Flight[]>("/flights/available");
    return response.data;
  },

  getFlightById: async (id: number): Promise<Flight> => {
    const response = await apiClient.get<Flight>(`/flights/${id}`);
    return response.data;
  },

  updateFlightStatus: async (
    id: number,
    status: FlightStatus
  ): Promise<Flight> => {
    const response = await apiClient.patch<Flight>(
      `/flights/${id}/status`,
      null,
      {
        params: { status },
      }
    );
    return response.data;
  },
};

package com.aviaserve.service;

import com.aviaserve.model.Flight;
import com.aviaserve.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightService {
    private final FlightRepository flightRepository;

    public Flight getFlightById(Long id) {
        return flightRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Flight not found"));
    }

    public List<Flight> searchFlights(String departureAirport, String arrivalAirport,
            LocalDateTime startDate, LocalDateTime endDate) {
        return flightRepository.findByDepartureAirportAndArrivalAirportAndDepartureTimeBetween(
                departureAirport, arrivalAirport, startDate, endDate);
    }

    public List<Flight> getAvailableFlights() {
        return flightRepository.findAvailableFlights(LocalDateTime.now());
    }

    @Transactional
    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    @Transactional
    public Flight updateFlight(Long id, Flight flightDetails) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        flight.setFlightNumber(flightDetails.getFlightNumber());
        flight.setAirline(flightDetails.getAirline());
        flight.setDepartureAirport(flightDetails.getDepartureAirport());
        flight.setArrivalAirport(flightDetails.getArrivalAirport());
        flight.setDepartureTime(flightDetails.getDepartureTime());
        flight.setArrivalTime(flightDetails.getArrivalTime());
        flight.setTotalSeats(flightDetails.getTotalSeats());
        flight.setAvailableSeats(flightDetails.getAvailableSeats());
        flight.setPrice(flightDetails.getPrice());
        flight.setStatus(flightDetails.getStatus());
        flight.setAircraftType(flightDetails.getAircraftType());
        flight.setGate(flightDetails.getGate());

        return flightRepository.save(flight);
    }

    @Transactional
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }

    @Transactional
    public Flight updateFlightStatus(Long id, Flight.FlightStatus status) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
        flight.setStatus(status);
        return flightRepository.save(flight);
    }
}
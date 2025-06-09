package com.aviaserve.repository;

import com.aviaserve.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByDepartureAirportAndArrivalAirportAndDepartureTimeBetween(
            String departureAirport,
            String arrivalAirport,
            LocalDateTime startDate,
            LocalDateTime endDate);

    @Query("SELECT f FROM Flight f WHERE f.availableSeats > 0 AND f.departureTime > :now")
    List<Flight> findAvailableFlights(LocalDateTime now);

    List<Flight> findByAirline(String airline);
}
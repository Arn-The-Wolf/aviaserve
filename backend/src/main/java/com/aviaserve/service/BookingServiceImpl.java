package com.aviaserve.service;

import com.aviaserve.model.Booking;
import com.aviaserve.model.Flight;
import com.aviaserve.model.User;
import com.aviaserve.repository.BookingRepository;
import com.aviaserve.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final FlightRepository flightRepository;

    @Override
    @Transactional
    public Booking createBooking(User user, Flight flight, int numberOfPassengers, String specialRequests) {
        if (flight.getAvailableSeats() < numberOfPassengers) {
            throw new RuntimeException("Not enough seats available");
        }
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setBookingReference(generateBookingReference());
        booking.setBookingDate(LocalDateTime.now());
        booking.setNumberOfPassengers(numberOfPassengers);
        booking.setTotalPrice(flight.getPrice().multiply(BigDecimal.valueOf(numberOfPassengers)));
        booking.setStatus(Booking.BookingStatus.PENDING);
        booking.setSpecialRequests(specialRequests);

        // Update available seats
        flight.setAvailableSeats(flight.getAvailableSeats() - numberOfPassengers);
        flightRepository.save(flight);

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getUserBookings(User user) {
        return bookingRepository.findByUser(user);
    }

    @Override
    public Booking getBookingByReference(String bookingReference) {
        return bookingRepository.findByBookingReference(bookingReference)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    @Transactional
    public Booking updateBookingStatus(String bookingReference, Booking.BookingStatus status) {
        Booking booking = getBookingByReference(bookingReference);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public void cancelBooking(String bookingReference) {
        Booking booking = getBookingByReference(bookingReference);
        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking is already cancelled");
        }
        // Return seats to flight
        Flight flight = booking.getFlight();
        flight.setAvailableSeats(flight.getAvailableSeats() + booking.getNumberOfPassengers());
        flightRepository.save(flight);
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    private String generateBookingReference() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}

package com.aviaserve.controller;

import com.aviaserve.model.Booking;
import com.aviaserve.model.Flight;
import com.aviaserve.model.User;
import com.aviaserve.service.BookingService;
import com.aviaserve.service.FlightService;
import com.aviaserve.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final UserService userService;
    private final FlightService flightService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @AuthenticationPrincipal User user,
            @RequestBody CreateBookingRequest request) {
        Flight flight = flightService.getFlightById(request.flightId());
        return ResponseEntity.ok(bookingService.createBooking(
            user,
            flight,
            request.numberOfPassengers(),
            request.specialRequests()
        ));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<Booking>> getUserBookings(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(bookingService.getUserBookings(user));
    }

    @GetMapping("/{bookingReference}")
    public ResponseEntity<Booking> getBooking(@PathVariable String bookingReference) {
        return ResponseEntity.ok(bookingService.getBookingByReference(bookingReference));
    }

    @PatchMapping("/{bookingReference}/status")
    public ResponseEntity<Booking> updateBookingStatus(
            @PathVariable String bookingReference,
            @RequestParam Booking.BookingStatus status) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(bookingReference, status));
    }

    @PostMapping("/{bookingReference}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable String bookingReference) {
        bookingService.cancelBooking(bookingReference);
        return ResponseEntity.ok().build();
    }

    record CreateBookingRequest(
        Long flightId,
        int numberOfPassengers,
        String specialRequests
    ) {}
}
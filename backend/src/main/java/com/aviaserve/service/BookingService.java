package com.aviaserve.service;

import com.aviaserve.model.Booking;
import com.aviaserve.model.Flight;
import com.aviaserve.model.User;
import java.util.List;

public interface BookingService {
    Booking createBooking(User user, Flight flight, int numberOfPassengers, String specialRequests);

    List<Booking> getUserBookings(User user);

    Booking getBookingByReference(String bookingReference);

    Booking updateBookingStatus(String bookingReference, Booking.BookingStatus status);

    void cancelBooking(String bookingReference);
}
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    enabled BOOLEAN DEFAULT true,
    profile_picture VARCHAR(255)
);

CREATE TABLE user_roles (
    user_id BIGINT REFERENCES users(id),
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, role)
);

CREATE TABLE flights (
    id BIGSERIAL PRIMARY KEY,
    flight_number VARCHAR(20) NOT NULL,
    airline VARCHAR(100) NOT NULL,
    departure_airport VARCHAR(3) NOT NULL,
    arrival_airport VARCHAR(3) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    total_seats INTEGER NOT NULL,
    available_seats INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    aircraft_type VARCHAR(50) NOT NULL,
    gate VARCHAR(10)
);

CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    flight_id BIGINT REFERENCES flights(id) NOT NULL,
    booking_reference VARCHAR(8) NOT NULL UNIQUE,
    booking_date TIMESTAMP NOT NULL,
    number_of_passengers INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    special_requests TEXT,
    seat_numbers VARCHAR(255)
);

-- Create indexes
CREATE INDEX idx_flights_departure_arrival ON flights(departure_airport, arrival_airport);
CREATE INDEX idx_flights_departure_time ON flights(departure_time);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_flight_id ON bookings(flight_id);
CREATE INDEX idx_bookings_booking_reference ON bookings(booking_reference); 
 
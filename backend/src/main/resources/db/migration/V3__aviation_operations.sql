-- Crew Management Tables
CREATE TABLE crew_members (
    id BIGSERIAL PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    base_airport VARCHAR(3) NOT NULL,
    license_number VARCHAR(100),
    license_expiry DATE,
    medical_certificate_expiry DATE,
    flight_hours_this_month INTEGER DEFAULT 0,
    flight_hours_this_year INTEGER DEFAULT 0,
    last_flight_date TIMESTAMP,
    phone_number VARCHAR(20),
    email VARCHAR(255),
    qualifications TEXT
);

CREATE TABLE crew_assignments (
    id BIGSERIAL PRIMARY KEY,
    crew_member_id BIGINT REFERENCES crew_members(id) NOT NULL,
    flight_id BIGINT REFERENCES flights(id) NOT NULL,
    assigned_at TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    notes TEXT,
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP
);

-- Flight Operations Table
CREATE TABLE flight_operations (
    id BIGSERIAL PRIMARY KEY,
    flight_id BIGINT REFERENCES flights(id) NOT NULL UNIQUE,
    fuel_required DECIMAL(10,2) NOT NULL,
    fuel_loaded DECIMAL(10,2) NOT NULL,
    estimated_weight DECIMAL(10,2) NOT NULL,
    actual_weight DECIMAL(10,2) NOT NULL,
    cargo_weight DECIMAL(10,2) NOT NULL,
    passenger_count INTEGER NOT NULL,
    flight_plan TEXT,
    route VARCHAR(500),
    cruising_altitude INTEGER,
    estimated_flight_time DECIMAL(5,2),
    actual_departure_time TIMESTAMP,
    actual_arrival_time TIMESTAMP,
    status VARCHAR(50),
    weather_conditions TEXT,
    notams_reviewed TEXT,
    pre_flight_check_completed BOOLEAN DEFAULT FALSE,
    pre_flight_check_time TIMESTAMP,
    remarks TEXT
);

-- Disruption Management Tables
CREATE TABLE flight_disruptions (
    id BIGSERIAL PRIMARY KEY,
    flight_id BIGINT REFERENCES flights(id) NOT NULL,
    type VARCHAR(50) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    reported_at TIMESTAMP NOT NULL,
    reason VARCHAR(500) NOT NULL,
    description TEXT,
    estimated_resolution_time TIMESTAMP,
    actual_resolution_time TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    mitigation_actions TEXT,
    affected_passengers INTEGER,
    compensation_required BOOLEAN,
    reported_by VARCHAR(255),
    resolved_by VARCHAR(255)
);

-- Safety and Security Tables
CREATE TABLE safety_incidents (
    id BIGSERIAL PRIMARY KEY,
    incident_number VARCHAR(50) NOT NULL UNIQUE,
    flight_id BIGINT REFERENCES flights(id),
    incident_date_time TIMESTAMP NOT NULL,
    type VARCHAR(50) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    aircraft_registration VARCHAR(50),
    reported_by VARCHAR(255),
    reported_at TIMESTAMP NOT NULL,
    investigation_status VARCHAR(50) NOT NULL,
    investigation_findings TEXT,
    corrective_actions TEXT,
    regulatory_report_required BOOLEAN,
    regulatory_reported_at TIMESTAMP,
    assigned_investigator VARCHAR(255),
    closed_at TIMESTAMP
);

CREATE TABLE security_checks (
    id BIGSERIAL PRIMARY KEY,
    flight_id BIGINT REFERENCES flights(id) NOT NULL,
    check_type VARCHAR(50) NOT NULL,
    check_time TIMESTAMP NOT NULL,
    performed_by VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    findings TEXT,
    anomalies_detected BOOLEAN DEFAULT FALSE,
    anomaly_details TEXT,
    approved_at TIMESTAMP,
    approved_by VARCHAR(255)
);

-- Create indexes for performance
CREATE INDEX idx_crew_members_employee_id ON crew_members(employee_id);
CREATE INDEX idx_crew_members_base_airport ON crew_members(base_airport);
CREATE INDEX idx_crew_members_role ON crew_members(role);
CREATE INDEX idx_crew_members_status ON crew_members(status);

CREATE INDEX idx_crew_assignments_crew_member_id ON crew_assignments(crew_member_id);
CREATE INDEX idx_crew_assignments_flight_id ON crew_assignments(flight_id);
CREATE INDEX idx_crew_assignments_status ON crew_assignments(status);

CREATE INDEX idx_flight_operations_flight_id ON flight_operations(flight_id);
CREATE INDEX idx_flight_operations_status ON flight_operations(status);

CREATE INDEX idx_flight_disruptions_flight_id ON flight_disruptions(flight_id);
CREATE INDEX idx_flight_disruptions_status ON flight_disruptions(status);
CREATE INDEX idx_flight_disruptions_severity ON flight_disruptions(severity);
CREATE INDEX idx_flight_disruptions_type ON flight_disruptions(type);

CREATE INDEX idx_safety_incidents_incident_number ON safety_incidents(incident_number);
CREATE INDEX idx_safety_incidents_flight_id ON safety_incidents(flight_id);
CREATE INDEX idx_safety_incidents_investigation_status ON safety_incidents(investigation_status);
CREATE INDEX idx_safety_incidents_severity ON safety_incidents(severity);

CREATE INDEX idx_security_checks_flight_id ON security_checks(flight_id);
CREATE INDEX idx_security_checks_check_type ON security_checks(check_type);
CREATE INDEX idx_security_checks_status ON security_checks(status);

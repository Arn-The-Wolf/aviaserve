package com.aviaserve.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "crew_members")
@NoArgsConstructor
@AllArgsConstructor
public class CrewMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String employeeId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CrewRole role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CrewStatus status;

    @Column(nullable = false)
    private String baseAirport;

    private String licenseNumber;

    private LocalDate licenseExpiry;

    private LocalDate medicalCertificateExpiry;

    private Integer flightHoursThisMonth;

    private Integer flightHoursThisYear;

    private LocalDateTime lastFlightDate;

    private String phoneNumber;

    private String email;

    @Column
    private String qualifications; // Comma-separated aircraft types

    public enum CrewRole {
        CAPTAIN,
        FIRST_OFFICER,
        FLIGHT_ENGINEER,
        PURSER,
        FLIGHT_ATTENDANT,
        GROUND_CREW
    }

    public enum CrewStatus {
        ACTIVE,
        ON_LEAVE,
        TRAINING,
        SUSPENDED,
        RETIRED
    }
}

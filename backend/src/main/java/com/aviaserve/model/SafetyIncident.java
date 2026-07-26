package com.aviaserve.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "safety_incidents")
@NoArgsConstructor
@AllArgsConstructor
public class SafetyIncident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String incidentNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id")
    private Flight flight;

    @Column(nullable = false)
    private LocalDateTime incidentDateTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IncidentType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IncidentSeverity severity;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private String location;

    private String aircraftRegistration;

    private String reportedBy;

    @Column(nullable = false)
    private LocalDateTime reportedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvestigationStatus investigationStatus;

    @Column(columnDefinition = "TEXT")
    private String investigationFindings;

    @Column(columnDefinition = "TEXT")
    private String correctiveActions;

    private Boolean regulatoryReportRequired;

    private LocalDateTime regulatoryReportedAt;

    private String assignedInvestigator;

    private LocalDateTime closedAt;

    public enum IncidentType {
        NEAR_MISS,
        BIRD_STRIKE,
        TURBULENCE_INJURY,
        MECHANICAL_FAILURE,
        RUNWAY_INCURSION,
        CABIN_SAFETY,
        HAZARDOUS_MATERIAL,
        SECURITY_BREACH,
        MEDICAL_EMERGENCY,
        OTHER
    }

    public enum IncidentSeverity {
        MINOR,
        MODERATE,
        SERIOUS,
        CRITICAL
    }

    public enum InvestigationStatus {
        REPORTED,
        UNDER_INVESTIGATION,
        PENDING_REVIEW,
        COMPLETED,
        CLOSED
    }
}

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
@Table(name = "flight_disruptions")
@NoArgsConstructor
@AllArgsConstructor
public class FlightDisruption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DisruptionType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DisruptionSeverity severity;

    @Column(nullable = false)
    private LocalDateTime reportedAt;

    @Column(nullable = false)
    private String reason;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDateTime estimatedResolutionTime;

    private LocalDateTime actualResolutionTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DisruptionStatus status;

    private String mitigationActions;

    private Integer affectedPassengers;

    private Boolean compensationRequired;

    private String reportedBy;

    private String resolvedBy;

    public enum DisruptionType {
        DELAY,
        CANCELLATION,
        DIVERSION,
        MECHANICAL_ISSUE,
        WEATHER,
        CREW_SHORTAGE,
        AIR_TRAFFIC_CONTROL,
        SECURITY_ISSUE,
        OTHER
    }

    public enum DisruptionSeverity {
        LOW,      // < 30 min delay
        MEDIUM,   // 30-120 min delay
        HIGH,     // > 120 min delay or cancellation
        CRITICAL  // Safety-related
    }

    public enum DisruptionStatus {
        REPORTED,
        INVESTIGATING,
        ACTION_TAKEN,
        RESOLVED,
        ESCALATED
    }
}

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
@Table(name = "security_checks")
@NoArgsConstructor
@AllArgsConstructor
public class SecurityCheck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CheckType checkType;

    @Column(nullable = false)
    private LocalDateTime checkTime;

    @Column(nullable = false)
    private String performedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CheckStatus status;

    @Column(columnDefinition = "TEXT")
    private String findings;

    private Boolean anomaliesDetected;

    @Column(columnDefinition = "TEXT")
    private String anomalyDetails;

    private LocalDateTime approvedAt;

    private String approvedBy;

    public enum CheckType {
        PRE_FLIGHT_AIRCRAFT,
        CARGO_SCREENING,
        PASSENGER_SCREENING,
        CREW_SCREENING,
        BAGGAGE_SCREENING,
        CATERING_SECURITY,
        DOCUMENT_VERIFICATION
    }

    public enum CheckStatus {
        PENDING,
        IN_PROGRESS,
        COMPLETED,
        FAILED,
        REQUIRES_REVIEW
    }
}

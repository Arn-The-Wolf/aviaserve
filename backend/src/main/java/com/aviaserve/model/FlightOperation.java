package com.aviaserve.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "flight_operations")
@NoArgsConstructor
@AllArgsConstructor
public class FlightOperation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false, unique = true)
    private Flight flight;

    @Column(nullable = false)
    private BigDecimal fuelRequired; // In liters

    @Column(nullable = false)
    private BigDecimal fuelLoaded;

    @Column(nullable = false)
    private BigDecimal estimatedWeight; // In kg

    @Column(nullable = false)
    private BigDecimal actualWeight;

    @Column(nullable = false)
    private BigDecimal cargoWeight;

    @Column(nullable = false)
    private Integer passengerCount;

    private String flightPlan;

    private String route;

    private Integer cruisingAltitude;

    private BigDecimal estimatedFlightTime; // In hours

    private LocalDateTime actualDepartureTime;

    private LocalDateTime actualArrivalTime;

    @Enumerated(EnumType.STRING)
    private OperationStatus status;

    private String weatherConditions;

    private String notamsReviewed; // NOTAMs - Notices to Airmen

    private Boolean preFlightCheckCompleted;

    private LocalDateTime preFlightCheckTime;

    private String remarks;

    public enum OperationStatus {
        PLANNING,
        READY,
        IN_PROGRESS,
        COMPLETED,
        ABORTED
    }
}

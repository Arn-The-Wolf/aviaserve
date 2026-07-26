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
@Table(name = "crew_assignments")
@NoArgsConstructor
@AllArgsConstructor
public class CrewAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_member_id", nullable = false)
    private CrewMember crewMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Column(nullable = false)
    private LocalDateTime assignedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssignmentStatus status;

    private String notes;

    private LocalDateTime checkInTime;

    private LocalDateTime checkOutTime;

    public enum AssignmentStatus {
        SCHEDULED,
        CONFIRMED,
        CHECKED_IN,
        COMPLETED,
        CANCELLED,
        NO_SHOW
    }
}

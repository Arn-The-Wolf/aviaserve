package com.aviaserve.repository;

import com.aviaserve.model.Flight;
import com.aviaserve.model.FlightDisruption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightDisruptionRepository extends JpaRepository<FlightDisruption, Long> {
    List<FlightDisruption> findByFlight(Flight flight);
    
    List<FlightDisruption> findByStatus(FlightDisruption.DisruptionStatus status);
    
    List<FlightDisruption> findByType(FlightDisruption.DisruptionType type);
    
    @Query("SELECT d FROM FlightDisruption d WHERE d.severity = :severity AND d.status != 'RESOLVED'")
    List<FlightDisruption> findActiveDisruptionsBySeverity(FlightDisruption.DisruptionSeverity severity);
    
    @Query("SELECT d FROM FlightDisruption d WHERE d.reportedAt BETWEEN :start AND :end")
    List<FlightDisruption> findDisruptionsByDateRange(LocalDateTime start, LocalDateTime end);
}

package com.aviaserve.repository;

import com.aviaserve.model.Flight;
import com.aviaserve.model.SecurityCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SecurityCheckRepository extends JpaRepository<SecurityCheck, Long> {
    List<SecurityCheck> findByFlight(Flight flight);
    
    List<SecurityCheck> findByStatus(SecurityCheck.CheckStatus status);
    
    List<SecurityCheck> findByCheckType(SecurityCheck.CheckType checkType);
    
    @Query("SELECT sc FROM SecurityCheck sc WHERE sc.flight = :flight AND sc.checkType = :checkType AND sc.status = 'COMPLETED'")
    List<SecurityCheck> findCompletedChecksByFlightAndType(Flight flight, SecurityCheck.CheckType checkType);
    
    @Query("SELECT sc FROM SecurityCheck sc WHERE sc.anomaliesDetected = true AND sc.checkTime BETWEEN :start AND :end")
    List<SecurityCheck> findAnomaliesByDateRange(LocalDateTime start, LocalDateTime end);
}

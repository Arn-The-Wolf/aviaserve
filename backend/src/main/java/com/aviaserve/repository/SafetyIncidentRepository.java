package com.aviaserve.repository;

import com.aviaserve.model.SafetyIncident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SafetyIncidentRepository extends JpaRepository<SafetyIncident, Long> {
    Optional<SafetyIncident> findByIncidentNumber(String incidentNumber);
    
    List<SafetyIncident> findByInvestigationStatus(SafetyIncident.InvestigationStatus status);
    
    List<SafetyIncident> findBySeverity(SafetyIncident.IncidentSeverity severity);
    
    @Query("SELECT s FROM SafetyIncident s WHERE s.incidentDateTime BETWEEN :start AND :end")
    List<SafetyIncident> findIncidentsByDateRange(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT s FROM SafetyIncident s WHERE s.regulatoryReportRequired = true AND s.regulatoryReportedAt IS NULL")
    List<SafetyIncident> findPendingRegulatoryReports();
}

package com.aviaserve.service;

import com.aviaserve.model.Flight;
import com.aviaserve.model.SafetyIncident;
import com.aviaserve.model.SecurityCheck;
import com.aviaserve.repository.FlightRepository;
import com.aviaserve.repository.SafetyIncidentRepository;
import com.aviaserve.repository.SecurityCheckRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SafetySecurityService {
    private final SafetyIncidentRepository incidentRepository;
    private final SecurityCheckRepository securityCheckRepository;
    private final FlightRepository flightRepository;

    @Transactional
    public SafetyIncident reportSafetyIncident(Long flightId, SafetyIncident.IncidentType type,
                                               SafetyIncident.IncidentSeverity severity,
                                               String description, String location,
                                               String aircraftRegistration, String reportedBy) {
        Flight flight = null;
        if (flightId != null) {
            flight = flightRepository.findById(flightId).orElse(null);
        }

        SafetyIncident incident = new SafetyIncident();
        incident.setIncidentNumber(generateIncidentNumber());
        incident.setFlight(flight);
        incident.setType(type);
        incident.setSeverity(severity);
        incident.setDescription(description);
        incident.setLocation(location);
        incident.setAircraftRegistration(aircraftRegistration);
        incident.setReportedBy(reportedBy);
        incident.setIncidentDateTime(LocalDateTime.now());
        incident.setReportedAt(LocalDateTime.now());
        incident.setInvestigationStatus(SafetyIncident.InvestigationStatus.REPORTED);

        // Determine if regulatory report is required
        incident.setRegulatoryReportRequired(
            severity == SafetyIncident.IncidentSeverity.SERIOUS ||
            severity == SafetyIncident.IncidentSeverity.CRITICAL
        );

        return incidentRepository.save(incident);
    }

    public SafetyIncident getIncidentByNumber(String incidentNumber) {
        return incidentRepository.findByIncidentNumber(incidentNumber)
                .orElseThrow(() -> new RuntimeException("Incident not found"));
    }

    @Transactional
    public SafetyIncident updateInvestigationStatus(String incidentNumber,
                                                   SafetyIncident.InvestigationStatus status,
                                                   String investigator,
                                                   String findings,
                                                   String correctiveActions) {
        SafetyIncident incident = getIncidentByNumber(incidentNumber);
        
        incident.setInvestigationStatus(status);
        incident.setAssignedInvestigator(investigator);
        
        if (findings != null) {
            incident.setInvestigationFindings(findings);
        }
        
        if (correctiveActions != null) {
            incident.setCorrectiveActions(correctiveActions);
        }
        
        if (status == SafetyIncident.InvestigationStatus.CLOSED) {
            incident.setClosedAt(LocalDateTime.now());
        }

        return incidentRepository.save(incident);
    }

    public List<SafetyIncident> getPendingRegulatoryReports() {
        return incidentRepository.findPendingRegulatoryReports();
    }

    @Transactional
    public SafetyIncident markRegulatoryReportSubmitted(String incidentNumber) {
        SafetyIncident incident = getIncidentByNumber(incidentNumber);
        incident.setRegulatoryReportedAt(LocalDateTime.now());
        return incidentRepository.save(incident);
    }

    @Transactional
    public SecurityCheck performSecurityCheck(Long flightId, SecurityCheck.CheckType checkType,
                                             String performedBy, Boolean anomaliesDetected,
                                             String anomalyDetails) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        SecurityCheck check = new SecurityCheck();
        check.setFlight(flight);
        check.setCheckType(checkType);
        check.setCheckTime(LocalDateTime.now());
        check.setPerformedBy(performedBy);
        check.setAnomaliesDetected(anomaliesDetected);
        check.setAnomalyDetails(anomalyDetails);
        
        check.setStatus(anomaliesDetected ? 
                SecurityCheck.CheckStatus.REQUIRES_REVIEW : 
                SecurityCheck.CheckStatus.COMPLETED);

        return securityCheckRepository.save(check);
    }

    @Transactional
    public SecurityCheck approveSecurityCheck(Long checkId, String approvedBy) {
        SecurityCheck check = securityCheckRepository.findById(checkId)
                .orElseThrow(() -> new RuntimeException("Security check not found"));

        check.setStatus(SecurityCheck.CheckStatus.COMPLETED);
        check.setApprovedAt(LocalDateTime.now());
        check.setApprovedBy(approvedBy);

        return securityCheckRepository.save(check);
    }

    public List<SecurityCheck> getFlightSecurityChecks(Long flightId) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
        return securityCheckRepository.findByFlight(flight);
    }

    public List<SecurityCheck> getSecurityAnomalies(LocalDateTime start, LocalDateTime end) {
        return securityCheckRepository.findAnomaliesByDateRange(start, end);
    }

    private String generateIncidentNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        return "INC-" + timestamp + "-" + random;
    }
}

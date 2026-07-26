package com.aviaserve.controller;

import com.aviaserve.model.SafetyIncident;
import com.aviaserve.model.SecurityCheck;
import com.aviaserve.service.SafetySecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/safety-security")
@RequiredArgsConstructor
public class SafetySecurityController {
    private final SafetySecurityService safetySecurityService;

    // Safety Incident Endpoints
    @PostMapping("/incidents/report")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SafetyIncident> reportSafetyIncident(@RequestBody ReportSafetyIncidentRequest request) {
        return ResponseEntity.ok(safetySecurityService.reportSafetyIncident(
                request.flightId(),
                request.type(),
                request.severity(),
                request.description(),
                request.location(),
                request.aircraftRegistration(),
                request.reportedBy()
        ));
    }

    @GetMapping("/incidents/{incidentNumber}")
    public ResponseEntity<SafetyIncident> getIncidentByNumber(@PathVariable String incidentNumber) {
        return ResponseEntity.ok(safetySecurityService.getIncidentByNumber(incidentNumber));
    }

    @PatchMapping("/incidents/{incidentNumber}/investigation")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SafetyIncident> updateInvestigation(
            @PathVariable String incidentNumber,
            @RequestBody UpdateInvestigationRequest request) {
        return ResponseEntity.ok(safetySecurityService.updateInvestigationStatus(
                incidentNumber,
                request.status(),
                request.investigator(),
                request.findings(),
                request.correctiveActions()
        ));
    }

    @GetMapping("/incidents/pending-regulatory-reports")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SafetyIncident>> getPendingRegulatoryReports() {
        return ResponseEntity.ok(safetySecurityService.getPendingRegulatoryReports());
    }

    @PostMapping("/incidents/{incidentNumber}/regulatory-report-submitted")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SafetyIncident> markRegulatoryReportSubmitted(@PathVariable String incidentNumber) {
        return ResponseEntity.ok(safetySecurityService.markRegulatoryReportSubmitted(incidentNumber));
    }

    // Security Check Endpoints
    @PostMapping("/security-checks")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SecurityCheck> performSecurityCheck(@RequestBody PerformSecurityCheckRequest request) {
        return ResponseEntity.ok(safetySecurityService.performSecurityCheck(
                request.flightId(),
                request.checkType(),
                request.performedBy(),
                request.anomaliesDetected(),
                request.anomalyDetails()
        ));
    }

    @PostMapping("/security-checks/{checkId}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SecurityCheck> approveSecurityCheck(
            @PathVariable Long checkId,
            @RequestParam String approvedBy) {
        return ResponseEntity.ok(safetySecurityService.approveSecurityCheck(checkId, approvedBy));
    }

    @GetMapping("/security-checks/flight/{flightId}")
    public ResponseEntity<List<SecurityCheck>> getFlightSecurityChecks(@PathVariable Long flightId) {
        return ResponseEntity.ok(safetySecurityService.getFlightSecurityChecks(flightId));
    }

    @GetMapping("/security-checks/anomalies")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SecurityCheck>> getSecurityAnomalies(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(safetySecurityService.getSecurityAnomalies(start, end));
    }

    record ReportSafetyIncidentRequest(
            Long flightId,
            SafetyIncident.IncidentType type,
            SafetyIncident.IncidentSeverity severity,
            String description,
            String location,
            String aircraftRegistration,
            String reportedBy
    ) {}

    record UpdateInvestigationRequest(
            SafetyIncident.InvestigationStatus status,
            String investigator,
            String findings,
            String correctiveActions
    ) {}

    record PerformSecurityCheckRequest(
            Long flightId,
            SecurityCheck.CheckType checkType,
            String performedBy,
            Boolean anomaliesDetected,
            String anomalyDetails
    ) {}
}

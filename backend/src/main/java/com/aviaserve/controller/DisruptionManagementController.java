package com.aviaserve.controller;

import com.aviaserve.model.FlightDisruption;
import com.aviaserve.service.DisruptionManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/disruptions")
@RequiredArgsConstructor
public class DisruptionManagementController {
    private final DisruptionManagementService disruptionService;

    @PostMapping("/report")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightDisruption> reportDisruption(@RequestBody ReportDisruptionRequest request) {
        return ResponseEntity.ok(disruptionService.reportDisruption(
                request.flightId(),
                request.type(),
                request.severity(),
                request.reason(),
                request.description(),
                request.reportedBy()
        ));
    }

    @GetMapping("/flight/{flightId}")
    public ResponseEntity<List<FlightDisruption>> getFlightDisruptions(@PathVariable Long flightId) {
        return ResponseEntity.ok(disruptionService.getFlightDisruptions(flightId));
    }

    @GetMapping("/active")
    public ResponseEntity<List<FlightDisruption>> getActiveDisruptions() {
        return ResponseEntity.ok(disruptionService.getActiveDisruptions());
    }

    @GetMapping("/severity/{severity}")
    public ResponseEntity<List<FlightDisruption>> getDisruptionsBySeverity(
            @PathVariable FlightDisruption.DisruptionSeverity severity) {
        return ResponseEntity.ok(disruptionService.getDisruptionsBySeverity(severity));
    }

    @PatchMapping("/{disruptionId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightDisruption> updateDisruptionStatus(
            @PathVariable Long disruptionId,
            @RequestBody UpdateDisruptionStatusRequest request) {
        return ResponseEntity.ok(disruptionService.updateDisruptionStatus(
                disruptionId,
                request.status(),
                request.mitigationActions(),
                request.resolvedBy()
        ));
    }

    @PostMapping("/{disruptionId}/mitigation-action")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightDisruption> addMitigationAction(
            @PathVariable Long disruptionId,
            @RequestBody MitigationActionRequest request) {
        return ResponseEntity.ok(disruptionService.addMitigationAction(disruptionId, request.action()));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<FlightDisruption>> getDisruptionsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(disruptionService.getDisruptionsByDateRange(start, end));
    }

    record ReportDisruptionRequest(
            Long flightId,
            FlightDisruption.DisruptionType type,
            FlightDisruption.DisruptionSeverity severity,
            String reason,
            String description,
            String reportedBy
    ) {}

    record UpdateDisruptionStatusRequest(
            FlightDisruption.DisruptionStatus status,
            String mitigationActions,
            String resolvedBy
    ) {}

    record MitigationActionRequest(String action) {}
}

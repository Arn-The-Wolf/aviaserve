package com.aviaserve.controller;

import com.aviaserve.model.FlightOperation;
import com.aviaserve.service.FlightOperationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/operations")
@RequiredArgsConstructor
public class FlightOperationsController {
    private final FlightOperationsService operationsService;

    @PostMapping("/flights/{flightId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightOperation> createFlightOperation(
            @PathVariable Long flightId,
            @RequestBody FlightOperation operation) {
        return ResponseEntity.ok(operationsService.createFlightOperation(flightId, operation));
    }

    @GetMapping("/flights/{flightId}")
    public ResponseEntity<FlightOperation> getFlightOperation(@PathVariable Long flightId) {
        return ResponseEntity.ok(operationsService.getFlightOperation(flightId));
    }

    @PostMapping("/{operationId}/pre-flight-check")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightOperation> completePreFlightCheck(
            @PathVariable Long operationId,
            @RequestBody PreFlightCheckRequest request) {
        return ResponseEntity.ok(operationsService.completePreFlightCheck(operationId, request.remarks()));
    }

    @PatchMapping("/{operationId}/departure")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightOperation> updateActualDeparture(
            @PathVariable Long operationId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime departureTime) {
        return ResponseEntity.ok(operationsService.updateActualDeparture(operationId, departureTime));
    }

    @PatchMapping("/{operationId}/arrival")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightOperation> updateActualArrival(
            @PathVariable Long operationId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime arrivalTime) {
        return ResponseEntity.ok(operationsService.updateActualArrival(operationId, arrivalTime));
    }

    @PatchMapping("/{operationId}/fuel")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightOperation> updateFuelData(
            @PathVariable Long operationId,
            @RequestParam BigDecimal fuelLoaded) {
        return ResponseEntity.ok(operationsService.updateFuelData(operationId, fuelLoaded));
    }

    @PatchMapping("/{operationId}/weight")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightOperation> updateWeightData(
            @PathVariable Long operationId,
            @RequestParam BigDecimal actualWeight,
            @RequestParam BigDecimal cargoWeight) {
        return ResponseEntity.ok(operationsService.updateWeightData(operationId, actualWeight, cargoWeight));
    }

    @GetMapping("/pending-checks")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FlightOperation>> getPendingPreFlightChecks() {
        return ResponseEntity.ok(operationsService.getPendingPreFlightChecks());
    }

    record PreFlightCheckRequest(String remarks) {}
}

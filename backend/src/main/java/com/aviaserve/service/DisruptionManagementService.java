package com.aviaserve.service;

import com.aviaserve.model.Flight;
import com.aviaserve.model.FlightDisruption;
import com.aviaserve.repository.FlightDisruptionRepository;
import com.aviaserve.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DisruptionManagementService {
    private final FlightDisruptionRepository disruptionRepository;
    private final FlightRepository flightRepository;

    @Transactional
    public FlightDisruption reportDisruption(Long flightId, FlightDisruption.DisruptionType type,
                                            FlightDisruption.DisruptionSeverity severity,
                                            String reason, String description, String reportedBy) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        FlightDisruption disruption = new FlightDisruption();
        disruption.setFlight(flight);
        disruption.setType(type);
        disruption.setSeverity(severity);
        disruption.setReason(reason);
        disruption.setDescription(description);
        disruption.setReportedAt(LocalDateTime.now());
        disruption.setReportedBy(reportedBy);
        disruption.setStatus(FlightDisruption.DisruptionStatus.REPORTED);

        // Auto-escalate critical disruptions
        if (severity == FlightDisruption.DisruptionSeverity.CRITICAL) {
            disruption.setStatus(FlightDisruption.DisruptionStatus.ESCALATED);
        }

        // Update flight status based on disruption type
        if (type == FlightDisruption.DisruptionType.CANCELLATION) {
            flight.setStatus(Flight.FlightStatus.CANCELLED);
        } else if (type == FlightDisruption.DisruptionType.DELAY) {
            flight.setStatus(Flight.FlightStatus.DELAYED);
        }
        
        flightRepository.save(flight);

        return disruptionRepository.save(disruption);
    }

    public List<FlightDisruption> getFlightDisruptions(Long flightId) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
        return disruptionRepository.findByFlight(flight);
    }

    public List<FlightDisruption> getActiveDisruptions() {
        return disruptionRepository.findAll().stream()
                .filter(d -> d.getStatus() != FlightDisruption.DisruptionStatus.RESOLVED)
                .toList();
    }

    public List<FlightDisruption> getDisruptionsBySeverity(FlightDisruption.DisruptionSeverity severity) {
        return disruptionRepository.findActiveDisruptionsBySeverity(severity);
    }

    @Transactional
    public FlightDisruption updateDisruptionStatus(Long disruptionId, 
                                                  FlightDisruption.DisruptionStatus status,
                                                  String mitigationActions,
                                                  String resolvedBy) {
        FlightDisruption disruption = disruptionRepository.findById(disruptionId)
                .orElseThrow(() -> new RuntimeException("Disruption not found"));

        disruption.setStatus(status);
        
        if (mitigationActions != null) {
            disruption.setMitigationActions(mitigationActions);
        }

        if (status == FlightDisruption.DisruptionStatus.RESOLVED) {
            disruption.setActualResolutionTime(LocalDateTime.now());
            disruption.setResolvedBy(resolvedBy);
        }

        return disruptionRepository.save(disruption);
    }

    @Transactional
    public FlightDisruption addMitigationAction(Long disruptionId, String action) {
        FlightDisruption disruption = disruptionRepository.findById(disruptionId)
                .orElseThrow(() -> new RuntimeException("Disruption not found"));

        String currentActions = disruption.getMitigationActions();
        String updatedActions = currentActions == null ? action : currentActions + "; " + action;
        disruption.setMitigationActions(updatedActions);
        disruption.setStatus(FlightDisruption.DisruptionStatus.ACTION_TAKEN);

        return disruptionRepository.save(disruption);
    }

    public List<FlightDisruption> getDisruptionsByDateRange(LocalDateTime start, LocalDateTime end) {
        return disruptionRepository.findDisruptionsByDateRange(start, end);
    }
}

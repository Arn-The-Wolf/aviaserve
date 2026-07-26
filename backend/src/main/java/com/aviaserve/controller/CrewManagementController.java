package com.aviaserve.controller;

import com.aviaserve.model.CrewAssignment;
import com.aviaserve.model.CrewMember;
import com.aviaserve.model.Flight;
import com.aviaserve.service.CrewManagementService;
import com.aviaserve.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crew")
@RequiredArgsConstructor
public class CrewManagementController {
    private final CrewManagementService crewManagementService;
    private final FlightService flightService;

    @PostMapping("/members")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrewMember> addCrewMember(@RequestBody CrewMember crewMember) {
        return ResponseEntity.ok(crewManagementService.addCrewMember(crewMember));
    }

    @GetMapping("/members")
    public ResponseEntity<List<CrewMember>> getAllCrewMembers() {
        return ResponseEntity.ok(crewManagementService.getAllCrewMembers());
    }

    @GetMapping("/members/{id}")
    public ResponseEntity<CrewMember> getCrewMember(@PathVariable Long id) {
        return ResponseEntity.ok(crewManagementService.getCrewMemberById(id));
    }

    @GetMapping("/members/role/{role}")
    public ResponseEntity<List<CrewMember>> getCrewByRole(@PathVariable CrewMember.CrewRole role) {
        return ResponseEntity.ok(crewManagementService.getCrewByRole(role));
    }

    @GetMapping("/members/available")
    public ResponseEntity<List<CrewMember>> getAvailableCrew(
            @RequestParam String airport,
            @RequestParam CrewMember.CrewRole role) {
        return ResponseEntity.ok(crewManagementService.getAvailableCrewForFlight(airport, role));
    }

    @PostMapping("/assignments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrewAssignment> assignCrewToFlight(@RequestBody AssignCrewRequest request) {
        Flight flight = flightService.getFlightById(request.flightId());
        return ResponseEntity.ok(crewManagementService.assignCrewToFlight(
                request.crewMemberId(),
                flight,
                request.notes()
        ));
    }

    @GetMapping("/assignments/flight/{flightId}")
    public ResponseEntity<List<CrewAssignment>> getFlightCrew(@PathVariable Long flightId) {
        Flight flight = flightService.getFlightById(flightId);
        return ResponseEntity.ok(crewManagementService.getFlightCrew(flight));
    }

    @GetMapping("/assignments/member/{crewMemberId}")
    public ResponseEntity<List<CrewAssignment>> getCrewMemberAssignments(@PathVariable Long crewMemberId) {
        return ResponseEntity.ok(crewManagementService.getCrewMemberAssignments(crewMemberId));
    }

    @PatchMapping("/assignments/{assignmentId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CrewAssignment> updateAssignmentStatus(
            @PathVariable Long assignmentId,
            @RequestParam CrewAssignment.AssignmentStatus status) {
        return ResponseEntity.ok(crewManagementService.updateAssignmentStatus(assignmentId, status));
    }

    @GetMapping("/members/expiring-certificates")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CrewMember>> getExpiringCertificates(@RequestParam(defaultValue = "30") int daysAhead) {
        return ResponseEntity.ok(crewManagementService.getCrewWithExpiringCertificates(daysAhead));
    }

    record AssignCrewRequest(Long crewMemberId, Long flightId, String notes) {}
}

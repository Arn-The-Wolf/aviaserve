package com.aviaserve.service;

import com.aviaserve.model.CrewAssignment;
import com.aviaserve.model.CrewMember;
import com.aviaserve.model.Flight;
import com.aviaserve.repository.CrewAssignmentRepository;
import com.aviaserve.repository.CrewMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewManagementService {
    private final CrewMemberRepository crewMemberRepository;
    private final CrewAssignmentRepository crewAssignmentRepository;

    @Transactional
    public CrewMember addCrewMember(CrewMember crewMember) {
        return crewMemberRepository.save(crewMember);
    }

    public CrewMember getCrewMemberById(Long id) {
        return crewMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crew member not found"));
    }

    public List<CrewMember> getAllCrewMembers() {
        return crewMemberRepository.findAll();
    }

    public List<CrewMember> getCrewByRole(CrewMember.CrewRole role) {
        return crewMemberRepository.findByRole(role);
    }

    public List<CrewMember> getAvailableCrewForFlight(String airport, CrewMember.CrewRole role) {
        return crewMemberRepository.findAvailableCrewByAirportAndRole(airport, role);
    }

    @Transactional
    public CrewAssignment assignCrewToFlight(Long crewMemberId, Flight flight, String notes) {
        CrewMember crewMember = getCrewMemberById(crewMemberId);
        
        // Check if crew member is already assigned to another flight at the same time
        List<CrewAssignment> activeAssignments = crewAssignmentRepository
                .findActiveAssignmentsByCrewMember(crewMember);
        
        for (CrewAssignment assignment : activeAssignments) {
            Flight assignedFlight = assignment.getFlight();
            if (isFlightOverlapping(flight, assignedFlight)) {
                throw new RuntimeException("Crew member is already assigned to another flight during this time");
            }
        }

        CrewAssignment assignment = new CrewAssignment();
        assignment.setCrewMember(crewMember);
        assignment.setFlight(flight);
        assignment.setAssignedAt(LocalDateTime.now());
        assignment.setStatus(CrewAssignment.AssignmentStatus.SCHEDULED);
        assignment.setNotes(notes);

        return crewAssignmentRepository.save(assignment);
    }

    public List<CrewAssignment> getFlightCrew(Flight flight) {
        return crewAssignmentRepository.findActiveAssignmentsByFlight(flight);
    }

    public List<CrewAssignment> getCrewMemberAssignments(Long crewMemberId) {
        CrewMember crewMember = getCrewMemberById(crewMemberId);
        return crewAssignmentRepository.findByCrewMember(crewMember);
    }

    @Transactional
    public CrewAssignment updateAssignmentStatus(Long assignmentId, CrewAssignment.AssignmentStatus status) {
        CrewAssignment assignment = crewAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
        
        assignment.setStatus(status);
        
        if (status == CrewAssignment.AssignmentStatus.CHECKED_IN) {
            assignment.setCheckInTime(LocalDateTime.now());
        } else if (status == CrewAssignment.AssignmentStatus.COMPLETED) {
            assignment.setCheckOutTime(LocalDateTime.now());
        }

        return crewAssignmentRepository.save(assignment);
    }

    public List<CrewMember> getCrewWithExpiringCertificates(int daysAhead) {
        LocalDate checkDate = LocalDate.now().plusDays(daysAhead);
        List<CrewMember> expiringLicenses = crewMemberRepository.findCrewWithExpiringLicense(checkDate);
        List<CrewMember> expiringMedical = crewMemberRepository.findCrewWithExpiringMedical(checkDate);
        
        expiringLicenses.addAll(expiringMedical);
        return expiringLicenses.stream().distinct().toList();
    }

    private boolean isFlightOverlapping(Flight flight1, Flight flight2) {
        return !flight1.getDepartureTime().isAfter(flight2.getArrivalTime()) &&
               !flight1.getArrivalTime().isBefore(flight2.getDepartureTime());
    }
}

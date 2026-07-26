package com.aviaserve.repository;

import com.aviaserve.model.CrewAssignment;
import com.aviaserve.model.CrewMember;
import com.aviaserve.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CrewAssignmentRepository extends JpaRepository<CrewAssignment, Long> {
    List<CrewAssignment> findByFlight(Flight flight);
    
    List<CrewAssignment> findByCrewMember(CrewMember crewMember);
    
    List<CrewAssignment> findByStatus(CrewAssignment.AssignmentStatus status);
    
    @Query("SELECT ca FROM CrewAssignment ca WHERE ca.crewMember = :crewMember AND ca.status IN ('SCHEDULED', 'CONFIRMED')")
    List<CrewAssignment> findActiveAssignmentsByCrewMember(CrewMember crewMember);
    
    @Query("SELECT ca FROM CrewAssignment ca WHERE ca.flight = :flight AND ca.status IN ('SCHEDULED', 'CONFIRMED', 'CHECKED_IN')")
    List<CrewAssignment> findActiveAssignmentsByFlight(Flight flight);
}

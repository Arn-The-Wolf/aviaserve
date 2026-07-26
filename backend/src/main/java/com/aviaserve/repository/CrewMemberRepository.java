package com.aviaserve.repository;

import com.aviaserve.model.CrewMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CrewMemberRepository extends JpaRepository<CrewMember, Long> {
    Optional<CrewMember> findByEmployeeId(String employeeId);
    
    List<CrewMember> findByRole(CrewMember.CrewRole role);
    
    List<CrewMember> findByStatus(CrewMember.CrewStatus status);
    
    List<CrewMember> findByBaseAirport(String baseAirport);
    
    @Query("SELECT c FROM CrewMember c WHERE c.licenseExpiry < :date AND c.status = 'ACTIVE'")
    List<CrewMember> findCrewWithExpiringLicense(LocalDate date);
    
    @Query("SELECT c FROM CrewMember c WHERE c.medicalCertificateExpiry < :date AND c.status = 'ACTIVE'")
    List<CrewMember> findCrewWithExpiringMedical(LocalDate date);
    
    @Query("SELECT c FROM CrewMember c WHERE c.baseAirport = :airport AND c.role = :role AND c.status = 'ACTIVE'")
    List<CrewMember> findAvailableCrewByAirportAndRole(String airport, CrewMember.CrewRole role);
}

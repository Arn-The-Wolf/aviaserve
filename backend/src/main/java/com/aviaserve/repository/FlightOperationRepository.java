package com.aviaserve.repository;

import com.aviaserve.model.Flight;
import com.aviaserve.model.FlightOperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlightOperationRepository extends JpaRepository<FlightOperation, Long> {
    Optional<FlightOperation> findByFlight(Flight flight);
    
    List<FlightOperation> findByStatus(FlightOperation.OperationStatus status);
    
    @Query("SELECT fo FROM FlightOperation fo WHERE fo.preFlightCheckCompleted = false AND fo.flight.departureTime < CURRENT_TIMESTAMP + 2 HOUR")
    List<FlightOperation> findPendingPreFlightChecks();
}

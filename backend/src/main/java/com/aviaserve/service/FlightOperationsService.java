package com.aviaserve.service;

import com.aviaserve.model.Flight;
import com.aviaserve.model.FlightOperation;
import com.aviaserve.repository.FlightOperationRepository;
import com.aviaserve.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightOperationsService {
    private final FlightOperationRepository operationRepository;
    private final FlightRepository flightRepository;

    @Transactional
    public FlightOperation createFlightOperation(Long flightId, FlightOperation operation) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        operation.setFlight(flight);
        operation.setStatus(FlightOperation.OperationStatus.PLANNING);

        return operationRepository.save(operation);
    }

    public FlightOperation getFlightOperation(Long flightId) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
        return operationRepository.findByFlight(flight)
                .orElseThrow(() -> new RuntimeException("Flight operation not found"));
    }

    @Transactional
    public FlightOperation completePreFlightCheck(Long operationId, String remarks) {
        FlightOperation operation = operationRepository.findById(operationId)
                .orElseThrow(() -> new RuntimeException("Flight operation not found"));

        operation.setPreFlightCheckCompleted(true);
        operation.setPreFlightCheckTime(LocalDateTime.now());
        operation.setRemarks(remarks);
        operation.setStatus(FlightOperation.OperationStatus.READY);

        return operationRepository.save(operation);
    }

    @Transactional
    public FlightOperation updateActualDeparture(Long operationId, LocalDateTime departureTime) {
        FlightOperation operation = operationRepository.findById(operationId)
                .orElseThrow(() -> new RuntimeException("Flight operation not found"));

        operation.setActualDepartureTime(departureTime);
        operation.setStatus(FlightOperation.OperationStatus.IN_PROGRESS);

        // Update associated flight
        Flight flight = operation.getFlight();
        flight.setStatus(Flight.FlightStatus.IN_FLIGHT);
        flightRepository.save(flight);

        return operationRepository.save(operation);
    }

    @Transactional
    public FlightOperation updateActualArrival(Long operationId, LocalDateTime arrivalTime) {
        FlightOperation operation = operationRepository.findById(operationId)
                .orElseThrow(() -> new RuntimeException("Flight operation not found"));

        operation.setActualArrivalTime(arrivalTime);
        operation.setStatus(FlightOperation.OperationStatus.COMPLETED);

        // Update associated flight
        Flight flight = operation.getFlight();
        flight.setStatus(Flight.FlightStatus.LANDED);
        flightRepository.save(flight);

        return operationRepository.save(operation);
    }

    public List<FlightOperation> getPendingPreFlightChecks() {
        return operationRepository.findPendingPreFlightChecks();
    }

    @Transactional
    public FlightOperation updateFuelData(Long operationId, BigDecimal fuelLoaded) {
        FlightOperation operation = operationRepository.findById(operationId)
                .orElseThrow(() -> new RuntimeException("Flight operation not found"));

        operation.setFuelLoaded(fuelLoaded);
        return operationRepository.save(operation);
    }

    @Transactional
    public FlightOperation updateWeightData(Long operationId, BigDecimal actualWeight, BigDecimal cargoWeight) {
        FlightOperation operation = operationRepository.findById(operationId)
                .orElseThrow(() -> new RuntimeException("Flight operation not found"));

        operation.setActualWeight(actualWeight);
        operation.setCargoWeight(cargoWeight);
        return operationRepository.save(operation);
    }
}

# AviaServe - Aviation Operations Management System

## Overview
AviaServe is a comprehensive airline operations management system built with Spring Boot and Next.js, featuring advanced modules for crew management, flight operations, disruption management, and safety & security compliance.

## Job Application Context
This system demonstrates hands-on experience with **airline/aviation operations** including:
- ✅ **Crew Management System** - Scheduling, assignments, certification tracking
- ✅ **Flight Operations** - Pre-flight checks, fuel/weight management, operational tracking
- ✅ **Disruption Management** - Delay handling, cancellation workflows, mitigation strategies
- ✅ **Safety & Security** - Incident reporting, investigation tracking, compliance monitoring

## Technology Stack

### Backend
- **Java 17** with **Spring Boot 3.2.3**
- **Spring Security** with JWT authentication
- **Spring Data JPA** with PostgreSQL
- **Flyway** for database migrations
- **Spring AI** integration ready
- **Redis** for caching
- **Lombok** for cleaner code

### Frontend
- **Next.js 14** with React 18
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management

## Aviation Operations Features

### 1. Crew Management (`/crew`)

#### Features
- **Crew Member Management**: Add, update, and track crew members (Pilots, Flight Attendants, etc.)
- **Role-based Organization**: Captain, First Officer, Flight Engineer, Purser, Flight Attendant
- **Certification Tracking**: Monitor license and medical certificate expiration
- **Base Airport Management**: Track crew home base locations
- **Flight Hour Tracking**: Monthly and yearly flight hour monitoring
- **Qualification Management**: Track aircraft type qualifications

#### API Endpoints
```
POST   /api/crew/members                     - Add new crew member (ADMIN)
GET    /api/crew/members                     - Get all crew members
GET    /api/crew/members/{id}                - Get crew member details
GET    /api/crew/members/role/{role}         - Get crew by role
GET    /api/crew/members/available           - Get available crew for flight
GET    /api/crew/members/expiring-certificates - Get crew with expiring certs (ADMIN)

POST   /api/crew/assignments                 - Assign crew to flight (ADMIN)
GET    /api/crew/assignments/flight/{id}     - Get flight crew
GET    /api/crew/assignments/member/{id}     - Get crew member assignments
PATCH  /api/crew/assignments/{id}/status     - Update assignment status (ADMIN)
```

#### Models
- **CrewMember**: Employee details, qualifications, certifications
- **CrewAssignment**: Flight assignments with check-in/out tracking

#### Business Rules
- Prevents double-booking crew members
- Alerts for expiring licenses and medical certificates
- Tracks crew duty time limits
- Supports multiple aircraft qualifications

### 2. Flight Operations (`/operations`)

#### Features
- **Pre-flight Planning**: Fuel calculations, weight & balance, flight plans
- **Pre-flight Checks**: Safety checklists before departure
- **Real-time Tracking**: Actual departure/arrival times
- **Fuel Management**: Required vs. loaded fuel tracking
- **Weight & Balance**: Passenger, cargo, and total weight calculations
- **Weather Integration**: Weather conditions documentation
- **NOTAM Review**: Notices to Airmen tracking
- **Route Management**: Flight plan and route tracking

#### API Endpoints
```
POST   /api/operations/flights/{flightId}    - Create flight operation (ADMIN)
GET    /api/operations/flights/{flightId}    - Get flight operation details
POST   /api/operations/{id}/pre-flight-check - Complete pre-flight check (ADMIN)
PATCH  /api/operations/{id}/departure         - Update actual departure (ADMIN)
PATCH  /api/operations/{id}/arrival           - Update actual arrival (ADMIN)
PATCH  /api/operations/{id}/fuel              - Update fuel data (ADMIN)
PATCH  /api/operations/{id}/weight            - Update weight data (ADMIN)
GET    /api/operations/pending-checks         - Get pending pre-flight checks (ADMIN)
```

#### Models
- **FlightOperation**: Complete operational data for each flight
- Tracks: Fuel, Weight, Timing, Routes, Checklists

#### Operational Workflow
1. **PLANNING** → Create flight operation with estimates
2. **READY** → Pre-flight check completed
3. **IN_PROGRESS** → Flight departed
4. **COMPLETED** → Flight landed and closed

### 3. Disruption Management (`/disruptions`)

#### Features
- **Disruption Reporting**: Report delays, cancellations, diversions
- **Severity Classification**: LOW, MEDIUM, HIGH, CRITICAL
- **Root Cause Tracking**: Weather, mechanical, crew shortage, ATC, etc.
- **Mitigation Actions**: Document resolution steps
- **Passenger Impact**: Track affected passenger counts
- **Compensation Tracking**: Flag flights requiring compensation
- **Escalation Workflow**: Auto-escalate critical disruptions
- **Resolution Tracking**: Estimated and actual resolution times

#### API Endpoints
```
POST   /api/disruptions/report                - Report new disruption (ADMIN)
GET    /api/disruptions/flight/{flightId}     - Get flight disruptions
GET    /api/disruptions/active                - Get all active disruptions
GET    /api/disruptions/severity/{severity}   - Get disruptions by severity
PATCH  /api/disruptions/{id}/status           - Update disruption status (ADMIN)
POST   /api/disruptions/{id}/mitigation-action - Add mitigation action (ADMIN)
GET    /api/disruptions/date-range            - Get disruptions by date range
```

#### Models
- **FlightDisruption**: Comprehensive disruption tracking

#### Disruption Types
- DELAY, CANCELLATION, DIVERSION
- MECHANICAL_ISSUE, WEATHER
- CREW_SHORTAGE, AIR_TRAFFIC_CONTROL
- SECURITY_ISSUE, OTHER

#### Workflow
1. **REPORTED** → Initial disruption logged
2. **INVESTIGATING** → Root cause analysis
3. **ACTION_TAKEN** → Mitigation in progress
4. **RESOLVED** → Issue closed
5. **ESCALATED** → Critical issues

### 4. Safety & Security (`/safety-security`)

#### Safety Incident Management

##### Features
- **Incident Reporting**: Near-miss, bird strikes, turbulence injuries, etc.
- **Severity Assessment**: MINOR, MODERATE, SERIOUS, CRITICAL
- **Investigation Workflow**: From report to closure
- **Regulatory Compliance**: Automatic flagging for required reports
- **Corrective Actions**: Document lessons learned and fixes
- **Investigator Assignment**: Track who's handling each case

##### API Endpoints
```
POST   /api/safety-security/incidents/report                     - Report incident (ADMIN)
GET    /api/safety-security/incidents/{incidentNumber}           - Get incident details
PATCH  /api/safety-security/incidents/{id}/investigation         - Update investigation (ADMIN)
GET    /api/safety-security/incidents/pending-regulatory-reports - Get pending reports (ADMIN)
POST   /api/safety-security/incidents/{id}/regulatory-report-submitted - Mark report sent (ADMIN)
```

##### Incident Types
- NEAR_MISS, BIRD_STRIKE
- TURBULENCE_INJURY, MECHANICAL_FAILURE
- RUNWAY_INCURSION, CABIN_SAFETY
- HAZARDOUS_MATERIAL, SECURITY_BREACH
- MEDICAL_EMERGENCY, OTHER

#### Security Check Management

##### Features
- **Pre-flight Security**: Aircraft, cargo, passenger screening
- **Multi-layer Checks**: 7 types of security checks
- **Anomaly Detection**: Flag and track security concerns
- **Approval Workflow**: Require supervisor approval for anomalies
- **Audit Trail**: Complete history of all checks

##### API Endpoints
```
POST   /api/safety-security/security-checks                - Perform check (ADMIN)
POST   /api/safety-security/security-checks/{id}/approve   - Approve check (ADMIN)
GET    /api/safety-security/security-checks/flight/{id}    - Get flight checks
GET    /api/safety-security/security-checks/anomalies      - Get anomalies (ADMIN)
```

##### Check Types
- PRE_FLIGHT_AIRCRAFT
- CARGO_SCREENING
- PASSENGER_SCREENING
- CREW_SCREENING
- BAGGAGE_SCREENING
- CATERING_SECURITY
- DOCUMENT_VERIFICATION

## Database Schema

### Core Tables
- `flights` - Flight schedules and details
- `bookings` - Passenger reservations
- `users` - User accounts

### Aviation Operations Tables (V3 Migration)
- `crew_members` - Crew personnel records
- `crew_assignments` - Flight-crew assignments
- `flight_operations` - Operational flight data
- `flight_disruptions` - Delay/cancellation tracking
- `safety_incidents` - Safety incident reports
- `security_checks` - Security screening records

## Security

### Authentication
- JWT-based authentication
- Token expiration: 24 hours
- Secure password hashing with BCrypt

### Authorization
- **USER Role**: Basic flight search and booking
- **ADMIN Role**: Full operational management access
- Method-level security with `@PreAuthorize`

### Protected Operations
All aviation operations endpoints require ADMIN role:
- Crew management
- Flight operations updates
- Disruption management
- Safety & security reporting

## Setup Instructions

### Prerequisites
- Java 17+
- PostgreSQL 14+
- Redis
- Node.js 18+
- Maven 3.8+

### Backend Setup
```bash
cd backend

# Configure database (application.yml)
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/aviaserve
    username: postgres
    password: postgres

# Run migrations
./mvnw flyway:migrate

# Start application
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
```bash
# Backend (.env or application.yml)
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-email-password
```

## API Documentation

### Swagger UI
Access interactive API documentation at:
```
http://localhost:8080/api/swagger-ui.html
```

### API Docs JSON
```
http://localhost:8080/api/api-docs
```

## Testing

### Sample Data
The system includes sample data migration (V2__sample_data.sql) with:
- Sample flights
- Demo users
- Test bookings

### Test Scenarios

#### 1. Crew Assignment Flow
```
1. Create crew member → POST /api/crew/members
2. Check availability → GET /api/crew/members/available?airport=JFK&role=CAPTAIN
3. Assign to flight → POST /api/crew/assignments
4. Check-in crew → PATCH /api/crew/assignments/{id}/status?status=CHECKED_IN
```

#### 2. Flight Operations Flow
```
1. Create operation → POST /api/operations/flights/{flightId}
2. Complete pre-flight → POST /api/operations/{id}/pre-flight-check
3. Record departure → PATCH /api/operations/{id}/departure
4. Record arrival → PATCH /api/operations/{id}/arrival
```

#### 3. Disruption Management Flow
```
1. Report disruption → POST /api/disruptions/report
2. Add mitigation → POST /api/disruptions/{id}/mitigation-action
3. Update status → PATCH /api/disruptions/{id}/status
4. Close disruption → PATCH /api/disruptions/{id}/status?status=RESOLVED
```

#### 4. Safety Incident Flow
```
1. Report incident → POST /api/safety-security/incidents/report
2. Assign investigator → PATCH /api/safety-security/incidents/{id}/investigation
3. Add findings → PATCH /api/safety-security/incidents/{id}/investigation
4. Close incident → PATCH /api/safety-security/incidents/{id}/investigation?status=CLOSED
```

## Key Aviation Domain Features

### 1. Regulatory Compliance
- Automatic flagging of incidents requiring regulatory reports
- Crew certification expiration tracking
- Audit trails for all safety-critical operations

### 2. Operational Efficiency
- Real-time flight status tracking
- Crew scheduling optimization
- Disruption impact assessment
- Pre-flight checklist automation

### 3. Safety Management
- Comprehensive incident reporting
- Investigation workflow management
- Corrective action tracking
- Trend analysis capabilities

### 4. Security Protocols
- Multi-layer security screening
- Anomaly detection and escalation
- Complete audit trail
- Compliance monitoring

## AI-Assisted Development

This project demonstrates the use of AI-assisted development tools:
- Code generation with AI pair programming
- Automated test scenario creation
- Documentation generation
- API design optimization

## Future Enhancements

### Planned Features
- Real-time flight tracking integration
- Automated crew scheduling optimization
- Predictive maintenance alerts
- Advanced analytics dashboard
- Mobile app for crew members
- Integration with external airline systems (ACARS, FIDS)
- Weather API integration
- Notification system for disruptions

### AI/ML Opportunities
- Predictive delay forecasting
- Crew fatigue risk assessment
- Maintenance anomaly detection
- Route optimization
- Fuel consumption prediction

## Project Structure

```
aviaserve/
├── backend/
│   ├── src/main/java/com/aviaserve/
│   │   ├── model/           # Domain models
│   │   │   ├── Flight.java
│   │   │   ├── Booking.java
│   │   │   ├── CrewMember.java
│   │   │   ├── FlightOperation.java
│   │   │   ├── FlightDisruption.java
│   │   │   ├── SafetyIncident.java
│   │   │   └── SecurityCheck.java
│   │   ├── repository/      # Data access layer
│   │   ├── service/         # Business logic
│   │   │   ├── CrewManagementService.java
│   │   │   ├── FlightOperationsService.java
│   │   │   ├── DisruptionManagementService.java
│   │   │   └── SafetySecurityService.java
│   │   ├── controller/      # REST endpoints
│   │   ├── config/          # Configuration
│   │   └── security/        # Security components
│   └── src/main/resources/
│       └── db/migration/    # Flyway migrations
│           ├── V1__init_schema.sql
│           ├── V2__sample_data.sql
│           └── V3__aviation_operations.sql
└── frontend/
    ├── app/                 # Next.js pages
    ├── components/          # React components
    └── lib/                 # Utilities
```

## Contributing

When adding new aviation operations features:
1. Follow airline industry standards (IATA, ICAO)
2. Include proper security checks
3. Maintain audit trails
4. Document regulatory requirements
5. Add comprehensive tests

## License

This project is developed for educational and portfolio purposes, demonstrating airline operations system development expertise.

## Contact

For job application inquiries related to this aviation operations system, please reference:
- **Domain Expertise**: Crew Management, Flight Operations, Disruption Management, Safety & Security
- **Technical Skills**: Java, Spring Boot, React, PostgreSQL, Redis
- **Industry Knowledge**: Airline operations, regulatory compliance, safety protocols
- **AI Tools**: Proficient in AI-assisted development workflow

---

**Built with Spring Boot 3.2.3 + Next.js 14 | Demonstrates Airline Operations Domain Expertise**

# AVIASERVE - Airline Reservation System

A modern airline reservation system built with Spring Boot and Next.js.

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL 12 or higher
- Redis (for caching)
- Maven

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/aviaserve
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres

# JWT
JWT_SECRET=your-256-bit-secret

# Google OAuth2
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-email-password
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Build the project:

   ```bash
   ./mvnw clean install
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will be available at `http://localhost:8080/api`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

The frontend will be available at `http://localhost:3000`

## Features

- User authentication and authorization
- Flight search and booking
- User dashboard
- Admin dashboard
- Email notifications
- Real-time flight status updates
- Seat selection
- Booking management

## API Documentation

API documentation is available at `http://localhost:8080/api/swagger-ui.html` when the backend is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

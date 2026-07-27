# 🚀 Backend Deployment Guide - AviaServe

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL database (provided by hosting platform)
- Git repository access

## 🎯 Quick Deploy Options

### Option 1: Railway (Recommended) ⭐

Railway is the easiest way to deploy Spring Boot applications with PostgreSQL.

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Step 2: Login to Railway
```bash
railway login
```

#### Step 3: Navigate to Backend Directory
```bash
cd backend
```

#### Step 4: Initialize Railway Project
```bash
railway init
```
- Follow the prompts to create a new project
- Choose a project name (e.g., "aviaserve-backend")

#### Step 5: Add PostgreSQL Database
```bash
railway add
```
- Select "PostgreSQL" from the list
- Railway will automatically provision a database

#### Step 6: Set Environment Variables
```bash
# Railway will automatically set DATABASE_URL
# You need to set these manually:

railway variables set JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
railway variables set SPRING_PROFILES_ACTIVE="production"
railway variables set CORS_ALLOWED_ORIGINS="https://frontend-gk45u1jv1-ruyangearnold-5350s-projects.vercel.app,https://frontend-psi-one-88.vercel.app"
```

Optional variables:
```bash
railway variables set MAIL_HOST="smtp.gmail.com"
railway variables set MAIL_PORT="587"
railway variables set MAIL_USERNAME="your-email@gmail.com"
railway variables set MAIL_PASSWORD="your-app-password"
railway variables set REDIS_HOST="your-redis-host"
railway variables set REDIS_PORT="6379"
```

#### Step 7: Deploy
```bash
railway up
```

#### Step 8: Get Your Backend URL
```bash
railway domain
```

This will generate a URL like: `https://aviaserve-backend.railway.app`

#### Step 9: Verify Deployment
```bash
# Check health endpoint
curl https://your-app.railway.app/api/actuator/health

# Expected response:
# {"status":"UP"}
```

---

### Option 2: Render

#### Step 1: Create Render Account
Go to https://render.com and sign up

#### Step 2: Create PostgreSQL Database
1. Click "New +" → "PostgreSQL"
2. Name: `aviaserve-db`
3. Choose free tier
4. Click "Create Database"
5. Save the connection details

#### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your Git repository
3. Select the `backend` directory
4. Configure:
   - **Name**: `aviaserve-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Java`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/aviaserve-backend-0.0.1-SNAPSHOT.jar`
   - **Plan**: Free

#### Step 4: Set Environment Variables
In the Render dashboard, add these environment variables:

```
DATABASE_URL=<from_render_postgresql_internal_url>
JWT_SECRET=your-super-secret-jwt-key-change-this
SPRING_PROFILES_ACTIVE=production
CORS_ALLOWED_ORIGINS=https://frontend-gk45u1jv1-ruyangearnold-5350s-projects.vercel.app,https://frontend-psi-one-88.vercel.app
```

#### Step 5: Deploy
Click "Create Web Service" - Render will automatically deploy

---

### Option 3: Heroku

#### Step 1: Install Heroku CLI
```bash
# Windows
winget install Heroku.HerokuCLI

# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

#### Step 2: Login
```bash
heroku login
```

#### Step 3: Create Heroku App
```bash
cd backend
heroku create aviaserve-backend
```

#### Step 4: Add PostgreSQL
```bash
heroku addons:create heroku-postgresql:essential-0
```

#### Step 5: Set Environment Variables
```bash
heroku config:set JWT_SECRET="your-super-secret-jwt-key"
heroku config:set SPRING_PROFILES_ACTIVE="production"
heroku config:set CORS_ALLOWED_ORIGINS="https://frontend-gk45u1jv1-ruyangearnold-5350s-projects.vercel.app"
```

#### Step 6: Create Procfile
Create `backend/Procfile`:
```
web: java -jar target/aviaserve-backend-0.0.1-SNAPSHOT.jar
```

#### Step 7: Deploy
```bash
git push heroku main
```

---

### Option 4: Docker + Any Cloud Platform

#### Step 1: Build Docker Image
```bash
cd backend
docker build -t aviaserve-backend .
```

#### Step 2: Test Locally
```bash
docker run -p 8080:8080 \
  -e DATABASE_URL="jdbc:postgresql://host.docker.internal:5432/aviaserve" \
  -e DATABASE_USERNAME="postgres" \
  -e DATABASE_PASSWORD="postgres" \
  -e JWT_SECRET="your-secret" \
  -e SPRING_PROFILES_ACTIVE="production" \
  aviaserve-backend
```

#### Step 3: Push to Registry
```bash
# Docker Hub
docker tag aviaserve-backend yourusername/aviaserve-backend
docker push yourusername/aviaserve-backend

# Google Container Registry
docker tag aviaserve-backend gcr.io/your-project/aviaserve-backend
docker push gcr.io/your-project/aviaserve-backend
```

#### Step 4: Deploy to Platform
- **Google Cloud Run**: `gcloud run deploy`
- **AWS ECS**: Use AWS Console or CLI
- **Azure Container Instances**: Use Azure Portal
- **DigitalOcean App Platform**: Connect your Docker registry

---

## 🔐 Required Environment Variables

### Essential Variables
```bash
# Database (usually auto-set by hosting platform)
DATABASE_URL=jdbc:postgresql://host:port/database
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

# JWT Security (REQUIRED)
JWT_SECRET=your-super-secret-jwt-key-at-least-256-bits

# Spring Profile
SPRING_PROFILES_ACTIVE=production

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

### Optional Variables
```bash
# Port (usually auto-set)
PORT=8080

# Email Configuration (optional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Redis (optional, for caching)
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# JWT Expiration (default: 24 hours)
JWT_EXPIRATION=86400000
```

---

## 🗄️ Database Setup

### Automatic Migration
The application uses Flyway for database migrations. On first deployment:

1. **V1__init_schema.sql** - Creates base tables (users, flights, bookings)
2. **V2__sample_data.sql** - Adds sample data for testing
3. **V3__aviation_operations.sql** - Creates aviation operations tables

Migrations run automatically on startup when `spring.flyway.enabled=true` (default in production).

### Manual Database Setup (if needed)
```bash
# Connect to your PostgreSQL database
psql $DATABASE_URL

# Check if tables were created
\dt

# You should see tables like:
# users, flights, bookings, crew_members, crew_assignments, 
# flight_operations, flight_disruptions, safety_incidents, security_checks
```

---

## ✅ Verify Deployment

### 1. Health Check
```bash
curl https://your-backend-url.com/api/actuator/health
```
Expected: `{"status":"UP"}`

### 2. Test Authentication Endpoint
```bash
curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### 3. Check Database Connection
```bash
curl https://your-backend-url.com/api/flights
```
Should return flight data (may require authentication)

### 4. Test Operations Endpoints
```bash
# Login first to get token
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'

# Use the token to access operations
curl https://your-backend-url.com/api/operations/crew \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔗 Connect Frontend to Backend

### Update Frontend Environment Variables

#### Local Development (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
```

#### Vercel Production
```bash
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-backend-url.railway.app/api
```

Or via Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.railway.app/api`
4. Redeploy frontend

---

## 📊 Monitoring & Logs

### Railway
```bash
# View logs
railway logs

# Follow logs in real-time
railway logs --follow
```

### Render
- View logs in Render Dashboard
- Navigate to your service → "Logs" tab

### Heroku
```bash
# View logs
heroku logs --tail

# View specific app logs
heroku logs --app aviaserve-backend --tail
```

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if DATABASE_URL is set correctly
railway variables
# or
heroku config
```

Ensure format: `jdbc:postgresql://host:port/database`

### JWT Secret Not Set
Error: `jwt.secret must be set`

Solution:
```bash
railway variables set JWT_SECRET="your-long-secret-key-here"
```

### Build Failures
```bash
# Check Maven build locally
cd backend
mvn clean package -DskipTests
```

### CORS Errors
Update CORS_ALLOWED_ORIGINS to include your frontend URL:
```bash
railway variables set CORS_ALLOWED_ORIGINS="https://your-frontend.vercel.app"
```

### Database Migration Failures
```bash
# Check Flyway status
railway logs | grep flyway

# If needed, reset and re-run migrations
railway run psql $DATABASE_URL -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
railway up
```

---

## 🎯 Performance Optimization

### Database Connection Pool
Already configured in `application-production.yml`:
- Maximum pool size: 10
- Minimum idle: 5
- Connection timeout: 30s

### Logging
Production logging is set to INFO level to reduce noise.

### Health Checks
Available at `/api/actuator/health` for platform monitoring.

---

## 🔒 Security Checklist

- ✅ JWT_SECRET is set and secure (256+ bits)
- ✅ Database credentials are environment variables
- ✅ CORS is configured for frontend domain only
- ✅ Spring Security enabled with role-based access
- ✅ SQL injection prevention via JPA
- ✅ Password hashing with BCrypt
- ✅ HTTPS enforced by hosting platform

---

## 📈 Scaling Considerations

### Horizontal Scaling
Most platforms support horizontal scaling:
```bash
# Railway
railway up --replicas 3

# Heroku
heroku ps:scale web=3
```

### Database Scaling
- Start with free tier
- Upgrade to paid tier when needed
- Consider read replicas for heavy read loads

### Caching
Redis is configured but optional. Add when needed:
```bash
railway add redis
```

---

## 🎓 Post-Deployment

### 1. Test All Endpoints
Use the API documentation at: `https://your-backend-url/api/swagger-ui.html`

### 2. Create Admin User
```bash
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@aviaserve.com",
    "password": "SecurePassword123!",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

### 3. Update Documentation
Update `DEPLOYMENT_SUCCESS.md` with your backend URL.

---

## 📞 Support

For deployment issues:
1. Check logs first: `railway logs` or platform equivalent
2. Verify all environment variables are set
3. Test database connectivity
4. Check CORS configuration

**Backend Status**: Ready to deploy ✅
**Recommended Platform**: Railway
**Estimated Deploy Time**: 5-10 minutes

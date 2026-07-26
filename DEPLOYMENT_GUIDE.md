# 🚀 AviaServe Deployment Guide

Complete guide to deploy your aviation operations platform to production.

---

## 📋 Prerequisites

- [x] GitHub account with repository pushed
- [x] Vercel account (free tier available)
- [x] Backend API deployed (or use mock mode)

---

## 🌐 Deploy Frontend to Vercel

### Step 1: Prepare Your Repository

✅ **Already Done!** Your code is pushed to GitHub:
```
Repository: https://github.com/Arn-The-Wolf/aviaserve
Branch: main
```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended - 5 minutes)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select: `Arn-The-Wolf/aviaserve`
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: npm install (auto-detected)
   ```

4. **Set Environment Variables**
   
   Click "Environment Variables" and add:
   
   | Name | Value | Notes |
   |------|-------|-------|
   | `NEXT_PUBLIC_API_URL` | `http://localhost:8080/api` | For demo/mock mode |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | (optional) | If using Stripe |
   
   **For Production with Real Backend:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your site will be live at: `https://your-project-name.vercel.app`

#### Option B: Via Vercel CLI (Advanced)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to Frontend**
   ```bash
   cd frontend
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   # Preview deployment
   vercel
   
   # Production deployment
   vercel --prod
   ```

5. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL production
   # Enter your API URL when prompted
   ```

---

## 🎯 Post-Deployment Setup

### 1. Verify Deployment

✅ **Check these pages are working:**
- Homepage: `https://your-app.vercel.app/`
- Operations Center: `https://your-app.vercel.app/operations`
- Admin Panel: `https://your-app.vercel.app/admin`
- Flights: `https://your-app.vercel.app/flights`

### 2. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-60 minutes)

Example: `aviaserve.com` → Your Vercel app

### 3. Configure Backend CORS

Update your Spring Boot `SecurityConfig.java`:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:3000",
        "https://your-app.vercel.app",  // Add your Vercel URL
        "https://aviaserve.com"          // Add custom domain if using
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

---

## 🔧 Environment Variables Reference

### Frontend (.env.local)

```env
# Backend API - REQUIRED
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api

# Payments - OPTIONAL
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Google OAuth - OPTIONAL
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
```

### Backend (application.yml)

```yaml
cors:
  allowed-origins: 
    - http://localhost:3000
    - https://your-app.vercel.app
    - https://aviaserve.com
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in)

1. Go to your project → Analytics tab
2. View:
   - Page views
   - Unique visitors
   - Performance metrics
   - Geographic distribution

### Performance Optimization

✅ **Already Configured:**
- Image optimization (Next.js Image)
- Code splitting (automatic)
- Static page generation
- Incremental Static Regeneration

---

## 🚨 Troubleshooting

### Build Fails

**Issue**: `npm run build` fails
```bash
Solution:
1. Check build logs in Vercel dashboard
2. Verify Node.js version (18+)
3. Clear cache and rebuild
4. Check for TypeScript errors
```

**Fix**: Add to vercel.json
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs"
}
```

### API Connection Issues

**Issue**: Frontend can't connect to backend

```bash
Solution:
1. Check NEXT_PUBLIC_API_URL is set correctly
2. Verify backend CORS allows your Vercel domain
3. Check backend is accessible publicly
4. Test API endpoint: curl https://your-backend.com/api/flights
```

### Environment Variables Not Working

**Issue**: Changes not reflecting

```bash
Solution:
1. Go to Project Settings → Environment Variables
2. Verify variables are set for "Production"
3. Redeploy: Deployments → ... → Redeploy
```

---

## 🔐 Security Checklist

- [x] Environment variables secured (not in code)
- [x] CORS properly configured
- [x] JWT tokens validated on backend
- [x] HTTPS enabled (automatic on Vercel)
- [x] Sensitive data not exposed in frontend
- [x] API keys stored in environment variables

---

## 📱 Testing Your Deployment

### 1. Basic Functionality
```bash
✅ Homepage loads
✅ Navigation works
✅ Flight search displays
✅ Login/Register pages accessible
✅ Admin panel loads (for admin users)
✅ Operations center works (for admin users)
```

### 2. API Integration
```bash
✅ Flight search returns results
✅ Booking flow works
✅ User authentication works
✅ Admin operations load data
```

### 3. Performance
```bash
✅ Page load time < 3 seconds
✅ Images load quickly
✅ Mobile responsive
✅ No console errors
```

### 4. Cross-Browser Testing
```bash
✅ Chrome/Edge
✅ Firefox
✅ Safari
✅ Mobile browsers
```

---

## 🎉 Success! Your App is Live

### Share Your Links

**Live Application:**
```
https://your-app-name.vercel.app
```

**GitHub Repository:**
```
https://github.com/Arn-The-Wolf/aviaserve
```

**Operations Center (Admin):**
```
https://your-app-name.vercel.app/operations
```

---

## 📈 Next Steps

### 1. Backend Deployment Options

#### Option A: Heroku (Free Tier)
```bash
# Install Heroku CLI
heroku create aviaserve-api

# Deploy
git subtree push --prefix backend heroku main

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set DATABASE_URL=your-db-url
```

#### Option B: Railway (Easy)
1. Visit railway.app
2. Connect GitHub repo
3. Select backend folder
4. Deploy automatically

#### Option C: AWS/Azure/GCP
- Use container deployment (Docker)
- Set up PostgreSQL database
- Configure environment variables
- Deploy Spring Boot application

### 2. Database Setup

**PostgreSQL Options:**
- Heroku Postgres (free tier)
- Railway Postgres (free tier)
- Supabase (free tier)
- AWS RDS (paid)

### 3. Continuous Deployment

✅ **Already Configured!**
- Every push to `main` branch auto-deploys
- Preview deployments for pull requests
- Automatic rollback on errors

---

## 🎯 Job Application Ready!

Your aviation operations platform is now:

✅ **Live on the internet**
✅ **Professional domain possible**
✅ **Production-grade deployment**
✅ **Continuous deployment setup**
✅ **Performance optimized**
✅ **Mobile responsive**

### For Job Interviews

**Share this:**
```
Live Demo: https://your-app.vercel.app
Operations Center: https://your-app.vercel.app/operations
GitHub: https://github.com/Arn-The-Wolf/aviaserve
Documentation: See AVIATION_OPERATIONS_GUIDE.md
```

**Key Features to Showcase:**
1. ✈️ **Crew Management** - /operations (Crew tab)
2. 🛫 **Flight Operations** - /operations (Overview tab)
3. ⚠️ **Disruption Management** - /operations (Disruptions tab)
4. 🛡️ **Safety & Security** - /operations (Safety tab)

---

## 📞 Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions

### Next.js Documentation
- https://nextjs.org/docs

### Your Repository
- Issues: https://github.com/Arn-The-Wolf/aviaserve/issues

---

## 🎨 Customization After Deployment

### Update Colors/Branding
```
frontend/app/globals.css - Global styles
frontend/tailwind.config.ts - Theme colors
```

### Add Custom Domain
1. Purchase domain (Namecheap, GoDaddy, etc.)
2. Add to Vercel project
3. Update DNS records
4. Wait for SSL certificate

### Analytics Integration
```typescript
// Add to frontend/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

**Deployment Status**: ✅ Ready to Deploy
**Estimated Time**: 5-10 minutes
**Difficulty**: Easy (Vercel handles everything!)

---

Built with ❤️ for Airline Operations Excellence

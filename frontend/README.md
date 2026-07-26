# AviaServe Frontend - Aviation Operations Platform

Modern, production-ready airline management system built with Next.js 14, React 18, and TypeScript.

## 🚀 Features

### Core Features
- ✈️ **Flight Search & Booking** - Real-time flight search with advanced filters
- 👤 **User Dashboard** - Personalized booking management
- 🎫 **Digital Boarding Pass** - QR code-based check-in
- 💳 **Secure Payments** - Stripe integration
- 🌟 **Loyalty Program** - Rewards and tier management

### Aviation Operations (Admin)
- 👥 **Crew Management** - Scheduling, certifications, assignments
- ✈️ **Flight Operations** - Pre-flight checks, fuel/weight management
- ⚠️ **Disruption Management** - Real-time delay/cancellation handling
- 🛡️ **Safety & Security** - Incident reporting, security checks

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **API Client**: Axios
- **Payments**: Stripe

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd frontend
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` with your configuration:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
\`\`\`

4. Run development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe key (optional)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI
\`\`\`bash
npm install -g vercel
\`\`\`

2. Login to Vercel
\`\`\`bash
vercel login
\`\`\`

3. Deploy
\`\`\`bash
vercel
\`\`\`

4. For production deployment
\`\`\`bash
vercel --prod
\`\`\`

### Environment Variables on Vercel

Add these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| NEXT_PUBLIC_API_URL | Your backend URL | Production |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe key | Production |

## 📁 Project Structure

\`\`\`
frontend/
├── app/                      # Next.js App Router
│   ├── (routes)/            # Route groups
│   │   ├── about/          # About page
│   │   ├── admin/          # Admin dashboard
│   │   ├── operations/     # Operations center (NEW)
│   │   ├── auth/           # Authentication
│   │   ├── booking/        # Booking flow
│   │   ├── dashboard/      # User dashboard
│   │   ├── flights/        # Flight search
│   │   └── ...
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── admin/             # Admin components
│   ├── auth/              # Auth components
│   ├── layout/            # Layout components
│   ├── ui/                # UI components (shadcn)
│   └── ...
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── package.json
\`\`\`

## 🎨 Key Pages

### Public Pages
- `/` - Homepage with hero and flight search
- `/flights` - Flight search and booking
- `/destinations` - Popular destinations
- `/about` - About the airline
- `/contact` - Contact form

### User Pages (Auth Required)
- `/dashboard` - User dashboard
- `/dashboard/bookings` - Booking history
- `/dashboard/profile` - Profile management
- `/dashboard/loyalty` - Loyalty program

### Admin Pages (Admin Role Required)
- `/admin` - Admin dashboard
- `/operations` - Aviation operations center (NEW)

## 🔧 Configuration

### Next.js Config
See `next.config.mjs` for:
- Image optimization
- Build settings
- Output configuration

### Tailwind Config
See `tailwind.config.ts` for:
- Theme customization
- Custom colors
- Typography settings

## 🌐 API Integration

The frontend connects to the Spring Boot backend via REST APIs.

**Base URL**: Configured in `NEXT_PUBLIC_API_URL`

### Endpoints Used
- `/api/flights` - Flight search and management
- `/api/bookings` - Booking operations
- `/api/auth` - Authentication
- `/api/crew` - Crew management (Admin)
- `/api/operations` - Flight operations (Admin)
- `/api/disruptions` - Disruption management (Admin)
- `/api/safety-security` - Safety & security (Admin)

## 🧪 Development

### Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Start Production Server
\`\`\`bash
npm start
\`\`\`

### Lint Code
\`\`\`bash
npm run lint
\`\`\`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎭 Features by Page

### Operations Center (`/operations`)
**Aviation operations dashboard with 4 modules:**

1. **Overview Tab**
   - Real-time stats (flights, crew, disruptions, security)
   - Active disruptions list
   - Operations metrics

2. **Crew Management Tab**
   - Crew status by role
   - Availability tracking
   - Assignment overview

3. **Disruptions Tab**
   - Active disruption monitoring
   - Severity classification
   - Resolution tracking

4. **Safety & Security Tab**
   - Safety incident summary
   - Security check status
   - Compliance monitoring

## 🔒 Security

- JWT-based authentication
- Role-based access control
- Secure API communication
- Environment variable protection
- XSS protection via React
- CSRF protection

## 🎨 Design System

### Colors
- Primary: Blue (#2563eb)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Error: Red (#ef4444)

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, larger sizes
- Body: Regular, readable sizes

## 📊 Performance

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Image optimization: Next.js Image component
- Code splitting: Automatic with Next.js

## 🐛 Troubleshooting

### Build Errors
1. Clear cache: `rm -rf .next`
2. Reinstall: `rm -rf node_modules && npm install`
3. Check Node version: `node -v` (should be 18+)

### API Connection Issues
1. Verify `NEXT_PUBLIC_API_URL` is set
2. Check CORS settings on backend
3. Ensure backend is running

### Deployment Issues
1. Check Vercel build logs
2. Verify environment variables
3. Test production build locally: `npm run build && npm start`

## 📄 License

This project is part of a job application portfolio demonstrating airline operations expertise.

## 👨‍💻 Developer

Built by ARNWOLFIE - Java Developer with Airline Operations Experience

**Key Skills Demonstrated:**
- Modern React/Next.js development
- TypeScript proficiency
- UI/UX design
- Aviation domain knowledge
- Production deployment
- Full-stack integration

## 🔗 Links

- **Live Demo**: [Coming soon after Vercel deployment]
- **Backend API**: Spring Boot backend
- **Documentation**: See AVIATION_OPERATIONS_GUIDE.md

---

**Built with Next.js 14 + TypeScript + Tailwind CSS**

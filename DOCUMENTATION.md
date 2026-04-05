# Madallah ICT Hub - Customer Dashboard Portal

## Complete Documentation & Implementation Guide

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Database Schema](#database-schema)
5. [User Flows](#user-flows)
6. [UI/UX Design](#uiux-design)
7. [Code Structure](#code-structure)
8. [API Endpoints](#api-endpoints)
9. [Security](#security)
10. [Deployment](#deployment)
11. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

The Madallah ICT Hub Customer Dashboard Portal is a comprehensive web application designed to serve as a one-stop solution for managing all customer interactions, services, and administration for a cyber café and educational service provider.

### Target Users
- **Students** - Access educational services, book sessions, manage courses
- **General Public** - Use cyber café services, manage bookings and payments
- **Staff** - Monitor operations, manage bookings, view analytics
- **Administrators** - Full system oversight, analytics, user management

### Technology Stack
- **Frontend**: React 18.3, TypeScript
- **Routing**: React Router v7
- **UI Framework**: Tailwind CSS v4, Radix UI, shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **State Management**: React Context API
- **Build Tool**: Vite

---

## ✨ Features

### 1. Authentication & Authorization
- ✅ Secure login and registration
- ✅ Role-based access control (Customer, Staff, Admin)
- ✅ Session management with localStorage
- ✅ Password validation
- ✅ Demo account access

### 2. Dashboard (Role-Based)

#### Customer Dashboard
- Wallet balance overview
- Upcoming bookings
- Recent transactions
- Unread notifications
- Quick actions
- Usage statistics

#### Staff Dashboard
- Today's bookings and revenue
- Active users monitoring
- Weekly performance charts
- Pending tasks
- Quick management tools

#### Admin Dashboard
- Total revenue and user metrics
- System health monitoring
- Weekly performance analytics
- User growth trends
- System management controls

### 3. Services Management
- Browse cyber café services (Internet, Printing, Scanning, Photocopying, Gaming, Cloud Storage)
- Educational services (JAMB/WAEC/NECO Registration, Tutorials, Online Courses)
- Real-time availability status
- Search and filter functionality
- Service booking with date/time selection
- Price and duration information

### 4. Booking System
- View all bookings (All, Pending, Confirmed, Completed, Cancelled)
- Booking statistics
- Reschedule functionality
- Cancel bookings with confirmation
- Detailed booking information
- Status tracking

### 5. Wallet & Payments
- Digital wallet balance
- Top-up functionality
- Multiple payment methods (Card, Bank Transfer, USSD)
- Transaction history (All, Credits, Debits)
- Quick amount selection
- Transaction details with references
- Export functionality

### 6. Messages & Notifications
- Inbox for messages
- Real-time notifications
- Compose new messages
- Message categorization (Support, General)
- Read/Unread status
- Notification types (Info, Success, Warning, Error)
- Search functionality

### 7. Online Courses
- Course catalog with thumbnails
- Filter by level (Beginner, Intermediate, Advanced)
- Course details (Instructor, Duration, Price, Rating, Enrollment)
- Learning progress tracking
- Course enrollment
- "Continue Learning" feature

### 8. Analytics & Reports
- Revenue trends
- Booking overview
- Service distribution
- User growth analytics
- Customer segmentation
- Performance metrics
- Exportable reports
- Time range selection (Week, Month, Year)

### 9. Settings
- Profile management
- Avatar upload
- Password change
- Security settings (2FA, Session timeout, Login alerts)
- Notification preferences (Email, SMS, Push)
- Privacy controls
- Data export
- Account deletion

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           React Application (Vite)                   │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │  Components │  │  Pages       │  │  Context   │ │   │
│  │  │  (UI)       │  │  (Routes)    │  │  (State)   │ │   │
│  │  └─────────────┘  └──────────────┘  └────────────┘ │   │
│  │  ┌─────────────┐  ┌──────────────┐                 │   │
│  │  │  Services   │  │  Utils       │                 │   │
│  │  │  (API)      │  │  (Helpers)   │                 │   │
│  │  └─────────────┘  └──────────────┘                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     API GATEWAY                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Authentication Middleware                           │   │
│  │  Rate Limiting                                       │   │
│  │  Request Validation                                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND SERVICES                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Auth       │  │   Services   │  │   Payments   │     │
│  │   Service    │  │   Service    │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Booking    │  │   Messages   │  │   Analytics  │     │
│  │   Service    │  │   Service    │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │     Redis    │  │   MongoDB    │     │
│  │  (Primary)   │  │    (Cache)   │  │    (Logs)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Frontend Architecture

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   └── figma/          # Figma imports
│   ├── pages/              # Page components
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── BookingsPage.tsx
│   │   ├── WalletPage.tsx
│   │   ├── MessagesPage.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   └── SettingsPage.tsx
│   ├── layouts/            # Layout components
│   │   └── DashboardLayout.tsx
│   ├── context/            # Context providers
│   │   └── AuthContext.tsx
│   ├── lib/                # Utilities and types
│   │   ├── types.ts
│   │   └── mockData.ts
│   ├── routes.tsx          # Route configuration
│   └── App.tsx             # Main app component
└── styles/                 # Global styles
    ├── fonts.css
    ├── index.css
    ├── tailwind.css
    └── theme.css
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'staff', 'admin')),
  avatar_url TEXT,
  wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT true,
  registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### Services Table
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('cyber', 'education')),
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration INTEGER, -- in minutes
  icon VARCHAR(50),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_available ON services(available);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id),
  service_name VARCHAR(255) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  duration INTEGER NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('credit', 'debit')),
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('completed', 'pending', 'failed')),
  reference VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_reference ON transactions(reference);
```

### Messages Table
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('support', 'general')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_is_read ON messages(is_read);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

### Exam Registrations Table
```sql
CREATE TABLE exam_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_type VARCHAR(20) NOT NULL CHECK (exam_type IN ('JAMB', 'WAEC', 'NECO')),
  subjects JSONB NOT NULL,
  exam_date DATE NOT NULL,
  venue TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'registered', 'completed')),
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exam_registrations_user_id ON exam_registrations(user_id);
CREATE INDEX idx_exam_registrations_exam_type ON exam_registrations(exam_type);
```

### Courses Table
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  instructor VARCHAR(255) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  enrolled_count INTEGER DEFAULT 0,
  rating DECIMAL(2, 1) DEFAULT 0.0,
  thumbnail_url TEXT,
  level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_level ON courses(level);
```

### Course Enrollments Table
```sql
CREATE TABLE course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  status VARCHAR(20) CHECK (status IN ('active', 'completed', 'dropped')),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX idx_course_enrollments_course_id ON course_enrollments(course_id);
```

### Analytics Table
```sql
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  revenue DECIMAL(10, 2) DEFAULT 0.00,
  bookings_count INTEGER DEFAULT 0,
  new_users_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date)
);

CREATE INDEX idx_analytics_date ON analytics(date);
```

---

## 🔄 User Flows

### 1. Registration & Login Flow

```
START
  ↓
User visits site → Redirected to Login Page
  ↓
User selects "Sign Up"
  ↓
User fills registration form (Name, Email, Phone, Password)
  ↓
System validates input
  ↓
System creates user account (role: customer, wallet: ₦0)
  ↓
Auto-login user
  ↓
Redirect to Dashboard
  ↓
END
```

### 2. Service Booking Flow

```
START
  ↓
User navigates to Services page
  ↓
User browses/searches services
  ↓
User clicks "Book Now" on desired service
  ↓
Dialog opens with booking form
  ↓
User selects date and time
  ↓
User adds optional notes
  ↓
User clicks "Confirm Booking"
  ↓
System validates wallet balance
  ↓
System creates booking (status: pending)
  ↓
System deducts amount from wallet
  ↓
System creates transaction record
  ↓
System sends confirmation notification
  ↓
User sees success message
  ↓
END
```

### 3. Wallet Top-Up Flow

```
START
  ↓
User navigates to Wallet page
  ↓
User clicks "Top Up Wallet"
  ↓
Dialog opens with top-up form
  ↓
User enters amount or selects quick amount
  ↓
User selects payment method (Card/Bank/USSD)
  ↓
User clicks "Proceed to Payment"
  ↓
System redirects to payment gateway
  ↓
User completes payment
  ↓
Payment gateway sends webhook to system
  ↓
System updates wallet balance
  ↓
System creates credit transaction
  ↓
System sends notification
  ↓
User sees updated balance
  ↓
END
```

### 4. Course Enrollment Flow

```
START
  ↓
User navigates to Courses page
  ↓
User browses/filters courses
  ↓
User clicks "View Details"
  ↓
Dialog shows course information
  ↓
User clicks "Enroll Now"
  ↓
System validates wallet balance
  ↓
System creates enrollment record
  ↓
System deducts course fee from wallet
  ↓
System increments course enrolled count
  ↓
System sends welcome email
  ↓
User gains access to course materials
  ↓
END
```

---

## 🎨 UI/UX Design

### Color Scheme

```css
/* Primary Colors */
--primary-blue: #3b82f6;
--primary-purple: #8b5cf6;

/* Accent Colors */
--success-green: #10b981;
--warning-yellow: #f59e0b;
--error-red: #ef4444;

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-600: #4b5563;
--gray-900: #111827;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #3b82f6, #8b5cf6);
--gradient-success: linear-gradient(135deg, #10b981, #059669);
```

### Typography

```css
/* Font Family */
--font-sans: system-ui, -apple-system, sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing System

```css
/* Based on 4px grid */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
```

### Component Guidelines

#### Cards
- Border radius: 8px
- Box shadow: 0 1px 3px rgba(0,0,0,0.1)
- Padding: 24px
- Hover state: Elevated shadow

#### Buttons
- Primary: Blue background, white text
- Secondary: White background, blue border
- Destructive: Red background, white text
- Size variants: sm (32px), md (40px), lg (48px)

#### Forms
- Input height: 40px
- Border: 1px solid gray-300
- Focus: Blue border, blue ring
- Error state: Red border

#### Navigation
- Sidebar width (desktop): 256px
- Top bar height: 64px
- Active link: Blue background

### Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

### Accessibility Guidelines

1. **Color Contrast**
   - Minimum 4.5:1 for normal text
   - Minimum 3:1 for large text

2. **Keyboard Navigation**
   - All interactive elements focusable
   - Clear focus indicators
   - Logical tab order

3. **Screen Readers**
   - Proper ARIA labels
   - Semantic HTML
   - Alternative text for images

4. **Touch Targets**
   - Minimum 44x44px on mobile
   - Adequate spacing between elements

---

## 💻 Code Structure

### Component Organization

```typescript
// Example: ServiceCard Component
interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{service.description}</p>
        <Button onClick={() => onBook(service)}>Book Now</Button>
      </CardContent>
    </Card>
  );
}
```

### State Management Pattern

```typescript
// Context Pattern for Global State
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Implementation...
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### API Service Pattern

```typescript
// services/api.ts
export class ApiService {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }
}

export const api = new ApiService(process.env.VITE_API_URL || 'http://localhost:3000/api');
```

---

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
GET    /api/auth/me
```

### Users

```
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
PUT    /api/users/:id/avatar
```

### Services

```
GET    /api/services
GET    /api/services/:id
POST   /api/services          (Admin only)
PUT    /api/services/:id      (Admin only)
DELETE /api/services/:id      (Admin only)
```

### Bookings

```
GET    /api/bookings
GET    /api/bookings/:id
POST   /api/bookings
PUT    /api/bookings/:id
DELETE /api/bookings/:id
GET    /api/bookings/user/:userId
```

### Wallet & Transactions

```
GET    /api/wallet/balance
POST   /api/wallet/topup
GET    /api/transactions
GET    /api/transactions/:id
GET    /api/transactions/user/:userId
```

### Messages

```
GET    /api/messages
GET    /api/messages/:id
POST   /api/messages
DELETE /api/messages/:id
PUT    /api/messages/:id/read
```

### Notifications

```
GET    /api/notifications
PUT    /api/notifications/:id/read
PUT    /api/notifications/read-all
DELETE /api/notifications/:id
```

### Courses

```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses           (Admin only)
PUT    /api/courses/:id       (Admin only)
POST   /api/courses/:id/enroll
GET    /api/courses/my-courses
```

### Analytics

```
GET    /api/analytics/overview
GET    /api/analytics/revenue
GET    /api/analytics/bookings
GET    /api/analytics/users
GET    /api/analytics/export
```

---

## 🔒 Security

### Authentication Security

1. **Password Requirements**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one number
   - At least one special character

2. **Password Hashing**
   ```typescript
   import bcrypt from 'bcrypt';
   
   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   ```

3. **JWT Tokens**
   ```typescript
   import jwt from 'jsonwebtoken';
   
   const token = jwt.sign(
     { userId: user.id, role: user.role },
     process.env.JWT_SECRET,
     { expiresIn: '24h' }
   );
   ```

### API Security

1. **Rate Limiting**
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

2. **CORS Configuration**
   ```typescript
   import cors from 'cors';
   
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true,
   }));
   ```

3. **Input Validation**
   ```typescript
   import { body, validationResult } from 'express-validator';
   
   app.post('/api/users',
     body('email').isEmail(),
     body('password').isLength({ min: 8 }),
     (req, res) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       // Process request
     }
   );
   ```

### Data Security

1. **Encryption at Rest**
   - Database encryption
   - Encrypted backups
   - Secure file storage

2. **Encryption in Transit**
   - HTTPS/TLS only
   - Certificate management
   - HSTS headers

3. **Data Privacy**
   - GDPR compliance
   - Data anonymization
   - Regular audits

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
# Build command
npm run build

# Output directory
dist/

# Environment variables
VITE_API_URL=https://api.madallah.com
VITE_APP_NAME=Madallah ICT Hub
```

### Backend Deployment (Node.js)

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start production server
npm start

# Environment variables
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
REDIS_URL=redis://...
```

### Database Setup

```bash
# Run migrations
npm run migrate

# Seed initial data
npm run seed

# Backup script
pg_dump -U postgres -d madallah_db > backup.sql
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/madallah_db
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=madallah_db
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## 🔮 Future Enhancements

### Phase 2 Features

1. **Real-Time Features**
   - WebSocket integration for live notifications
   - Real-time chat support
   - Live booking updates
   - Active user monitoring

2. **Advanced Analytics**
   - Predictive analytics
   - Customer behavior insights
   - Revenue forecasting
   - A/B testing framework

3. **Mobile App**
   - React Native version
   - Push notifications
   - Offline mode
   - Biometric authentication

4. **E-Learning Platform**
   - Video streaming
   - Interactive quizzes
   - Certificates
   - Discussion forums

5. **Integration Features**
   - Payment gateway integration (Paystack, Flutterwave)
   - Email service (SendGrid, Mailgun)
   - SMS service (Twilio, Africa's Talking)
   - Calendar sync (Google Calendar)

6. **Advanced Booking**
   - Recurring bookings
   - Group bookings
   - Waitlist functionality
   - Resource allocation

7. **Loyalty Program**
   - Points system
   - Membership tiers
   - Referral rewards
   - Discount codes

8. **Multi-language Support**
   - i18n implementation
   - Language selector
   - RTL support

9. **Accessibility Improvements**
   - Screen reader optimization
   - Voice commands
   - High contrast mode
   - Font size adjustment

10. **Advanced Security**
    - Biometric login
    - Hardware security keys
    - Advanced fraud detection
    - Audit logging

---

## 📞 Support & Contact

For technical support or questions:
- Email: support@madallah.com
- Phone: +234 XXX XXX XXXX
- Website: https://madallah.com

---

## 📄 License

© 2026 Madallah ICT Hub and Educational Consults. All rights reserved.

---

*This documentation is comprehensive and implementation-ready. For specific implementation questions or custom requirements, please contact the development team.*

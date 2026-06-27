# 🏗️ Technical Architecture & System Design

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Web Browser     │  │  Mobile App      │  │  Admin Panel │  │
│  │  (React)         │  │  (Flutter)       │  │  (Dashboard) │  │
│  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘  │
│           │                     │                    │          │
│           └─────────────────────┼────────────────────┘          │
│                                 │                                │
│                        HTTPS / WebSocket                         │
│                                 │                                │
└─────────────────────────────────┼────────────────────────────────┘
                                  │
┌─────────────────────────────────┼────────────────────────────────┐
│                    API GATEWAY LAYER                              │
├─────────────────────────────────┼────────────────────────────────┤
│                                 │                                 │
│  ┌──────────────────────────────▼──────────────────────────────┐ │
│  │  Load Balancer (Nginx/HAProxy)                             │ │
│  │  - Route requests                                          │ │
│  │  - SSL/TLS termination                                     │ │
│  │  - Rate limiting                                           │ │
│  │  - CORS handling                                           │ │
│  └──────────────────────────────┬──────────────────────────────┘ │
│                                 │                                 │
│  ┌──────────────────────────────▼──────────────────────────────┐ │
│  │  API Gateway (Kong/AWS API Gateway)                        │ │
│  │  - Authentication validation                               │ │
│  │  - Request logging                                         │ │
│  │  - Response transformation                                 │ │
│  │  - Versioning                                              │ │
│  └──────────────────────────────┬──────────────────────────────┘ │
│                                 │                                 │
└─────────────────────────────────┼────────────────────────────────┘
                                  │
                  ┌───────────────┼───────────────┐
                  │               │               │
┌─────────────────▼──────┐  ┌─────▼──────────┐  ┌▼──────────────────┐
│  AUTH SERVICE         │  │  API SERVERS   │  │  WEBSOCKET SERVER │
│  - JWT validation     │  │  (Node/Python) │  │  - Real-time msg  │
│  - OAuth 2.0          │  │  - REST routes │  │  - Notifications  │
│  - 2FA verification   │  │  - Business    │  │  - Live updates   │
│                       │  │    logic       │  │                   │
└───────────────────────┘  └────────┬───────┘  └───────────────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
         ┌────────▼────────┐  ┌─────▼──────┐  ┌──────▼─────┐
         │  CACHE LAYER    │  │ QUEUE      │  │  PAYMENT   │
         │  (Redis)        │  │ (RabbitMQ) │  │  GATEWAY   │
         │  - Sessions     │  │ - Async    │  │ (Paystack) │
         │  - User data    │  │   jobs     │  │            │
         │  - Bookings     │  │ - Emails   │  └────────────┘
         │                 │  │ - SMS      │
         └────────┬────────┘  └────────────┘
                  │
         ┌────────▼──────────────────────┐
         │   DATA PERSISTENCE LAYER       │
         ├────────���───────────────────────┤
         │                                │
         │  ┌─────────────────────────┐  │
         │  │  PostgreSQL Database    │  │
         │  │  - Primary datastore    │  │
         │  │  - ACID compliance      │  │
         │  │  - Replication (HA)     │  │
         │  │  - Backups (Daily)      │  │
         │  └─────────────────────────┘  │
         │                                │
         │  ┌─────────────────────────┐  │
         │  │  Object Storage (S3)    │  │
         │  │  - User avatars         │  │
         │  │  - Documents            │  │
         │  │  - Course materials     │  │
         │  │  - Certificates         │  │
         │  └─────────────────────────┘  │
         │                                │
         └────────────────────────────────┘
                  │
         ┌────────▼────────────────┐
         │  MONITORING & LOGGING    │
         ├──────────────────────────┤
         │  - ELK Stack (Logs)      │
         │  - Prometheus (Metrics)  │
         │  - Sentry (Errors)       │
         │  - DataDog (APM)         │
         └──────────────────────────┘
```

---

## Microservices Architecture

### Service Boundaries

```
┌──────────────────────┐     ┌──────────────────────┐
│ Auth Service         │     │ User Service         │
├──────────────────────┤     ├──────────────────────┤
│ - Registration       │     │ - Profile management │
│ - Login/Logout       │     │ - Preferences        │
│ - JWT tokens         │     │ - Security settings  │
│ - 2FA                │     │ - Account recovery   │
│ - Session mgmt       │     │ - Role management    │
└──────────────────────┘     └──────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐
│ Service Catalog      │     │ Booking Service      │
├──────────────────────┤     ├──────────────────────┤
│ - Services list      │     │ - Create bookings    │
│ - Pricing            │     │ - Schedule mgmt      │
│ - Availability       │     │ - Cancellations      │
│ - Categories         │     │ - Status tracking    │
│ - Search/filter      │     │ - Reminders          │
└──────────────────────┘     └──────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐
│ Payment Service      │     │ Wallet Service       │
├──────────────────────┤     ├──────────────────────┤
│ - Payment processing │     │ - Balance management │
│ - Transactions       │     │ - Transactions log   │
│ - Receipts           │     │ - Recharge/debit     │
│ - Refunds            │     │ - Credit system      │
│ - Gateway integration│     │ - Reports            │
└──────────────────────┘     └──────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐
│ Message Service      │     │ Notification Service │
├──────────────────────┤     ├──────────────────────┤
│ - Send messages      │     │ - Email notifications│
│ - Support tickets    │     │ - SMS notifications  │
│ - Ticket management  │     │ - Push notifications │
│ - Message history    │     │ - Real-time updates  │
└──────────────────────┘     └──────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐
│ Course Service       │     │ Analytics Service    │
├──────────────────────┤     ├──────────────────────┤
│ - Course catalog     │     │ - Usage analytics    │
│ - Enrollment         │     │ - Revenue reports    │
│ - Progress tracking  │     │ - User metrics       │
│ - Certificates       │     │ - Service metrics    │
│ - Materials          │     │ - Dashboards         │
└──────────────────────┘     └──────────────────────┘
```

### Inter-Service Communication

```
Synchronous (REST API):
Service A ──HTTP/HTTPS──> Service B
(Request/Response)

Asynchronous (Message Queue):
Service A ──Message──> RabbitMQ ──Message──> Service B
(Fire and forget, event-driven)

Real-time (WebSocket):
Client ──WebSocket──> WebSocket Server ──> Broadcasting
(Live updates, notifications)
```

---

## API Architecture

### RESTful API Structure

```
/api/v1/
├── /auth
│   ├── POST   /register           (Create account)
│   ├── POST   /login              (Authenticate)
│   ├── POST   /logout             (End session)
│   ├── POST   /refresh-token      (Get new token)
│   ├── POST   /verify-email       (Email verification)
│   ├── POST   /2fa/setup          (Enable 2FA)
│   └── POST   /2fa/verify         (Verify 2FA code)
│
├── /users
│   ├── GET    /{id}               (Get user profile)
│   ├── PUT    /{id}               (Update profile)
│   ├── DELETE /{id}               (Delete account)
│   ├── GET    /{id}/settings      (Get settings)
│   ├── PUT    /{id}/settings      (Update settings)
│   └── POST   /{id}/avatar        (Upload avatar)
│
├── /services
│   ├── GET    /                   (List services)
│   ├── GET    /{id}               (Get service detail)
│   ├── GET    /{id}/availability  (Check availability)
│   └── GET    /{id}/pricing       (Get pricing)
│
├── /bookings
│   ├── GET    /                   (List user bookings)
│   ├── POST   /                   (Create booking)
│   ├── GET    /{id}               (Get booking detail)
│   ├── PUT    /{id}               (Update booking)
│   ├── DELETE /{id}               (Cancel booking)
│   └── POST   /{id}/reschedule    (Reschedule booking)
│
├── /wallet
│   ├── GET    /                   (Get wallet info)
│   ├── POST   /recharge           (Add funds)
│   ├── GET    /transactions       (Transaction history)
│   └── POST   /transfer           (Transfer credit)
│
├── /payments
│   ├── POST   /                   (Process payment)
│   ├── GET    /{id}               (Get payment detail)
│   ├── POST   /{id}/refund        (Request refund)
│   └── GET    /history            (Payment history)
│
├── /messages
│   ├── GET    /                   (List messages)
│   ├── POST   /                   (Send message)
│   ├── GET    /{id}               (Get message)
│   ├── PUT    /{id}/read          (Mark as read)
│   └── DELETE /{id}               (Delete message)
│
├── /tickets
│   ├── GET    /                   (List tickets)
│   ├── POST   /                   (Create ticket)
│   ├── GET    /{id}               (Get ticket)
│   ├── PUT    /{id}               (Update ticket)
│   └── POST   /{id}/close         (Close ticket)
│
├── /courses
│   ├── GET    /                   (List courses)
│   ├── GET    /{id}               (Get course detail)
│   ├── POST   /{id}/enroll        (Enroll course)
│   ├── GET    /{id}/materials     (Get materials)
│   └── POST   /{id}/rate          (Rate course)
│
├── /notifications
│   ├── GET    /                   (List notifications)
│   ├── PUT    /{id}/read          (Mark as read)
│   └── DELETE /{id}               (Delete notification)
│
└── /admin
    ├── /users
    ├── /analytics
    ├── /settings
    └── /reports
```

---

## Authentication & Security

### Authentication Flow

```
1. User Login
   ├── POST /api/v1/auth/login
   │   ├── Email
   │   └── Password
   └── Response: { accessToken, refreshToken, user }

2. Access Token Usage
   ├── Each request includes: Authorization: Bearer <accessToken>
   └── JWT payload contains: { userId, role, exp, iat }

3. Token Expiration
   ├── Access Token: 15 minutes
   ├── Refresh Token: 7 days
   └── Refresh endpoint: POST /api/v1/auth/refresh-token

4. Logout
   ├── POST /api/v1/auth/logout
   │   └── Invalidate refresh token
   └── Clear client-side tokens
```

### JWT Token Structure

```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "sub": "user-uuid",
  "email": "user@madallah.com",
  "role": "customer",
  "iat": 1719470000,
  "exp": 1719470900,
  "iss": "madallah-api",
  "aud": "madallah-dashboard"
}

Signature:
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), SECRET)
```

### Role-Based Access Control (RBAC)

```
Customer Role:
├── View own profile
├── Browse services
├── Create/manage bookings
├── View own wallet
├── Make payments
├── Send messages
├── View notifications
└── Enroll in courses

Staff Role:
├── All Customer permissions
├── View assigned bookings
├── Update booking status
├── View daily operations
├── Manage support tickets
├── View performance metrics
└── Generate reports

Admin Role:
├── All permissions
├── Manage users
├── Manage services
├── View analytics
├── System settings
├── User suspension/banning
├── Financial reports
└── Audit logs
```

### Security Measures

```
1. Password Security
   ├── Minimum 8 characters
   ├── Mix of uppercase, lowercase, numbers, symbols
   ├── Hashed with bcrypt (salt rounds: 10)
   └── Never stored in plain text

2. Data Encryption
   ├── All data in transit: TLS 1.3
   ├── At rest: AES-256 for sensitive data
   ├── Database credentials: Environment variables
   └── API keys: Secret management service

3. Input Validation
   ├── Server-side validation
   ├── Input sanitization
   ├── SQL injection prevention (parameterized queries)
   ├── XSS prevention (output encoding)
   └── CSRF tokens for state-changing operations

4. Rate Limiting
   ├── 100 requests per minute per user
   ├── 1000 requests per minute per IP
   ├── Progressive delays after limit exceeded
   └── Temporary IP blocking after repeated violations

5. Session Management
   ├── Secure HTTP-only cookies
   ├── Session timeout: 30 minutes inactivity
   ├── Remember me: 7 days
   ├── Single session per device option
   └── Session revocation on logout

6. 2FA Implementation
   ├── TOTP (Time-based One-Time Password)
   ├── SMS OTP backup
   ├── Recovery codes
   └── QR code for TOTP setup

7. CORS Configuration
   ├── Whitelist allowed origins
   ├── Specific HTTP methods allowed
   ├── Credentials included when necessary
   └── Preflight requests handled

8. Audit & Logging
   ├── All sensitive operations logged
   ├── Failed login attempts tracked
   ├── Admin actions audited
   ├── Data access logs
   └── Logs retained for 90 days
```

---

## Scalability Strategy

### Horizontal Scaling

```
Load Balancer (Nginx)
│
├─> API Server 1 (Port 3001)
├─> API Server 2 (Port 3002)
├─> API Server 3 (Port 3003)
└─> API Server N (Port 300N)

Each server runs independently
Requests distributed via round-robin
Database connections pooled
```

### Vertical Scaling

```
Current capacity: ~1,000 concurrent users
├── CPU: 4 cores
├── RAM: 8GB
├── Disk: 100GB SSD

Scaling steps:
├── 10,000 users: 8 cores, 16GB RAM, 500GB storage
├── 100,000 users: 16 cores, 32GB RAM, 2TB storage
└── 1M+ users: Kubernetes cluster, multi-region
```

### Database Scaling

```
Write Master
├── All write operations
└── Replication to replicas

Read Replicas (3)
├── Read-only copies
├── Geographic distribution
└── Load balancing for reads

Backup Server
├── Daily full backups
├── Point-in-time recovery
└── Offsite storage
```

### Caching Strategy

```
Redis Cache Layers:
├── Session cache (15-30 mins)
├── User profiles (1 hour)
├── Service catalog (12 hours)
├── Availability slots (15 mins)
├── User wallet (realtime)
└── Course content (24 hours)

Cache Invalidation:
├── TTL-based expiration
├── Event-based invalidation
├── Manual cache clear (admin)
└── Dependency-based invalidation
```

---

## Deployment Architecture

### Environment Configuration

```
Development
├── Single server
├── SQLite or local PostgreSQL
├── Redis instance
└── Mock payment gateway

Staging
├── 2-3 servers (load balanced)
├── PostgreSQL with 1 replica
├── Redis cluster (3 nodes)
├── Test payment gateway

Production
├── 3+ servers (load balanced)
├── PostgreSQL HA with 2 replicas
├── Redis cluster (6 nodes, sentinel)
├── Live payment gateway
├── CDN for static assets
├── Multi-region backup
└── DDoS protection
```

### CI/CD Pipeline

```
Developer Push
│
▼
Git Webhook Trigger
│
▼
Run Tests
├── Unit tests
├── Integration tests
└── E2E tests
│
▼
Code Quality Check
├── ESLint
├── TypeScript compilation
├── Security scan
└── Coverage report
│
▼
Build Docker Image
│
▼
Push to Registry
│
▼
Deploy to Staging
├── Run migrations
├── Start services
└── Smoke tests
│
▼
Deploy to Production (on approval)
├── Blue-green deployment
├── Health checks
├── Rollback capability
└── Monitoring alerts
```

---

## Disaster Recovery & High Availability

### Backup Strategy

```
Daily Backups:
├── Full database backup (00:00 UTC)
├── Upload to S3 with encryption
└── Retain for 30 days

Hourly Backups:
├── Incremental backups
└── Point-in-time recovery

User Data Exports:
├── Monthly user data exports
├── Uploaded to secure storage
└── GDPR compliance
```

### Failover Mechanism

```
Primary Datacenter Down
│
▼
Health check fails after 3 retries (30s)
│
▼
DNS updated to secondary datacenter
│
▼
Secondary database promoted to primary
│
▼
Notify operations team
│
▼
Manual intervention if needed
│
▼
Restore primary when online
│
▼
Resync databases
```

### Redundancy

```
Single Points of Failure Eliminated:
├── Database: Master-slave replication
├── Cache: Redis Sentinel cluster
├── Load Balancer: Active-passive failover
├── API Servers: Multiple instances
├── Payment Gateway: Primary + fallback
└── Email Service: Primary + fallback
```

---

## Performance Optimization

### Frontend Optimization

```
Code Splitting:
├── Route-based splitting
├── Component lazy loading
└── Vendor bundle separation

Asset Optimization:
├── Image optimization (WebP format)
├── CSS minification
├── JavaScript minification
├── Gzip compression
└── CDN delivery

Caching Strategy:
├── Browser cache (30 days for assets)
├── Service worker (offline support)
├── API response cache (Redux/Zustand)
└── IndexedDB for user data

Performance Targets:
├── FCP (First Contentful Paint): < 1s
├── LCP (Largest Contentful Paint): < 2.5s
├── CLS (Cumulative Layout Shift): < 0.1
├── TTFB (Time to First Byte): < 600ms
└── Page load time: < 3s
```

### Backend Optimization

```
Query Optimization:
├── Indexed columns usage
├── Query execution plans
├── N+1 query prevention
├── Database connection pooling
└── Query result caching

API Response:
├── Pagination (max 100 items)
├── Field selection
├── Response compression
├── JSON serialization optimization
└── Incremental loading

Server Optimization:
├── Process clustering
├── Worker threads for heavy tasks
├── Queue-based async processing
├── Memory leak monitoring
└── CPU profiling
```

---

## Monitoring & Observability

### Application Monitoring

```
Metrics to Track:
├── Request/response times
├── Error rates (by status code)
├── Database query times
├── Cache hit ratio
├── Payment success rate
├── API endpoint usage
└── User session metrics

Alerts:
├── High error rate (> 5%)
├── Slow API responses (> 2s)
├── Database connection exhaustion
├── Cache miss rate (> 20%)
├── Payment failures (> 2%)
├── Disk space (> 80%)
└── Memory usage (> 85%)
```

### User Experience Monitoring

```
RUM (Real User Monitoring):
├── Page load times
├── User interactions
├── JavaScript errors
├── Network requests
├── Device/browser analytics
└── Geographic distribution

Session Replay:
├── User session videos
├── Error reproduction
├── User behavior analysis
└── UX issue identification
```

### Security Monitoring

```
Security Metrics:
├── Failed login attempts
├── Brute force attempts
├── SQL injection attempts
├── XSS attempts
├── Suspicious user behavior
├── API key usage
└── Admin actions
```

---

## Infrastructure as Code (IaC)

### Docker Containers

```
Dockerfile Example:
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

Docker Compose:
- API service
- Database service
- Redis service
- WebSocket service
- Nginx service
```

### Kubernetes Orchestration

```
Namespaces:
├── development
├── staging
└── production

Deployments:
├── API servers (3 replicas)
├── WebSocket servers (2 replicas)
├── Worker services (2 replicas)
└── Cronjob services

Services:
├── API service (ClusterIP)
├── WebSocket service (LoadBalancer)
└── Database service (StatefulSet)

ConfigMaps & Secrets:
├── Environment variables
├── Database credentials
├── API keys
└── SSL certificates
```

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Web** | React 18, TypeScript, Tailwind CSS | Web UI |
| **Frontend Mobile** | Flutter, Dart | Mobile app |
| **API Gateway** | Kong/AWS API Gateway | Request routing |
| **Backend** | Node.js/Express or Python/FastAPI | API server |
| **Database** | PostgreSQL 14+ | Primary datastore |
| **Cache** | Redis 7+ | Session/data cache |
| **Queue** | RabbitMQ or AWS SQS | Async processing |
| **Search** | Elasticsearch (optional) | Full-text search |
| **CDN** | Cloudflare/AWS CloudFront | Static content |
| **Storage** | AWS S3 or Minio | File storage |
| **Container** | Docker | Containerization |
| **Orchestration** | Kubernetes | Container management |
| **CI/CD** | GitHub Actions or GitLab CI | Automation |
| **Monitoring** | Prometheus, Grafana | Metrics |
| **Logging** | ELK Stack or Splunk | Log aggregation |
| **Error Tracking** | Sentry | Error monitoring |
| **APM** | DataDog or New Relic | Performance monitoring |

---

## Cost Optimization

### Resource Allocation

```
Development:
├── Single t2.small instance: $0.023/hour
├── RDS micro: $0.016/hour
└── Total: ~$35/month

Staging:
├── 2x t2.small: $0.046/hour
├── RDS small: $0.066/hour
└── Total: ~$90/month

Production:
├── 3x t2.medium: $0.0464/hour (x3)
├── RDS large: $0.66/hour
├── Redis cache: $0.107/hour
├── NAT Gateway: $0.045/hour
├── S3 storage: $0.023/GB
└── Total: ~$500+/month (scales with usage)
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-06-27 | Initial architecture design |

---

**Next Steps**: Review [API_SPECIFICATION.md](./API_SPECIFICATION.md) for detailed endpoint specifications.

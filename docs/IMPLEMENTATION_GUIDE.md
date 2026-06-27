# 📋 Implementation Guide

## Quick Start Guide

This guide covers the complete setup and deployment of the Madallah ICT Hub Dashboard Portal.

---

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Database Setup](#database-setup)
5. [Running Locally](#running-locally)
6. [Deployment](#deployment)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Development Environment Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v18+ ([Download](https://nodejs.org/))
- **npm** or **pnpm**: v8+ (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Docker**: v20+ (optional, for containerization)
- **PostgreSQL**: v14+ (for database)
- **Redis**: v7+ (for caching)

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 cores | 4 cores |
| RAM | 4GB | 8GB |
| Storage | 10GB | 50GB |
| Bandwidth | 1 Mbps | 10 Mbps |

### IDE Setup

Recommended IDEs:
- **VS Code** (Recommended)
- **WebStorm**
- **Sublime Text 3**

**VS Code Extensions** (recommended):
```
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Thunder Client (REST API testing)
- GitLens
- Docker
```

---

## Frontend Setup

### 1. Clone Repository

```bash
git clone https://github.com/smadallah/madallah-dashboard.git
cd madallah-dashboard/frontend/web
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Configuration

Create `.env.local` file:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3000/api/v1
REACT_APP_ENV=development

# Feature Flags
REACT_APP_ENABLE_2FA=true
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_ANALYTICS=true

# Sentry (Error Tracking)
REACT_APP_SENTRY_DSN=

# Payment Gateway
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx

# Analytics
REACT_APP_GOOGLE_ANALYTICS_ID=
```

### 4. Project Structure

```
frontend/web/
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (Button, Input, etc.)
│   │   ├── dashboards/   # Role-based dashboards
│   │   ├── layouts/      # Layout components
│   │   └── common/       # Common components (Header, Footer, etc.)
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React Context providers
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main App component
│   └── index.tsx         # Entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js    # Tailwind CSS config
└── vite.config.ts        # Vite configuration
```

### 5. Start Development Server

```bash
npm run dev
```

Access at: **http://localhost:5173**

### 6. Build for Production

```bash
npm run build
```

This creates optimized production build in `dist/` directory.

---

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd madallah-dashboard/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create `.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=madallah_db
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Payment Gateway (Paystack)
PAYSTACK_SECRET_KEY=sk_test_xxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_S3_REGION=us-east-1

# Logging
LOG_LEVEL=debug
LOG_FILE=logs/app.log

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# API Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Database Initialization

```bash
# Create database
npm run db:create

# Run migrations
npm run db:migrate

# Seed sample data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Server runs at: **http://localhost:3000**

### 6. API Documentation

Access Swagger UI at: **http://localhost:3000/api/docs**

---

## Database Setup

### Option 1: Local PostgreSQL

#### Installation

**Windows:**
```bash
# Using chocolatey
choco install postgresql
```

**macOS:**
```bash
# Using homebrew
brew install postgresql
```

**Linux (Ubuntu):**
```bash
sudo apt-get install postgresql postgresql-contrib
```

#### Setup

```bash
# Start PostgreSQL service
sudo systemctl start postgresql

# Access PostgreSQL shell
psql -U postgres

# Create database and user
CREATE DATABASE madallah_db;
CREATE USER madallah_user WITH PASSWORD 'secure_password';
ALTER ROLE madallah_user SET client_encoding TO 'utf8';
ALTER ROLE madallah_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE madallah_user SET default_transaction_deferrable TO on;
ALTER ROLE madallah_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE madallah_db TO madallah_user;
\q
```

### Option 2: Docker PostgreSQL

```bash
# Create Docker network
docker network create madallah-network

# Run PostgreSQL container
docker run -d \
  --name postgres \
  --network madallah-network \
  -e POSTGRES_DB=madallah_db \
  -e POSTGRES_USER=madallah_user \
  -e POSTGRES_PASSWORD=secure_password \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:14-alpine

# Run Redis container
docker run -d \
  --name redis \
  --network madallah-network \
  -p 6379:6379 \
  redis:7-alpine
```

### Option 3: Cloud Databases

**AWS RDS:**
1. Go to AWS Console → RDS
2. Create PostgreSQL instance
3. Configure security groups
4. Get connection string from RDS dashboard

**Heroku PostgreSQL:**
```bash
heroku addons:create heroku-postgresql:standard-0
heroku config | grep DATABASE_URL
```

---

## Running Locally

### Quick Start (Docker Compose)

```bash
# Clone repository
git clone https://github.com/smadallah/madallah-dashboard.git
cd madallah-dashboard

# Start all services
docker-compose up -d

# Check services
docker-compose ps

# View logs
docker-compose logs -f
```

### Manual Start (3 Terminal Windows)

**Terminal 1 - Database & Cache:**
```bash
# Start PostgreSQL
sudo systemctl start postgresql

# Start Redis
redis-server
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend/web
npm install
npm run dev
```

### Verify Setup

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/health
- **Database**: psql -h localhost -U madallah_user -d madallah_db
- **Redis**: redis-cli ping

---

## Deployment

### Deployment Checklist

- [ ] Code committed and pushed to main branch
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Tests passing
- [ ] Build succeeds
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Backup and recovery tested

### Frontend Deployment (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from project root
vercel

# 4. Set environment variables
vercel env add REACT_APP_API_URL
vercel env add REACT_APP_PAYSTACK_PUBLIC_KEY

# 5. Redeploy with env vars
vercel --prod
```

### Backend Deployment (Heroku)

```bash
# 1. Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# 2. Login
heroku login

# 3. Create app
heroku create madallah-api

# 4. Add PostgreSQL addon
heroku addons:create heroku-postgresql:standard-0

# 5. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set DATABASE_URL=<your-db-url>

# 6. Deploy
git push heroku main

# 7. Run migrations
heroku run npm run migrate

# 8. View logs
heroku logs -t
```

### Docker Deployment (AWS ECS)

```bash
# 1. Build Docker image
docker build -t madallah-api:latest backend/
docker build -t madallah-web:latest frontend/web/

# 2. Tag images
docker tag madallah-api:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/madallah-api:latest
docker tag madallah-web:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/madallah-web:latest

# 3. Push to ECR
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/madallah-api:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/madallah-web:latest

# 4. Create ECS task definition and service
# (Use AWS Console or AWS CLI)

# 5. Deploy
aws ecs update-service --cluster madallah --service api --force-new-deployment
```

### Kubernetes Deployment

```bash
# 1. Create namespace
kubectl create namespace madallah

# 2. Create secrets
kubectl create secret generic db-secret \
  --from-literal=DB_PASSWORD=secure_password \
  -n madallah

# 3. Apply configurations
kubectl apply -f k8s/postgres-deployment.yaml -n madallah
kubectl apply -f k8s/redis-deployment.yaml -n madallah
kubectl apply -f k8s/api-deployment.yaml -n madallah
kubectl apply -f k8s/web-deployment.yaml -n madallah

# 4. Check status
kubectl get pods -n madallah

# 5. View logs
kubectl logs deployment/madallah-api -n madallah
```

---

## Testing

### Frontend Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e

# Test specific file
npm test -- LoginPage.test.tsx
```

### Backend Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run integration tests
npm run test:integration

# Test specific endpoint
npm test -- auth.test.ts
```

### API Testing (Thunder Client)

1. Open VS Code
2. Open Thunder Client extension
3. Import collection from `api/thunder-collection.json`
4. Test endpoints with sample data

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Find process using port
lsof -i :3000
lsof -i :5173

# Kill process
kill -9 <PID>
```

#### 2. Database Connection Error

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connection string in .env
# Format: postgresql://user:password@host:port/database

# Test connection
psql -h localhost -U madallah_user -d madallah_db -c "SELECT 1"
```

#### 3. Module Not Found

```bash
# Clear node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install
```

#### 4. Port Conflict in Docker

```bash
# Stop all Docker containers
docker-compose down

# Remove orphaned volumes
docker volume prune

# Start again
docker-compose up -d
```

#### 5. Authentication Token Issues

```bash
# Clear localStorage
# Browser DevTools → Application → Storage → Local Storage → Clear All

# Or programmatically
localStorage.clear()

# Re-login
```

### Debug Mode

**Frontend:**
```javascript
// In browser console
localStorage.setItem('DEBUG', 'true')
```

**Backend:**
```bash
# Set debug level
LOG_LEVEL=debug npm run dev
```

### Performance Debugging

```bash
# Frontend performance
npm run build -- --profile

# Backend profiling
npm run dev -- --inspect

# Then visit chrome://inspect in Chrome
```

---

## Useful Commands

### Development

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Backend
npm run dev          # Start dev server with auto-reload
npm run build        # Compile TypeScript
npm run test         # Run tests
npm run migrate      # Run database migrations
npm run seed         # Seed sample data
```

### Database

```bash
# Migrations
npm run migrate:create  # Create new migration
npm run migrate:up      # Run pending migrations
npm run migrate:down    # Rollback last migration
npm run migrate:status  # Check migration status

# Backup
npm run db:backup       # Create database backup
npm run db:restore      # Restore from backup
```

### Deployment

```bash
# Build production
npm run build

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:prod
```

---

## Monitoring & Maintenance

### Health Checks

```bash
# Check API health
curl http://localhost:3000/health

# Check database
psql -h localhost -U madallah_user -d madallah_db -c "SELECT 1"

# Check Redis
redis-cli ping
```

### Log Rotation

Set up log rotation in `/etc/logrotate.d/madallah`:

```
/var/log/madallah/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 madallah madallah
    sharedscripts
    postrotate
        systemctl reload madallah
    endscript
}
```

### Backup Schedule

```bash
# Daily backup at 2 AM
0 2 * * * /home/madallah/backup.sh

# Create backup script
#!/bin/bash
BACKUP_DIR="/var/backups/madallah"
pg_dump -h localhost -U madallah_user madallah_db | \
  gzip > $BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

---

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable 2FA
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable audit logging
- [ ] Set up automated backups
- [ ] Configure DDoS protection
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## Support & Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Getting Help
- GitHub Issues: [madallah-dashboard/issues](https://github.com/smadallah/madallah-dashboard/issues)
- Email: support@madallah.com
- Discord Community: [Join](https://discord.gg/madallah)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-06-27 | Initial implementation guide |

---

**Last Updated**: June 2026

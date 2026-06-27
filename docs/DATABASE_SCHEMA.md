# 📊 Database Schema & Data Models

## Overview

The Madallah ICT Hub dashboard uses PostgreSQL as the primary database. This document outlines all tables, relationships, and data models.

---

## Entity Relationship Diagram (ERD)

```
Users (1) ──────────── (Many) Bookings
  │                       │
  │                       └── (Many) Payments
  │
  ├──────────── (Many) Messages
  │
  ├──────────── (Many) Wallet_Transactions
  │
  ├──────────── (Many) Course_Enrollments
  │
  └──────────── (Many) Notifications

Services (1) ──────────── (Many) Bookings
  │
  └──────────── (Many) Service_Pricing

Courses (1) ──────────── (Many) Course_Enrollments
  │
  └──────────── (Many) Course_Materials

Staff (1) ──────────── (Many) Bookings (assigned_staff_id)
  │
  └──────────── (Many) Analytics_Logs
```

---

## Core Tables

### 1. Users Table
Stores all user information with role-based access control.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  gender ENUM('male', 'female', 'other') DEFAULT 'other',
  avatar_url VARCHAR(500),
  role ENUM('customer', 'staff', 'admin') DEFAULT 'customer',
  status ENUM('active', 'suspended', 'banned', 'pending') DEFAULT 'pending',
  address VARCHAR(255),
  city VARCHAR(100),
  state_province VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  identification_type VARCHAR(50),
  identification_number VARCHAR(100) UNIQUE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP,
  login_attempts INT DEFAULT 0,
  locked_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

### 2. Staff Table
Extends user information for staff members.

```sql
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  department VARCHAR(100),
  position VARCHAR(100),
  hire_date DATE NOT NULL,
  shift_start TIME,
  shift_end TIME,
  is_available BOOLEAN DEFAULT TRUE,
  performance_rating DECIMAL(3, 2) DEFAULT 0.00,
  total_bookings_handled INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_staff_user_id ON staff(user_id);
CREATE INDEX idx_staff_available ON staff(is_available);
```

### 3. Services Table
Catalog of all services offered by the hub.

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category ENUM('internet', 'printing', 'scanning', 'photocopying', 'gaming', 'cloud_storage', 'exam_registration', 'tutorial', 'course') NOT NULL,
  service_type ENUM('cyber_cafe', 'educational') NOT NULL,
  icon_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  requires_booking BOOLEAN DEFAULT TRUE,
  max_capacity INT,
  duration_minutes INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT name_not_empty CHECK (length(trim(name)) > 0)
);

CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(is_active);
```

### 4. Service_Pricing Table
Pricing details for each service.

```sql
CREATE TABLE service_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  currency ENUM('NGN', 'USD', 'GBP') DEFAULT 'NGN',
  base_price DECIMAL(10, 2) NOT NULL,
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  discounted_price DECIMAL(10, 2),
  unit ENUM('hour', 'page', 'item', 'session', 'month') DEFAULT 'hour',
  min_quantity INT DEFAULT 1,
  max_quantity INT,
  is_active BOOLEAN DEFAULT TRUE,
  valid_from DATE,
  valid_until DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT price_positive CHECK (base_price > 0),
  CONSTRAINT discount_range CHECK (discount_percentage >= 0 AND discount_percentage <= 100)
);

CREATE INDEX idx_service_pricing_service_id ON service_pricing(service_id);
```

### 5. Bookings Table
Core booking/reservation management.

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id),
  assigned_staff_id UUID REFERENCES staff(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  duration_minutes INT GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_time - start_time))/60) STORED,
  quantity INT DEFAULT 1,
  status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show') DEFAULT 'pending',
  booking_date DATE,
  notes TEXT,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMP,
  cancelled_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_start_time ON bookings(start_time);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
```

### 6. Payments Table
Transaction and payment records.

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_reference VARCHAR(100) UNIQUE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency ENUM('NGN', 'USD', 'GBP') DEFAULT 'NGN',
  payment_method ENUM('card', 'bank_transfer', 'ussd', 'wallet', 'crypto') NOT NULL,
  payment_status ENUM('pending', 'processing', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  payment_gateway VARCHAR(50),
  gateway_reference VARCHAR(255),
  description TEXT,
  receipt_url VARCHAR(500),
  refund_amount DECIMAL(10, 2),
  refund_reason TEXT,
  refunded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  
  CONSTRAINT amount_positive CHECK (amount > 0),
  CONSTRAINT valid_refund CHECK (refund_amount IS NULL OR refund_amount > 0)
);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

### 7. Wallet Table
Digital wallet system for users.

```sql
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  balance DECIMAL(12, 2) DEFAULT 0.00,
  currency ENUM('NGN', 'USD', 'GBP') DEFAULT 'NGN',
  credit_balance DECIMAL(12, 2) DEFAULT 0.00,
  total_spent DECIMAL(12, 2) DEFAULT 0.00,
  total_recharged DECIMAL(12, 2) DEFAULT 0.00,
  is_frozen BOOLEAN DEFAULT FALSE,
  freeze_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT balance_non_negative CHECK (balance >= 0),
  CONSTRAINT credit_non_negative CHECK (credit_balance >= 0)
);

CREATE INDEX idx_wallets_user_id ON wallets(user_id);
```

### 8. Wallet_Transactions Table
Detailed transaction history.

```sql
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  type ENUM('credit', 'debit', 'refund', 'bonus', 'adjustment') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  balance_before DECIMAL(12, 2),
  balance_after DECIMAL(12, 2),
  description TEXT,
  related_payment_id UUID REFERENCES payments(id),
  related_booking_id UUID REFERENCES bookings(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT amount_positive CHECK (amount > 0)
);

CREATE INDEX idx_wallet_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX idx_wallet_transactions_created_at ON wallet_transactions(created_at);
```

### 9. Messages Table
In-app messaging system.

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id),
  recipient_id UUID NOT NULL REFERENCES users(id),
  subject VARCHAR(255),
  content TEXT NOT NULL,
  message_type ENUM('support_ticket', 'user_message', 'system', 'notification') DEFAULT 'user_message',
  priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  attachment_url VARCHAR(500),
  parent_message_id UUID REFERENCES messages(id),
  status ENUM('draft', 'sent', 'received', 'archived') DEFAULT 'sent',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT content_not_empty CHECK (length(trim(content)) > 0),
  CONSTRAINT different_users CHECK (sender_id != recipient_id)
);

CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_is_read ON messages(is_read);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

### 10. Notifications Table
Real-time notifications for users.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type ENUM('booking', 'payment', 'course', 'message', 'system', 'promotion') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_url VARCHAR(500),
  action_url VARCHAR(500),
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
```

### 11. Courses Table
Online courses and educational content.

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES users(id),
  category VARCHAR(100),
  level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  duration_hours INT,
  price DECIMAL(10, 2),
  thumbnail_url VARCHAR(500),
  course_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  start_date DATE,
  end_date DATE,
  max_students INT,
  enrollment_count INT DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0.00,
  total_reviews INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_active ON courses(is_active);
```

### 12. Course_Enrollments Table
Tracks user course enrollment and progress.

```sql
CREATE TABLE course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id),
  enrollment_status ENUM('active', 'completed', 'suspended', 'dropped') DEFAULT 'active',
  progress_percentage INT DEFAULT 0,
  completion_date TIMESTAMP,
  certificate_url VARCHAR(500),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT unique_enrollment UNIQUE(user_id, course_id),
  CONSTRAINT valid_progress CHECK (progress_percentage >= 0 AND progress_percentage <= 100)
);

CREATE INDEX idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX idx_course_enrollments_course_id ON course_enrollments(course_id);
```

### 13. Course_Materials Table
Course content and materials.

```sql
CREATE TABLE course_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content_type ENUM('video', 'document', 'quiz', 'assignment', 'resource') NOT NULL,
  content_url VARCHAR(500),
  description TEXT,
  order_index INT,
  duration_minutes INT,
  is_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_course_materials_course_id ON course_materials(course_id);
```

### 14. Analytics_Logs Table
Track user actions and system events for analytics.

```sql
CREATE TABLE analytics_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action_type VARCHAR(100),
  resource_type VARCHAR(100),
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_logs_user_id ON analytics_logs(user_id);
CREATE INDEX idx_analytics_logs_created_at ON analytics_logs(created_at);
CREATE INDEX idx_analytics_logs_action_type ON analytics_logs(action_type);
```

### 15. Audit_Trail Table
Security audit logging for compliance.

```sql
CREATE TABLE audit_trail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name VARCHAR(100) NOT NULL,
  operation VARCHAR(20) NOT NULL,
  record_id UUID,
  changed_by UUID REFERENCES users(id),
  old_values JSONB,
  new_values JSONB,
  change_reason TEXT,
  ip_address INET,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_trail_table_name ON audit_trail(table_name);
CREATE INDEX idx_audit_trail_created_at ON audit_trail(created_at);
```

### 16. Settings Table
System-wide and user settings.

```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSONB,
  setting_type VARCHAR(50),
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_settings_key ON settings(setting_key);
```

---

## Data Types Reference

| Type | Size | Description |
|------|------|-------------|
| UUID | 16 bytes | Universal unique identifier |
| VARCHAR(n) | Variable | Variable-length character string |
| TEXT | Variable | Unlimited text content |
| INT | 4 bytes | Integer (-2,147,483,648 to 2,147,483,647) |
| DECIMAL(p,s) | Variable | Fixed-point decimal |
| BOOLEAN | 1 byte | TRUE or FALSE |
| DATE | 4 bytes | Date (YYYY-MM-DD) |
| TIMESTAMP | 8 bytes | Date and time with timezone |
| ENUM | Variable | Enumerated type |
| INET | 7-19 bytes | IP address |
| JSONB | Variable | Binary JSON format |

---

## Indexes Strategy

### Covered Queries
Most-used queries have dedicated indexes to ensure < 100ms response times:

```sql
-- User authentication
SELECT * FROM users WHERE email = ?;
INDEX: idx_users_email

-- Dashboard queries
SELECT * FROM bookings WHERE user_id = ? AND status = ?;
INDEX: idx_bookings_user_id, idx_bookings_status

-- Wallet queries
SELECT * FROM wallet_transactions WHERE wallet_id = ? ORDER BY created_at DESC;
INDEX: idx_wallet_transactions_wallet_id, idx_wallet_transactions_created_at
```

---

## Constraints & Validation

### Business Rules
- **Payment Status**: Can only transition through valid states (pending → processing → completed/failed)
- **Booking Status**: Cannot cancel completed bookings
- **Wallet Balance**: Must never be negative
- **User Email**: Must be unique and valid format
- **Booking Duration**: End time must be after start time

---

## Migration Strategy

### Initial Setup
```bash
# Run all migrations
npm run migrate

# Specific migration
npm run migrate:up -- 001_initial_schema.sql
```

### Rollback
```bash
npm run migrate:down
```

---

## Backup & Recovery

### Daily Backups
```bash
# PostgreSQL backup
pg_dump -h localhost -U user madallah_db > backup_$(date +%Y%m%d).sql

# Restore
psql -h localhost -U user madallah_db < backup_20260627.sql
```

---

## Performance Optimization

### Query Optimization Tips
1. **Always use indexed columns** in WHERE clauses
2. **Use LIMIT** for list queries
3. **Avoid SELECT *** use specific columns
4. **Use EXPLAIN** to analyze query plans
5. **Archive old analytics logs** periodically

### Connection Pooling
```
Min Connections: 5
Max Connections: 20
Connection Timeout: 30s
Idle Timeout: 900s
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-06-27 | Initial schema design |

---

**Next Steps**: Review [API_SPECIFICATION.md](./API_SPECIFICATION.md) for endpoint implementation details.

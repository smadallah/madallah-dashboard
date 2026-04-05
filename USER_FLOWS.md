# 🔄 User Flow Diagrams

## Visual representation of key user journeys in the Madallah ICT Hub Dashboard Portal

---

## 1. Registration & Onboarding Flow

```
┌─────────────────┐
│   Landing Page  │
│  (Login/Signup) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  User clicks    │
│   "Sign Up"     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Registration Form              │
│  ┌───────────────────────────┐  │
│  │ • Full Name               │  │
│  │ • Email Address           │  │
│  │ • Phone Number            │  │
│  │ • Password                │  │
│  │ • Confirm Password        │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Form Validation│
│  ✓ Email format │
│  ✓ Password min │
│  ✓ Phone format │
└────────┬────────┘
         │
         ├─── Invalid ──→ Show Error Messages
         │
         ▼ Valid
┌─────────────────┐
│  Create Account │
│  • role: customer│
│  • wallet: ₦0   │
│  • status: active│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Generate JWT   │
│  Token          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Auto-Login &   │
│  Redirect to    │
│  Dashboard      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Welcome Dashboard              │
│  ┌───────────────────────────┐  │
│  │ Welcome Tutorial (First)  │  │
│  │ • Platform overview       │  │
│  │ • Quick tips             │  │
│  │ • Feature highlights     │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 2. Service Booking Flow

```
┌──────────────────┐
│  Dashboard       │
│  (Logged In)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Navigate to     │
│  Services Page   │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Services Catalog               │
│  ┌───────────────────────────┐  │
│  │ Search Bar                │  │
│  │ Category Tabs             │  │
│  │ • All | Cyber | Education │  │
│  └───────────────────────────┘  │
│                                  │
│  ┌─────┐  ┌─────┐  ┌─────┐     │
│  │Svc 1│  │Svc 2│  │Svc 3│     │
│  └─────┘  └─────┘  └─────┘     │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  User selects    │
│  Service Card    │
│  Clicks "Book"   │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Booking Dialog Opens           │
│  ┌───────────────────────────┐  │
│  │ Service: Internet Access  │  │
│  │ Price: ₦200              │  │
│  │ Duration: 60 min         │  │
│  │                          │  │
│  │ Select Date: [______]    │  │
│  │ Select Time: [______]    │  │
│  │ Notes (optional): [____] │  │
│  │                          │  │
│  │ [Cancel] [Confirm Booking]│  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Validate Inputs │
│  • Date not past │
│  • Time selected │
└────────┬─────────┘
         │
         ├─── Invalid ──→ Show Error
         │
         ▼ Valid
┌──────────────────┐
│  Check Wallet    │
│  Balance         │
└────────┬─────────┘
         │
         ├─── Insufficient ──→ Redirect to Top-up
         │
         ▼ Sufficient
┌─────────────────────────────────┐
│  Database Transaction           │
│  ┌───────────────────────────┐  │
│  │ 1. Create Booking Record  │  │
│  │ 2. Deduct from Wallet     │  │
│  │ 3. Create Transaction     │  │
│  │ 4. Send Notification      │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Success Message │
│  "Booking        │
│   Confirmed!"    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Update UI       │
│  • Dashboard     │
│  • Bookings page │
│  • Wallet balance│
└──────────────────┘
```

---

## 3. Wallet Top-Up Flow

```
┌──────────────────┐
│  Dashboard/      │
│  Wallet Page     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Click           │
│  "Top Up Wallet" │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Top-Up Dialog                  │
│  ┌───────────────────────────┐  │
│  │ Current Balance: ₦15,000  │  │
│  │                          │  │
│  │ Enter Amount: [______]   │  │
│  │ Quick: [1K][2K][5K][10K] │  │
│  │                          │  │
│  │ Payment Method:          │  │
│  │ ◉ Card  ○ Bank  ○ USSD  │  │
│  │                          │  │
│  │ [Cancel] [Proceed]       │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Validate Amount │
│  (Min: ₦100)    │
└────────┬─────────┘
         │
         ├─── Invalid ──→ Show Error
         │
         ▼ Valid
┌──────────────────┐
│  User clicks     │
│  "Proceed"       │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Payment Gateway Integration    │
│                                  │
│  ┌────────────────────────────┐ │
│  │   If Card Selected:        │ │
│  │   ┌─────────────────────┐  │ │
│  │   │ 1. Init Paystack    │  │ │
│  │   │ 2. Redirect to form │  │ │
│  │   │ 3. Enter card info  │  │ │
│  │   │ 4. Verify OTP       │  │ │
│  │   └─────────────────────┘  │ │
│  │                            │ │
│  │   If Bank Selected:        │ │
│  │   ┌─────────────────────┐  │ │
│  │   │ 1. Show bank list   │  │ │
│  │   │ 2. Select bank      │  │ │
│  │   │ 3. Internet banking │  │ │
│  │   └─────────────────────┘  │ │
│  │                            │ │
│  │   If USSD Selected:        │ │
│  │   ┌─────────────────────┐  │ │
│  │   │ 1. Show USSD code   │  │ │
│  │   │ 2. Dial on phone    │  │ │
│  │   └─────────────────────┘  │ │
│  └────────────────────────────┘ │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Payment Gateway │
│  Processes       │
│  Payment         │
└────────┬─────────┘
         │
         ├─── Failed ──→ Show Error & Retry Option
         │
         ▼ Success
┌──────────────────┐
│  Webhook/        │
│  Callback        │
│  to Backend      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Verify Payment  │
│  with Gateway    │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Database Update                │
│  ┌───────────────────────────┐  │
│  │ 1. Add to wallet_balance  │  │
│  │ 2. Create transaction rec │  │
│  │ 3. Update txn status      │  │
│  │ 4. Send notification      │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Success Screen  │
│  "₦5,000 added   │
│   to wallet!"    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Update UI       │
│  • Wallet balance│
│  • Transactions  │
│  • Notification  │
└──────────────────┘
```

---

## 4. Course Enrollment Flow

```
┌──────────────────┐
│  Navigate to     │
│  Courses Page    │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Course Catalog                 │
│  ┌───────────────────────────┐  │
│  │ Search: [____________]    │  │
│  │ Filter: Beginner ▼        │  │
│  │                          │  │
│  │ ┌────┐  ┌────┐  ┌────┐  │  │
│  │ │Crs1│  │Crs2│  │Crs3│  │  │
│  │ │4.8★│  │4.9★│  │4.7★│  │  │
│  │ └────┘  └────┘  └────┘  │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Click Course    │
│  "View Details"  │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Course Detail Modal            │
│  ┌───────────────────────────┐  │
│  │ [Course Thumbnail]        │  │
│  │                          │  │
│  │ Web Development Course   │  │
│  │ ⭐ 4.8 (45 students)     │  │
│  │                          │  │
│  │ 📚 Level: Beginner       │  │
│  │ ⏱️ Duration: 12 weeks    │  │
│  │ 👨‍🏫 Instructor: John Doe │  │
│  │                          │  │
│  │ What you'll learn:       │  │
│  │ ✓ HTML & CSS            │  │
│  │ ✓ JavaScript            │  │
│  │ ✓ React                 │  │
│  │                          │  │
│  │ Price: ₦25,000          │  │
│  │                          │  │
│  │ [Close] [Enroll Now]    │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Click           │
│  "Enroll Now"    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Check if        │
│  Already Enrolled│
└────────┬─────────┘
         │
         ├─── Yes ──→ "Already Enrolled"
         │
         ▼ No
┌──────────────────┐
│  Check Wallet    │
│  Balance         │
└────────┬─────────┘
         │
         ├─── Insufficient ──→ Top-up Prompt
         │
         ▼ Sufficient
┌─────────────────────────────────┐
│  Enrollment Confirmation        │
│  ┌───────────────────────────┐  │
│  │ Confirm Enrollment?       │  │
│  │                          │  │
│  │ Course: Web Development  │  │
│  │ Price: ₦25,000          │  │
│  │ Current Balance: ₦30,000 │  │
│  │ After: ₦5,000           │  │
│  │                          │  │
│  │ [Cancel] [Confirm]       │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Database Transaction           │
│  ┌───────────────────────────┐  │
│  │ 1. Create enrollment      │  │
│  │ 2. Deduct course fee      │  │
│  │ 3. Create transaction     │  │
│  │ 4. Update course count    │  │
│  │ 5. Grant course access    │  │
│  │ 6. Send welcome email     │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Success!        │
│  "Enrolled in    │
│   Web Dev Course"│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Redirect to     │
│  Course Dashboard│
│  • Course content│
│  • Progress: 0%  │
│  • Start learning│
└──────────────────┘
```

---

## 5. Support/Message Flow

```
┌──────────────────┐
│  User has issue/ │
│  question        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Navigate to     │
│  Messages Page   │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Messages & Notifications       │
│  ┌───────────────────────────┐  │
│  │ Tabs: [Messages][Notifs]  │  │
│  │                          │  │
│  │ [Search] [Compose]       │  │
│  │                          │  │
│  │ Inbox:                   │  │
│  │ ┌──────────────────────┐ │  │
│  │ │ 📧 Staff: Booking    │ │  │
│  │ │ 📧 Support: Welcome  │ │  │
│  │ └──────────────────────┘ │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Click           │
│  "Compose"       │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  New Message Dialog             │
│  ┌───────────────────────────┐  │
│  │ To: Support ▼            │  │
│  │                          │  │
│  │ Subject: [___________]   │  │
│  │                          │  │
│  │ Message:                 │  │
│  │ ┌──────────────────────┐ │  │
│  │ │                      │ │  │
│  │ │                      │ │  │
│  │ │                      │ │  │
│  │ └──────────────────────┘ │  │
│  │                          │  │
│  │ [Cancel] [Send Message]  │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Validate Fields │
│  • Subject filled│
│  • Message filled│
└────────┬─────────┘
         │
         ├─── Invalid ──→ Show Error
         │
         ▼ Valid
┌──────────────────┐
│  Send Message    │
│  Save to DB      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Notify Recipient│
│  • Email alert   │
│  • In-app notif  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Success!        │
│  "Message sent"  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Update UI       │
│  • Close dialog  │
│  • Refresh inbox │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Staff receives  │
│  notification    │
│  and responds    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  User gets reply │
│  notification    │
│  🔔 Badge shown  │
└──────────────────┘
```

---

## 6. Staff Booking Management Flow

```
┌──────────────────┐
│  Staff Login     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Staff Dashboard │
│  • Pending: 12   │
│  • Today: 42     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Navigate to     │
│  Bookings Page   │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  All Bookings View              │
│  ┌───────────────────────────┐  │
│  │ Filter: [Today ▼]         │  │
│  │ Status: [Pending ▼]       │  │
│  │                          │  │
│  │ Booking List:            │  │
│  │ ┌──────────────────────┐ │  │
│  │ │ 10:00 AM - Internet  │ │  │
│  │ │ Customer: John       │ │  │
│  │ │ Status: Pending      │ │  │
│  │ │ [View][Confirm][❌]  │ │  │
│  │ └──────────────────────┘ │  │
│  │ ... more bookings ...    │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Staff clicks    │
│  "Confirm"       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Confirmation    │
│  Dialog          │
│  "Confirm this   │
│   booking?"      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Update Status   │
│  pending →       │
│  confirmed       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Notify Customer │
│  via email & app │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Update          │
│  Dashboard       │
│  • Pending: 11   │
│  • Confirmed: +1 │
└──────────────────┘
```

---

## 7. Admin Analytics Flow

```
┌──────────────────┐
│  Admin Login     │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Admin Dashboard                │
│  ┌───────────────────────────┐  │
│  │ Revenue: ₦435,000        │  │
│  │ Users: 1,234             │  │
│  │ Bookings: 256            │  │
│  │ Health: 98.5%            │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Navigate to     │
│  Analytics       │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Analytics Page                 │
│  ┌───────────────────────────┐  │
│  │ Time: [Week▼][Export]     │  │
│  │                          │  │
│  │ ┌──────────────────────┐ │  │
│  │ │  Revenue Chart       │ │  │
│  │ │  📊 ₦435K           │ │  │
│  │ └──────────────────────┘ │  │
│  │                          │  │
│  │ ┌──────────────────────┐ │  │
│  │ │  Bookings Chart      │ │  │
│  │ │  📈 256 bookings    │ │  │
│  │ └──────────────────────┘ │  │
│  │                          │  │
│  │ ┌──────────────────────┐ │  │
│  │ │  User Growth         │ │  │
│  │ │  👥 +65 this week   │ │  │
│  │ └──────────────────────┘ │  │
│  │                          │  │
│  │ ┌──────────────────────┐ │  │
│  │ │  Service Distribution│ │  │
│  │ │  🥧 Pie Chart       │ │  │
│  │ └──────────────────────┘ │  │
│  └───────────────────────────┘  │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Admin clicks    │
│  "Export"        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Generate Report │
│  • CSV/PDF       │
│  • Email copy    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Download starts │
│  "report_2026.   │
│   pdf"           │
└──────────────────┘
```

---

## Key User Experience Principles

### 1. **Progressive Disclosure**
- Show only necessary information at each step
- Use modals and dialogs for detailed actions
- Minimize cognitive load

### 2. **Clear Feedback**
- Success/error messages for all actions
- Loading states for async operations
- Visual confirmation of state changes

### 3. **Error Recovery**
- Clear error messages
- Actionable solutions
- Easy retry mechanisms

### 4. **Consistency**
- Uniform navigation patterns
- Consistent button placements
- Predictable interactions

### 5. **Accessibility**
- Keyboard navigation support
- Screen reader friendly
- High contrast options
- Touch-friendly targets (44x44px minimum)

---

## Navigation Map

```
Home (/)
└── Login/Register
    │
    └── Dashboard (/dashboard)
        ├── Services (/dashboard/services)
        │   └── Book Service Dialog
        │       └── Confirm Booking
        │
        ├── Bookings (/dashboard/bookings)
        │   ├── View All
        │   ├── Filter by Status
        │   └── Manage Booking
        │       ├── Reschedule
        │       └── Cancel
        │
        ├── Wallet (/dashboard/wallet)
        │   ├── View Balance
        │   ├── Top-Up
        │   │   └── Payment Gateway
        │   └── Transactions
        │       └── Export
        │
        ├── Messages (/dashboard/messages)
        │   ├── Inbox
        │   ├── Compose
        │   └── Notifications
        │
        ├── Courses (/dashboard/courses)
        │   ├── Browse Catalog
        │   ├── My Courses
        │   └── Enroll in Course
        │
        ├── Analytics (/dashboard/analytics) [Staff/Admin]
        │   ├── Overview
        │   ├── Reports
        │   └── Export
        │
        └── Settings (/dashboard/settings)
            ├── Profile
            ├── Security
            ├── Notifications
            └── Privacy
```

---

**Note**: All flows include proper error handling, loading states, and success confirmations to ensure a smooth user experience.

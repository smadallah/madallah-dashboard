# 🔄 User Flows & Journey Diagrams

## Overview

This document outlines the complete user journeys for all major workflows in the Madallah ICT Hub dashboard portal.

---

## 1. Authentication Flow

### 1.1 Registration Flow

```
┌─────────────────────────────────────────────────────────────┐
│ START: User Visits Portal                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │ Click "Sign Up" Button │
        └────────────┬───────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ Registration Page Loads                │
        │ - Email input                          │
        │ - Password input                       │
        │ - Confirm password                     │
        │ - First/Last name                      │
        │ - Phone number                         │
        │ - Role selection (Customer/Staff)      │
        └────────────┬───────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ User Fills Registration Form           │
        └────────────┬───────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ Client-side Validation                 │
        │ ✓ Email format                         │
        │ ✓ Password strength (8+ chars)         │
        │ ✓ Passwords match                      │
        │ ✓ Phone format                         │
        └────────┬──────────────────────┬────────┘
                 │                      │
            ❌ FAIL                  ✓ PASS
                 │                      │
                 ▼                      ▼
         Show Error Message    ┌─────────────────────┐
         (Highlight fields)    │ Submit Form to API  │
                               └────────┬────────────┘
                                        │
                                        ▼
                          ┌─────────────────────────────────┐
                          │ Server-side Validation          │
                          │ ✓ Email uniqueness              │
                          │ ✓ Phone uniqueness              │
                          │ ✓ Password strength             │
                          │ ✓ User data completeness        │
                          └──────┬────────────┬──────────────┘
                                 │            │
                             ❌ FAIL      ✓ PASS
                                 │            │
                                 ▼            ▼
                          ❌ Show Server   Hash Password &
                            Error Message  Create User Record
                                          │
                                          ▼
                          ┌──────────────────────────────────┐
                          │ Send Verification Email          │
                          │ (with verification link)         │
                          └────────────┬─────────────────────┘
                                       │
                                       ▼
                          ┌──────────────────────────────────┐
                          │ Show Success Message              │
                          │ "Verification email sent"         │
                          │ "Please check your inbox"         │
                          └────────────┬─────────────────────┘
                                       │
                                       ▼
                          ┌──────────────────────────────────┐
                          │ User Opens Email                  │
                          │ Clicks Verification Link          │
                          └────────────┬─────────────────────┘
                                       │
                                       ▼
                          ┌──────────────────────────────────┐
                          │ Mark Email as Verified           │
                          │ Update user status → 'active'    │
                          └────────────┬─────────────────────┘
                                       │
                                       ▼
                          ┌──────────────────────────────────┐
                          �� Redirect to Login Page            │
                          │ Show Success Message              │
                          │ "Account verified successfully"   │
                          └────────────┬─────────────────────┘
                                       │
                                       ▼
                          ┌──────────────────────────────────┐
                          │ END: User Ready to Login          │
                          └──────────────────────────────────┘
```

### 1.2 Login Flow

```
┌─────────────────────────────────────────────────────────────┐
│ START: User at Login Page                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌──────────────��─────────────────────────┐
        │ Enter Credentials                      │
        │ - Email                                │
        │ - Password                             │
        │ - Optional: Remember me checkbox       │
        └────────────┬───────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ Click Login Button                     │
        └────────────┬───────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────────┐
        │ Client-side Validation                 │
        │ ✓ Email not empty                      │
        │ ✓ Password not empty                   │
        └────────┬──────────────────────┬────────┘
                 │                      │
            ❌ FAIL                  ✓ PASS
                 │                      │
                 ▼                      ▼
         Show Error Message    ┌──────────────────────────┐
                               │ Send Login Request to API│
                               │ - Email                  │
                               │ - Password               │
                               │ - Device info            │
                               └────────┬─────────────────┘
                                        │
                                        ▼
                          ┌─────────────────────────────────┐
                          │ Server Validation               │
                          │ ✓ User exists                   │
                          │ ✓ Password correct              │
                          │ ✓ User status active            │
                          │ ✓ Account not locked            │
                          └──────┬────────────┬──────────────┘
                                 │            │
                             ❌ FAIL      ✓ PASS
                                 │            │
                                 ▼            ▼
                          ❌ Handle Error  Generate JWT Tokens
                          Cases:          │ - Access Token
                          - Invalid       │ - Refresh Token
                            credentials   │
                          - Account       │ Create Session
                            locked        │ Log Analytics
                          - Account       │
                            suspended     ▼
                                    ┌──────────────────────┐
                                    │ Store Tokens         │
                                    │ (localStorage/cookie)│
                                    └────────┬─────────────┘
                                             │
                                             ▼
                                    ┌──────────────────────┐
                                    │ 2FA Required?        │
                                    └──┬─────────────────┬─┘
                                       │                 │
                                    YES│             NO  │
                                       │                 │
                                       ▼                 ▼
                            ┌──────────────────┐  ┌─────────────────┐
                            │ Send 2FA Code    │  │ Redirect to     │
                            │ (SMS/Email)      │  │ Dashboard       │
                            └────────┬─────────┘  │ (based on role) │
                                     │           └─────────────────┘
                                     ▼
                            ┌──────────────────┐
                            │ User Enters Code │
                            └────────┬─────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ Verify 2FA Code  │
                            └────────┬─────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ Redirect to      │
                            │ Dashboard        │
                            └────────┬─────────┘
                                     │
                                     ▼
                            ┌──────────────────────────────┐
                            │ END: User Logged In          │
                            │ Dashboard Loaded             │
                            └──────────────────────────────┘
```

---

## 2. Service Booking Flow

```
┌──────────────────────────────────────────────────────┐
│ START: User on Dashboard                             │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
      ┌────────────────────────────────┐
      │ Click "Browse Services"         │
      └────────────┬───────────────────┘
                   │
                   ▼
      ┌────────────────────────────────────────────────┐
      │ Services Page Loads                            │
      │ Display all available services:                │
      │ - Internet access                              │
      │ - Printing services                            │
      │ - Scanning services                            │
      │ - Photocopying                                 │
      │ - Gaming                                       │
      │ - Cloud storage                                │
      │ - Educational courses                          │
      └────────────┬───────────────────────────────────┘
                   │
                   ▼
      ┌────────────────────────────────────────────────┐
      │ User Filters/Searches Services                 │
      │ - By category                                  │
      │ - By price range                               │
      │ - By rating                                    │
      │ - By availability                              │
      └────────────┬───────────────────────────────────┘
                   │
                   ▼
      ┌────────────────────────────────────────────────┐
      │ User Selects a Service                         │
      │ Views Service Details:                         │
      │ - Description                                  │
      │ - Price & pricing options                      │
      │ - Availability calendar                        │
      │ - Customer reviews                             │
      │ - Duration/quantity options                    │
      └────────────┬───────────────────────────────────┘
                   │
                   ▼
      ┌────────────────────────────────────────────────┐
      │ Click "Book Now" Button                        │
      └────────────┬───────────────────────────────────┘
                   │
                   ▼
      ┌────────────────────────────────────────────────┐
      │ Booking Modal/Page Opens                       │
      │ Form Fields:                                   │
      │ - Select date                                  │
      │ - Select time slot                             │
      │ - Duration                                     │
      │ - Quantity/Parameters                          │
      │ - Special notes/requirements                   │
      │ - Terms acceptance checkbox                    │
      └────────────┬───────────────────────────────────┘
                   │
                   ▼
      ┌────────────────────────────────────────────────┐
      │ User Fills Booking Details                     │
      └────────────┬───────────────────────────────────┘
                   │
                   ▼
      ┌────────────────────────────────────────────────┐
      │ System Validates Availability                  │
      │ ✓ Slot not booked by others                    │
      │ ✓ User wallet has sufficient balance           │
      │ ✓ Selected date/time is valid                  │
      └────────┬──────────────────┬─────────────────────┘
               │                  │
           ❌ FAIL            ✓ PASS
               │                  │
               ▼                  ▼
      ❌ Show Error        ┌──────────────────────────┐
         Message           │ Display Booking Summary  │
      (e.g., "Slot taken") │ - Service details       │
                           │ - Date/time             │
                           │ - Total price           │
                           │ - Discount (if any)     │
                           └────────┬─────────────────┘
                                    │
                                    ▼
                           ┌──────────────────────────┐
                           │ Click "Confirm Booking" │
                           └────────┬─────────────────┘
                                    │
                                    ▼
                           ┌──────────────────────────┐
                           │ Select Payment Method    │
                           │ - Wallet (if balance OK) │
                           │ - Card                   │
                           │ - Bank transfer          │
                           │ - USSD                   │
                           └────────┬─────────────────┘
                                    │
                                    ▼
                           ┌──────────────────────────┐
                           │ Process Payment          │
                           └────────┬─────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
            ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
            │ Wallet Pay   │  │ Card Pay     │  │ Other Method │
            │ (Instant)    │  │ (API call)   │  │ (Varies)     │
            └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
                   │                 │                 │
                   └─────────┬───────┴────────────┬────┘
                             │                    │
                         ✓ PASS            ❌ FAIL
                             │                    │
                             ▼                    ▼
                    ┌──────────────────┐  ❌ Show Error
                    │ Create Booking   │     Message
                    │ Record           │  Offer retry
                    │ Status: pending  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Create Payment   │
                    │ Record           │
                    │ Status: completed│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Update Wallet    │
                    │ Deduct amount    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Send Confirmation│
                    │ Email & SMS       │
                    │ with booking ref  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Show Success Page│
                    │ - Booking ref    │
                    │ - Confirmation   │
                    │ - Next steps     │
                    │ - Add to calendar│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Redirect to      │
                    │ Bookings Page    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ END: Booking     │
                    │ Confirmed        │
                    └──────────────────┘
```

---

## 3. Payment & Wallet Flow

```
┌──────────────────────────────────────────────────────┐
│ START: User on Wallet Page                           │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
      ┌────────────────────────────────┐
      │ Wallet Overview Displayed       │
      │ - Current balance               │
      │ - Credit balance                │
      │ - Recent transactions           │
      │ - Quick actions buttons         │
      └────────────┬───────────────────┘
                   │
         ┌─────────┴──────────┐
         │                    │
         ▼                    ▼
   ┌──────────────┐   ┌──────────────────┐
   │ Add Funds    │   │ View Transactions│
   └────────┬─────┘   └──────────────────┘
            │
            ▼
   ┌──────────────────────────────┐
   │ Recharge Modal Opens          │
   │ Fields:                       │
   │ - Amount input                │
   │ - Currency selection          │
   │ - Payment method              │
   │ - Receipt delivery            │
   └────────┬─────────────────────┘
            │
            ▼
   ┌──────────────────────────────┐
   │ User Enters Amount            │
   │ System validates:             │
   │ ✓ Minimum amount (₦500)       │
   │ ✓ Maximum amount (₦1,000,000) │
   └────────┬─────────────────────┘
            │
            ▼
   ┌──────────────────────────────┐
   │ Select Payment Gateway        │
   │ - Card (Mastercard/Visa)      │
   │ - Bank transfer               │
   │ - USSD                        │
   │ - Mobile money                │
   └────────┬─────────────────────┘
            │
    ┌───────┴────────┬────────────┐
    │                │            │
    ▼                ▼            ▼
 ┌─────────┐  ┌──────────┐  ┌─────────┐
 │ Card    │  │ Bank     │  │ USSD    │
 │ Payment │  │ Transfer │  │ Payment │
 └────┬────┘  └──────┬───┘  └────┬────┘
      │              │            │
      ▼              ▼            ▼
 Process via   Generate Ref  Initiate
 Paystack/     & Send Email  USSD
 Flutterwave   User           Prompt
 │             Initiates     │
 │             Transfer       │
 └──────┬───────┴────────┬────┘
        │                │
    ✓ PASS          ❌ FAIL
        │                │
        ▼                ▼
   ┌─────────────┐  ❌ Error
   │ Webhook:    │     Message
   │ Payment     │
   │ Confirmed   │
   └────┬────────┘
        │
        ▼
   ┌─────────────┐
   │ Update      │
   │ Wallet      │
   │ Balance     │
   └────┬────────┘
        │
        ▼
   ┌─────────────┐
   │ Create      │
   │ Transaction │
   │ Record      │
   └────┬────────┘
        │
        ▼
   ┌─────────────┐
   │ Send        │
   │ Confirmation│
   │ Email/SMS   │
   └────┬────────┘
        │
        ▼
   ┌─────────────┐
   │ Show        │
   │ Success     │
   │ Message &   │
   │ Receipt     │
   └────┬────────┘
        │
        ▼
   ┌─────────────┐
   │ END: Wallet │
   │ Credited    │
   └─────────────┘
```

---

## 4. Message & Support Ticket Flow

```
┌──────────────────────────────────────────────────────┐
│ START: User on Messages Page                         │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
      ┌────────────────────────────────┐
      │ Messages Dashboard Loads        │
      │ - Inbox                         │
      │ - Sent messages                 │
      │ - Support tickets               │
      │ - Notifications                 │
      └────────────┬───────────────────┘
                   │
         ┌─────────┴──────────┐
         │                    │
         ▼                    ▼
   ┌──────────────┐   ┌──────────────────┐
   │ Read Message │   │ Create Ticket    │
   └────────┬─────┘   └─────────┬────────┘
            │                   │
            ▼                   ▼
   ┌──────────────────┐  ┌──────────────────┐
   │ Message Opens    │  │ Ticket Form      │
   │ Content display  │  │ - Subject        │
   │ - Sender info    │  │ - Category       │
   │ - Timestamp      │  │ - Description    │
   │ - Attachments    │  │ - Priority       │
   │ - Reply button   │  │ - Attachments    │
   │ - Mark as read   │  └────────┬─────────┘
   │ - Archive        │           │
   └────────┬─────────┘           ▼
            │            ┌──────────────────┐
            ▼            │ User fills form  │
   ┌──────────────────┐  └────────┬─────────┘
   │ Click Reply      │           │
   └────────┬─────────┘           ▼
            │            ┌──────────────────┐
            ▼            │ Validate input   │
   ┌──────────────────┐  │ ✓ Subject       │
   │ Reply Compose    │  │ ✓ Description   │
   │ Opens            │  │ ✓ File size     │
   │ - Text editor    │  └────────┬────────┘
   │ - Attachment     │           │
   │ - Emoji support  │       ✓ PASS
   │ - Draft save     │           │
   └────────┬─────────┘           ▼
            │            ┌──────────────────┐
            ▼            │ Create Ticket    │
   ┌──────────────────┐  │ in database      │
   │ Click Send       │  │ Status: open     │
   └────────┬─────────┘  └────────┬────────┘
            │                     │
            ▼                     ▼
   ┌──────────────────┐  ┌──────────────────┐
   │ Send message     │  │ Assign to staff  │
   │ to server        │  │ member           │
   └────────┬─────────┘  └────────┬────────┘
            │                     │
            ▼                     ▼
   ┌──────────────────┐  ┌──────────────────┐
   │ Message stored   │  │ Send notification│
   │ Mark previous as │  │ to staff         │
   │ read             │  │ Email/SMS        │
   └────────┬─────────┘  └────────┬────────┘
            │                     │
            ▼                     ▼
   ┌──────────────────┐  ┌──────────────────┐
   │ Notify recipient │  │ Show ticket      │
   │ (if user message)│  │ details to user  │
   └────────┬─────────┘  │ Status: open     │
            │            │ Can add comments │
            ▼            └────────┬────────┘
   ┌──────────────────┐           │
   │ Update message   │           ▼
   │ list             │  ┌──────────────────┐
   └────────┬─────────┘  │ Staff responds   │
            │            │ Updates status   │
            ▼            │ Moves to         │
   ┌──────────────────┐  │ in_progress/     │
   │ END: Message     │  │ resolved         │
   │ Sent             │  └────────┬────────┘
   └──────────────────┘           │
                                  ▼
                         ┌──────────────────┐
                         │ User receives    │
                         │ notification     │
                         │ Can rate support │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ END: Ticket      │
                         │ Resolved/Closed  │
                         └──────────────────┘
```

---

## 5. Admin Dashboard & Analytics Flow

```
┌──────────────────────────────────────────────────────┐
│ START: Admin User Logs In                            │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
      ┌────────────────────────────────┐
      │ Admin Dashboard Loads           │
      │ Display Widgets:                │
      │ - Revenue summary               │
      │ - Active users                  │
      │ - Pending bookings              │
      │ - System alerts                 │
      │ - Top services                  │
      │ - User growth chart             │
      └────────────┬───────────────────┘
                   │
         ┌─────────┴──────────┬──────────┐
         │                    │          │
         ▼                    ▼          ▼
   ┌──────────────┐   ┌──────────────┐  ┌──────────────┐
   │ Users Mgmt   │   │ Analytics    │  │ Settings     │
   └────────┬─────┘   └─────────┬────┘  └─────────┬────┘
            │                   │                 │
            ▼                   ▼                 ▼
   ┌──────────────────┐  ┌──────────────────┐
   │ User List        │  │ Analytics Page   │
   │ - Search/filter  │  │ - Date range     │
   │ - Status         │  │ - Metric filter  │
   │ - Role filter    │  │ - Chart types    │
   │ - Bulk actions   │  │ - Export report  │
   └────────┬─────────┘  └──────────┬───────┘
            │                       │
            ▼                       ▼
   ┌──────────────────┐  ┌──────────────────┐
   │ Click user row   │  │ Select date range│
   │ View details     │  │ Choose metrics   │
   │ - Profile info   │  │ - Revenue        │
   │ - Activity log   │  │ - Bookings       │
   │ - Wallet balance │  │ - Users          │
   │ - History        │  │ - Services       │
   │ Actions:         │  └──────────┬───────┘
   │ - Suspend        │             │
   │ - Ban            │             ▼
   │ - Reset password │  ┌──────────────────┐
   │ - Refund         │  │ Generate charts  │
   └────────┬─────────┘  │ - Line charts    │
            │            │ - Bar charts     │
            ▼            │ - Pie charts     │
   ┌──────────────────┐  │ - Heat maps      │
   │ Confirm action   │  └──────────┬───────┘
   │ Apply changes    │             │
   │ Log audit entry  │             ▼
   └────────┬─────────┘  ┌──────────────────┐
            │            │ Export report    │
            ▼            │ - PDF            │
   ┌──────────────────┐  │ - CSV            │
   │ Send notification│  │ - Excel          │
   │ to user (if      │  └──────────┬───────┘
   │ necessary)       │             │
   └────────┬─────────┘             ▼
            │            ┌──────────────────┐
            ▼            │ Download file    │
   ┌──────────────────┐  └────────┬─────────┘
   │ Update admin log │           │
   │ Redirect back    │           ▼
   │ to user list     │  ┌──────────────────┐
   └────────┬─────────┘  │ END: Report      │
            │            │ Generated        │
            ▼            └──────────────────┘
   ┌──────────────────┐
   │ END: User action │
   │ Completed        │
   └──────────────────┘
```

---

## 6. Course Enrollment & Learning Flow

```
┌──────────────────────────────────────────────────────┐
│ START: User Browsing Courses                         │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
      ┌────────────────────────────────┐
      │ Courses Page Loads              │
      │ - Course catalog                │
      │ - Filters (category, level)     │
      │ - Search functionality          │
      │ - Sort options                  │
      └────────────┬───────────────────┘
                   │
                   ▼
      ┌────────────────────────────────┐
      │ User Searches/Filters Courses   │
      └────────────┬───────────────────┘
                   │
                   ▼
      ┌────────────────────────────────┐
      │ Click Course Card               │
      │ Course Detail Page Loads:       │
      │ - Title & description           │
      │ - Instructor info               │
      │ - Duration & level              │
      │ - Price                         │
      │ - Ratings & reviews             │
      │ - Course outline                │
      │ - Student count                 │
      │ - Enroll button                 │
      └────────────┬───────────────────┘
                   │
                   ▼
      ┌────────────────────────────────┐
      │ Read Reviews                    │
      └────────────┬───────────────────┘
                   │
                   ▼
      ┌────────────────────────────────┐
      │ Click "Enroll Now" Button       │
      └────────────┬───────────────────┘
                   │
                   ▼
      ┌────────────────────────────────┐
      │ Check user has sufficient       │
      │ wallet balance or payment       │
      │ method available                │
      └────────┬──────────────┬─────────┘
               │              │
           ❌ NO          ✓ YES
               │              │
               ▼              ▼
      ❌ Prompt to    ┌──────────────────┐
         add funds    │ Process enrollment│
                      │ payment          │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ Payment confirmed│
                      │ Create enrollment│
                      │ record (active)  │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ Grant course     │
                      │ access           │
                      │ Enroll page      │
                      │ loads            │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ Course Dashboard │
                      │ - Materials list │
                      │ - Progress bar   │
                      │ - Instructor bio │
                      │ - Discussion     │
                      │ - Resources      │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ User clicks on   │
                      │ course material  │
                      │ (Video/Document) │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ Content plays/   │
                      │ displays         │
                      │ Track progress   │
                      │ Mark as complete │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ Progress updated │
                      │ (0-100%)         │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ User completes   │
                      │ all materials    │
                      │ (100%)           │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ Course marked    │
                      │ completed        │
                      │ Certificate      │
                      │ generated        │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ Send certificate │
                      │ Email            │
                      │ Update enrollment│
                      │ status           │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ Prompt for rating│
                      │ & review         │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │ END: Course      │
                      │ Completed &      │
                      │ Certificate      │
                      │ Issued           │
                      └──────────────────┘
```

---

## 7. Staff Operations Flow

### Staff Dashboard Actions

```
┌──────────────────────────────────────────────────────┐
│ START: Staff Member Logs In                          │
└────────────────┬─────────────────────────────────────┘
                 │
                 ▼
      ┌────────────────────────────────┐
      │ Staff Dashboard Loads           │
      │ - Today's bookings              │
      │ - Pending tasks                 ���
      │ - Performance metrics           │
      │ - Customer queue                │
      │ - Messages/tickets              │
      └────────────┬───────────────────┘
                   │
         ┌─────────┼─────────┬─────────┐
         │         │         │         │
         ▼         ▼         ▼         ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
   │ View     │ │ Accept/  │ │ Manage   │ │ View     │
   │ Bookings │ │ Reject   │ │ Queue    │ │ Messages │
   │          │ │ Bookings │ │          │ │          │
   └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
        │             │            │            │
        ▼             ▼            ▼            ▼
   [View Today's] [Booking] [Check/Serve] [Reply/Help]
    Agenda       Detail     Customers      Customers
        │             │            │            │
        └─────────────┴────────────┴────────────┘
                     │
                     ▼
         ┌──────────────────────────┐
         │ Staff Completes Tasks    │
         │ - Serve customers        │
         │ - Update booking status  │
         │ - Log notes              │
         │ - Mark complete          │
         └──────────┬───────────────┘
                    │
                    ▼
         ┌──────────────────────────┐
         │ System Logs All Actions  │
         │ Updates analytics        │
         │ Records performance      │
         └──────────┬───────────────┘
                    │
                    ▼
         ┌──────────────────────────┐
         │ END: Tasks Completed     │
         └──────────────────────────┘
```

---

## Key User Journey Touchpoints

| Stage | Action | System Response |
|-------|--------|-----------------|
| **Discovery** | Browse services | Load catalog with filters |
| **Evaluation** | View details/reviews | Display detailed information |
| **Decision** | Book service | Validate availability |
| **Payment** | Process payment | Secure transaction |
| **Confirmation** | Receive confirmation | Send email/SMS |
| **Execution** | Use service | Staff assists |
| **Completion** | Mark complete | Update records |
| **Feedback** | Leave review/rating | Store feedback |
| **Future** | View history | Suggest related services |

---

## Mobile vs Web Flow Considerations

### Mobile Differences
- Simplified forms (progressive disclosure)
- Touch-optimized buttons (larger tap targets)
- Shorter sessions (remember preferences)
- Camera integration (ID verification, document scanning)
- SMS for 2FA instead of email
- Back button navigation

### Web Advantages
- Full feature set
- Detailed analytics dashboards
- Bulk operations
- Complex form workflows
- Side-by-side comparison

---

**Version**: 1.0.0  
**Last Updated**: June 2026

**Next Steps**: Review [API_SPECIFICATION.md](./API_SPECIFICATION.md) for technical implementation of these flows.

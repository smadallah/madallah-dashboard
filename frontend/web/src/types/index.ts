// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'customer' | 'staff' | 'admin';
  avatar?: string;
  status: 'active' | 'suspended' | 'banned' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'customer' | 'staff';
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'internet' | 'printing' | 'scanning' | 'photocopying' | 'gaming' | 'cloud_storage' | 'exam_registration' | 'tutorial' | 'course';
  serviceType: 'cyber_cafe' | 'educational';
  icon?: string;
  isActive: boolean;
  requiresBooking: boolean;
  maxCapacity?: number;
  durationMinutes?: number;
  pricing: ServicePricing[];
  createdAt: string;
  updatedAt: string;
}

export interface ServicePricing {
  id: string;
  basePrice: number;
  discountPercentage: number;
  discountedPrice?: number;
  unit: 'hour' | 'page' | 'item' | 'session' | 'month';
  currency: 'NGN' | 'USD' | 'GBP';
  validFrom?: string;
  validUntil?: string;
}

// Booking Types
export interface Booking {
  id: string;
  bookingReference: string;
  userId: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  quantity: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  serviceId: string;
  startTime: string;
  endTime: string;
  quantity: number;
  notes?: string;
  paymentMethod: 'wallet' | 'card' | 'bank_transfer' | 'ussd';
}

// Payment Types
export interface Payment {
  id: string;
  paymentReference: string;
  bookingId?: string;
  userId: string;
  amount: number;
  currency: 'NGN' | 'USD' | 'GBP';
  paymentMethod: 'card' | 'bank_transfer' | 'ussd' | 'wallet' | 'crypto';
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  description?: string;
  receiptUrl?: string;
  createdAt: string;
  completedAt?: string;
}

// Wallet Types
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  creditBalance: number;
  currency: 'NGN' | 'USD' | 'GBP';
  totalSpent: number;
  totalRecharged: number;
  isFrozen: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit' | 'refund' | 'bonus' | 'adjustment';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  relatedPaymentId?: string;
  relatedBookingId?: string;
  createdAt: string;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  subject?: string;
  content: string;
  messageType: 'support_ticket' | 'user_message' | 'system' | 'notification';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  isRead: boolean;
  readAt?: string;
  attachmentUrl?: string;
  status: 'draft' | 'sent' | 'received' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'payment' | 'course' | 'message' | 'system' | 'promotion';
  title: string;
  description?: string;
  iconUrl?: string;
  actionUrl?: string;
  isRead: boolean;
  readAt?: string;
  expiresAt?: string;
  createdAt: string;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description?: string;
  instructorId?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  durationHours?: number;
  price?: number;
  thumbnailUrl?: string;
  courseUrl?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  maxStudents?: number;
  enrollmentCount: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentStatus: 'active' | 'completed' | 'suspended' | 'dropped';
  progressPercentage: number;
  completionDate?: string;
  certificateUrl?: string;
  rating?: number;
  reviewText?: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  totalBookings: number;
  activeBookings: number;
  walletBalance: number;
  totalSpent: number;
  upcomingBookings: Booking[];
  recentTransactions: WalletTransaction[];
  unreadMessages: number;
  enrolledCourses: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: string;
  code: string;
  details?: Record<string, string>;
  timestamp: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Type Definitions for Madallah ICT Hub Dashboard

export type UserRole = 'customer' | 'staff' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone: string;
  avatar?: string;
  registeredDate: string;
  walletBalance: number;
  isActive: boolean;
}

export interface Service {
  id: string;
  name: string;
  category: 'cyber' | 'education';
  description: string;
  price: number;
  duration?: number; // in minutes
  icon: string;
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  duration: number;
  amount: number;
  notes?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  type: 'support' | 'general';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}

export interface ExamRegistration {
  id: string;
  userId: string;
  examType: 'JAMB' | 'WAEC' | 'NECO';
  subjects: string[];
  examDate: string;
  venue: string;
  amount: number;
  status: 'pending' | 'registered' | 'completed';
  registrationDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: number;
  enrolled: number;
  rating: number;
  thumbnail: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface UsageStats {
  totalSpent: number;
  totalBookings: number;
  hoursUsed: number;
  documentsProcessed: number;
}

export interface AnalyticsData {
  date: string;
  revenue: number;
  bookings: number;
  newUsers: number;
}

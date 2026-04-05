import { User, Service, Booking, Transaction, Message, Notification, ExamRegistration, Course, AnalyticsData } from './types';

// Mock Users Database
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'customer@madallah.com',
    name: 'Aisha Ibrahim',
    role: 'customer',
    phone: '+234 801 234 5678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    registeredDate: '2024-01-15',
    walletBalance: 15000,
    isActive: true,
  },
  {
    id: '2',
    email: 'staff@madallah.com',
    name: 'Chukwudi Okafor',
    role: 'staff',
    phone: '+234 802 345 6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    registeredDate: '2023-06-10',
    walletBalance: 0,
    isActive: true,
  },
  {
    id: '3',
    email: 'admin@madallah.com',
    name: 'Fatima Mohammed',
    role: 'admin',
    phone: '+234 803 456 7890',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    registeredDate: '2023-01-01',
    walletBalance: 0,
    isActive: true,
  },
];

// Mock Services Database
export const mockServices: Service[] = [
  // Cyber Café Services
  {
    id: 's1',
    name: 'Internet Access',
    category: 'cyber',
    description: 'High-speed internet browsing with modern computers',
    price: 200,
    duration: 60,
    icon: 'Wifi',
    available: true,
  },
  {
    id: 's2',
    name: 'Printing (B&W)',
    category: 'cyber',
    description: 'Black and white document printing',
    price: 50,
    icon: 'Printer',
    available: true,
  },
  {
    id: 's3',
    name: 'Printing (Color)',
    category: 'cyber',
    description: 'Color document and photo printing',
    price: 100,
    icon: 'Printer',
    available: true,
  },
  {
    id: 's4',
    name: 'Scanning',
    category: 'cyber',
    description: 'Document and photo scanning services',
    price: 100,
    icon: 'ScanLine',
    available: true,
  },
  {
    id: 's5',
    name: 'Photocopying',
    category: 'cyber',
    description: 'Document photocopying services',
    price: 30,
    icon: 'Copy',
    available: true,
  },
  {
    id: 's6',
    name: 'Gaming Session',
    category: 'cyber',
    description: 'Gaming on high-performance PCs',
    price: 500,
    duration: 60,
    icon: 'Gamepad2',
    available: true,
  },
  {
    id: 's7',
    name: 'Cloud Storage',
    category: 'cyber',
    description: 'Secure cloud storage solutions (10GB)',
    price: 2000,
    icon: 'Cloud',
    available: true,
  },
  // Educational Services
  {
    id: 's8',
    name: 'JAMB Registration',
    category: 'education',
    description: 'Complete JAMB UTME registration assistance',
    price: 5000,
    icon: 'GraduationCap',
    available: true,
  },
  {
    id: 's9',
    name: 'WAEC Registration',
    category: 'education',
    description: 'WAEC examination registration support',
    price: 4500,
    icon: 'BookOpen',
    available: true,
  },
  {
    id: 's10',
    name: 'NECO Registration',
    category: 'education',
    description: 'NECO examination registration support',
    price: 4000,
    icon: 'FileText',
    available: true,
  },
  {
    id: 's11',
    name: 'Private Tutorials',
    category: 'education',
    description: 'One-on-one tutorial sessions',
    price: 3000,
    duration: 60,
    icon: 'Users',
    available: true,
  },
  {
    id: 's12',
    name: 'Online Courses',
    category: 'education',
    description: 'Access to online learning platform',
    price: 10000,
    icon: 'Video',
    available: true,
  },
];

// Mock Bookings Database
export const mockBookings: Booking[] = [
  {
    id: 'b1',
    userId: '1',
    serviceId: 's1',
    serviceName: 'Internet Access',
    date: '2026-04-05',
    time: '10:00 AM',
    status: 'confirmed',
    duration: 60,
    amount: 200,
    notes: 'Need to work on assignment',
  },
  {
    id: 'b2',
    userId: '1',
    serviceId: 's6',
    serviceName: 'Gaming Session',
    date: '2026-04-06',
    time: '02:00 PM',
    status: 'pending',
    duration: 120,
    amount: 1000,
  },
  {
    id: 'b3',
    userId: '1',
    serviceId: 's11',
    serviceName: 'Private Tutorials',
    date: '2026-04-04',
    time: '03:00 PM',
    status: 'completed',
    duration: 60,
    amount: 3000,
    notes: 'Mathematics tutorial completed',
  },
];

// Mock Transactions Database
export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    userId: '1',
    type: 'credit',
    amount: 20000,
    description: 'Wallet Top-up',
    date: '2026-04-01',
    status: 'completed',
    reference: 'REF-2026-001',
  },
  {
    id: 't2',
    userId: '1',
    type: 'debit',
    amount: 3000,
    description: 'Private Tutorial Session',
    date: '2026-04-02',
    status: 'completed',
    reference: 'REF-2026-002',
  },
  {
    id: 't3',
    userId: '1',
    type: 'debit',
    amount: 2000,
    description: 'Cloud Storage Subscription',
    date: '2026-04-03',
    status: 'completed',
    reference: 'REF-2026-003',
  },
  {
    id: 't4',
    userId: '1',
    type: 'debit',
    amount: 200,
    description: 'Internet Access',
    date: '2026-04-04',
    status: 'completed',
    reference: 'REF-2026-004',
  },
];

// Mock Messages Database
export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: '2',
    senderName: 'Chukwudi Okafor (Staff)',
    receiverId: '1',
    subject: 'Your Booking Confirmation',
    content: 'Your internet access booking for April 5th has been confirmed. Please arrive 5 minutes early.',
    date: '2026-04-04T10:30:00',
    read: false,
    type: 'general',
  },
  {
    id: 'm2',
    senderId: '3',
    senderName: 'Madallah Support',
    receiverId: '1',
    subject: 'Welcome to Madallah ICT Hub',
    content: 'Thank you for registering with us. Explore our services and enjoy exclusive benefits!',
    date: '2026-04-01T09:00:00',
    read: true,
    type: 'general',
  },
];

// Mock Notifications Database
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    title: 'Booking Confirmed',
    message: 'Your internet access booking has been confirmed',
    type: 'success',
    date: '2026-04-04T10:30:00',
    read: false,
  },
  {
    id: 'n2',
    userId: '1',
    title: 'Low Wallet Balance',
    message: 'Your wallet balance is running low. Please top up.',
    type: 'warning',
    date: '2026-04-03T14:20:00',
    read: false,
  },
  {
    id: 'n3',
    userId: '1',
    title: 'New Course Available',
    message: 'Check out our new Web Development course!',
    type: 'info',
    date: '2026-04-02T11:00:00',
    read: true,
  },
];

// Mock Exam Registrations
export const mockExamRegistrations: ExamRegistration[] = [
  {
    id: 'e1',
    userId: '1',
    examType: 'JAMB',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
    examDate: '2026-05-15',
    venue: 'Federal University, Abuja',
    amount: 5000,
    status: 'registered',
    registrationDate: '2026-03-20',
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, JavaScript, and modern web development practices',
    instructor: 'Engr. Ibrahim Yusuf',
    duration: '12 weeks',
    price: 25000,
    enrolled: 45,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    level: 'beginner',
  },
  {
    id: 'c2',
    title: 'Digital Marketing Mastery',
    description: 'Master social media marketing, SEO, and content strategy',
    instructor: 'Mrs. Grace Adebayo',
    duration: '8 weeks',
    price: 20000,
    enrolled: 67,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    level: 'intermediate',
  },
  {
    id: 'c3',
    title: 'Graphic Design with Adobe Suite',
    description: 'Professional graphic design using Photoshop, Illustrator, and InDesign',
    instructor: 'Mr. Oluwaseun Balogun',
    duration: '10 weeks',
    price: 30000,
    enrolled: 34,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
    level: 'intermediate',
  },
  {
    id: 'c4',
    title: 'Python Programming',
    description: 'Learn Python from basics to advanced concepts',
    instructor: 'Dr. Ahmed Musa',
    duration: '16 weeks',
    price: 35000,
    enrolled: 89,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    level: 'beginner',
  },
];

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData[] = [
  { date: 'Mon', revenue: 45000, bookings: 23, newUsers: 5 },
  { date: 'Tue', revenue: 52000, bookings: 31, newUsers: 8 },
  { date: 'Wed', revenue: 48000, bookings: 27, newUsers: 6 },
  { date: 'Thu', revenue: 61000, bookings: 35, newUsers: 10 },
  { date: 'Fri', revenue: 73000, bookings: 42, newUsers: 12 },
  { date: 'Sat', revenue: 89000, bookings: 56, newUsers: 15 },
  { date: 'Sun', revenue: 67000, bookings: 38, newUsers: 9 },
];

// Authentication Helper
export function authenticateUser(email: string, password: string): User | null {
  // Simple mock authentication - in production, this would call a secure backend API
  const user = mockUsers.find(u => u.email === email);
  // For demo purposes, any password works
  return user || null;
}

// Get user-specific data helpers
export function getUserBookings(userId: string): Booking[] {
  return mockBookings.filter(b => b.userId === userId);
}

export function getUserTransactions(userId: string): Transaction[] {
  return mockTransactions.filter(t => t.userId === userId);
}

export function getUserMessages(userId: string): Message[] {
  return mockMessages.filter(m => m.receiverId === userId);
}

export function getUserNotifications(userId: string): Notification[] {
  return mockNotifications.filter(n => n.userId === userId);
}

export function getUserExamRegistrations(userId: string): ExamRegistration[] {
  return mockExamRegistrations.filter(e => e.userId === userId);
}

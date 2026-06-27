import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuth } from '@/hooks/useAuth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor to handle errors
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
                refreshToken,
              });
              localStorage.setItem('accessToken', data.accessToken);
              // Retry original request
              return this.instance.request(error.config!);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  get<T = any>(url: string, config = {}) {
    return this.instance.get<T>(url, config);
  }

  post<T = any>(url: string, data?: any, config = {}) {
    return this.instance.post<T>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config = {}) {
    return this.instance.put<T>(url, data, config);
  }

  delete<T = any>(url: string, config = {}) {
    return this.instance.delete<T>(url, config);
  }

  patch<T = any>(url: string, data?: any, config = {}) {
    return this.instance.patch<T>(url, data, config);
  }
}

export const api = new ApiService();

// Auth Service
export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: any) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh-token', { refreshToken }),
};

// User Service
export const userService = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data: any) => api.put('/users/me', data),
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Services (Cyber Cafe & Education)
export const servicesService = {
  getServices: (params?: any) => api.get('/services', { params }),
  getServiceById: (id: string) => api.get(`/services/${id}`),
  getAvailability: (id: string, date: string) =>
    api.get(`/services/${id}/availability`, { params: { date } }),
};

// Bookings
export const bookingService = {
  getBookings: (params?: any) => api.get('/bookings', { params }),
  getBookingById: (id: string) => api.get(`/bookings/${id}`),
  createBooking: (data: any) => api.post('/bookings', data),
  updateBooking: (id: string, data: any) => api.put(`/bookings/${id}`, data),
  cancelBooking: (id: string, reason?: string) =>
    api.delete(`/bookings/${id}`, { data: { reason } }),
};

// Wallet
export const walletService = {
  getWallet: () => api.get('/wallet'),
  getTransactions: (params?: any) => api.get('/wallet/transactions', { params }),
  addFunds: (data: any) => api.post('/wallet/recharge', data),
};

// Payments
export const paymentService = {
  processPayment: (data: any) => api.post('/payments', data),
  getPaymentHistory: (params?: any) => api.get('/payments', { params }),
  getPaymentById: (id: string) => api.get(`/payments/${id}`),
  requestRefund: (id: string, reason: string) =>
    api.post(`/payments/${id}/refund`, { reason }),
};

// Messages
export const messageService = {
  getMessages: (params?: any) => api.get('/messages', { params }),
  getMessageById: (id: string) => api.get(`/messages/${id}`),
  sendMessage: (data: any) => api.post('/messages', data),
  markAsRead: (id: string) => api.put(`/messages/${id}/read`, {}),
};

// Notifications
export const notificationService = {
  getNotifications: (params?: any) => api.get('/notifications', { params }),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`, {}),
  deleteNotification: (id: string) => api.delete(`/notifications/${id}`),
};

// Courses
export const courseService = {
  getCourses: (params?: any) => api.get('/courses', { params }),
  getCourseById: (id: string) => api.get(`/courses/${id}`),
  enrollCourse: (id: string) => api.post(`/courses/${id}/enroll`, {}),
  getEnrollments: (params?: any) => api.get('/courses/my-enrollments', { params }),
  rateCourse: (id: string, data: any) => api.post(`/courses/${id}/rate`, data),
};

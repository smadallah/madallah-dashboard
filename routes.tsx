import { createBrowserRouter, Navigate } from 'react-router';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import BookingsPage from './pages/BookingsPage';
import WalletPage from './pages/WalletPage';
import MessagesPage from './pages/MessagesPage';
import CoursesPage from './pages/CoursesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import DashboardLayout from './layouts/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout><DashboardPage /></DashboardLayout>,
  },
  {
    path: '/dashboard/services',
    element: <DashboardLayout><ServicesPage /></DashboardLayout>,
  },
  {
    path: '/dashboard/bookings',
    element: <DashboardLayout><BookingsPage /></DashboardLayout>,
  },
  {
    path: '/dashboard/wallet',
    element: <DashboardLayout><WalletPage /></DashboardLayout>,
  },
  {
    path: '/dashboard/messages',
    element: <DashboardLayout><MessagesPage /></DashboardLayout>,
  },
  {
    path: '/dashboard/courses',
    element: <DashboardLayout><CoursesPage /></DashboardLayout>,
  },
  {
    path: '/dashboard/analytics',
    element: <DashboardLayout><AnalyticsPage /></DashboardLayout>,
  },
  {
    path: '/dashboard/settings',
    element: <DashboardLayout><SettingsPage /></DashboardLayout>,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePermission } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';
import { DashboardStats } from '@/types';
import CustomerDashboard from '@/components/dashboards/CustomerDashboard';
import StaffDashboard from '@/components/dashboards/StaffDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const permission = usePermission();
  const { data: stats, loading } = useFetch<DashboardStats>('/dashboard/stats');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-1">Role: {user?.role}</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {permission.isCustomer() && <CustomerDashboard stats={stats} />}
        {permission.isStaff() && <StaffDashboard stats={stats} />}
        {permission.isAdmin() && <AdminDashboard stats={stats} />}
      </div>
    </div>
  );
};

export default DashboardPage;

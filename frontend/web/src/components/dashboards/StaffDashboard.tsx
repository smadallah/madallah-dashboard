import React from 'react';
import { DashboardStats } from '@/types';

interface StaffDashboardProps {
  stats?: DashboardStats;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ stats }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold">Staff Operations Dashboard</h2>
        <p className="text-gray-600 mt-2">Manage today's operations and bookings</p>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={stats?.totalBookings || 0} />
        <StatCard title="Active Bookings" value={stats?.activeBookings || 0} />
        <StatCard title="Pending Tasks" value={stats?.unreadMessages || 0} />
      </div>

      {/* Placeholder for more staff features */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">Customer Queue</h3>
        <p className="text-gray-600">Queue management coming soon...</p>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string | number }> = ({
  title,
  value,
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <p className="text-gray-600 text-sm">{title}</p>
    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
  </div>
);

export default StaffDashboard;

import React from 'react';
import { DashboardStats } from '@/types';

interface AdminDashboardProps {
  stats?: DashboardStats;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stats }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold">Admin Analytics Dashboard</h2>
        <p className="text-gray-600 mt-2">System-wide metrics and insights</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Bookings" value={stats?.totalBookings || 0} />
        <StatCard title="Active Users" value={"--"} />
        <StatCard title="Revenue" value={`₦${stats?.totalSpent || 0}`} />
        <StatCard title="System Health" value="100%" />
      </div>

      {/* Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Revenue Trends</h3>
          <p className="text-gray-600">Chart coming soon...</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">User Growth</h3>
          <p className="text-gray-600">Chart coming soon...</p>
        </div>
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

export default AdminDashboard;

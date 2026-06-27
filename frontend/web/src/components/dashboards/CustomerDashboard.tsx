import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardStats } from '@/types';
import { Button } from '@/components/ui/button';

interface CustomerDashboardProps {
  stats?: DashboardStats;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ stats }) => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Bookings" value={stats?.activeBookings || 0} />
        <StatCard title="Wallet Balance" value={`₦${stats?.walletBalance || 0}`} />
        <StatCard title="Total Spent" value={`₦${stats?.totalSpent || 0}`} />
        <StatCard title="Unread Messages" value={stats?.unreadMessages || 0} />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/services" className="block">
            <Button className="w-full">Browse Services</Button>
          </Link>
          <Link to="/bookings" className="block">
            <Button variant="secondary" className="w-full">My Bookings</Button>
          </Link>
          <Link to="/wallet" className="block">
            <Button variant="secondary" className="w-full">Add Funds</Button>
          </Link>
        </div>
      </div>

      {/* Upcoming Bookings */}
      {stats?.upcomingBookings && stats.upcomingBookings.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
          <div className="space-y-2">
            {stats.upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">{booking.bookingReference}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.startTime).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
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

export default CustomerDashboard;

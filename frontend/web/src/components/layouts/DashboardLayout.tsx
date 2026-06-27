import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { usePermission } from '@/hooks/useAuth';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const permission = usePermission();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    const commonItems = [
      { label: 'Dashboard', path: '/dashboard', icon: '📊' },
      { label: 'Profile', path: '/profile', icon: '👤' },
    ];

    const customerItems = [
      { label: 'Services', path: '/services', icon: '🛍️' },
      { label: 'Bookings', path: '/bookings', icon: '📅' },
      { label: 'Wallet', path: '/wallet', icon: '💰' },
      { label: 'Courses', path: '/courses', icon: '📚' },
      { label: 'Messages', path: '/messages', icon: '💬' },
    ];

    const staffItems = [
      { label: 'Operations', path: '/operations', icon: '⚙️' },
      { label: 'Bookings', path: '/staff/bookings', icon: '📋' },
      { label: 'Reports', path: '/staff/reports', icon: '📊' },
    ];

    const adminItems = [
      { label: 'Users', path: '/admin/users', icon: '👥' },
      { label: 'Analytics', path: '/admin/analytics', icon: '📈' },
      { label: 'Services', path: '/admin/services', icon: '⚙️' },
      { label: 'Settings', path: '/admin/settings', icon: '🔧' },
    ];

    let items = commonItems;
    if (permission.isCustomer()) items = [...items, ...customerItems];
    if (permission.isStaff()) items = [...items, ...staffItems];
    if (permission.isAdmin()) items = [...items, ...adminItems];

    return items;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="h-16 bg-blue-600 text-white flex items-center justify-between px-4">
          <h1 className="text-lg font-bold">Madallah</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {getMenuItems().map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 w-full border-t p-4 space-y-2">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <User size={20} />
            <span>Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-white shadow flex items-center justify-between px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.firstName}</p>
              <p className="text-xs text-gray-600">{user?.role}</p>
            </div>
            <img
              src={user?.avatar || 'https://via.placeholder.com/40'}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;

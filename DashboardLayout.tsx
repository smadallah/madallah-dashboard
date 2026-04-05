import React, { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Wallet,
  MessageSquare,
  GraduationCap,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  X,
  Building2,
} from 'lucide-react';
import { getUserNotifications } from '../lib/mockData';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const notifications = getUserNotifications(user.id);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['customer', 'staff', 'admin'] },
    { icon: Briefcase, label: 'Services', path: '/dashboard/services', roles: ['customer', 'staff', 'admin'] },
    { icon: Calendar, label: 'Bookings', path: '/dashboard/bookings', roles: ['customer', 'staff', 'admin'] },
    { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet', roles: ['customer'] },
    { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages', roles: ['customer', 'staff', 'admin'] },
    { icon: GraduationCap, label: 'Courses', path: '/dashboard/courses', roles: ['customer'] },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics', roles: ['staff', 'admin'] },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings', roles: ['customer', 'staff', 'admin'] },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(user.role));

  const NavLink = ({ item, mobile = false }: { item: typeof navItems[0], mobile?: boolean }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link
        to={item.path}
        onClick={mobile ? () => setSidebarOpen(false) : undefined}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Logo and Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-gray-900">Madallah ICT Hub</h1>
              </div>
            </Link>
          </div>

          {/* Right: Notifications and Profile */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate('/dashboard/messages')}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] sticky top-16">
          <nav className="p-4 space-y-2">
            {filteredNavItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </nav>

          {/* User Wallet Info (for customers) */}
          {user.role === 'customer' && (
            <div className="p-4 m-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Wallet Balance</p>
              <p className="text-2xl font-bold text-blue-600">
                ₦{user.walletBalance.toLocaleString()}
              </p>
              <Button
                size="sm"
                className="w-full mt-3"
                onClick={() => navigate('/dashboard/wallet')}
              >
                Top Up
              </Button>
            </div>
          )}
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
            <aside
              className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold">Menu</h2>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="p-4 space-y-2">
                {filteredNavItems.map((item) => (
                  <NavLink key={item.path} item={item} mobile />
                ))}
              </nav>

              {/* User Wallet Info (for customers) */}
              {user.role === 'customer' && (
                <div className="p-4 m-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Wallet Balance</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₦{user.walletBalance.toLocaleString()}
                  </p>
                  <Button
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => {
                      navigate('/dashboard/wallet');
                      setSidebarOpen(false);
                    }}
                  >
                    Top Up
                  </Button>
                </div>
              )}
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

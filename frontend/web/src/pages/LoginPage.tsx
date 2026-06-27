import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'customer' | 'staff' | 'admin') => {
    const credentials: Record<string, [string, string]> = {
      customer: ['customer@madallah.com', 'demo123'],
      staff: ['staff@madallah.com', 'demo123'],
      admin: ['admin@madallah.com', 'demo123'],
    };

    const [demoEmail, demoPassword] = credentials[role];
    try {
      setIsLoading(true);
      await login(demoEmail, demoPassword);
      navigate('/dashboard');
    } catch (err) {
      console.error('Demo login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Madallah ICT Hub</h1>
            <p className="text-gray-600 mt-2">Dashboard Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Error Message */}
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {authError}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 text-sm">
              Forgot password?
            </Link>
          </div>

          {/* Register Link */}
          <div className="border-t my-6"></div>
          <div className="text-center">
            <p className="text-gray-600 mb-4">Don't have an account?</p>
            <Link
              to="/register"
              className="inline-block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors text-center"
            >
              Create New Account
            </Link>
          </div>

          {/* Demo Accounts */}
          <div className="border-t my-6"></div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">Demo Accounts</p>
            <div className="space-y-2">
              <Button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2"
              >
                Demo: Customer
              </Button>
              <Button
                type="button"
                onClick={() => handleDemoLogin('staff')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2"
              >
                Demo: Staff
              </Button>
              <Button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2"
              >
                Demo: Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

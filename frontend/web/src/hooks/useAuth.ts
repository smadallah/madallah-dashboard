import { useContext } from 'react';
import { AuthContext as AuthContextType } from '@/types';
import { useAuth as useAuthContext } from '@/context/AuthContext';

/**
 * Hook to access authentication context
 * Provides user info and auth methods
 */
export const useAuth = () => {
  const context = useAuthContext();
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};

/**
 * Hook to check user permissions
 */
export const usePermission = () => {
  const { user } = useAuth();
  
  return {
    isCustomer: () => user?.role === 'customer',
    isStaff: () => user?.role === 'staff',
    isAdmin: () => user?.role === 'admin',
    hasPermission: (requiredRole: string | string[]) => {
      if (Array.isArray(requiredRole)) {
        return requiredRole.includes(user?.role || '');
      }
      return user?.role === requiredRole;
    },
  };
};

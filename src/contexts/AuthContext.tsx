import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { LoginCredentials, RegisterData, AuthResponse } from '../services/authService';
import { handleApiError } from '../services/api';

// Types
interface User {
  id: string | number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (type: string, credentials: LoginCredentials, params?: { groupName?: string; subGroup?: string }) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (
    type: string,
    credentials: LoginCredentials,
    params?: { groupName?: string; subGroup?: string }
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      let response: AuthResponse;

      switch (type) {
        case 'admin':
          response = await authService.adminLogin(credentials);
          break;
        case 'group-admin':
          if (!params?.groupName) throw new Error('Group name is required');
          response = await authService.groupAdminLogin(params.groupName, credentials);
          break;
        case 'god':
          if (!params?.groupName || !params?.subGroup) throw new Error('Group name and sub-group are required');
          response = await authService.godLogin(params.groupName, params.subGroup, credentials);
          break;
        case 'partner':
          response = await authService.partnerLogin(credentials);
          break;
        case 'reporter':
          response = await authService.reporterLogin(credentials);
          break;
        case 'client':
          if (!params?.groupName) throw new Error('Group name is required');
          response = await authService.clientLogin(params.groupName, credentials);
          break;
        default:
          throw new Error('Invalid login type');
      }

      setUser(response.data.user);
      
      // Redirect to dashboard if route is provided
      if (response.data.dashboardRoute) {
        window.location.href = response.data.dashboardRoute;
      }
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      setUser(response.data.user);
      
      // Redirect to dashboard if route is provided
      if (response.data.dashboardRoute) {
        window.location.href = response.data.dashboardRoute;
      }
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
      // Clear local state even if API call fails
      setUser(null);
      window.location.href = '/';
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;


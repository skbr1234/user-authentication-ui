import { useState, useEffect, createContext, useContext } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types/auth.types';
import { authApi } from '@/services/authApi';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        // TODO: Validate token and get user info from API
        // For now, we'll need to store user data in localStorage too
        const userData = localStorage.getItem('user_data');
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (e) {
            console.error('Failed to parse user data from localStorage', e);
            localStorage.removeItem('user_data');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
          }
        }
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data: LoginRequest) => {
    setLoading(true);
    try {
      const response = await authApi.login(data);
      setUser(response.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('refresh_token', response.refreshToken);
        localStorage.setItem('user_data', JSON.stringify(response.user));
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    try {
      const response = await authApi.register(data);
      setUser(response.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('refresh_token', response.refreshToken);
        localStorage.setItem('user_data', JSON.stringify(response.user));
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};

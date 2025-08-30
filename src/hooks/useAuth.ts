import { useState, useEffect, createContext, useContext } from 'react';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth.types';
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
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Validate token and get user info
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
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
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
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
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
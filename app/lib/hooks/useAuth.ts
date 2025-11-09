import { useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import { authHelpers } from '../utils/auth';
import type { UserData } from '../types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = authHelpers.getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await authApi.me();
      const userData = response.datas;
      
      setUser(userData);
      setIsAuthenticated(true);
      authHelpers.setUserData(userData);
    } catch (error) {
      console.error('Auth check failed:', error);
      authHelpers.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const { token } = response.datas;

      // Save token
      authHelpers.setToken(token);

      // Get user data
      const meResponse = await authApi.me();
      const userData = meResponse.datas;

      setUser(userData);
      setIsAuthenticated(true);
      authHelpers.setUserData(userData);

      // Redirect based on role
      if (userData.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }

      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Login failed:', error);
      return {
        success: false,
        error: error.response?.data?.massage || 'Login gagal',
      };
    }
  };

  const logout = () => {
    authHelpers.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    loading,
    isAuthenticated,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    refreshUser: checkAuth,
  };
};
import { TOKEN_KEY, USER_KEY } from '../constants';
import type { UserData } from '../types/auth';

export const authHelpers = {
  // Save token to localStorage
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  // Remove token
  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  // Save user data
  setUserData: (user: UserData): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  // Get user data
  getUserData: (): UserData | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  // Remove user data
  removeUserData: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_KEY);
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!authHelpers.getToken();
  },

  // Check if user is admin
  isAdmin: (): boolean => {
    const user = authHelpers.getUserData();
    return user?.role === 'admin';
  },

  // Logout
  logout: (): void => {
    authHelpers.removeToken();
    authHelpers.removeUserData();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  },
};
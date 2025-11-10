import Cookies from 'js-cookie';
import { TOKEN_KEY, USER_KEY } from '../constants';
import type { UserData } from '../types/auth';

export const authHelpers = {
  // Token management
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 hari
  },

  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY) || Cookies.get(TOKEN_KEY) || null;
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    Cookies.remove(TOKEN_KEY);
  },

  // User data management
  setUserData: (userData: UserData) => {
    const userString = JSON.stringify(userData);
    localStorage.setItem(USER_KEY, userString);
    Cookies.set(USER_KEY, userString, { expires: 7 }); // 7 hari
  },

  getUserData: (): UserData | null => {
    if (typeof window === 'undefined') return null;
    
    const userString = localStorage.getItem(USER_KEY) || Cookies.get(USER_KEY);
    if (!userString) return null;

    try {
      return JSON.parse(userString);
    } catch {
      return null;
    }
  },

  removeUserData: () => {
    localStorage.removeItem(USER_KEY);
    Cookies.remove(USER_KEY);
  },

  // Logout - clear everything
  logout: () => {
    authHelpers.removeToken();
    authHelpers.removeUserData();
  },

  // Check if user is admin
  isAdmin: (): boolean => {
    const userData = authHelpers.getUserData();
    return userData?.role === 'admin';
  },
};
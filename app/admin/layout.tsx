"use client";

import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from "../components/Sidebar";
import { useAuth } from '../lib/hooks/useAuth';
import type { UserData } from '../lib/types/auth';

// Create context untuk share user data ke Sidebar
interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AdminLayout');
  }
  return context;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, isAuthenticated, isAdmin, logout } = useAuth();

  // Cek auth saat pertama kali load
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // Redirect jika tidak authenticated atau bukan admin
  if (!isAuthenticated || !isAdmin) {
    if (!isAuthenticated) {
      router.push('/');
    } else {
      router.push('/');
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Mengalihkan...</p>
        </div>
      </div>
    );
  }

  // Provide auth data ke children (termasuk Sidebar)
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 ml-64 p-5">
          {children}
        </main>
      </div>
    </AuthContext.Provider>
  );
}
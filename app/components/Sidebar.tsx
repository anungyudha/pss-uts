"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Bed, LogOut, ExternalLink, User, Tv } from 'lucide-react';
import { useAuthContext } from '../admin/layout'; // Sesuaikan path

const navItems = [
  { href: '/admin', icon: Home, label: 'Dashboard' },
  { href: '/admin/kost', icon: Bed, label: 'Kamar' },
  { href: '/admin/fasilitas', icon: Tv, label: 'Fasilitas' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white shadow-xl fixed top-0 left-0 z-20">
      {/* Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold text-indigo-400">KOST ADMIN</h1>
      </div>

      {/* User Info Section */}
      <div className="px-4 py-4 border-b border-gray-700">
        {user ? (
          <div className="flex items-center space-x-3">
            {user.image_url ? (
              <img
                src={user.image_url}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium truncate">
                  {user.username}
                </p>
                {user.role && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-indigo-600 rounded-full flex-shrink-0">
                    {user.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-400">
            Tidak ada data user
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
              ${isActive ? "bg-gray-700 text-indigo-400" : "hover:bg-gray-700 hover:text-indigo-400"}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-gray-700">
        {/* Link to Main Site */}
        <Link
          href="/"
          className="flex items-center px-6 py-3 text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
        >
          <ExternalLink className="w-5 h-5 mr-3" />
          <span>Ke Halaman Utama</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-3 text-sm font-medium text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>

        {/* Footer */}
        <div className="p-4">
          <p className="text-xs text-gray-500 text-center">
            © 2025 Kost Management
          </p>
        </div>
      </div>
    </div>
  );
}
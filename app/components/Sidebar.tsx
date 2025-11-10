"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, Bed, User } from 'lucide-react';

const navItems = [
  { href: '/admin', icon: Home, label: 'Fasilitas' },
  { href: '/kost', icon: Bed, label: 'Kamar' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-white shadow-xl fixed top-0 left-0 z-20">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold text-indigo-400">KOST ADMIN</h1>
      </div>

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

      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          © 2025 Kost Management
        </p>
      </div>
    </div>
  );
}

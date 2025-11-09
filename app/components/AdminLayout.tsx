import { Sidebar } from './Sidebar';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="ml-64 flex-1 overflow-x-hidden overflow-y-auto">
          <main className="p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

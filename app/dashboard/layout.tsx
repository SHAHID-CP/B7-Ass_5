'use client';

import { useEffect, useState } from 'react';
import Sidebar from './_components/Sidebar';
import { useUserStore } from '@/store/useUserStore';
import { Menu } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm lg:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-700 hover:bg-gray-100 rounded-lg transition"
              aria-label="Open Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-semibold text-gray-800">RentalApp</span>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
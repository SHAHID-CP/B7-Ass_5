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
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative transition-colors duration-200">
      {/* Floating Menu Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-15 sm:top-20 right-8 z-30 lg:hidden p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 cursor-pointer"
        aria-label="Open Sidebar"
      >
        <Menu className="w-3 h-3" />
      </button>

      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
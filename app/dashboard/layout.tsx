'use client';

import { useState } from 'react';
import Sidebar, { UserRole } from './_components/Sidebar';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Demo Context/State (Real app a AuthProvider context implementation use korben)
  const [currentRole, setCurrentRole] = useState<UserRole>('TENANT');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={currentRole} userName="Demo User" />
      
      <main className="flex-1 overflow-y-auto">
        {/* Dynamic Role Switcher Bar (For testing purposes) */}
        <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between text-xs">
          <span className="text-gray-500">Switch role view for testing:</span>
          <div className="flex gap-2">
            {(['TENANT', 'LANDLORD', 'ADMIN'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setCurrentRole(r)}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  currentRole === r
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
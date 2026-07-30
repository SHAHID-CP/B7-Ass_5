'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Building, 
  PlusCircle, 
  Shield, 
  LogOut,
  Inbox,
  Layers ,
  Building2,
  FileText
} from 'lucide-react';

export type UserRole = 'TENANT' | 'LANDLORD' | 'ADMIN';

interface SidebarProps {
  role: UserRole;
  userName?: string;
}

const navItemsByRole = {
  TENANT: [
    { label: 'My Rentals & Payments', href: '/dashboard/tenant', icon: Home },
  ],
  LANDLORD: [
    { label: 'My Properties', href: '/dashboard/landlord', icon: Building },
    { label: 'Add Property', href: '/dashboard/landlord/properties/new', icon: PlusCircle },
    { label: 'Manage Requests', href: '/dashboard/landlord/requests', icon: Inbox },
  ],
  ADMIN: [
    { label: 'User Management', href: '/dashboard/admin', icon: Shield },
    { label: 'Manage Categories', href: '/dashboard/admin/categories', icon: Layers },
    { label: 'All Properties', href: '/dashboard/admin/properties', icon: Building2 },
    { label: 'All Rentals', href: '/dashboard/admin/rentals', icon: FileText },
  ],
};

export default function Sidebar({ role, userName = 'User' }: SidebarProps) {
  const pathname = usePathname();
  const items = navItemsByRole[role] || [];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between min-h-screen">
      <div>
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <Building className="w-6 h-6 text-blue-400" />
          <span className="font-bold text-lg text-white">RentalApp</span>
        </div>

        <nav className="p-4 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">{userName}</p>
            <span className="text-[10px] bg-slate-800 text-blue-400 px-2 py-0.5 rounded font-mono uppercase">
              {role}
            </span>
          </div>
          <button 
            onClick={() => alert('Logging out...')} 
            className="text-slate-400 hover:text-red-400 p-1 rounded transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
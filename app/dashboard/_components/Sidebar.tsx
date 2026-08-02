'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  Building, 
  PlusCircle, 
  Shield, 
  LogOut,
  Inbox,
  Layers,
  Building2,
  FileText,
  X
} from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';
import { logout } from '@/service/logout';
import { toast } from 'sonner';

const navItemsByRole: Record<string, Array<{ label: string; href: string; icon: any }>> = {
  TENANT: [
    { label: 'My Rentals & Payments', href: '/dashboard/tenant', icon: Home },
  ],
  LANDLORD: [
    { label: 'Overview', href: '/dashboard/landlord/overview', icon: Home },
    { label: 'My Properties', href: '/dashboard/landlord', icon: Building },
    { label: 'Add Property', href: '/dashboard/landlord/properties/new', icon: PlusCircle },
    { label: 'Manage Requests', href: '/dashboard/landlord/requests', icon: Inbox },
  ],
  ADMIN: [
    { label: 'Dashboard', href: '/dashboard/admin', icon: Shield },
    { label: 'Manage Categories', href: '/dashboard/admin/categories', icon: Layers },
    { label: 'All Properties', href: '/dashboard/admin/properties', icon: Building2 },
    { label: 'All Rentals', href: '/dashboard/admin/rentals', icon: FileText },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const { user, clearUser } = useUserStore();
  const pathname = usePathname();
  const items = (user?.role && navItemsByRole[user.role]) || [];

  const handleLogout = async () => {
    clearUser();
    await logout();
    toast.success("User Logout Successfully")
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 top-16 z-30 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar Component */}
      <aside
        className={`fixed lg:static top-16 lg:top-0 left-0 z-40 h-[calc(100vh-4rem)] lg:h-screen w-64 bg-slate-900 text-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-800 shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header Area */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <Building className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-lg text-white">RentalApp</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition lg:hidden"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
              <span className="text-[10px] bg-slate-800 text-blue-400 px-2 py-0.5 rounded font-mono uppercase">
                {user?.role || 'GUEST'}
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="text-slate-400 cursor-pointer hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
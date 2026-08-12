'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  PlusCircle, 
  Shield, 
  LogOut,
  Inbox,
  Layers,
  Building2,
  FileText,
  X,
  Settings
} from 'lucide-react';
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { useUserStore } from '@/store/useUserStore';
import { logout } from '@/service/logout';
import { toast } from 'sonner';

const navItemsByRole: Record<string, Array<{ label: string; href: string; icon: any }>> = {
  TENANT: [
    { label: 'Analytics', href: '/dashboard/tenant/analytic', icon: IoAnalyticsOutline },
    { label: 'My Rentals', href: '/dashboard/tenant', icon: Home },
    { label: 'My Payments', href: '/dashboard/tenant/paymenthistory', icon: MdPayment },
    { label: 'Settings', href: '/dashboard/profile', icon: Settings },
  ],
  LANDLORD: [
    { label: 'Overview', href: '/dashboard/landlord', icon: Home },
    { label: 'Analytics', href: '/dashboard/landlord/analytic', icon: IoAnalyticsOutline },
    { label: 'Add Property', href: '/dashboard/landlord/properties/new', icon: PlusCircle },
    { label: 'Manage Requests', href: '/dashboard/landlord/requests', icon: Inbox },
    { label: 'Settings', href: '/dashboard/profile', icon: Settings },
  ],
  ADMIN: [
    { label: 'Dashboard', href: '/dashboard/admin', icon: Shield },
    { label: 'Analytics', href: '/dashboard/admin/analytic', icon: IoAnalyticsOutline },
    { label: 'Manage Categories', href: '/dashboard/admin/categories', icon: Layers },
    { label: 'All Properties', href: '/dashboard/admin/properties', icon: Building2 },
    { label: 'All Rentals', href: '/dashboard/admin/rentals', icon: FileText },
    { label: 'Settings', href: '/dashboard/profile', icon: Settings },
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
    toast.success("Logged out successfully");
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar Drawer */}
      <aside
        className={`fixed lg:static top-12 lg:top-16 left-0 z-40 h-screen not-lg:h-11/12 w-64 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header Area */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {/* RentNest Logo Section */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-xs">
                <Home className="w-4 h-4" />
              </div>
              <span className=" not-lg:hidden font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                Rent<span className="text-emerald-600 dark:text-emerald-400">Nest</span>
              </span>
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 rounded-xl transition lg:hidden cursor-pointer"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3.5 space-y-1">
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 truncate">
              {/* User Avatar Circle */}
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name || 'User'}</p>
                <span className="inline-block text-[10px] bg-slate-200 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-md border border-slate-300 dark:border-slate-700/60 uppercase tracking-wider">
                  {user?.role || 'GUEST'}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border hover:border-rose-200 dark:hover:border-rose-900/40 transition shrink-0 cursor-pointer active:scale-95"
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
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
  Home, 
  LayoutDashboard, 
  LogOut, 
  User, 
  Menu, 
  X, 
  ChevronDown 
} from "lucide-react";
import { logout } from "@/service/logout";
import { toast } from "sonner";
import { ModeToggle } from "./ModeToggle";

interface NavbarProps {
  user?: {
    success: boolean;
    data?: {
        name: string;
        email: string;
        role: "ADMIN" | "LANDLORD" | "TENANT" | string;
    };
  };
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "/support" },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Role based Dashboard redirect logic
  const handleDashboardRedirect = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);

    const role = user?.data?.role;

    if (role === "ADMIN") {
      router.push("/dashboard/admin");
    } else if (role === "LANDLORD") {
      router.push("/dashboard/landlord");
    } else {
      router.push("/dashboard/tenant");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);

    await logout();
    toast.success("User Logout Successfully");
    router.push("/auth/login");
    router.refresh();
  };

  const isLoggedIn = user?.success && user?.data;

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 font-bold text-lg sm:text-xl text-emerald-600 dark:text-emerald-400 shrink-0">
            <Home className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400" />
            <span className="text-slate-900 dark:text-slate-100 font-extrabold">Rent<span className="text-emerald-600 dark:text-emerald-400">Nest</span></span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 font-medium text-sm transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side Menu */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <ModeToggle />
            {isLoggedIn ? (
              /* Custom Dropdown Container */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="cursor-pointer flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none ring-offset-2 focus:ring-2 focus:ring-emerald-500"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-xs sm:text-sm shrink-0">
                    {user.data?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu Card */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 sm:w-60 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Info Header */}
                    <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                        {user.data?.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {user.data?.email}
                      </p>
                      <span className="inline-block mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] font-semibold tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 px-2 py-0.5 rounded-md uppercase">
                        {user.data?.role}
                      </span>
                    </div>

                    {/* Menu Links */}
                    <div className="py-1">
                      <button
                        onClick={handleDashboardRedirect}
                        className="cursor-pointer w-full flex items-center gap-2.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition text-left"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                        <span>Dashboard</span>
                      </button>

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
                      >
                        <User className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                        <span>Profile</span>
                      </Link>
                    </div>

                    {/* Logout Section */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full flex items-center gap-2.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition text-left font-medium"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons */
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Link
                  href="/auth/login"
                  className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition px-2 py-1"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-xs sm:text-sm font-medium bg-emerald-600 dark:bg-emerald-500 text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative z-50 md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 sm:px-4 pt-2.5 pb-5 space-y-3 shadow-xl">
            {/* Nav Links */}
            <div className="flex flex-col space-y-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-2.5">
              {isLoggedIn ? (
                <div className="space-y-2.5">
                  {/* User Badge */}
                  <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-xs shrink-0">
                      {user.data?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                        {user.data?.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.data?.email}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-0.5">
                    <button
                      onClick={handleDashboardRedirect}
                      className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition text-left"
                    >
                      <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Dashboard ({user.data?.role})</span>
                    </button>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition"
                    >
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-400 shrink-0" />
                      <span>Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition text-left"
                    >
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
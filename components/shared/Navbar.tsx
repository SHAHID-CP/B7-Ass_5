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
    router.push("/auth/login");
    router.refresh();
  };

  const isLoggedIn = user?.success && user?.data;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 font-bold text-lg sm:text-xl text-blue-600 shrink-0">
            <Home className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>RentNest</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side Menu */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {isLoggedIn ? (
              /* Custom Dropdown Container */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-100 transition focus:outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs sm:text-sm shrink-0">
                    {user.data?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu Card */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 sm:w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Info Header */}
                    <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-gray-100">
                      <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                        {user.data?.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-500 truncate mt-0.5">
                        {user.data?.email}
                      </p>
                      <span className="inline-block mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] font-semibold tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md uppercase">
                        {user.data?.role}
                      </span>
                    </div>

                    {/* Menu Links */}
                    <div className="py-1">
                      <button
                        onClick={handleDashboardRedirect}
                        className="w-full flex items-center gap-2.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition text-left"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-500 shrink-0" />
                        <span>Dashboard</span>
                      </button>

                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        <User className="w-4 h-4 text-gray-500 shrink-0" />
                        <span>Profile</span>
                      </Link>
                    </div>

                    {/* Logout Section */}
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition text-left font-medium"
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
                  className="text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 transition px-2 py-1"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-xs sm:text-sm font-medium bg-blue-600 text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition"
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
            className="fixed inset-0 bg-black/25 z-40 md:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative z-50 md:hidden border-t border-gray-100 bg-white px-3.5 sm:px-4 pt-2.5 pb-5 space-y-3 shadow-xl">
            {/* Nav Links */}
            <div className="flex flex-col space-y-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-2.5">
              {isLoggedIn ? (
                <div className="space-y-2.5">
                  {/* User Badge */}
                  <div className="flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-lg">
                    <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                      {user.data?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                        {user.data?.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-500 truncate">
                        {user.data?.email}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-0.5">
                    <button
                      onClick={handleDashboardRedirect}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition text-left"
                    >
                      <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                      <span>Dashboard ({user.data?.role})</span>
                    </button>

                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
                    >
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 shrink-0" />
                      <span>Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition text-left"
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
                    className="w-full text-center px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
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
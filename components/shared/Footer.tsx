"use client";

import Link from "next/link";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 dark:bg-slate-900 text-emerald-100 dark:text-slate-300 border-t border-emerald-950 dark:border-slate-800/80 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-md shadow-emerald-950/50">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Rent<span className="text-emerald-400">Nest</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-emerald-200/80 dark:text-slate-400 leading-relaxed max-w-sm">
              Simplifying rental requests, property management, and finding your ideal home across Bangladesh with trust and transparency.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-800 hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-600 text-emerald-200 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-800 hover:bg-emerald-500 dark:bg-slate-800 dark:hover:bg-emerald-500 text-emerald-200 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-800 hover:bg-pink-600 dark:bg-slate-800 dark:hover:bg-pink-600 text-emerald-200 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-800 hover:bg-emerald-700 dark:bg-slate-800 dark:hover:bg-emerald-700 text-emerald-200 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white dark:text-slate-100 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/properties" className="text-emerald-200/80 hover:text-emerald-400 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-emerald-200/80 hover:text-emerald-400 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-emerald-200/80 hover:text-emerald-400 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-emerald-200/80 hover:text-emerald-400 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Users */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white dark:text-slate-100 tracking-wider uppercase">
              For Users
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/auth/login" className="text-emerald-200/80 hover:text-emerald-400 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-emerald-200/80 hover:text-emerald-400 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white dark:text-slate-100 tracking-wider uppercase">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-200/80 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 dark:text-emerald-500 shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 dark:text-emerald-500 shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-emerald-400 transition-colors">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 dark:text-emerald-500 shrink-0" />
                <a href="mailto:support@rentnest.com" className="hover:text-emerald-400 transition-colors">
                  support@rentnest.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-emerald-950 dark:border-slate-800 bg-emerald-950 dark:bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-emerald-300/60 dark:text-slate-500">
          <p>© {new Date().getFullYear()} RentNest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white dark:hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
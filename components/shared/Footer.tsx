"use client";

import Link from "next/link";
import {
  Building2,
  Mail,
  Phone,
  MapPin,

} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 ">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-xl text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Rent<span className="text-blue-500">Nest</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Simplifying rental requests, property management, and finding your ideal home across Bangladesh with trust and transparency.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-lg transition"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-blue-400 text-gray-400 hover:text-white rounded-lg transition"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-pink-600 text-gray-400 hover:text-white rounded-lg transition"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-blue-700 text-gray-400 hover:text-white rounded-lg transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>

           <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">
              For Users
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/auth/login" className="text-gray-400 hover:text-white transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-400 hover:text-white transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>


          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400 ">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-white transition">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:support@rentnest.com" className="hover:text-white transition">
                  support@rentnest.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-800 bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} RentNest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-400 transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-400 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
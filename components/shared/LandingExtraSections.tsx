'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  BadgeDollarSign,
  Zap,
  Search,
  Calendar,
  Home,
  PlusCircle,
  CheckCircle2,
  Building,
  Smile,
  MapPin,
  Star,
  ArrowRight,
  UserCheck,
  Headphones,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

export default function LandingExtraSections() {
  const [activeTab, setActiveTab] = useState<'tenant' | 'landlord'>('tenant');

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200/60">
            <Zap className="w-3.5 h-3.5" />
            <span>Why RentNest?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Designed for Modern Renting
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Everything you need for a smooth, secure, and hassle-free rental experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Verified Listings</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Every property is manually checked and verified to prevent scam and fake ads.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Direct Contact</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Connect directly with verified landlords without paying middleman brokerage fees.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
              <BadgeDollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Zero Hidden Fees</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              100% transparent pricing. Know exactly what you pay for rent and deposit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Instant Requests</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Book viewing slots and send rental requests directly from your personal dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              How RentNest Works
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Get started in just 3 easy steps whether you are renting or listing a property.
            </p>

            {/* Toggle Switch */}
            <div className="inline-flex bg-gray-200/80 p-1 rounded-xl mt-4">
              <button
                onClick={() => setActiveTab('tenant')}
                className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  activeTab === 'tenant'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Tenants
              </button>
              <button
                onClick={() => setActiveTab('landlord')}
                className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  activeTab === 'landlord'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Landlords
              </button>
            </div>
          </div>

          {/* Steps for Tenants */}
          {activeTab === 'tenant' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-gray-300 bg-gray-100 px-2 py-1 rounded-md">01</span>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Search Property</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Filter apartments by city, price range, categories, and amenities easily.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-gray-300 bg-gray-100 px-2 py-1 rounded-md">02</span>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Schedule Viewing</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Send a viewing request directly to the landlord and get schedule confirmation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-gray-300 bg-gray-100 px-2 py-1 rounded-md">03</span>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Move In Happy</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Finalize the agreement online, complete payments, and move into your new home.
                </p>
              </div>
            </div>
          )}

          {/* Steps for Landlords */}
          {activeTab === 'landlord' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-gray-300 bg-gray-100 px-2 py-1 rounded-md">01</span>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Post Property</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Add photos, rent amount, and details of your property from your dashboard.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-gray-300 bg-gray-100 px-2 py-1 rounded-md">02</span>
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Get Verified</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Our team quickly verifies ownership details to badge your listing as verified.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-gray-300 bg-gray-100 px-2 py-1 rounded-md">03</span>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Connect & Rent</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Receive rental requests from verified tenants and choose the best tenant for your house.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

  <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200/60">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Our Impact</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            RentNest by the Numbers
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Empowering thousands of tenants and house owners across the nation with trust.
          </p>
        </div>

        {/* Stats Container */}
        <div className="bg-blue-600 text-white rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-blue-500/50">
            <div className="space-y-1 pt-4 md:pt-0">
              <Building className="w-6 h-6 mx-auto opacity-80 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">1,200+</p>
              <p className="text-xs text-blue-100 font-medium">Active Properties</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <Smile className="w-6 h-6 mx-auto opacity-80 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">5,000+</p>
              <p className="text-xs text-blue-100 font-medium">Happy Tenants</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <ShieldCheck className="w-6 h-6 mx-auto opacity-80 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">450+</p>
              <p className="text-xs text-blue-100 font-medium">Verified Owners</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <MapPin className="w-6 h-6 mx-auto opacity-80 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">12+</p>
              <p className="text-xs text-blue-100 font-medium">Cities Covered</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <TrendingUp className="w-6 h-6 mx-auto opacity-80 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">99.8%</p>
              <p className="text-xs text-blue-100 font-medium">Satisfaction Rate</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <Headphones className="w-6 h-6 mx-auto opacity-80 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">24/7</p>
              <p className="text-xs text-blue-100 font-medium">Fast Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200/60">
            <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Real experiences from tenants and landlords using RentNest every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                "RentNest made finding my 2-bedroom apartment in Gulshan super smooth! I directly contacted the owner and moved in within 3 days without any broker fee."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">
                AH
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">Anisur Rahman</p>
                <p className="text-[11px] text-gray-500">Tenant • Dhaka</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                "As a landlord, managing rental requests used to be painful. With RentNest's dashboard, I verified my property and got reliable tenants in no time!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center text-xs">
                TK
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">Tanvir Chowdhury</p>
                <p className="text-[11px] text-gray-500">Landlord • Chattogram</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                "I was searching for a single bachelor room near my university. The filter options and verified badges helped me find a safe place within my budget."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center text-xs">
                SN
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">Sadiya Nusrat</p>
                <p className="text-[11px] text-gray-500">Student Tenant • Sylhet</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          {/* Subtle Glow Effect */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-blue-600/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-600/30 rounded-full blur-3xl" />

          <div className="relative space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Find Your Next Home or List Your Property?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Join thousands of happy tenants and landlords on Bangladesh's smartest house rental platform today.
            </p>
          </div>

          <div className="relative pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/properties"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md"
            >
              <span>Explore All Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/auth/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition border border-white/10"
            >
              <span>Register as Landlord</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
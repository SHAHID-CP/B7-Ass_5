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
      {/* 1. WHY RENTNEST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
            <Zap className="w-3.5 h-3.5" />
            <span>Why RentNest?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Designed for Modern Renting
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Everything you need for a smooth, secure, and hassle-free rental experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition space-y-3">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Verified Listings</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Every property is manually checked and verified to prevent scams and fake ads.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition space-y-3">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 rounded-xl w-fit">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Direct Contact</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Connect directly with verified landlords without paying middleman brokerage fees.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition space-y-3">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 rounded-xl w-fit">
              <BadgeDollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Zero Hidden Fees</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              100% transparent pricing. Know exactly what you pay for rent and security deposit.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition space-y-3">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-xl w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Instant Requests</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Book viewing slots and send rental requests directly from your personal dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="bg-slate-100/70 dark:bg-slate-900/50 py-12 sm:py-16 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              How RentNest Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Get started in just 3 easy steps whether you are renting or listing a property.
            </p>

            {/* Toggle Switch */}
            <div className="inline-flex bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl mt-4">
              <button
                onClick={() => setActiveTab('tenant')}
                className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  activeTab === 'tenant'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                For Tenants
              </button>
              <button
                onClick={() => setActiveTab('landlord')}
                className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  activeTab === 'landlord'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                For Landlords
              </button>
            </div>
          </div>

          {/* Steps for Tenants */}
          {activeTab === 'tenant' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">01</span>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Search Property</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Filter apartments by city, price range, categories, and amenities easily.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">02</span>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Schedule Viewing</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Send a viewing request directly to the landlord and get schedule confirmation.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">03</span>
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mx-auto">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Move In Happy</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Finalize the agreement online, complete payments, and move into your new home.
                </p>
              </div>
            </div>
          )}

          {/* Steps for Landlords */}
          {activeTab === 'landlord' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">01</span>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Post Property</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Add photos, rent amount, and details of your property from your dashboard.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">02</span>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Get Verified</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Our team quickly verifies ownership details to badge your listing as verified.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">03</span>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Connect & Rent</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Receive rental requests from verified tenants and choose the best tenant for your house.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. IMPACT / STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Our Impact</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            RentNest by the Numbers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Empowering thousands of tenants and house owners across the nation with trust.
          </p>
        </div>

        {/* Stats Container */}
        <div className="bg-emerald-700 dark:bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg border border-emerald-600/30">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-600/50">
            <div className="space-y-1 pt-4 md:pt-0">
              <Building className="w-6 h-6 mx-auto opacity-85 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">1,200+</p>
              <p className="text-xs text-emerald-100 font-medium">Active Properties</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <Smile className="w-6 h-6 mx-auto opacity-85 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">5,000+</p>
              <p className="text-xs text-emerald-100 font-medium">Happy Tenants</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <ShieldCheck className="w-6 h-6 mx-auto opacity-85 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">450+</p>
              <p className="text-xs text-emerald-100 font-medium">Verified Owners</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <MapPin className="w-6 h-6 mx-auto opacity-85 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">12+</p>
              <p className="text-xs text-emerald-100 font-medium">Cities Covered</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <TrendingUp className="w-6 h-6 mx-auto opacity-85 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">99.8%</p>
              <p className="text-xs text-emerald-100 font-medium">Satisfaction Rate</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <Headphones className="w-6 h-6 mx-auto opacity-85 mb-2" />
              <p className="text-2xl sm:text-3xl font-black">24/7</p>
              <p className="text-xs text-emerald-100 font-medium">Fast Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
            <Star className="w-3.5 h-3.5" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real experiences from tenants and landlords using RentNest every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "RentNest made finding my 2-bedroom apartment in Gulshan super smooth! I directly contacted the owner and moved in within 3 days without any broker fee."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs">
                AH
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">Anisur Rahman</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Tenant • Dhaka</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "As a landlord, managing rental requests used to be painful. With RentNest's dashboard, I verified my property and got reliable tenants in no time!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-xs">
                TK
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">Tanvir Chowdhury</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Landlord • Chattogram</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "I was searching for a single bachelor room near my university. The filter options and verified badges helped me find a safe place within my budget."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center text-xs">
                SN
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">Sadiya Nusrat</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Student Tenant • Sylhet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION (CTA) BANNER */}
{/* 5. CALL TO ACTION (CTA) BANNER */}
<section className="max-w-7xl mx-auto px-4 sm:px-6">
  <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl border border-emerald-700/40 dark:border-emerald-800/40">
    {/* Rich Emerald Glow Effects */}
    <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-400/15 dark:bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

    <div className="relative space-y-3 max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
        Ready to Find Your Next Home or List Your Property?
      </h2>
      <p className="text-xs sm:text-sm text-emerald-100/90 dark:text-slate-300 leading-relaxed font-normal">
        Join thousands of happy tenants and landlords on Bangladesh's smartest house rental platform today.
      </p>
    </div>

    <div className="relative pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
      <Link
        href="/properties"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-emerald-950 hover:bg-emerald-50 font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-950/20 hover:scale-[1.02]"
      >
        <span>Explore All Properties</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

      <Link
        href="/auth/register"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-950/40 hover:bg-emerald-950/60 dark:bg-white/10 dark:hover:bg-white/15 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all duration-200 border border-emerald-400/30 dark:border-white/15 backdrop-blur-xs hover:scale-[1.02]"
      >
        <span>Register as Landlord</span>
      </Link>
    </div>
  </div>
</section>
    </div>
  );
}
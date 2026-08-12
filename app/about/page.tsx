'use client';

import { Building2, ShieldCheck, Users, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: 'Properties Listed', value: '1,200+' },
    { label: 'Happy Tenants', value: '5,000+' },
    { label: 'Verified Landlords', value: '450+' },
    { label: 'Cities Covered', value: '12+' },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Verified Listings',
      description: 'Every property is manually checked and verified to ensure high security and reliability.',
    },
    {
      icon: Users,
      title: 'Direct Communication',
      description: 'Easily connect tenants directly with landlords without any unnecessary third-party hassle.',
    },
    {
      icon: Award,
      title: 'Seamless Management',
      description: 'Manage rental requests, payments, and property details all from a unified dashboard.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16 transition-colors">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
          <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>About Our Platform</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Simplifying Rental Solutions for Everyone
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          We are on a mission to revolutionize property renting. Whether you are searching for your dream home or listing properties as a landlord, our platform ensures a smooth, transparent, and trustworthy experience.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-1 hover:border-emerald-500/30 transition duration-300"
          >
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">{stat.value}</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">Why Choose Us?</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Built with modern tech to deliver the best rental experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3 hover:shadow-md dark:hover:border-slate-700 transition duration-300"
              >
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit border border-emerald-100 dark:border-emerald-900/50">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-slate-900 dark:bg-slate-900/90 border border-slate-800 text-white rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-xl">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-100">Ready to find your next place?</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Explore hundreds of verified properties or register as a landlord to start listing today.
        </p>
        <div className="pt-2">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
          >
            <span>Browse Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
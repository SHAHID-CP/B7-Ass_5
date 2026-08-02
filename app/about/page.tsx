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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200/60">
          <Building2 className="w-3.5 h-3.5" />
          <span>About Our Platform</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Simplifying Rental Solutions for Everyone
        </h1>
        <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
          We are on a mission to revolutionize property renting. Whether you are searching for your dream home or listing properties as a landlord, our platform ensures a smooth, transparent, and trustworthy experience.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-blue-600">{stat.value}</p>
            <p className="text-xs sm:text-sm font-medium text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Why Choose Us?</h2>
          <p className="text-xs sm:text-sm text-gray-500">Built with modern tech to deliver the best rental experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
                <div className="p-3 bg-purple-50 text-blue-600 rounded-xl w-fit">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 text-center space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold">Ready to find your next place?</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Explore hundreds of verified properties or register as a landlord to start listing today.
        </p>
        <div className="pt-2">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition"
          >
            <span>Browse Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
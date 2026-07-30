'use client';

import Link from 'next/link';
import { Search, Shield, Building, CreditCard } from 'lucide-react';

export default function HomePage() {

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-700 to-indigo-800 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Find Your Next Perfect Nest
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            A seamless platform for Tenants, Landlords, and Admins to manage rental requests, properties, and payments safely.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/properties"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition flex items-center gap-2"
            >
              <Search className="w-5 h-5" /> Explore Listings
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-600 border border-blue-400 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-500 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 grid sm:grid-cols-3 gap-8">
        <div className="p-6 bg-white border border-gray-200 rounded-lg text-center space-y-3 shadow-sm">
          <Building className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="font-bold text-lg">Verified Listings</h3>
          <p className="text-gray-600 text-sm">
            Explore curated apartments, studios, and villas managed by real landlords.
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg text-center space-y-3 shadow-sm">
          <Shield className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="font-bold text-lg">Role Security</h3>
          <p className="text-gray-600 text-sm">
            Dedicated dashboards for Tenants, Landlords, and Admins for structured workflows.
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg text-center space-y-3 shadow-sm">
          <CreditCard className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="font-bold text-lg">Easy Payments</h3>
          <p className="text-gray-600 text-sm">
            Pay safely for approved rental requests via automated Stripe checkout integration.
          </p>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-500 text-sm">Handpicked top choices available for rent now</p>
          </div>
          <Link href="/properties" className="text-blue-600 font-semibold text-sm hover:underline">
            View All →
          </Link>
        </div>

        {/* {loading ? (
          <div className="text-center py-12 text-gray-500">Loading properties...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )} */}
      </section>
    </div>
  );
}
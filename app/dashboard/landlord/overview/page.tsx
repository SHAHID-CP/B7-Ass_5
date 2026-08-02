'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLandlordOverview } from '../_action/landlordActions';
import { 
  Building2, 
  Inbox, 
  Wallet, 
  ArrowRight, 
  Loader2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus
} from 'lucide-react';

export default function LandlordDashboardOverview() {
  const [data, setData] = useState<{
    totalProperties: number;
    activeRequests: number;
    totalEarnings: number;
    recentProperties: any[];
    recentRentals: any[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      const res = await getLandlordOverview();
      if (res.success && res.data) {
        setData(res.data);
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" /> {status}
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3 text-amber-600 shrink-0" /> Pending
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-rose-100 text-rose-800">
            <XCircle className="w-3 h-3 text-rose-600 shrink-0" /> Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-100 pb-4 sm:pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Landlord Overview</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Track your properties, incoming rental applications, and revenue.</p>
        </div>
        <Link
          href="/dashboard/landlord/properties/new"
          className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition shadow-xs w-full sm:w-auto touch-manipulation"
        >
          <Plus className="w-4 h-4" /> Add New Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
        {/* Card 1: Total Properties */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Listed Properties</span>
            <div className="p-2 sm:p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{data?.totalProperties || 0}</h2>
            <Link href="/dashboard/landlord" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Active Requests */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Active / Pending Requests</span>
            <div className="p-2 sm:p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Inbox className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{data?.activeRequests || 0}</h2>
            <Link href="/dashboard/landlord/requests" className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Total Earnings */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3 sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Rent Revenue</span>
            <div className="p-2 sm:p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">৳{data?.totalEarnings?.toLocaleString() || 0}</h2>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              Approved Sum
            </span>
          </div>
        </div>
      </div>

      {/* Recent Requests Section */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 space-y-3.5 sm:space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-2">
            <Inbox className="w-4 h-4 text-blue-600 shrink-0" /> Recent Incoming Requests
          </h3>
          <Link href="/dashboard/landlord/requests" className="text-xs font-semibold text-blue-600 hover:underline">
            View All
          </Link>
        </div>

        {!data?.recentRentals || data.recentRentals.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center">No rental applications received yet.</p>
        ) : (
          <div className="overflow-hidden">
            
            {/* Mobile View: Cards List */}
            <div className="block md:hidden divide-y divide-gray-100">
              {data.recentRentals.map((req) => (
                <div key={req.id} className="py-3 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">
                        {req.tenant?.name || 'N/A'}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {req.property?.title}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-gray-900 shrink-0">
                      ৳{req.property?.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-0.5">
                    <div>{renderStatusBadge(req.status)}</div>
                    <span>
                      {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80 text-gray-500">
                    <th className="p-3 font-semibold">Tenant</th>
                    <th className="p-3 font-semibold">Property Title</th>
                    <th className="p-3 font-semibold">Price</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {data.recentRentals.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-3 font-semibold text-gray-900">{req.tenant?.name || 'N/A'}</td>
                      <td className="p-3 text-gray-600 max-w-[220px] truncate">{req.property?.title}</td>
                      <td className="p-3 font-bold text-gray-900">৳{req.property?.price}</td>
                      <td className="p-3">{renderStatusBadge(req.status)}</td>
                      <td className="p-3 text-right text-gray-400">
                        {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
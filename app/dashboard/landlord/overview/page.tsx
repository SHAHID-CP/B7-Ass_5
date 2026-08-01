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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3 h-3 text-emerald-600" /> {status}
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3 text-amber-600" /> Pending
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800">
            <XCircle className="w-3 h-3 text-rose-600" /> Rejected
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Landlord Overview</h1>
          <p className="text-xs text-gray-500">Track your properties, incoming rental applications, and revenue.</p>
        </div>
        <Link
          href="/dashboard/landlord/properties/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-500/20 w-fit"
        >
          <Plus className="w-4 h-4" /> Add New Property
        </Link>
      </div>

      {/* 📊 3 Summary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Properties */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Listed Properties</span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold text-gray-900">{data?.totalProperties || 0}</h2>
            <Link href="/dashboard/landlord/requests" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Active Requests */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Active / Pending Requests</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold text-gray-900">{data?.activeRequests || 0}</h2>
            <Link href="/dashboard/landlord/requests" className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1">
              Manage Requests <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Total Earnings */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Rent Revenue</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold text-gray-900">৳{data?.totalEarnings?.toLocaleString() || 0}</h2>
            <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Approved Rent Sum
            </span>
          </div>
        </div>
      </div>

      {/* 📩 Recent Rental Requests Preview Table */}
      <div className="bg-white border rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
            <Inbox className="w-4 h-4 text-blue-600" /> Recent Incoming Requests
          </h3>
          <Link href="/dashboard/landlord/requests" className="text-xs font-semibold text-blue-600 hover:underline">
            View All Requests
          </Link>
        </div>

        {!data?.recentRentals || data.recentRentals.length === 0 ? (
          <p className="text-xs text-gray-400 py-4 text-center">No rental applications received yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-500">
                  <th className="p-3 font-semibold">Tenant</th>
                  <th className="p-3 font-semibold">Property Title</th>
                  <th className="p-3 font-semibold">Price</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {data.recentRentals.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-3 font-semibold text-gray-900">{req.tenant?.name || 'N/A'}</td>
                    <td className="p-3 text-gray-600 max-w-[200px] truncate">{req.property?.title}</td>
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
        )}
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';

import { 
  Building2, 
  Inbox, 
  Wallet, 
  CheckCircle2, 
  Loader2, 
  PieChart as PieIcon,
  BarChart3,
} from 'lucide-react';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { getLandlordOverview, getLandlordRentalRequests, getMyProperties } from '../_action/landlordActions';
import { toast } from 'sonner';

export default function LandlordAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    async function loadAnalyticsData() {
      setLoading(true);
      try {
        const [overviewRes, propRes, reqRes] = await Promise.all([
          getLandlordOverview(),
          getMyProperties(),
          getLandlordRentalRequests(),
        ]);

        if (overviewRes?.success && overviewRes.data) {
          setOverviewData(overviewRes.data);
        }
        if (propRes?.success && Array.isArray(propRes.data)) {
          setProperties(propRes.data);
        }
        if (reqRes?.data) {
          setRequests(Array.isArray(reqRes.data) ? reqRes.data : reqRes.data.data || []);
        }
      } catch (error) {
        toast.error('Failed to fetch analytics data:');
      } finally {
        setLoading(false);
      }
    }

    loadAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-500" />
        <span>Loading Landlord Analytics...</span>
      </div>
    );
  }

  // --- 1. Property Availability Breakdown (Pie Chart) ---
  const availableCount = properties.filter((p) => p.isAvailable).length;
  const bookedCount = properties.filter((p) => !p.isAvailable).length;

  const propertyAvailabilityData = [
    { name: 'Available', value: availableCount, color: '#10B981' }, // Emerald
    { name: 'Booked / Rented', value: bookedCount, color: '#F43F5E' }, // Rose
  ].filter((item) => item.value > 0);

  // --- 2. Rental Request Status Breakdown (Pie Chart) ---
  const approvedReqs = requests.filter((r) => r.status === 'APPROVED' || r.status === 'PAID').length;
  const pendingReqs = requests.filter((r) => r.status === 'PENDING').length;
  const rejectedReqs = requests.filter((r) => r.status === 'REJECTED').length;

  const requestStatusData = [
    { name: 'Approved / Paid', value: approvedReqs, color: '#10B981' },
    { name: 'Pending', value: pendingReqs, color: '#F59E0B' },
    { name: 'Rejected', value: rejectedReqs, color: '#EF4444' },
  ].filter((item) => item.value > 0);

  // --- 3. Revenue / Price per Property (Bar Chart) ---
  const propertyPriceData = properties.map((p) => ({
    name: p.title.length > 12 ? `${p.title.substring(0, 12)}...` : p.title,
    Price: Number(p.price) || 0,
  }));

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Landlord Performance & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Real-time metrics, property status, and request distribution charts.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Properties */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center justify-between transition">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Properties</p>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
              {overviewData?.totalProperties ?? properties.length}
            </h2>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Total Requests */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center justify-between transition">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Active Requests</p>
            <h2 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              {overviewData?.activeRequests ?? pendingReqs}
            </h2>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
            <Inbox className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Available Units */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center justify-between transition">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Available Units</p>
            <h2 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {availableCount}
            </h2>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center justify-between transition">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Revenue</p>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
              ৳{overviewData?.totalEarnings?.toLocaleString() ?? 0}
            </h2>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-xl">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Recharts Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Property Availability (Pie Chart) */}
        <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Property Occupancy
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">Ratio of Available vs Rented properties</p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {propertyAvailabilityData.length === 0 ? (
              <p className="text-xs text-gray-400 dark:text-gray-500">No properties available to show</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyAvailabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {propertyAvailabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--tooltip-bg, #ffffff)', 
                      borderRadius: '12px', 
                      borderColor: 'var(--tooltip-border, #E5E7EB)', 
                      color: 'var(--tooltip-color, #111827)',
                      fontSize: '12px' 
                    }}
                    itemStyle={{ color: 'inherit' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 2: Rental Requests Distribution (Pie Chart) */}
        <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Request Status Breakdown
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">Approved, Pending and Rejected applications</p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {requestStatusData.length === 0 ? (
              <p className="text-xs text-gray-400 dark:text-gray-500">No rental requests to show</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={requestStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {requestStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--tooltip-bg, #ffffff)', 
                      borderRadius: '12px', 
                      borderColor: 'var(--tooltip-border, #E5E7EB)', 
                      color: 'var(--tooltip-color, #111827)',
                      fontSize: '12px' 
                    }}
                    itemStyle={{ color: 'inherit' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Chart 3: Property Price Comparison (Bar Chart) */}
      <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Property Rent Price Overview
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">Comparison of listed monthly rent prices (৳)</p>
        </div>

        <div className="h-72 w-full flex items-center justify-center">
          {propertyPriceData.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-500">No properties to display</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyPriceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-100 dark:stroke-gray-800" />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fontSize: 11, fill: '#9CA3AF' }} 
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fontSize: 11, fill: '#9CA3AF' }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--tooltip-bg, #ffffff)', 
                    borderRadius: '12px', 
                    borderColor: 'var(--tooltip-border, #E5E7EB)', 
                    color: 'var(--tooltip-color, #111827)',
                    fontSize: '12px' 
                  }}
                  itemStyle={{ color: 'inherit' }}
                  formatter={(value) => [`৳${value}`, 'Price']}
                />
                <Bar dataKey="Price" fill="#059669" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
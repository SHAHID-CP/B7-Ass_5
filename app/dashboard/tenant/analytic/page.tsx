'use client';

import { useEffect, useState } from 'react';

import { 
  Building2, 
  CreditCard, 
  CheckCircle, 
  Loader2, 
  Banknote
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
import { getTenantPayments, getTenantRentals } from '../_action/tenantActions';
import AnalyticsSkeleton from '@/skeleton/analyticsSkeleton';

export default function AnalyticsPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [rentalsRes, paymentsRes] = await Promise.all([
        getTenantRentals(),
        getTenantPayments(),
      ]);

      if (rentalsRes?.success && Array.isArray(rentalsRes.data)) {
        setRentals(rentalsRes.data);
      }
      if (paymentsRes?.success && Array.isArray(paymentsRes.data)) {
        setPayments(paymentsRes.data);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <AnalyticsSkeleton />
    );
  }


  // --- 1. Rental Request Status Calculation ---
  const approvedCount = rentals.filter((r) => r.status === 'APPROVED' || r.status === 'PAID').length;
  const pendingCount = rentals.filter((r) => r.status === 'PENDING').length;
  const rejectedCount = rentals.filter((r) => r.status === 'REJECTED').length;

  const requestStatusData = [
    { name: 'Approved', value: approvedCount, color: '#059669' }, // Emerald-600
    { name: 'Pending', value: pendingCount, color: '#D97706' },   // Amber-600
    { name: 'Rejected', value: rejectedCount, color: '#E11D48' },  // Rose-600
  ].filter((item) => item.value > 0); // Hide zero counts for cleaner pie chart

  // --- 2. Monthly Payment Trends Data Processing ---
  const totalPaidAmount = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  // Group payments by Month (e.g., "Jan", "Feb")
  const paymentsByMonth = payments.reduce((acc: any, curr) => {
    const month = new Date(curr.paidAt).toLocaleDateString('en-US', { month: 'short' });
    acc[month] = (acc[month] || 0) + (Number(curr.amount) || 0);
    return acc;
  }, {});

  const monthlyPaymentData = Object.keys(paymentsByMonth).map((month) => ({
    month,
    Amount: paymentsByMonth[month],
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Tenant Analytics & Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Visual insights into your rental applications and payment trends.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Requests */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Requests</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{rentals.length}</h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40 rounded-xl">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Approved</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{approvedCount}</h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40 rounded-xl">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Total Spent */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Spent</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">৳{totalPaidAmount}</h3>
          </div>
          <div className="p-3 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-800/40 rounded-xl">
            <Banknote className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Completed Payments */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Completed Payments</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{payments.length}</h3>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/40 rounded-xl">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Recharts Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Rental Request Distribution (Pie Chart) */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Application Breakdown</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Distribution of your rental requests status</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {requestStatusData.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500">No request data to display</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={requestStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {requestStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      borderRadius: '12px', 
                      borderColor: '#334155', 
                      color: '#f8fafc',
                      fontSize: '12px' 
                    }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 2: Monthly Payment History (Bar Chart) */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Payment Activity</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total rent paid grouped by month (৳)</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {monthlyPaymentData.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500">No payment history to display</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPaymentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(241, 245, 249, 0.05)' }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      borderRadius: '12px', 
                      borderColor: '#334155', 
                      color: '#f8fafc',
                      fontSize: '12px' 
                    }}
                    itemStyle={{ color: '#f8fafc' }}
                    formatter={(value) => [`৳${value}`, 'Amount']}
                  />
                  <Bar dataKey="Amount" fill="#059669" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
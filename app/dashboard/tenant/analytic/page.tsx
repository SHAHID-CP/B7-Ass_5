'use client';

import { useEffect, useState } from 'react';

import { 
  Building2, 
  CreditCard, 
  CheckCircle, 
  Loader2, 
  DollarSign
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
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // --- 1. Rental Request Status Calculation ---
  const approvedCount = rentals.filter((r) => r.status === 'APPROVED' || r.status === 'PAID').length;
  const pendingCount = rentals.filter((r) => r.status === 'PENDING').length;
  const rejectedCount = rentals.filter((r) => r.status === 'REJECTED').length;

  const requestStatusData = [
    { name: 'Approved', value: approvedCount, color: '#10B981' }, // Emerald
    { name: 'Pending', value: pendingCount, color: '#F59E0B' },   // Amber
    { name: 'Rejected', value: rejectedCount, color: '#EF4444' }, // Red
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
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Tenant Analytics & Overview
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Visual insights into your rental applications and payment trends.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Total Requests</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{rentals.length}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Approved</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{approvedCount}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Total Spent</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">৳{totalPaidAmount}</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Completed Payments</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{payments.length}</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recharts Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Rental Request Distribution (Pie Chart) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-800">Application Breakdown</h2>
            <p className="text-xs text-gray-400">Distribution of your rental requests status</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {requestStatusData.length === 0 ? (
              <p className="text-xs text-gray-400">No request data to display</p>
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
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#E5E7EB', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 2: Monthly Payment History (Bar Chart) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-800">Payment Activity</h2>
            <p className="text-xs text-gray-400">Total rent paid grouped by month (৳)</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {monthlyPaymentData.length === 0 ? (
              <p className="text-xs text-gray-400">No payment history to display</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPaymentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#E5E7EB', fontSize: '12px' }}
                    formatter={(value) => [`৳${value}`, 'Amount']}
                  />
                  <Bar dataKey="Amount" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
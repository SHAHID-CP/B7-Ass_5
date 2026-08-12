'use client';

import { useEffect, useState } from 'react';
import { 
  getAdminStats, 
  getAdminUsers, 
  getAllRentalsAdmin, 
  getAllPropertiesAdmin 
} from '../_action/adminActions';
import { getCategories } from '../_action/categoryActions';

import { 
  Users, 
  Building2, 
  Clock, 
  DollarSign, 
  PieChart as PieIcon,
  Loader2,
  Shield,
  Layers,
  FileText
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
import { toast } from 'sonner';

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [rentals, setRentals] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadAnalyticsData() {
      setLoading(true);
      try {
        const [statsRes, usersRes, rentalsRes, propsRes, categoriesRes] = await Promise.all([
          getAdminStats(),
          getAdminUsers({ page: 1, limit: 100 }),
          getAllRentalsAdmin(),
          getAllPropertiesAdmin(),
          getCategories(),
        ]);

        if (statsRes?.success) setStats(statsRes.data);
        if (usersRes?.success) setUsers(usersRes.data?.users || usersRes.data || []);
        if (rentalsRes?.success) setRentals(rentalsRes.data || []);
        if (propsRes?.success) setProperties(propsRes.data || []);
        if (categoriesRes?.success) setCategories(categoriesRes.data || []);
      } catch (error) {
        toast.error('Analytics Data Fetching Error:');
      } finally {
        setLoading(false);
      }
    }

    loadAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span>Loading Admin Analytics...</span>
      </div>
    );
  }

  // --- 1. User Distribution Data (Pie Chart) ---
  const tenantCount = users.filter((u) => u.role === 'TENANT').length;
  const landlordCount = users.filter((u) => u.role === 'LANDLORD').length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;

  const userRoleData = [
    { name: 'Tenants', value: stats?.activeTenants ?? tenantCount, color: '#10B981' },
    { name: 'Landlords', value: stats?.activeLandlords ?? landlordCount, color: '#3B82F6' },
    { name: 'Admins', value: adminCount, color: '#8B5CF6' },
  ].filter((item) => item.value > 0);

  // --- 2. Rental Request Status Breakdown (Pie Chart) ---
  const approvedRentals = rentals.filter((r) => r.status === 'APPROVED' || r.status === 'PAID').length;
  const pendingRentals = rentals.filter((r) => r.status === 'PENDING').length;
  const rejectedRentals = rentals.filter((r) => r.status === 'REJECTED').length;

  const rentalStatusData = [
    { name: 'Approved / Paid', value: approvedRentals, color: '#10B981' },
    { name: 'Pending', value: pendingRentals, color: '#F59E0B' },
    { name: 'Rejected', value: rejectedRentals, color: '#EF4444' },
  ].filter((item) => item.value > 0);

  // --- 3. Properties Count per Category (Bar Chart) ---
  const categoryChartData = categories.map((cat) => {
    const count = properties.filter((p) => p.category?.name === cat.name || p.categoryId === cat.id).length;
    return {
      name: cat.name,
      Properties: count,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-xl shrink-0">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">
            System Level Analytics
          </h1>
          <p className="text-xs text-gray-500">
            Platform performance metrics, user statistics, and rental property distribution
          </p>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Total System Users</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">{stats?.totalUsers ?? users.length}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Total Properties</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">{stats?.totalProperties ?? properties.length}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Pending Requests</p>
            <p className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{stats?.pendingRentalRequests ?? pendingRentals}</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Total System Revenue</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
              ৳{(stats?.totalRevenue ?? 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Charts Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Roles Breakdown (Pie Chart) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-purple-600" /> User Role Distribution
            </h2>
            <p className="text-xs text-gray-400">Proportion of Tenants, Landlords, and Admins</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {userRoleData.length === 0 ? (
              <p className="text-xs text-gray-400">No user data available</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#E5E7EB', fontSize: '12px' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Rental Application Breakdown (Pie Chart) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" /> Rental Application Status
            </h2>
            <p className="text-xs text-gray-400">Breakdown of active, approved, and rejected rentals</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {rentalStatusData.length === 0 ? (
              <p className="text-xs text-gray-400">No rental application data</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rentalStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {rentalStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#E5E7EB', fontSize: '12px' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Property Count per Category (Bar Chart) */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" /> Properties per Category
          </h2>
          <p className="text-xs text-gray-400">Total properties listed under each category</p>
        </div>

        <div className="h-72 w-full flex items-center justify-center">
          {categoryChartData.length === 0 ? (
            <p className="text-xs text-gray-400">No category data available</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} allowDecimals={false} />
                <Tooltip 
                  cursor={{ fill: '#F9FAFB' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#E5E7EB', fontSize: '12px' }}
                />
                <Bar dataKey="Properties" fill="#8B5CF6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
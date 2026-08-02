'use client';

import { useEffect, useState, useCallback } from 'react';
import { updateAdminUserStatus } from '../_action/dashboardActions';
import { getAdminStats, getAdminUsers } from './_action/adminActions';
import { 
  Users, 
  Building2, 
  Clock, 
  DollarSign, 
  UserCheck, 
  Shield, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  AlertTriangle,
  Ban,
  Loader2,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminStats {
  totalUsers?: number;
  totalProperties?: number;
  pendingRentalRequests?: number;
  totalRevenue?: number;
  totalPayments?: number;
  activeLandlords?: number;
  activeTenants?: number;
}

interface UserItem {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
  role: 'TENANT' | 'LANDLORD' | 'ADMIN' | string;
  createdAt?: string;
  status?: 'ACTIVE' | 'SUSPENDED' | 'BANNED' | string;
}

export default function AdminPage() {
  // Stats State
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Users & Pagination State
  const [users, setUsers] = useState<UserItem[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, total: 0 });
  const [usersLoading, setUsersLoading] = useState(true);
  
  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  
  // Action state
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Load Overview Stats
  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await getAdminStats();
      if (res?.success) setStats(res.data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Debounce Search Input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load Users with Search & Pagination (Fixed Infinite Loop Dependency)
  const loadUsers = useCallback(async (page = 1) => {
    setUsersLoading(true);
    try {
      const res = await getAdminUsers({
        page,
        limit: pagination.limit,
        searchTerm: debouncedSearch,
        role: roleFilter,
      });

      if (res?.success) {
        const fetchedUsers = res.data?.users || res.data || [];
        const totalCount = res.data?.meta?.total || res.data?.pagination?.total || fetchedUsers.length;
        
        setUsers(fetchedUsers);
        setPagination((prev) => {
          const totalPages = res.data?.meta?.totalPages || Math.ceil(totalCount / prev.limit) || 1;
          return {
            ...prev,
            page,
            total: totalCount,
            totalPages: totalPages > 0 ? totalPages : 1,
          };
        });
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setUsersLoading(false);
    }
  }, [debouncedSearch, roleFilter, pagination.limit]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    loadUsers(1);
  }, [loadUsers]);

  // Handle User Status Change
  const handleStatusChange = async (userId: string, status: 'ACTIVE' | 'BANNED' | 'SUSPENDED') => {
    setUpdatingId(userId);
    try {
      const res = await updateAdminUserStatus(userId, status);
      if (res?.error) {
        toast(res.error || 'Failed to update status');
      } else {
        await loadUsers(pagination.page);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      toast('An unexpected error occurred.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Helper for Status Badge
  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <UserCheck className="w-3 h-3 text-emerald-600" /> ACTIVE
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <AlertTriangle className="w-3 h-3 text-amber-600" /> SUSPENDED
          </span>
        );
      case 'BANNED':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <Ban className="w-3 h-3 text-rose-600" /> BANNED
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium">
            {status || 'UNKNOWN'}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 text-blue-600 rounded-xl shrink-0">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">
              Admin Dashboard & Analytics
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Manage platform metrics, system users, and administrative controls
            </p>
          </div>
        </div>
        <button
          onClick={() => { loadStats(); loadUsers(pagination.page); }}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-purple-600 border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2 rounded-xl shadow-xs transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Overview Metrics Section */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Overview Metrics
        </h2>

        {statsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-2xl border border-gray-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Users */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Users</p>
                <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">{stats?.totalUsers ?? 0}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Total Properties */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Properties</p>
                <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">{stats?.totalProperties ?? 0}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Pending Requests</p>
                <p className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{stats?.pendingRentalRequests ?? 0}</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
                  ৳{(stats?.totalRevenue ?? 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        )}

        {/* Extra Metrics Breakdown */}
        {stats && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-xs text-center text-xs">
            <div>
              <p className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-wide">Total Payments</p>
              <p className="text-sm sm:text-lg font-bold text-slate-100 mt-0.5">{stats.totalPayments ?? 0}</p>
            </div>
            <div className="border-x border-slate-800">
              <p className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-wide">Active Landlords</p>
              <p className="text-sm sm:text-lg font-bold text-blue-400 mt-0.5">{stats.activeLandlords ?? 0}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-wide">Active Tenants</p>
              <p className="text-sm sm:text-lg font-bold text-emerald-400 mt-0.5">{stats.activeTenants ?? 0}</p>
            </div>
          </div>
        )}
      </section>

      {/* User Management Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            User Management
          </h2>

          {/* Search and Role Filter Toolbar */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name or email..."
                className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white transition"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-1.5 bg-white text-xs text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium cursor-pointer"
              >
                <option value="ALL">All Roles</option>
                <option value="TENANT">Tenant</option>
                <option value="LANDLORD">Landlord</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Content Container */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          {usersLoading ? (
            <div className="p-12 text-center text-gray-400 text-xs">
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                <span>Loading users list...</span>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-xs space-y-1">
              <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="font-semibold text-gray-600">No users found</p>
              <p>No user matches your search criteria.</p>
            </div>
          ) : (
            <>
              {/* Mobile View: Responsive Cards */}
              <div className="block md:hidden divide-y divide-gray-100">
                {users.map((u) => (
                  <div key={u.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">
                          {u.name || u.fullName || 'N/A'}
                        </p>
                        <p className="text-[11px] text-gray-400">{u.email}</p>
                      </div>
                      {renderStatusBadge(u.status)}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold">
                          {u.role}
                        </span>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>

                      {/* Status Action Dropdown */}
                      <div className="flex items-center gap-1">
                        {updatingId === u.id && <Loader2 className="w-3 h-3 animate-spin text-purple-600" />}
                        <select
                          value={u.status || 'ACTIVE'}
                          disabled={updatingId === u.id}
                          onChange={(e) =>
                            handleStatusChange(
                              u.id,
                              e.target.value as 'ACTIVE' | 'BANNED' | 'SUSPENDED'
                            )
                          }
                          className="border border-gray-200 rounded-lg px-2 py-1 bg-white text-[11px] font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50 cursor-pointer"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="SUSPENDED">SUSPENDED</option>
                          <option value="BANNED">BANNED</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50/80 uppercase text-gray-500 font-semibold border-b border-gray-100">
                    <tr>
                      <th className="py-3.5 px-4">User</th>
                      <th className="py-3.5 px-4">Role</th>
                      <th className="py-3.5 px-4">Joined Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Action (Change Status)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/50 transition">
                        {/* Name & Email */}
                        <td className="py-3.5 px-4">
                          <div>
                            <p className="font-bold text-gray-900">{u.name || u.fullName || 'N/A'}</p>
                            <p className="text-[11px] text-gray-400">{u.email}</p>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="py-3.5 px-4">
                          <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-mono text-[10px] uppercase font-bold">
                            {u.role}
                          </span>
                        </td>

                        {/* Created Date */}
                        <td className="py-3.5 px-4 text-gray-500">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">{renderStatusBadge(u.status)}</td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {updatingId === u.id && (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
                            )}
                            <select
                              value={u.status || 'ACTIVE'}
                              disabled={updatingId === u.id}
                              onChange={(e) =>
                                handleStatusChange(
                                  u.id,
                                  e.target.value as 'ACTIVE' | 'BANNED' | 'SUSPENDED'
                                )
                              }
                              className="border border-gray-200 rounded-lg px-2.5 py-1 bg-white text-xs font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 disabled:opacity-50 cursor-pointer shadow-xs"
                            >
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="SUSPENDED">SUSPENDED</option>
                              <option value="BANNED">BANNED</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between p-3.5 border-t border-gray-100 bg-gray-50/50 text-xs">
            <span className="text-gray-500">
              Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} total users)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={pagination.page <= 1 || usersLoading}
                onClick={() => loadUsers(pagination.page - 1)}
                className="p-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40 transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>

              <button
                disabled={pagination.page >= pagination.totalPages || usersLoading}
                onClick={() => loadUsers(pagination.page + 1)}
                className="p-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40 transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
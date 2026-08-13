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
import AdminSkeleton from '@/skeleton/adminSkeleton';

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
      toast.error('Failed to load stats');
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Debounce Search Input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load Users with Search & Pagination
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
      toast.error('Failed to load users');
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
        toast.error(res.error || 'Failed to update status');
      } else {
        await loadUsers(pagination.page);
        toast.success("User Status changed successfully");
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Helper for Status Badge
  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0">
            <UserCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> ACTIVE
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0">
            <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" /> SUSPENDED
          </span>
        );
      case 'BANNED':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0">
            <Ban className="w-3 h-3 text-rose-600 dark:text-rose-400" /> BANNED
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-[11px] font-medium shrink-0">
            {status || 'UNKNOWN'}
          </span>
        );
    }
  };
if (statsLoading && usersLoading) {
  return <AdminSkeleton />;
}
  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Admin Dashboard & Analytics
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Manage platform metrics, system users, and administrative controls
            </p>
          </div>
        </div>
        <button
          onClick={() => { loadStats(); loadUsers(pagination.page); }}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 px-3 py-2 rounded-xl shadow-xs transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Overview Metrics Section */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Overview Metrics
        </h2>

        {statsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800/50 animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Users */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Users</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">{stats?.totalUsers ?? 0}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/40 p-3 rounded-xl text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Total Properties */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Properties</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">{stats?.totalProperties ?? 0}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Pending Requests</p>
                <p className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{stats?.pendingRentalRequests ?? 0}</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  ৳{(stats?.totalRevenue ?? 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        )}

        {/* Extra Metrics Breakdown */}
        {stats && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-white dark:bg-slate-800/90 text-white p-3.5 sm:p-4 rounded-2xl shadow-xs text-center text-xs border border-slate-100 dark:border-slate-700/80">
            <div>
              <p className="text-slate-400 dark:text-slate-400 text-[10px] sm:text-xs uppercase tracking-wide">Total Payments</p>
              <p className="text-sm sm:text-lg font-bold text-slate-900 mt-0.5">{stats.totalPayments ?? 0}</p>
            </div>
            <div className="border-x border-slate-300 dark:border-slate-700">
              <p className="text-slate-400 dark:text-slate-400 text-[10px] sm:text-xs uppercase tracking-wide">Active Landlords</p>
              <p className="text-sm sm:text-lg font-bold text-blue-400 dark:text-blue-300 mt-0.5">{stats.activeLandlords ?? 0}</p>
            </div>
            <div>
              <p className="text-slate-400 dark:text-slate-400 text-[10px] sm:text-xs uppercase tracking-wide">Active Tenants</p>
              <p className="text-sm sm:text-lg font-bold text-emerald-400 dark:text-emerald-300 mt-0.5">{stats.activeTenants ?? 0}</p>
            </div>
          </div>
        )}
      </section>

      {/* User Management Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            User Management
          </h2>

          {/* Search and Role Filter Toolbar */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name or email..."
                className="w-full pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium cursor-pointer"
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
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
          {usersLoading ? (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs">
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-purple-600 dark:text-purple-400" />
                <span>Loading users list...</span>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs space-y-1">
              <Users className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <p className="font-semibold text-slate-600 dark:text-slate-300">No users found</p>
              <p>No user matches your search criteria.</p>
            </div>
          ) : (
            <>
              {/* Mobile View: Responsive Cards */}
              <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <div key={u.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                          {u.name || u.fullName || 'N/A'}
                        </p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">{u.email}</p>
                      </div>
                      {renderStatusBadge(u.status)}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold">
                          {u.role}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>

                      {/* Status Action Dropdown */}
                      <div className="flex items-center gap-1">
                        {updatingId === u.id && <Loader2 className="w-3 h-3 animate-spin text-purple-600 dark:text-purple-400" />}
                        <select
                          value={u.status || 'ACTIVE'}
                          disabled={updatingId === u.id}
                          onChange={(e) =>
                            handleStatusChange(
                              u.id,
                              e.target.value as 'ACTIVE' | 'BANNED' | 'SUSPENDED'
                            )
                          }
                          className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50 cursor-pointer"
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
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                  <thead className="bg-slate-50/80 dark:bg-slate-800/60 uppercase text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">User</th>
                      <th className="py-3.5 px-4">Role</th>
                      <th className="py-3.5 px-4">Joined Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Action (Change Status)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                        {/* Name & Email */}
                        <td className="py-3.5 px-4">
                          <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">{u.name || u.fullName || 'N/A'}</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">{u.email}</p>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="py-3.5 px-4">
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 rounded-md font-mono text-[10px] uppercase font-bold">
                            {u.role}
                          </span>
                        </td>

                        {/* Created Date */}
                        <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">{renderStatusBadge(u.status)}</td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {updatingId === u.id && (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600 dark:text-purple-400" />
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
                              className="border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 disabled:opacity-50 cursor-pointer shadow-xs"
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
          <div className="flex items-center justify-between p-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Page <strong className="text-slate-700 dark:text-slate-200">{pagination.page}</strong> of{' '}
              <strong className="text-slate-700 dark:text-slate-200">{pagination.totalPages}</strong> ({pagination.total} total users)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={pagination.page <= 1 || usersLoading}
                onClick={() => loadUsers(pagination.page - 1)}
                className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>

              <button
                disabled={pagination.page >= pagination.totalPages || usersLoading}
                onClick={() => loadUsers(pagination.page + 1)}
                className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
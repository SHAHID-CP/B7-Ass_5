'use client';

import { useEffect, useState } from 'react';
import { updateAdminUserStatus } from '../_action/dashboardActions';
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
  RefreshCw
} from 'lucide-react';
import { getAdminStats, getAdminUsers } from './_action/adminActions';

export default function AdminPage() {
  // Stats State
  const [stats, setStats] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Users & Pagination State
  const [users, setUsers] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, total: 0 });
  const [usersLoading, setUsersLoading] = useState(true);
  
  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  
  // Action state
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Load Overview Stats
  const loadStats = async () => {
    setStatsLoading(true);
    const res = await getAdminStats();
    if (res?.success) setStats(res.data);
    setStatsLoading(false);
  };

  // Debounce Search Input (delay for smoother API calls)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load Users with Search & Pagination
  const loadUsers = async (page = 1) => {
    setUsersLoading(true);
    const res = await getAdminUsers({
      page,
      limit: pagination.limit,
      searchTerm: debouncedSearch,
      role: roleFilter,
    });

    if (res?.success) {
      // Backend response mapping based on your API structure
      const fetchedUsers = res.data?.users || res.data || [];
      const totalCount = res.data?.meta?.total || res.data?.pagination?.total || fetchedUsers.length;
      const totalPages = res.data?.meta?.totalPages || Math.ceil(totalCount / pagination.limit) || 1;

      setUsers(fetchedUsers);
      setPagination((prev) => ({
        ...prev,
        page,
        total: totalCount,
        totalPages: totalPages > 0 ? totalPages : 1,
      }));
    }
    setUsersLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadUsers(1);
  }, [debouncedSearch, roleFilter]);

  // Handle User Status Change
  const handleStatusChange = async (userId: string, status: 'ACTIVE' | 'BANNED' | 'SUSPENDED') => {
    setUpdatingId(userId);
    const res = await updateAdminUserStatus(userId, status);
    if (res?.error) {
      alert(res.error || 'Failed to update status');
    } else {
      await loadUsers(pagination.page);
    }
    setUpdatingId(null);
  };

  // Helper for Status Badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[11px] font-semibold">
            <UserCheck className="w-3 h-3" /> ACTIVE
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[11px] font-semibold">
            <AlertTriangle className="w-3 h-3" /> SUSPENDED
          </span>
        );
      case 'BANNED':
        return (
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-[11px] font-semibold">
            <Ban className="w-3 h-3" /> BANNED
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-purple-600" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Admin Dashboard & Analytics
          </h1>
        </div>
        <button
          onClick={() => { loadStats(); loadUsers(pagination.page); }}
          className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-purple-600 border bg-white px-3 py-1.5 rounded-lg shadow-sm transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>


      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          Overview Metrics
        </h2>

        {statsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Users */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalUsers ?? 0}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                <Users className="w-6 h-6" />
              </div>
            </div>

            {/* Total Properties */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalProperties ?? 0}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <Building2 className="w-6 h-6" />
              </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Pending Requests</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{stats?.pendingRentalRequests ?? 0}</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  ৳{(stats?.totalRevenue ?? 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-green-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        {/* Extra Metrics Breakdown */}
        {stats && (
          <div className="grid grid-cols-3 gap-3 bg-slate-900 text-white p-4 rounded-xl shadow-sm text-center text-xs">
            <div>
              <p className="text-slate-400">Total Payments</p>
              <p className="text-base font-bold text-slate-100">{stats.totalPayments ?? 0}</p>
            </div>
            <div className="border-x border-slate-800">
              <p className="text-slate-400">Active Landlords</p>
              <p className="text-base font-bold text-blue-400">{stats.activeLandlords ?? 0}</p>
            </div>
            <div>
              <p className="text-slate-400">Active Tenants</p>
              <p className="text-base font-bold text-green-400">{stats.activeTenants ?? 0}</p>
            </div>
          </div>
        )}
      </section>


      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            User Management
          </h2>

          {/* Search and Role Filter Toolbar */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-xs text-gray-700 outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="ALL">All Roles</option>
              <option value="TENANT">Tenant</option>
              <option value="LANDLORD">Landlord</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600 min-w-[650px]">
              <thead className="bg-gray-50 uppercase border-b text-gray-700 font-semibold">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Joined Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action (Change Status)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersLoading ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-400">
                      <div className="flex justify-center items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                        Loading users...
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-400">
                      No users match your request.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      {/* Name & Email */}
                      <td className="p-3">
                        <div>
                          <p className="font-semibold text-gray-900">{u.name || u.fullName || 'N/A'}</p>
                          <p className="text-[11px] text-gray-400">{u.email}</p>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="p-3">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold">
                          {u.role}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="p-3 text-gray-500">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                      </td>

                      {/* Status */}
                      <td className="p-3">{renderStatusBadge(u.status)}</td>

                      {/* Actions */}
                      <td className="p-3 text-right">
                        <select
                          value={u.status || 'ACTIVE'}
                          disabled={updatingId === u.id}
                          onChange={(e) =>
                            handleStatusChange(
                              u.id,
                              e.target.value as 'ACTIVE' | 'BANNED' | 'SUSPENDED'
                            )
                          }
                          className="border border-gray-300 rounded px-2 py-1 bg-white text-xs text-gray-800 outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50 cursor-pointer"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="SUSPENDED">SUSPENDED</option>
                          <option value="BANNED">BANNED</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>


          <div className="flex items-center justify-between p-3 border-t bg-gray-50 text-xs">
            <span className="text-gray-500">
              Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong>
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={pagination.page <= 1 || usersLoading}
                onClick={() => loadUsers(pagination.page - 1)}
                className="p-1.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-40 transition"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                disabled={pagination.page >= pagination.totalPages || usersLoading}
                onClick={() => loadUsers(pagination.page + 1)}
                className="p-1.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-40 transition"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
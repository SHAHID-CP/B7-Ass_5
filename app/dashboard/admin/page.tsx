'use client';

import { useEffect, useState } from 'react';
import { getAdminUsers, updateAdminUserStatus } from '../_action/dashboardActions';
import { Shield, UserCheck, AlertTriangle, Ban } from 'lucide-react';

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadUsers = async () => {
    const res = await getAdminUsers();
    if (!res.error) setUsers(res.data || res || []);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStatusChange = async (userId: string, status: 'ACTIVE' | 'BANNED' | 'SUSPENDED') => {
    setUpdatingId(userId);
    const res = await updateAdminUserStatus(userId, status);
    if (res?.error) {
      alert(res.error || 'Failed to update status');
    } else {
      await loadUsers();
    }
    setUpdatingId(null);
  };

  // Status Badge UI helper function
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <UserCheck className="w-3 h-3" /> ACTIVE
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <AlertTriangle className="w-3 h-3" /> SUSPENDED
          </span>
        );
      case 'BANNED':
        return (
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
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

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading admin panel...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Admin Overview & User Management
        </h1>
      </div>

      {/* Table Container - Mobile Responsive */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 min-w-[650px]">
            <thead className="bg-gray-50 uppercase border-b text-gray-700 font-semibold">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action (Change Status)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition">
                    {/* User Name */}
                    <td className="p-3 font-medium text-gray-900">
                      {u.name || u.fullName || 'N/A'}
                    </td>

                    {/* Email */}
                    <td className="p-3 text-gray-600">{u.email}</td>

                    {/* Role */}
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold">
                        {u.role}
                      </span>
                    </td>

                    {/* Current Status Badge */}
                    <td className="p-3">{renderStatusBadge(u.status)}</td>

                    {/* Action Select Box */}
                    <td className="p-3">
                      <select
                        value={u.status || 'ACTIVE'}
                        disabled={updatingId === u.id}
                        onChange={(e) =>
                          handleStatusChange(
                            u.id,
                            e.target.value as 'ACTIVE' | 'BANNED' | 'SUSPENDED'
                          )
                        }
                        className="border border-gray-300 rounded px-2.5 py-1 bg-white text-xs text-gray-800 outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50 transition cursor-pointer"
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
      </div>
    </div>
  );
}
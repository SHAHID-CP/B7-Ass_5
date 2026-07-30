'use client';

import { useEffect, useState } from 'react';
import { getAdminUsers, updateAdminUserRole } from '../_action/dashboardActions';
import { Shield } from 'lucide-react';

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    const res = await getAdminUsers();
    if (!res.error) setUsers(res.data || res || []);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, role: string) => {
    await updateAdminUserRole(userId, role);
    loadUsers();
  };

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading admin panel...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-purple-600" />
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview & User Management</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-gray-600">
          <thead className="bg-gray-50 uppercase border-b text-gray-700 font-semibold">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Email</th>
              <th className="p-3">Current Role</th>
              <th className="p-3">Action (Change Role)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-3 font-mono">{u.id}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 font-bold">{u.role}</td>
                <td className="p-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 bg-white text-xs outline-none"
                  >
                    <option value="TENANT">TENANT</option>
                    <option value="LANDLORD">LANDLORD</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
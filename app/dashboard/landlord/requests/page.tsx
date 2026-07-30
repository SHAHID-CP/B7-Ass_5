'use client';

import { useEffect, useState } from 'react';
import { getLandlordRequests, updateLandlordRequestStatus } from '../../_action/dashboardActions';
import { Check, X } from 'lucide-react';

export default function LandlordRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    const res = await getLandlordRequests();
    if (!res.error) setRequests(res.data || res || []);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdate = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    await updateLandlordRequestStatus(id, status);
    loadRequests();
  };

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading incoming requests...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Manage Incoming Requests</h1>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm divide-y divide-gray-100">
        {requests.map((r) => (
          <div key={r.id} className="p-4 flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-gray-900">Request ID: {r.id}</p>
              <p className="text-gray-500">Tenant ID: {r.tenantId || 'N/A'}</p>
            </div>
            {r.status === 'PENDING' ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(r.id, 'APPROVED')}
                  className="bg-green-600 text-white px-3 py-1.5 rounded flex items-center gap-1 hover:bg-green-700"
                >
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
                <button
                  onClick={() => handleUpdate(r.id, 'REJECTED')}
                  className="bg-red-600 text-white px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-700"
                >
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            ) : (
              <span className="font-bold uppercase text-gray-700">{r.status}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
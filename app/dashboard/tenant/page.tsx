'use client';

import { useEffect, useState } from 'react';
import { getTenantRentals, getTenantPayments } from '../_action/dashboardActions';
import Link from 'next/link';
import { CreditCard, History, Building } from 'lucide-react';

export default function TenantPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const [rData, pData] = await Promise.all([getTenantRentals(), getTenantPayments()]);
      if (!rData.error) setRentals(rData.data || rData || []);
      if (!pData.error) setPayments(pData.data || pData || []);
      setLoading(false);
    }
    init();
  }, []);

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading tenant dashboard...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tenant Overview</h1>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
          <Building className="w-5 h-5 text-blue-600" /> My Rental Requests
        </h2>
        {rentals.length === 0 ? (
          <p className="text-xs text-gray-500">No rental requests found.</p>
        ) : (
          <div className="space-y-3">
            {rentals.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">{item.propertyTitle || `Property #${item.propertyId}`}</h3>
                  <p className="text-xs text-gray-500">Status: <span className="font-bold uppercase">{item.status}</span></p>
                </div>
                {item.status === 'APPROVED' && (
                  <Link
                    href={`/dashboard/tenant/requests/${item.id}/pay`}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3.5 py-2 rounded-md font-medium flex items-center gap-1.5 transition"
                  >
                    <CreditCard className="w-4 h-4" /> Pay Now
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
          <History className="w-5 h-5 text-green-600" /> Payment History
        </h2>
        {payments.length === 0 ? (
          <p className="text-xs text-gray-500">No payment history found.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {payments.map((p) => (
              <div key={p.id} className="py-2.5 flex justify-between text-xs">
                <span>Payment ID: <code className="font-mono">{p.id}</code></span>
                <span className="font-semibold text-green-600">${p.amount} ({p.status})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
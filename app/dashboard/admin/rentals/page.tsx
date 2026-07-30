'use client';

import { useEffect, useState } from 'react';
import { getAllRentalsAdmin } from '../_action/adminActions';
import { FileText, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRentals = async () => {
      const res = await getAllRentalsAdmin();
      if (res?.success) {
        setRentals(res.data || []);
      }
      setLoading(false);
    };
    loadRentals();
  }, []);

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading rentals...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          All Rental Requests
        </h1>
      </div>

      {/* Rentals Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 min-w-[750px]">
            <thead className="bg-gray-50 uppercase border-b text-gray-700 font-semibold">
              <tr>
                <th className="p-3">Property Title</th>
                <th className="p-3">Price</th>
                <th className="p-3">Is Available</th>
                <th className="p-3">Tenant Name</th>
                <th className="p-3">Payment Status</th>
                <th className="p-3">Rental Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rentals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    No rental requests found.
                  </td>
                </tr>
              ) : (
                rentals.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    {/* Property Title */}
                    <td className="p-3 font-semibold text-gray-900">
                      {item.property?.title || 'N/A'}
                    </td>

                    {/* Property Price */}
                    <td className="p-3 font-semibold text-gray-900">
                      ৳{item.property?.price || item.payment?.amount || 0}
                    </td>

                    {/* Property Availability */}
                    <td className="p-3">
                      {item.property?.isAvailable ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <XCircle className="w-3 h-3" /> No
                        </span>
                      )}
                    </td>

                    {/* Tenant Name */}
                    <td className="p-3 font-medium text-gray-800">
                      {item.tenant?.name || 'N/A'}
                    </td>

                    {/* Payment Status */}
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.payment?.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.payment?.status || 'PENDING'}
                      </span>
                    </td>

                    {/* Rental Request Status */}
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          item.status === 'PAID'
                            ? 'bg-green-100 text-green-700'
                            : item.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {item.status}
                      </span>
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
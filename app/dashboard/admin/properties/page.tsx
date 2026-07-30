'use client';

import { useEffect, useState } from 'react';
import { getAllPropertiesAdmin } from '../_action/adminActions';
import { Building2, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      const res = await getAllPropertiesAdmin();
      if (res?.success) {
        setProperties(res.data || []);
      }
      setLoading(false);
    };
    loadProperties();
  }, []);

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading properties...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Building2 className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          All Properties
        </h1>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 min-w-[700px]">
            <thead className="bg-gray-50 uppercase border-b text-gray-700 font-semibold">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Category</th>
                <th className="p-3">Landlord Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    No properties found.
                  </td>
                </tr>
              ) : (
                properties.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    {/* Title */}
                    <td className="p-3 font-semibold text-gray-900">
                      {item.title}
                    </td>

                    {/* Location */}
                    <td className="p-3 text-gray-600">{item.location}</td>

                    {/* Category */}
                    <td className="p-3">
                      <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-medium text-[11px]">
                        {item.category?.name || 'N/A'}
                      </span>
                    </td>

                    {/* Landlord Name */}
                    <td className="p-3 font-medium text-gray-800">
                      {item.landlord?.name || 'N/A'}
                    </td>

                    {/* Price */}
                    <td className="p-3 font-semibold text-gray-900">
                      ৳{item.price}
                    </td>

                    {/* Is Available */}
                    <td className="p-3">
                      {item.isAvailable ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                          <XCircle className="w-3 h-3" /> Booked
                        </span>
                      )}
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
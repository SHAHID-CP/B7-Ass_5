'use client';

import { useEffect, useState } from 'react';
import { getLandlordProperties } from '../_action/dashboardActions';
import Link from 'next/link';
import { PlusCircle, Building } from 'lucide-react';

export default function LandlordPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await getLandlordProperties();
      if (!res.error) setProperties(res.data || res || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading properties...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Landlord Properties</h1>
        <Link
          href="/dashboard/landlord/properties/new"
          className="bg-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-4 h-4" /> Add New Property
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-2">
            <div className="p-2 bg-blue-50 text-blue-600 w-fit rounded">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900">{p.title}</h3>
            <p className="text-xs text-gray-500">{p.location}</p>
            <p className="text-sm font-bold text-blue-600">${p.price} / month</p>
          </div>
        ))}
      </div>
    </div>
  );
}
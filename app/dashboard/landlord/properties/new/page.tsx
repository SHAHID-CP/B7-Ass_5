'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProperty } from '../../../_action/dashboardActions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', location: '', price: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createProperty({ ...form, price: Number(form.price) });
    if (!res.error) {
      router.push('/dashboard/landlord');
    } else {
      alert(res.error || 'Failed to create property');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
      <Link href="/dashboard/landlord" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="text-xl font-bold text-gray-900">Create New Property</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
          <input
            required
            type="text"
            className="w-full border px-3 py-2 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
          <input
            required
            type="text"
            className="w-full border px-3 py-2 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Monthly Rent ($)</label>
          <input
            required
            type="number"
            className="w-full border px-3 py-2 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded text-xs hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Create Property'}
        </button>
      </form>
    </div>
  );
}
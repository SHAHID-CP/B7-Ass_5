'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProperty } from '../../_action/landlordActions';
import { getCategories } from '@/app/dashboard/admin/_action/categoryActions';
import { PlusCircle, Loader2 } from 'lucide-react';

export default function AddPropertyPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    images: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800',
    categoryId: '',
  });

  // Load categories for dropdown
  useEffect(() => {
    const loadCategories = async () => {
      const res = await getCategories();
      if (res?.success && res?.data) {
        setCategories(res.data);
        if (res.data.length > 0) {
          setFormData((prev) => ({ ...prev, categoryId: res.data[0].id }));
        }
      }
      setLoadingCategories(false);
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      alert('Please select a category');
      return;
    }

    setSubmitting(true);
    const res = await createProperty({
      ...formData,
      price: Number(formData.price),
    });

    if (res?.error) {
      alert(res.error);
    } else {
      alert('Property created successfully!');
      router.push('/dashboard/landlord');
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center gap-2 border-b pb-4">
        <PlusCircle className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-900">Add New Property</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Property Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Modern 5 Bedroom Apartment"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Category
          </label>
          {loadingCategories ? (
            <div className="text-xs text-gray-400">Loading categories...</div>
          ) : (
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Location & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mirpur 10, Dhaka"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Price (৳)
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 6000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            required
            value={formData.images}
            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            required
            placeholder="Spacious flat with modern amenities..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
          Add Property
        </button>
      </form>
    </div>
  );
}
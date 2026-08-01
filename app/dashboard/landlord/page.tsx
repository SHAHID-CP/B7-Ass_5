'use client';

import { useEffect, useState } from 'react';
import { getMyProperties, deleteProperty, updateProperty } from './_action/landlordActions';
import { getCategories } from '../admin/_action/categoryActions';
import { Building, CheckCircle2, XCircle, Edit, Trash2, Loader2, X } from 'lucide-react';

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  
  const [editItem, setEditItem] = useState<any | null>(null);
  const [updating, setUpdating] = useState(false);

  const loadData = async () => {
    const [propRes, catRes] = await Promise.all([getMyProperties(), getCategories()]);
    if (propRes?.success) setProperties(propRes.data || []);
    if (catRes?.success) setCategories(catRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Delete
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    const res = await deleteProperty(id);
    if (res?.error) {
      alert(res.error);
    } else {
      await loadData();
    }
    setDeletingId(null);
  };

 
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    setUpdating(true);
    const res = await updateProperty(editItem.id, {
      title: editItem.title,
      description: editItem.description,
      location: editItem.location,
      price: Number(editItem.price),
      categoryId: editItem.categoryId,
      isAvailable: editItem.isAvailable,
      image: editItem.image,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      setEditItem(null);
      await loadData();
    }
    setUpdating(false);
  };

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading your properties...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Building className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Properties</h1>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 min-w-[650px]">
            <thead className="bg-gray-50 uppercase border-b text-gray-700 font-semibold">
              <tr>
                <th className="p-3">Property</th>
                <th className="p-3">Location</th>
                <th className="p-3">Price</th>
                <th className="p-3">Availability</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    No properties added yet.
                  </td>
                </tr>
              ) : (
                properties.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || 'https://via.placeholder.com/150'}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded-md border"
                        />
                        <span className="font-semibold text-gray-900 line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{item.location}</td>
                    <td className="p-3 font-semibold text-gray-900">৳{item.price}</td>
                    <td className="p-3">
                      {item.isAvailable ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <XCircle className="w-3 h-3" /> Booked
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium text-[11px]">
                        {item.category?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => setEditItem({ ...item, image: item.image || item.images })}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="Edit Property"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        disabled={deletingId === item.id}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50"
                        title="Delete Property"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Property Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full space-y-4 relative shadow-lg my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-gray-800">Edit Property</h2>
              <button onClick={() => setEditItem(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-3">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editItem.title}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                  className="w-full border rounded p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Image URL Input & Preview */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Image URL
                </label>
                <div className="space-y-2">
                  <input
                    type="url"
                    value={editItem.image || ''}
                    onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
                    className="w-full border rounded p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="https://example.com/image.png"
                    required
                  />
                  {editItem.image && (
                    <div className="flex items-center gap-2">
                      <img
                        src={editItem.image}
                        alt="Preview"
                        className="w-12 h-12 object-cover rounded border"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                      <span className="text-[10px] text-gray-400">Current Image Preview</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editItem.location}
                    onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
                    className="w-full border rounded p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price (৳)</label>
                  <input
                    type="number"
                    value={editItem.price}
                    onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                    className="w-full border rounded p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                <select
                  value={editItem.categoryId}
                  onChange={(e) => setEditItem({ ...editItem, categoryId: e.target.value })}
                  className="w-full border rounded p-2 text-sm outline-none bg-white focus:ring-1 focus:ring-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full border rounded p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Availability Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={editItem.isAvailable}
                  onChange={(e) => setEditItem({ ...editItem, isAvailable: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <label htmlFor="isAvailable" className="text-xs font-semibold text-gray-700 cursor-pointer">
                  Is Available for Rent
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2 border-t pt-3">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 transition disabled:opacity-50"
                >
                  {updating && <Loader2 className="w-3 h-3 animate-spin" />} Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { getCategories, createCategory, deleteCategory } from '../_action/categoryActions';
import { Layers, Plus, Trash2, Loader2 } from 'lucide-react';

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load categories
  const loadCategories = async () => {
    const res = await getCategories();
    if (res?.success) {
      setCategories(res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Handle Add Category
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setSubmitting(true);
    const res = await createCategory(newCategory.trim());

    if (res?.error) {
      alert(res.error || 'Failed to add category');
    } else {
      setNewCategory('');
      await loadCategories();
    }
    setSubmitting(false);
  };

  // Handle Delete Category
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    const res = await deleteCategory(id);

    if (res?.error) {
      alert(res.error || 'Failed to delete category');
    } else {
      await loadCategories();
    }
    setDeletingId(null);
  };

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading categories...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Layers className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Manage Categories
        </h1>
      </div>

      {/* Create Category Form */}
      <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Add New Category</h2>
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Category name (e.g., Warehouse, Apartment)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <button
            type="submit"
            disabled={submitting || !newCategory.trim()}
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Add Category
          </button>
        </form>
      </div>

      {/* Categories Table - Responsive Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 min-w-[500px]">
            <thead className="bg-gray-50 uppercase border-b text-gray-700 font-semibold">
              <tr>
                <th className="p-3 w-1/3">Category ID</th>
                <th className="p-3">Category Name</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-400">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    {/* ID */}
                    <td className="p-3 font-mono text-gray-400 text-[11px]">
                      {item.id}
                    </td>

                    {/* Name */}
                    <td className="p-3 font-semibold text-gray-800 text-sm">
                      {item.name}
                    </td>

                    {/* Delete Action */}
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={deletingId === item.id}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50"
                        title="Delete Category"
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
    </div>
  );
}
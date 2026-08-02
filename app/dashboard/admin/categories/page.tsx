'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCategories, createCategory, deleteCategory } from '../_action/categoryActions';
import { Layers, Plus, Trash2, Loader2, Tag, Hash, AlertCircle } from 'lucide-react';
import { CategoryFormData, categorySchema } from '@/utils/contactValidation';

interface Category {
  id: string;
  name: string;
  _count?: {
    properties?: number;
  };
}



export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    mode: 'onTouched',
  });

  // Load categories
  const loadCategories = useCallback(async () => {
    try {
      const res = await getCategories();
      if (res?.success) {
        setCategories(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Handle Add Category
  const handleCreate = async (data: CategoryFormData) => {
    setSubmitting(true);
    try {
      const res = await createCategory(data.name);

      if (res?.error) {
        alert(res.error || 'Failed to add category');
      } else {
        reset();
        await loadCategories();
      }
    } catch (err) {
      console.error('Error creating category:', err);
      alert('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete Category
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    try {
      const res = await deleteCategory(id);

      if (res?.error) {
        alert(res.error || 'Failed to delete category');
      } else {
        await loadCategories();
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('An unexpected error occurred.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-blue-600" />
        <span>Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="p-2 bg-purple-50 text-blue-600 rounded-xl shrink-0">
          <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">
            Manage Categories
          </h1>
          <p className="text-xs text-gray-500">
            Create and organize property categories for your platform
          </p>
        </div>
      </div>

      {/* Create Category Form */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-blue-600" />
          Add New Category
        </h2>
        
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-2" noValidate>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="e.g., Warehouse, Apartment, Duplex"
                {...register('name')}
                className={`w-full border rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none transition bg-gray-50/30 focus:bg-white ${
                  errors.name
                    ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-blue-500'
                }`}
              />
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-xs disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed shrink-0"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message Display */}
          {errors.name && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.name.message}</span>
            </p>
          )}
        </form>
      </div>

      {/* Categories Content Area */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-12 p-6 space-y-2">
            <Layers className="w-9 h-9 text-gray-300 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-semibold text-gray-600">No categories found</p>
            <p className="text-xs text-gray-400">Add a new category above to get started.</p>
          </div>
        ) : (
          <>
            {/* Mobile View: Cards */}
            <div className="block md:hidden divide-y divide-gray-100">
              {categories.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] font-mono text-gray-400 flex items-center gap-0.5">
                      <Hash className="w-2.5 h-2.5" />
                      <span className="truncate">{item.id}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    disabled={deletingId === item.id}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition disabled:opacity-50 shrink-0 border border-rose-100 cursor-pointer"
                    title="Delete Category"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50/80 uppercase text-gray-500 font-semibold border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-4 w-1/3">Category ID</th>
                    <th className="py-3.5 px-4">Category Name</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {categories.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">
                        {item.id}
                      </td>

                      {/* Name */}
                      <td className="py-3.5 px-4 font-bold text-gray-900 text-xs sm:text-sm">
                        {item.name}
                      </td>

                      {/* Delete Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          disabled={deletingId === item.id}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 hover:border-rose-200 border border-transparent rounded-lg transition disabled:opacity-50 cursor-pointer"
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
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
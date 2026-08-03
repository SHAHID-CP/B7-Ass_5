'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getMyProperties, deleteProperty, updateProperty, getLandlordOverview } from './_action/landlordActions';
import { getCategories } from '../admin/_action/categoryActions';
import { 
  Building, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Trash2, 
  Loader2, 
  X, 
  Building2, 
  Inbox, 
  Wallet, 
  ArrowRight, 
  MapPin, 
  Plus, 
  Image as ImageIcon 
} from 'lucide-react';

import { toast } from 'sonner';
import { PropertyFormDataUpdate, propertySchemaUpadte } from '@/utils/contactValidation';

// --- Types ---
interface Category {
  id: string;
  name: string;
}

interface Property {
  id: string;
  title: string;
  description?: string;
  location: string;
  price: number | string;
  isAvailable: boolean;
  categoryId?: string;
  category?: Category;
  image?: string;
}



export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Property | null>(null);



  const [data, setData] = useState<{
    totalProperties: number;
    activeRequests: number;
    totalEarnings: number;
    recentProperties: any[];
    recentRentals: any[];
  } | null>(null);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      const res = await getLandlordOverview();
      if (res.success && res.data) {
        setData(res.data);
      }
      setLoading(false);
    }
    loadStats();
  }, []);



  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormDataUpdate>({
    resolver: zodResolver(propertySchemaUpadte),
  });

  // Image URL Watcher for Live Preview inside Modal
  const watchedImage = watch('image');

  // Load Initial Data
  const loadData = useCallback(async () => {
    try {
      const [propRes, catRes] = await Promise.all([getMyProperties(), getCategories()]);
      if (propRes?.success) setProperties(propRes.data || []);
      if (catRes?.success) setCategories(catRes.data || []);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Open Edit Modal & Populate Form Values
  const handleOpenEditModal = (item: Property) => {
    setEditItem(item);
    reset({
      title: item.title,
      image: item.image || '',
      location: item.location,
      price: Number(item.price),
      categoryId: item.categoryId || item.category?.id || '',
      description: item.description || '',
      isAvailable: item.isAvailable,
    });
  };

  // Close Modal
  const handleCloseModal = () => {
    setEditItem(null);
    reset();
  };

  // Handle Delete
  const handleDelete = async (id: string, title: string) => {
    setDeletingId(id);
    try {
      const res = await deleteProperty(id);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Property deleted successfully")
        setProperties((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      toast.error('Failed to delete property.');
    } finally {
      setDeletingId(null);
    }
  };

  // Handle Form Submit (Update Property)
  const onSubmit = async (data: PropertyFormDataUpdate) => {
    if (!editItem) return;

    try {
      const res = await updateProperty(editItem.id, data);

      if (res?.error) {
        toast.error(res.error);
      } else {
        handleCloseModal();
        toast.success("Update property successfully")
        await loadData();
      }
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update property.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-blue-600" />
        <span>Loading your properties...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-100 pb-4 sm:pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Landlord Overview</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Track your properties, incoming rental applications, and revenue.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
        {/* Card 1: Total Properties */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Listed Properties</span>
            <div className="p-2 sm:p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{data?.totalProperties || 0}</h2>
            <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
              Total
            </span>
          </div>
        </div>

        {/* Card 2: Active Requests */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Active / Pending Requests</span>
            <div className="p-2 sm:p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Inbox className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{data?.activeRequests || 0}</h2>
            <Link href="/dashboard/landlord/requests" className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Total Earnings */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3 sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Rent Revenue</span>
            <div className="p-2 sm:p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">৳{data?.totalEarnings?.toLocaleString() || 0}</h2>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              Approved Sum
            </span>
          </div>
        </div>
      </div>




      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Building className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">My Properties</h1>
            <p className="text-xs text-gray-500">Manage and update your listed rentals</p>
          </div>
        </div>

        <Link
          href="/dashboard/landlord/properties/new"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Property</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {properties.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Building className="w-10 h-10 text-gray-300 mx-auto" />
            <div className="text-xs sm:text-sm text-gray-500">No properties added yet.</div>
            <Link
              href="/dashboard/landlord/properties/new"
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add your first property
            </Link>
          </div>
        ) : (
          <div>
            {/* Mobile View */}
            <div className="block md:hidden divide-y divide-gray-100">
              {properties.map((item) => {
                const imgUrl =  item.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800';
                return (
                  <div key={item.id} className="p-4 space-y-3">
                    <div className="flex gap-3">
                      <img
                        src={imgUrl}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-100 shrink-0 bg-gray-50"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{item.title}</h3>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 shrink-0 text-gray-400" /> {item.location}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-extrabold text-gray-900 text-xs">৳{item.price}</span>
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium text-[10px]">
                            {item.category?.name || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div>
                        {item.isAvailable ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-200/60">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-rose-200/60">
                            <XCircle className="w-3 h-3 text-rose-600" /> Booked
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                          title="Edit Property"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          disabled={deletingId === item.id}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition disabled:opacity-50 cursor-pointer"
                          title="Delete Property"
                        >
                          {deletingId === item.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50/80 uppercase border-b border-gray-100 text-gray-500 font-semibold">
                  <tr>
                    <th className="p-3.5">Property</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Availability</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {properties.map((item) => {
                    const imgUrl = item.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800';
                    return (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={imgUrl}
                              alt={item.title}
                              className="w-10 h-10 object-cover rounded-lg border border-gray-100 shrink-0 bg-gray-50"
                              onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                            />
                            <span className="font-bold text-gray-900 line-clamp-1">{item.title}</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-gray-600 max-w-[180px] truncate">{item.location}</td>
                        <td className="p-3.5 font-bold text-gray-900">৳{item.price}</td>
                        <td className="p-3.5">
                          {item.isAvailable ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-200/60">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-rose-200/60">
                              <XCircle className="w-3 h-3 text-rose-600" /> Booked
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
                            {item.category?.name || 'N/A'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                            title="Edit Property"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            disabled={deletingId === item.id}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition disabled:opacity-50 cursor-pointer"
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Property Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4 z-50">
          <div 
            className="bg-white rounded-2xl p-5 sm:p-6 max-w-lg w-full space-y-4 relative shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Edit Property</h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form using React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
                {errors.title && (
                  <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.title.message}</p>
                )}
              </div>

              {/* Image URL Input & Preview */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Image URL</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    {...register('image')}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {errors.image && (
                    <p className="text-rose-500 text-[11px] mt-0.5 font-medium">{errors.image.message}</p>
                  )}

                  {/* Live Image Preview using RHF watch */}
                  {watchedImage && !errors.image && (
                    <div className="flex items-center gap-2.5 bg-gray-50 p-2 rounded-xl border border-gray-100">
                      <img
                        src={watchedImage}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                      <span className="text-[11px] text-gray-500 flex items-center gap-1 font-medium">
                        <ImageIcon className="w-3 h-3 text-blue-600" /> Image Preview
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    {...register('location')}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                  {errors.location && (
                    <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.location.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price (৳)</label>
                  <input
                    type="number"
                    {...register('price')}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                  {errors.price && (
                    <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.price.message}</p>
                  )}
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                <select
                  {...register('categoryId')}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition cursor-pointer"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.categoryId.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  {...register('description')}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
                {errors.description && (
                  <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.description.message}</p>
                )}
              </div>

              {/* Availability Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isAvailable"
                  {...register('isAvailable')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
                <label htmlFor="isAvailable" className="text-xs font-semibold text-gray-700 cursor-pointer select-none">
                  Is Available for Rent
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2 border-t border-gray-100 pt-3.5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-[0.98] flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
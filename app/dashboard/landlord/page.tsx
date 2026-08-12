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
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Image Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [overviewData, setOverviewData] = useState<{
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
        setOverviewData(res.data);
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
      toast.error('Failed to load data:');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Pagination Logic Calculations
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = properties.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Open Edit Modal & Populate Form Values
  const handleOpenEditModal = (item: Property) => {
    setEditItem(item);
    setSelectedFile(null); // Reset previously selected file
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
    setSelectedFile(null);
    reset();
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteProperty(id);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Property deleted successfully");
        setProperties((prev) => {
          const updated = prev.filter((p) => p.id !== id);
          // If current page gets empty after deletion, move back one page
          if ((currentPage - 1) * itemsPerPage >= updated.length && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
          return updated;
        });
      }
    } catch (err) {
      toast.error('Failed to delete property.');
    } finally {
      setDeletingId(null);
    }
  };

  // Handle Form Submit (Update Property)
  const onSubmit = async (formDataValues: PropertyFormDataUpdate) => {
    if (!editItem) return;

    try {
      let finalImageUrl = formDataValues.image || '';

      if (!selectedFile && !finalImageUrl) {
        toast.error('Please select an image file!');
        return;
      }

      if (selectedFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: 'POST', body: formData }
        );

        const imgbbData = await imgbbRes.json();

        if (imgbbData.success) {
          finalImageUrl = imgbbData.data.url;
        } else {
          toast.error('Image upload failed!');
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      const res = await updateProperty(editItem.id, {
        ...formDataValues,
        price: Number(formDataValues.price),
        image: finalImageUrl || "",
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        handleCloseModal();
        toast.success("Property updated successfully");
        await loadData();
      }
    } catch (err) {
      toast.error('Failed to update property.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-emerald-600 dark:text-emerald-500" />
        <span>Loading your properties...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 sm:pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Landlord Overview</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track your properties, incoming rental applications, and revenue.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
        {/* Card 1: Total Properties */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Listed Properties</span>
            <div className="p-2 sm:p-2.5 bg-blue-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{overviewData?.totalProperties || 0}</h2>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
              Total
            </span>
          </div>
        </div>

        {/* Card 2: Active Requests */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Active / Pending Requests</span>
            <div className="p-2 sm:p-2.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
              <Inbox className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{overviewData?.activeRequests || 0}</h2>
            <Link href="/dashboard/landlord/requests" className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Total Earnings */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition space-y-3 sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Rent Revenue</span>
            <div className="p-2 sm:p-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">৳{overviewData?.totalEarnings?.toLocaleString() || 0}</h2>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
              Approved Sum
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Building className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">My Properties</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Manage and update your listed rentals</p>
          </div>
        </div>

        <Link
          href="/dashboard/landlord/properties/new"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Property</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs overflow-hidden">
        {properties.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Building className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto" />
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">No properties added yet.</div>
            <Link
              href="/dashboard/landlord/properties/new"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add your first property
            </Link>
          </div>
        ) : (
          <div>
            {/* Mobile View */}
            <div className="block md:hidden divide-y divide-gray-100 dark:divide-gray-800">
              {paginatedProperties.map((item) => {
                const imgUrl = item.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800';
                return (
                  <div key={item.id} className="p-4 space-y-3">
                    <div className="flex gap-3">
                      <img
                        src={imgUrl}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-100 dark:border-gray-800 shrink-0 bg-gray-50 dark:bg-gray-800"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm truncate">{item.title}</h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 shrink-0 text-gray-400 dark:text-gray-500" /> {item.location}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-extrabold text-gray-900 dark:text-white text-xs">৳{item.price}</span>
                          <span className="bg-blue-50 dark:bg-blue-950/60 text-emerald-700 dark:text-blue-300 px-2 py-0.5 rounded-md font-medium text-[10px]">
                            {item.category?.name || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800">
                      <div>
                        {item.isAvailable ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-rose-200/60 dark:border-rose-800/60">
                            <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Booked
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition cursor-pointer"
                          title="Edit Property"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="p-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition disabled:opacity-50 cursor-pointer"
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
              <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-50/80 dark:bg-gray-800/60 uppercase border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-semibold">
                  <tr>
                    <th className="p-3.5">Property</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Availability</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {paginatedProperties.map((item) => {
                    const imgUrl = item.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800';
                    return (
                      <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={imgUrl}
                              alt={item.title}
                              className="w-10 h-10 object-cover rounded-lg border border-gray-100 dark:border-gray-800 shrink-0 bg-gray-50 dark:bg-gray-800"
                              onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                            />
                            <span className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-gray-600 dark:text-gray-400 max-w-[180px] truncate">{item.location}</td>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-white">৳{item.price}</td>
                        <td className="p-3.5">
                          {item.isAvailable ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-rose-200/60 dark:border-rose-800/60">
                              <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Booked
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className="bg-blue-50 dark:bg-blue-950/60 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
                            {item.category?.name || 'N/A'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition cursor-pointer"
                            title="Edit Property"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="p-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition disabled:opacity-50 cursor-pointer"
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {Math.min(endIndex, properties.length)}
                  </span>{' '}
                  of <span className="font-semibold text-gray-700 dark:text-gray-300">{properties.length}</span> properties
                </p>

                <div className="flex items-center gap-1.5">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-gray-800 transition cursor-pointer"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Number Buttons */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                          currentPage === page
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-gray-800 transition cursor-pointer"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Property Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4 z-50">
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 max-w-lg w-full space-y-4 relative shadow-xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">Edit Property</h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form using React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-emerald-600 transition"
                />
                {errors.title && (
                  <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.title.message}</p>
                )}
              </div>

              {/* Image Input & Preview */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Image File</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-slate-500 dark:text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 dark:file:bg-blue-950/60 file:text-emerald-700 dark:file:text-emerald-300 hover:file:bg-blue-100 dark:hover:file:bg-emerald-900 transition cursor-pointer border border-gray-300 dark:border-gray-700 rounded-xl"
                  />
                  {errors.image && (
                    <p className="text-rose-500 text-[11px] mt-0.5 font-medium">{errors.image.message}</p>
                  )}

                  {/* Live Image Preview using RHF watch */}
                  {(selectedFile || watchedImage) && !errors.image && (
                    <div className="flex items-center gap-2.5 bg-gray-50 dark:bg-gray-800 p-2 rounded-xl border border-gray-100 dark:border-gray-700">
                      <img
                        src={selectedFile ? URL.createObjectURL(selectedFile) : watchedImage}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shrink-0 bg-white"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 font-medium">
                        <ImageIcon className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Image Preview
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    {...register('location')}
                    className="w-full border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-emerald-600 transition"
                  />
                  {errors.location && (
                    <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.location.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Price (৳)</label>
                  <input
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                    className="w-full border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-emerald-600 transition"
                  />
                  {errors.price && (
                    <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.price.message}</p>
                  )}
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  {...register('categoryId')}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 text-xs sm:text-sm outline-none bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-emerald-600 transition cursor-pointer"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} className="dark:bg-gray-800 dark:text-white">
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
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  {...register('description')}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-emerald-600 transition"
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
                  className="rounded border-gray-300 dark:border-gray-700 text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                />
                <label htmlFor="isAvailable" className="text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                  Is Available for Rent
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800 pt-3.5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:scale-[0.98] flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
                >
                  {(isSubmitting || uploading) && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
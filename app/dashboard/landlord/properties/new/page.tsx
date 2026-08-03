'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import { createProperty } from '../../_action/landlordActions';
import { getCategories } from '@/app/dashboard/admin/_action/categoryActions';
import { PlusCircle, Loader2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { PropertyFormData, propertySchema } from '@/utils/contactValidation';

// --- Types ---
interface Category {
  id: string;
  name: string;
}



export default function AddPropertyPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

 
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
      resolver: zodResolver(propertySchema),
      defaultValues: {
      title: '',
      description: '',
      location: '',
      price: undefined,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800',
      categoryId: '',
    },
  });

  // Watch image for live preview
  const watchedImage = watch('image');

  // Load Categories for dropdown
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        if (res?.success && res?.data) {
          setCategories(res.data);
          if (res.data.length > 0) {
            // Automatically set first category as default
            setValue('categoryId', res.data[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, [setValue]);

  // Handle Form Submit
  const onSubmit = async (data: PropertyFormDataa) => {
    try {
      const res = await createProperty(data);

      if (res?.error) {
        console.log(res.error);
        toast.error(res.error);
      } else {
        toast.success('Property created successfully!');
        router.push('/dashboard/landlord');
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Failed to create property.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-3.5 sm:px-0 py-4 sm:py-6">
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-5 sm:space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Add New Property</h1>
              <p className="text-xs text-gray-500">Fill in the details to list a new rental property</p>
            </div>
          </div>
          <Link
            href="/dashboard/landlord"
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Property Title
            </label>
            <input
              type="text"
              placeholder="e.g. Modern 3 Bedroom Apartment in Gulshan"
              {...register('title')}
              className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
            {errors.title && (
              <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.title.message}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Category
            </label>
            {loadingCategories ? (
              <div className="w-full border border-gray-200 bg-gray-50 rounded-xl p-2.5 text-xs text-gray-400 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" /> Loading categories...
              </div>
            ) : (
              <select
                {...register('categoryId')}
                className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white transition cursor-pointer"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {errors.categoryId && (
              <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Location & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Mirpur 10, Dhaka"
                {...register('location')}
                className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
              {errors.location && (
                <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Price (৳) / Month
              </label>
              <input
                type="number"
                placeholder="e.g. 15000"
                {...register('price')}
                className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
              {errors.price && (
                <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Image URL & Preview */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Image URL
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                {...register('image')}
                className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
              {errors.image && (
                <p className="text-rose-500 text-[11px] mt-0.5 font-medium">{errors.image.message}</p>
              )}
              
              {watchedImage && !errors.image && (
                <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <img
                    src={watchedImage}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                    onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  />
                  <div className="text-[11px] text-gray-500 min-w-0">
                    <span className="font-semibold text-gray-700 block flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-blue-600" /> Image Preview
                    </span>
                    <span className="truncate block text-gray-400">{watchedImage}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Provide key highlights: bedrooms, bathrooms, balcony, generator backup, security, etc."
              {...register('description')}
              className="w-full border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
            {errors.description && (
              <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.description.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-2.5 sm:py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs disabled:opacity-50 touch-manipulation cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding Property...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Property</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
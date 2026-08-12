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

interface Category {
  id: string;
  name: string;
}

export default function AddPropertyPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
      price: 0,
      image: '',
      categoryId: '',
    },
  });

  const watchedImage = watch('image');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        if (res?.success && res?.data) {
          setCategories(res.data);
          if (res.data.length > 0) {
            setValue('categoryId', res.data[0].id);
          }
        }
      } catch (error) {
        toast.error('Failed to fetch categories:');
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, [setValue]);

  const onSubmit = async (data: PropertyFormData) => {
    try {
      let finalImageUrl = data.image;

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

      const updatedData = {
        ...data,
        price: Number(data.price),
        image: finalImageUrl || "",
      };

      const res = await createProperty(updatedData);

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Property created successfully!');
        router.push('/dashboard/landlord');
      }
    } catch (err) {
      toast.error('Failed to create property.');
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-3.5 sm:px-0 py-4 sm:py-6">
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-5 sm:space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Add New Property</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Fill in the details to list a new rental property</p>
            </div>
          </div>
          <Link
            href="/dashboard/landlord"
            className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/80 px-3 py-2 rounded-xl transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Property Title
            </label>
            <input
              type="text"
              placeholder="e.g. Modern 3 Bedroom Apartment in Gulshan"
              {...register('title')}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
            />
            {errors.title && (
              <p className="text-rose-500 dark:text-rose-400 text-[11px] mt-1 font-medium">{errors.title.message}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            {loadingCategories ? (
              <div className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600 dark:text-emerald-400" /> Loading categories...
              </div>
            ) : (
              <select
                {...register('categoryId')}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition cursor-pointer"
              >
                <option value="" disabled className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {errors.categoryId && (
              <p className="text-rose-500 dark:text-rose-400 text-[11px] mt-1 font-medium">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Location & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Mirpur 10, Dhaka"
                {...register('location')}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
              />
              {errors.location && (
                <p className="text-rose-500 dark:text-rose-400 text-[11px] mt-1 font-medium">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Price (৳) / Month
              </label>
              <input
                type="number"
                placeholder="e.g. 15000"
                {...register('price', { valueAsNumber: true })}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
              />
              {errors.price && (
                <p className="text-rose-500 dark:text-rose-400 text-[11px] mt-1 font-medium">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Property Image File Upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Property Image
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="w-full text-xs text-slate-500 dark:text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 dark:file:bg-emerald-950/60 file:text-emerald-700 dark:file:text-emerald-400 hover:file:bg-emerald-100 dark:hover:file:bg-emerald-900/60 transition cursor-pointer border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
              />
              {errors.image && (
                <p className="text-rose-500 dark:text-rose-400 text-[11px] mt-0.5 font-medium">{errors.image.message}</p>
              )}
              
              {/* Image Preview */}
              {(selectedFile || watchedImage) && (
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700/80">
                  <img
                    src={selectedFile ? URL.createObjectURL(selectedFile) : watchedImage}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shrink-0 bg-white dark:bg-gray-800"
                  />
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 min-w-0">
                    <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> 
                      {selectedFile ? 'Selected Image Preview' : 'Image Preview'}
                    </span>
                    <span className="truncate block text-gray-400 dark:text-gray-500">
                      {selectedFile ? selectedFile.name : watchedImage}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Provide key highlights: bedrooms, bathrooms, balcony, generator backup, security, etc."
              {...register('description')}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
            />
            {errors.description && (
              <p className="text-rose-500 dark:text-rose-400 text-[11px] mt-1 font-medium">{errors.description.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || uploading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:scale-[0.99] text-white font-semibold py-2.5 sm:py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs disabled:opacity-50 touch-manipulation cursor-pointer"
            >
              {isSubmitting || uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{uploading ? 'Uploading Image...' : 'Adding Property...'}</span>
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
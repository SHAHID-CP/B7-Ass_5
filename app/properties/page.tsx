'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; 
import { Building2, MapPin, Search, Filter, Loader2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCategories, getProperties } from './_action/publicPropertyActions';
import { toast } from 'sonner';
import BrowsePropertiesSkeleton from '@/skeleton/browsePropertiesSkeleton';

export default function BrowsePropertiesPage() {
  const searchParams = useSearchParams(); 
  const urlCategoryId = searchParams.get('categoryId'); 

  const [properties, setProperties] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // Sort & Pagination State
  const [sortBy, setSortBy] = useState('createdAt-desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; 

  useEffect(() => {
    if (urlCategoryId) {
      setCategoryId(urlCategoryId);
    }
  }, [urlCategoryId]);

  useEffect(() => {
    async function loadCategories() {
      const catRes = await getCategories();
      if (catRes?.success) setCategories(catRes.data);
    }
    loadCategories();
  }, []);

  const fetchFilteredData = async () => {
    setLoading(true);
    try {
      const res = await getProperties({ 
        location, 
        minPrice, 
        maxPrice, 
        categoryId,
        sortBy,
        page,
        limit
      });

      if (res?.success && res.data) {
        setProperties(res.data.items || []);
        setTotalPages(res.data.meta?.totalPages || 1);
      }
    } catch (error) {
      toast.error('Error fetching properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredData();
    }, 500);

    return () => clearTimeout(timer);
  }, [location, minPrice, maxPrice, categoryId, sortBy, page]);

  const handleResetFilters = () => {
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setCategoryId('');
    setSortBy('createdAt-desc');
    setPage(1);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); 
    fetchFilteredData();
  };

  const isFiltered = Boolean(location || minPrice || maxPrice || categoryId || sortBy !== 'createdAt-desc');

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 transition-colors">
      {/* Filter Bar */}
      <form 
        onSubmit={handleFilterSubmit} 
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Filter className="w-5 h-5 text-emerald-600 dark:text-emerald-500" /> Filter & Search Properties
          </h2>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Location (e.g. Dhaka)"
            value={location}
            onChange={(e) => { setLocation(e.target.value); setPage(1); }}
            className="w-full px-3.5 py-2.5 sm:py-2 border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
          />

          <select
            value={categoryId}
            onChange={(e) => { setCategoryId(e.target.value); setPage(1); }}
            className="w-full px-3.5 py-2.5 sm:py-2 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 cursor-pointer transition"
          >
            <option value="" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
            className="w-full px-3.5 py-2.5 sm:py-2 border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
            className="w-full px-3.5 py-2.5 sm:py-2 border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
          />

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
            className="w-full px-3.5 py-2.5 sm:py-2 border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer transition"
          >
            <option value="createdAt-desc" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Newest First</option>
            <option value="createdAt-asc" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Oldest First</option>
            <option value="price-asc" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Price: Low to High</option>
            <option value="price-desc" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Price: High to Low</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Search className="w-4 h-4" /> Apply Filters
          </button>
        </div>
      </form>

      {/* Property Cards Grid */}
      {loading ? (
      <BrowsePropertiesSkeleton></BrowsePropertiesSkeleton>
      ) : properties.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
          <Building2 className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">No properties found matching your criteria.</p>
          {isFiltered && (
            <button 
              onClick={handleResetFilters} 
              className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md dark:hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div className="h-48 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover hover:scale-105 transition duration-300" 
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-slate-400 dark:text-slate-600" />
                  )}
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {item.category?.name || 'Property'}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2">{item.description}</p>
                  
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {item.location}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-3">
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">৳{item.price}</span>
                    <Link
                      href={`/properties/${item.id}`}
                      className="text-xs font-semibold px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-xl transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>

              <span className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; 
import { Building2, MapPin, Search, Filter, Loader2, RotateCcw } from 'lucide-react';
import { getCategories, getProperties } from './_action/publicPropertyActions';

export default function BrowsePropertiesPage() {
  const searchParams = useSearchParams(); 
  const urlCategoryId = searchParams.get('categoryId'); 

  const [properties, setProperties] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');


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
      const res = await getProperties({ location, minPrice, maxPrice, categoryId });
      if (res?.success) setProperties(res.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredData();
    }, 500);

    return () => clearTimeout(timer);
  }, [location, minPrice, maxPrice, categoryId]);


  const handleResetFilters = () => {
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setCategoryId('');
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFilteredData();
  };

  const isFiltered = Boolean(location || minPrice || maxPrice || categoryId);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Filter Bar */}
      <form onSubmit={handleFilterSubmit} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" /> Filter & Search Properties
          </h2>

          {/* Reset / Clear Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Location Input */}
          <input
            type="text"
            placeholder="Location (e.g. Dhaka)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />

          {/* Category Dropdown */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer transition"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* Min Price Input */}
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />

          {/* Max Price Input */}
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Search className="w-4 h-4" /> Apply Filters
          </button>
        </div>
      </form>

      {/* Results List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 font-medium">No properties found matching your criteria.</p>
          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="mt-3 text-xs text-blue-600 hover:underline font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div className="h-48 bg-gray-100 relative flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                ) : (
                  <Building2 className="w-12 h-12 text-gray-400" />
                )}
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {item.category?.name || 'Property'}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> {item.location}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                  <span className="text-lg font-bold text-blue-600">৳{item.price}</span>
                  <Link
                    href={`/properties/${item.id}`}
                    className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
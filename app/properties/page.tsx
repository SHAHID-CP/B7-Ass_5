'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Building2, MapPin, Search, Filter, Loader2 } from 'lucide-react';
import { getCategories, getProperties } from './_action/publicPropertyActions';


export default function BrowsePropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const fetchFilteredData = async () => {
    setLoading(true);
    const res = await getProperties({ location, minPrice, maxPrice, categoryId });
    if (res?.success) setProperties(res.data);
    setLoading(false);
  };

  useEffect(() => {
    async function init() {
      const catRes = await getCategories();
      if (catRes?.success) setCategories(catRes.data);
      await fetchFilteredData();
    }
    init();
  }, []);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFilteredData();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Filter Bar */}
      <form onSubmit={handleFilterSubmit} className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" /> Filter & Search Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Location (e.g. Dhaka)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-blue-600"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-blue-600"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-blue-600"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-blue-600"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" /> Apply Filters
        </button>
      </form>

      {/* Results List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No properties found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((item) => (
            <div key={item.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="h-48 bg-gray-200 relative flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-12 h-12 text-gray-400" />
                )}
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {item.category?.name || 'Property'}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> {item.location}
                </p>
                <div className="flex items-center justify-between border-t pt-3 mt-3">
                  <span className="text-lg font-bold text-blue-600">৳{item.price}</span>
                  <Link
                    href={`/properties/${item.id}`}
                    className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition"
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
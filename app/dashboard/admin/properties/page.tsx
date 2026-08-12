'use client';

import { useEffect, useState, useMemo } from 'react';
import { getAllPropertiesAdmin } from '../_action/adminActions';
import { 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  MapPin, 
  Tag, 
  User, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface PropertyItem {
  id: string;
  title: string;
  location: string;
  price: number;
  isAvailable: boolean;
  category?: {
    id?: string;
    name?: string;
  };
  landlord?: {
    id?: string;
    name?: string;
    email?: string;
  };
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Client-side Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      const res = await getAllPropertiesAdmin();
      if (res?.success) {
        setProperties(res.data || []);
      }
      setLoading(false);
    };
    loadProperties();
  }, []);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(properties.length / itemsPerPage));

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return properties.slice(startIndex, startIndex + itemsPerPage);
  }, [properties, currentPage, itemsPerPage]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-blue-600" />
        <span>Loading all properties...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="p-2 bg-purple-50 text-blue-600 rounded-xl shrink-0">
          <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">
            All Properties
          </h1>
          <p className="text-xs text-gray-500">
            View and manage all listed properties across the platform
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      {properties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 p-6 space-y-2">
          <Building2 className="w-10 h-10 text-gray-300 mx-auto" />
          <p className="text-xs sm:text-sm font-medium text-gray-500">
            No properties found in the system.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          {/* Mobile View: Responsive Cards */}
          <div className="block md:hidden divide-y divide-gray-100">
            {paginatedProperties.map((item) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>
                  {item.isAvailable ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200/60 px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0">
                      <XCircle className="w-3 h-3" /> Booked
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 bg-gray-50/60 p-2.5 rounded-xl border border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Category</span>
                    <span className="font-semibold text-blue-700 text-[11px] flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {item.category?.name || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Landlord</span>
                    <span className="font-semibold text-gray-800 text-[11px] flex items-center gap-1 truncate">
                      <User className="w-3 h-3 text-gray-400 shrink-0" />
                      {item.landlord?.name || 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-500 text-[11px]">Monthly Rent:</span>
                  <span className="font-extrabold text-gray-900 text-xs">৳{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50/80 uppercase text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Landlord Name</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedProperties.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    {/* Title */}
                    <td className="py-3.5 px-4 font-bold text-gray-900 max-w-[220px] truncate">
                      {item.title}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-gray-600 max-w-[180px] truncate">
                      {item.location}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="bg-purple-50 text-blue-700 border border-purple-200/60 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                        {item.category?.name || 'N/A'}
                      </span>
                    </td>

                    {/* Landlord Name */}
                    <td className="py-3.5 px-4 font-medium text-gray-800">
                      {item.landlord?.name || 'N/A'}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-extrabold text-gray-900">
                      ৳{item.price}
                    </td>

                    {/* Is Available */}
                    <td className="py-3.5 px-4">
                      {item.isAvailable ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                          <XCircle className="w-3 h-3 text-rose-600" /> Booked
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between p-3.5 border-t border-gray-100 bg-gray-50/50 text-xs">
            <span className="text-gray-500">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({properties.length} total properties)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40 transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40 transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
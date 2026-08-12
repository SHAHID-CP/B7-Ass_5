'use client';

import { useEffect, useState, useMemo } from 'react';
import { getAllRentalsAdmin } from '../_action/adminActions';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  CreditCard, 
  User, 
  Building, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface RentalItem {
  id: string;
  status: string;
  createdAt?: string;
  property?: {
    id?: string;
    title?: string;
    price?: number;
    isAvailable?: boolean;
  };
  tenant?: {
    id?: string;
    name?: string;
    email?: string;
  };
  payment?: {
    status?: string;
    amount?: number;
  };
}

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Client-side Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadRentals = async () => {
      setLoading(true);
      try {
        const res = await getAllRentalsAdmin();
        if (res?.success) {
          setRentals(res.data || []);
        }
      } catch (error) {
        console.error('Failed to load admin rentals:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRentals();
  }, []);

  // Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(rentals.length / itemsPerPage));

  const paginatedRentals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return rentals.slice(startIndex, startIndex + itemsPerPage);
  }, [rentals, currentPage, itemsPerPage]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-blue-600 dark:text-blue-400" />
        <span>Loading all rental requests...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            All Rental Requests
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Overview of all tenant rental applications and payment status
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      {rentals.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6 space-y-2 transition-colors">
          <FileText className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            No rental requests found in the system.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
          {/* Mobile View: Responsive Cards */}
          <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {paginatedRentals.map((item) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5 truncate">
                      <Building className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="truncate">{item.property?.title || 'N/A'}</span>
                    </h3>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 pl-5">
                      ৳{item.property?.price || item.payment?.amount || 0}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shrink-0 ${
                      item.status === 'PAID' || item.status === 'APPROVED'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
                        : item.status === 'PENDING'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 bg-slate-50/60 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">Tenant</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 truncate">
                      <User className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate">{item.tenant?.name || 'N/A'}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-medium">Payment</span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        item.payment?.status === 'COMPLETED'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      <CreditCard className="w-3 h-3 shrink-0" />
                      {item.payment?.status || 'PENDING'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Property Available:</span>
                  {item.property?.isAvailable ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold text-[11px]">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" /> No
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50/80 dark:bg-slate-800/60 uppercase text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Property Title</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Availability</th>
                  <th className="py-3.5 px-4">Tenant Name</th>
                  <th className="py-3.5 px-4">Payment Status</th>
                  <th className="py-3.5 px-4">Rental Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paginatedRentals.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    {/* Property Title */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100 max-w-[220px] truncate">
                      {item.property?.title || 'N/A'}
                    </td>

                    {/* Property Price */}
                    <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-slate-100">
                      ৳{item.property?.price || item.payment?.amount || 0}
                    </td>

                    {/* Property Availability */}
                    <td className="py-3.5 px-4">
                      {item.property?.isAvailable ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-rose-200/60 dark:border-rose-800/60">
                          <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> No
                        </span>
                      )}
                    </td>

                    {/* Tenant Name */}
                    <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {item.tenant?.name || 'N/A'}
                    </td>

                    {/* Payment Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                          item.payment?.status === 'COMPLETED'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60'
                        }`}
                      >
                        {item.payment?.status || 'PENDING'}
                      </span>
                    </td>

                    {/* Rental Request Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${
                          item.status === 'PAID' || item.status === 'APPROVED'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60'
                            : item.status === 'PENDING'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60'
                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between p-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Page <strong className="text-slate-700 dark:text-slate-200">{currentPage}</strong> of{' '}
              <strong className="text-slate-700 dark:text-slate-200">{totalPages}</strong> ({rentals.length} total rental requests)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 disabled:opacity-40 transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 disabled:opacity-40 transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
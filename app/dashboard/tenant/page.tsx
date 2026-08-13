'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTenantRentals } from './_action/tenantActions';
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import RentalRequestsSkeleton from '@/skeleton/rentalRequestsSkeleton';

export default function RentalRequestsPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const rentalsRes = await getTenantRentals();

      if (rentalsRes?.success && Array.isArray(rentalsRes.data)) {
        setRentals(rentalsRes.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(rentals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRentals = rentals.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">
            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400" /> Approved
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 dark:text-amber-400" /> Pending Approval
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800">
            <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-600 dark:text-rose-400" /> Rejected
          </span>
        );
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800">
            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600 dark:text-teal-400" /> Paid / Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
    <RentalRequestsSkeleton />
    );
  } 

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          My Rental Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Track and manage your submitted rental applications.
        </p>
      </div>

      {/* Content */}
      <section className="space-y-4 sm:space-y-6">
        {rentals.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center text-slate-500 dark:text-slate-400 text-xs sm:text-sm shadow-xs transition-colors">
            You haven't submitted any rental requests yet.
          </div>
        ) : (
          <>
            {/* Rental List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {currentRentals.map((req) => (
                <div 
                  key={req.id} 
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                      {req.property?.image ? (
                        <img src={req.property.image} alt={req.property.title} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="w-7 h-7 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm truncate">
                        {req.property?.title || "Property"}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" /> 
                        <span className="truncate">{req.property?.location || "N/A"}</span>
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                        ৳{req.property?.price} <span className="text-[10px] sm:text-xs font-normal text-slate-400 dark:text-slate-500">/mo</span>
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between gap-2">
                    <div className="shrink-0">{renderStatusBadge(req.status)}</div>

                    {req.status === 'APPROVED' && (
                      <Link
                        href={`/dashboard/tenant/requests/${req.id}/pay`}
                        className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-3 py-1.5 sm:py-2 rounded-xl transition shadow-xs cursor-pointer"
                      >
                        Pay Now <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400 shadow-xs transition-colors">
                <p className="text-center sm:text-left">
                  Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {Math.min(startIndex + itemsPerPage, rentals.length)}
                  </span>{' '}
                  of <span className="font-semibold text-slate-900 dark:text-slate-100">{rentals.length}</span> requests
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 transition cursor-pointer"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-xl border text-xs font-medium transition cursor-pointer ${
                        currentPage === page
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 transition cursor-pointer"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
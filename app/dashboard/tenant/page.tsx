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
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" /> Approved
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" /> Pending Approval
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-rose-100 text-rose-800">
            <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-600" /> Rejected
          </span>
        );
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" /> Paid / Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          My Rental Requests
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Track and manage your submitted rental applications.
        </p>
      </div>

      {/* Content */}
      <section className="space-y-4 sm:space-y-6">
        {rentals.length === 0 ? (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 text-center text-gray-500 text-xs sm:text-sm">
            You haven't submitted any rental requests yet.
          </div>
        ) : (
          <>
            {/* Rental List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {currentRentals.map((req) => (
                <div key={req.id} className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs hover:shadow-md transition">
                  <div className="flex gap-3 items-center">
                    <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                      {req.property?.image ? (
                        <img src={req.property.image} alt={req.property.title} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="w-7 h-7 text-gray-300" />
                      )}
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{req.property?.title || "Property"}</h3>
                      <p className="text-[11px] sm:text-xs text-gray-500 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0" /> <span className="truncate">{req.property?.location || "N/A"}</span>
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-blue-600">
                        ৳{req.property?.price} <span className="text-[10px] sm:text-xs font-normal text-gray-400">/mo</span>
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-2">
                    <div className="shrink-0">{renderStatusBadge(req.status)}</div>

                    {req.status === 'APPROVED' && (
                      <Link
                        href={`/dashboard/tenant/requests/${req.id}/pay`}
                        className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 sm:py-2 rounded-xl transition shadow-xs active:scale-[0.98]"
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
              <div className="bg-white border border-gray-200/80 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 shadow-xs">
                <p className="text-center sm:text-left">
                  Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-gray-900">
                    {Math.min(startIndex + itemsPerPage, rentals.length)}
                  </span>{' '}
                  of <span className="font-semibold text-gray-900">{rentals.length}</span> requests
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer"
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
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer"
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
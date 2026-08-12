'use client';

import { useEffect, useState } from 'react';

import { Loader2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTenantPayments } from '../_action/tenantActions';
import LeaveReviewModal from '../LeaveReviewModal';

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const paymentsRes = await getTenantPayments();

      if (paymentsRes?.success && Array.isArray(paymentsRes.data)) {
        setPayments(paymentsRes.data);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleOpenReview = (property: { id: string; title: string }) => {
    setSelectedProperty(property);
    setIsReviewOpen(true);
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
          Payment History
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          View all your completed transactions and leave property reviews.
        </p>
      </div>

      {/* Content */}
      <section className="space-y-3 sm:space-y-4">
        {payments.length === 0 ? (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 text-center text-gray-500 text-xs sm:text-sm">
            No completed payment transactions found.
          </div>
        ) : (
          <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs">
            
            {/* Mobile View: Card List */}
            <div className="block md:hidden divide-y divide-gray-100">
              {currentPayments.map((pay) => (
                <div key={pay.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                        {pay.rentalRequest?.property?.title || 'N/A'}
                      </h4>
                      <p className="text-[11px] font-mono text-gray-400 mt-0.5">
                        TxID: {pay.transactionId?.substring(0, 14)}...
                      </p>
                    </div>
                    <span className="text-sm font-extrabold text-gray-900 shrink-0">
                      ৳{pay.amount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold text-gray-600 uppercase text-[10px]">
                        {pay.provider}
                      </span>
                      <span>
                        {new Date(pay.paidAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {pay.rentalRequest?.property && (
                      <button
                        onClick={() => handleOpenReview(pay.rentalRequest.property)}
                        className="inline-flex items-center gap-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded-lg border border-yellow-200 transition text-[11px] active:scale-[0.98]"
                      >
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                    <th className="p-4 font-semibold">Property</th>
                    <th className="p-4 font-semibold">Transaction ID</th>
                    <th className="p-4 font-semibold">Amount</th>
                    <th className="p-4 font-semibold">Provider</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {currentPayments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 font-medium text-gray-900">
                        {pay.rentalRequest?.property?.title || 'N/A'}
                      </td>
                      <td className="p-4 font-mono text-gray-500">
                        {pay.transactionId?.substring(0, 18)}...
                      </td>
                      <td className="p-4 font-bold text-gray-900">
                        ৳{pay.amount}
                      </td>
                      <td className="p-4 capitalize">
                        <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold text-gray-600">
                          {pay.provider}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">
                        {new Date(pay.paidAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="p-4 text-right">
                        {pay.rentalRequest?.property && (
                          <button
                            onClick={() => handleOpenReview(pay.rentalRequest.property)}
                            className="inline-flex cursor-pointer items-center gap-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-2.5 py-1.5 rounded-lg border border-yellow-200 transition text-xs active:scale-[0.98]"
                          >
                            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" /> Leave Review
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
                <p className="text-center sm:text-left">
                  Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-gray-900">
                    {Math.min(startIndex + itemsPerPage, payments.length)}
                  </span>{' '}
                  of <span className="font-semibold text-gray-900">{payments.length}</span> transactions
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition cursor-pointer ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </section>

      {/* Review Modal Component */}
      <LeaveReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        property={selectedProperty}
      />
    </div>
  );
}
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
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-emerald-600 dark:text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Payment History
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          View all your completed transactions and leave property reviews.
        </p>
      </div>

      {/* Content */}
      <section className="space-y-3 sm:space-y-4">
        {payments.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center text-slate-500 dark:text-slate-400 text-xs sm:text-sm shadow-xs transition-colors">
            No completed payment transactions found.
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-colors">
            
            {/* Mobile View: Card List */}
            <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800">
              {currentPayments.map((pay) => (
                <div key={pay.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                        {pay.rentalRequest?.property?.title || 'N/A'}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                        TxID: {pay.transactionId?.substring(0, 14)}...
                      </p>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 shrink-0">
                      ৳{pay.amount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300 uppercase text-[10px] border border-slate-200/60 dark:border-slate-700/60">
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
                        className="inline-flex cursor-pointer items-center gap-1 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-400 font-semibold px-2 py-1 rounded-lg border border-amber-200/80 dark:border-amber-800/80 transition text-[11px] active:scale-[0.98]"
                      >
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Review
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
                  <tr className="bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <th className="p-4 font-semibold">Property</th>
                    <th className="p-4 font-semibold">Transaction ID</th>
                    <th className="p-4 font-semibold">Amount</th>
                    <th className="p-4 font-semibold">Provider</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {currentPayments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      <td className="p-4 font-medium text-slate-900 dark:text-slate-100">
                        {pay.rentalRequest?.property?.title || 'N/A'}
                      </td>
                      <td className="p-4 font-mono text-slate-500 dark:text-slate-400">
                        {pay.transactionId?.substring(0, 18)}...
                      </td>
                      <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                        ৳{pay.amount}
                      </td>
                      <td className="p-4 capitalize">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                          {pay.provider}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">
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
                            className="inline-flex cursor-pointer items-center gap-1 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-400 font-semibold px-2.5 py-1.5 rounded-lg border border-amber-200/80 dark:border-amber-800/80 transition text-xs active:scale-[0.98]"
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Leave Review
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
              <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
                <p className="text-center sm:text-left">
                  Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {Math.min(startIndex + itemsPerPage, payments.length)}
                  </span>{' '}
                  of <span className="font-semibold text-slate-900 dark:text-slate-100">{payments.length}</span> transactions
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
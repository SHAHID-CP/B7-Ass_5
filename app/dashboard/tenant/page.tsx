'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTenantPayments, getTenantRentals } from './_action/tenantActions';

import { 
  Building2, 
  MapPin, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Star, 
  ArrowRight 
} from 'lucide-react';
import LeaveReviewModal from './LeaveReviewModal';

export default function TenantDashboard() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [rentalsRes, paymentsRes] = await Promise.all([
        getTenantRentals(),
        getTenantPayments(),
      ]);

      if (rentalsRes?.success && Array.isArray(rentalsRes.data)) {
        setRentals(rentalsRes.data);
      }
      if (paymentsRes?.success && Array.isArray(paymentsRes.data)) {
        setPayments(paymentsRes.data);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

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
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Tenant Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Track your rental applications, payments, and leave feedback.
        </p>
      </div>

      {/* 1. Rental Request History Section */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" /> My Rental Requests
        </h2>

        {rentals.length === 0 ? (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 text-center text-gray-500 text-xs sm:text-sm">
            You haven't submitted any rental requests yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {rentals.map((req) => (
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
        )}
      </section>

      {/* 2. Payment History Section */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" /> Payment History
        </h2>

        {payments.length === 0 ? (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 text-center text-gray-500 text-xs sm:text-sm">
            No completed payment transactions found.
          </div>
        ) : (
          <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs">
            
            {/* Mobile View: Card List */}
            <div className="block md:hidden divide-y divide-gray-100">
              {payments.map((pay) => (
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
                  {payments.map((pay) => (
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
                            className="inline-flex items-center gap-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-2.5 py-1.5 rounded-lg border border-yellow-200 transition text-xs active:scale-[0.98]"
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
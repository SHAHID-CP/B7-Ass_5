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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Approved
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending Approval
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Rejected
          </span>
        );
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Paid / Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
        <p className="text-sm text-gray-500">Track your rental applications, payments, and leave feedback.</p>
      </div>

      {/* 1. Rental Request History Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" /> My Rental Requests
        </h2>

        {rentals.length === 0 ? (
          <div className="bg-gray-50 border rounded-2xl p-8 text-center text-gray-500 text-sm">
            You haven't submitted any rental requests yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rentals.map((req) => (
              <div key={req.id} className="bg-white border rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-md transition">
                <div className="flex gap-3 items-start">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border">
                    {req.property?.image ? (
                      <img src={req.property.image} alt={req.property.title} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-8 h-8 text-gray-300 m-4" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{req.property?.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" /> {req.property?.location}
                    </p>
                    <p className="text-sm font-extrabold text-blue-600">৳{req.property?.price} <span className="text-xs font-normal text-gray-400">/mo</span></p>
                  </div>
                </div>

                <div className="border-t pt-3 flex items-center justify-between gap-2">
                  <div>{renderStatusBadge(req.status)}</div>

                  {req.status === 'APPROVED' && (
                    <Link
                      href={`/dashboard/tenant/requests/${req.id}/pay`}
                      className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-md shadow-blue-500/20"
                    >
                      Pay Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Payment History Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-600" /> Payment History
        </h2>

        {payments.length === 0 ? (
          <div className="bg-gray-50 border rounded-2xl p-8 text-center text-gray-500 text-sm">
            No completed payment transactions found.
          </div>
        ) : (
          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 border-b">
                    <th className="p-4 font-semibold">Property</th>
                    <th className="p-4 font-semibold">Transaction ID</th>
                    <th className="p-4 font-semibold">Amount</th>
                    <th className="p-4 font-semibold">Provider</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-700">
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
                            className="inline-flex items-center gap-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-2.5 py-1.5 rounded-lg border border-yellow-200 transition"
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
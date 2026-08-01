'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Building2, Receipt } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get('tran_id') || searchParams.get('session_id') || searchParams.get('transactionId') || 'N/A';
  const shortTranId =
  tranId !== 'N/A' && tranId.length > 15
    ? `${tranId.slice(0, 15)}...`
    : tranId;

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-white border rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="text-xs text-gray-500">
            Thank you. Your payment has been processed and your booking is confirmed.
          </p>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-50 border rounded-xl p-4 text-left space-y-2.5 text-xs text-gray-600">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 font-medium text-gray-500">
              <Receipt className="w-3.5 h-3.5 text-gray-400" /> Transaction ID:
            </span>
            <span className="font-mono font-bold text-gray-800">{shortTranId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 font-medium text-gray-500">
              <Building2 className="w-3.5 h-3.5 text-gray-400" /> Status:
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              CONFIRMED
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Link
            href="/dashboard/tenant"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            Go to Tenant Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
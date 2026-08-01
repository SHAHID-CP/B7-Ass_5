'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, RefreshCw, LayoutDashboard } from 'lucide-react';

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId') || '';

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-white border rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cancel/Error Icon */}
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <XCircle className="w-10 h-10" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Payment Cancelled</h1>
          <p className="text-xs text-gray-500">
            Your transaction was not completed. No charges were made to your account.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-800 text-left space-y-1">
          <p className="font-semibold">Need help?</p>
          <p className="text-[11px] opacity-90">
            If this was a mistake, you can try paying again from your dashboard or contact our support team for assistance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          {requestId ? (
            <Link
              href={`/dashboard/tenant/requests/${requestId}/pay`}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Try Payment Again
            </Link>
          ) : null}

          <Link
            href="/dashboard/tenant"
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
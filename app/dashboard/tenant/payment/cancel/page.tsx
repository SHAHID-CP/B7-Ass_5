'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, RefreshCw, LayoutDashboard, Loader2 } from 'lucide-react';

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId') || '';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl text-center animate-in fade-in zoom-in-95 duration-200 transition-colors">
      
      {/* Cancel/Error Icon */}
      <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto shadow-inner border border-rose-200/50 dark:border-rose-900/50">
        <XCircle className="w-10 h-10" />
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Payment Cancelled
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your transaction was not completed. No charges were made to your account.
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 rounded-xl p-4 text-xs text-rose-800 dark:text-rose-300 text-left space-y-1">
        <p className="font-semibold">Need help?</p>
        <p className="text-[11px] opacity-90 leading-relaxed">
          If this was a mistake, you can try paying again from your dashboard or contact our support team for assistance.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-2">
        {requestId ? (
          <Link
            href={`/dashboard/tenant/requests/${requestId}/pay`}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-600/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Try Payment Again
          </Link>
        ) : null}

        <Link
          href="/dashboard/tenant"
          className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold rounded-xl transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <LayoutDashboard className="w-3.5 h-3.5" /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-8 text-center space-y-4 shadow-xl">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400 mx-auto" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Loading cancellation status...</p>
          </div>
        }
      >
        <PaymentCancelContent />
      </Suspense>
    </div>
  );
}
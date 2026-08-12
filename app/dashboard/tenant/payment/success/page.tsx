'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Building2, Receipt, Loader2 } from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const tranId =
    searchParams.get('tran_id') ||
    searchParams.get('session_id') ||
    searchParams.get('transactionId') ||
    'N/A';
    
  const shortTranId =
    tranId !== 'N/A' && tranId.length > 15
      ? `${tranId.slice(0, 15)}...`
      : tranId;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl text-center animate-in fade-in zoom-in-95 duration-200 transition-colors">
      
      {/* Success Icon */}
      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200/50 dark:border-emerald-800/50">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Payment Successful!
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Thank you. Your payment has been processed and your booking is confirmed.
        </p>
      </div>

      {/* Transaction Details */}
      <div className="bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4 text-left space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
            <Receipt className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Transaction ID:
          </span>
          <span className="font-mono font-bold text-slate-800 dark:text-slate-200" title={tranId}>
            {shortTranId}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Status:
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] border border-emerald-200/60 dark:border-emerald-800/60">
            CONFIRMED
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <Link
          href="/dashboard/tenant"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-600/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          Go to Tenant Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-8 text-center space-y-4 shadow-xl">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400 mx-auto" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Loading payment details...</p>
          </div>
        }
      >
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
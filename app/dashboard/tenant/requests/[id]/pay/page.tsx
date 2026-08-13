'use client';

import { use, useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import { createPaymentSession } from '../../../_action/tenantActions';
import { 
  CreditCard, 
  ShieldCheck, 
  Loader2, 
  ArrowLeft, 
  Building2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface PayPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PaymentInitiationPage({ params }: PayPageProps) {
  const { id: requestId } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setLoading(false);
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  const handleInitiatePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await createPaymentSession(requestId);

      if (res?.data?.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
        return;
      }

      if (res?.checkoutUrl) {
        window.location.href = res.checkoutUrl;
        return;
      }

      if (res?.success) {
        router.push('/dashboard/tenant?payment=success');
      } else {
        setError(res?.error || res?.message || 'Failed to create payment session.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }; 
  

  return (
    <div className="max-w-xl mx-auto px-3.5 py-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Back Button */}
      <Link 
        href="/dashboard/tenant" 
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      {/* Main Payment Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xs transition-colors">
        
        {/* Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 sm:pb-5 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400 shrink-0" /> Checkout
            </h1>
            <span className="self-start sm:self-auto px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] sm:text-xs font-semibold rounded-full border border-emerald-200/60 dark:border-emerald-800/60 truncate max-w-full">
              Ref: {requestId.substring(0, 8)}...
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            You will be redirected to Stripe to complete your payment securely.
          </p>
        </div>

        {/* Request & Pricing Summary */}
        <div className="bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 rounded-xl p-3.5 sm:p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 rounded-lg text-emerald-600 dark:text-emerald-400 shrink-0 shadow-2xs">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Payment Gateway</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">Stripe Secure Checkout</p>
            </div>
          </div>

          <hr className="border-dashed border-slate-200 dark:border-slate-700/70" />

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center justify-between gap-2">
              <span className="shrink-0">Rental Request ID:</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200 text-[11px] sm:text-xs truncate max-w-[180px] sm:max-w-none">
                {requestId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Security Guarantee:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 text-[11px] sm:text-xs">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> 256-bit Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 p-3 sm:p-3.5 rounded-xl flex items-start gap-2.5 text-rose-700 dark:text-rose-400 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Checkout Error</p>
              <p className="mt-0.5 text-[11px] sm:text-xs">{error}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleInitiatePayment}
          disabled={loading}
          className="w-full cursor-pointer py-3 sm:py-3.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe...
            </>
          ) : (
            <>
              Proceed to Stripe Pay <ExternalLink className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[10px] sm:text-[11px] text-center text-slate-400 dark:text-slate-500">
          Powered by Stripe. Card details are processed securely offsite.
        </p>
      </div>
    </div>
  );
}
'use client';

import { use, useState } from 'react';
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
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <Link 
        href="/dashboard/tenant" 
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      {/* Main Payment Box */}
      <div className="bg-white border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Header */}
        <div className="border-b pb-5 space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-600" /> Checkout
            </h1>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
              Request Ref: {requestId.substring(0, 8)}...
            </span>
          </div>
          <p className="text-xs text-gray-500">You will be redirected to Stripe to complete your payment securely.</p>
        </div>

        {/* Request & Pricing Summary */}
        <div className="bg-gray-50 border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white border rounded-lg text-blue-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Payment Gateway</p>
              <p className="text-sm font-bold text-gray-800">Stripe Secure Checkout</p>
            </div>
          </div>

          <hr className="border-dashed border-gray-200" />

          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Rental Request ID:</span>
              <span className="font-mono font-medium text-gray-800">{requestId}</span>
            </div>
            <div className="flex justify-between">
              <span>Security Guarantee:</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl flex items-start gap-3 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Checkout Error</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleInitiatePayment}
          disabled={loading}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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

        <p className="text-[11px] text-center text-gray-400">
          Powered by Stripe. Card details are processed securely offsite.
        </p>
      </div>
    </div>
  );
}
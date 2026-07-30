'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { createPaymentSession } from '../../../../_action/dashboardActions';
import { CreditCard, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PayRequestPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const res = await createPaymentSession(id as string);
    if (res?.checkoutUrl) {
      window.location.href = res.checkoutUrl;
    } else {
      alert(res?.error || 'Failed to initialize payment session.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <Link href="/dashboard/tenant" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> Back to Tenant Overview
      </Link>

      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <CreditCard className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Complete Rental Payment</h1>
        <p className="text-xs text-gray-500">Request ID: <span className="font-mono">{id}</span></p>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50"
      >
        {loading ? 'Redirecting to Checkout...' : 'Proceed to Checkout'}
      </button>
    </div>
  );
}
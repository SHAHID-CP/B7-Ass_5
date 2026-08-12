'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm text-center space-y-6">
        
        {/* Icon Container */}
        <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Something went wrong!
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {error.message || 'An unexpected error occurred. Please try again or contact support if the issue persists.'}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => reset()}
          className="cursor-pointer w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>
    </div>
  );
}
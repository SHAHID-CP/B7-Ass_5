import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-3.5 sm:px-6 py-8 sm:py-12">
      <div className="max-w-sm sm:max-w-md w-full bg-white dark:bg-gray-900 p-5 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-center space-y-5 sm:space-y-6">
        
        {/* Icon Circle */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shrink-0 shadow-xs">
          <Compass className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />
        </div>

        {/* Text Content */}
        <div className="space-y-1.5 sm:space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            404
          </h1>
          <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <Link
            href="/"
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium sm:font-semibold py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
          >
            <Home className="w-4 h-4 shrink-0" /> 
            <span>Return Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
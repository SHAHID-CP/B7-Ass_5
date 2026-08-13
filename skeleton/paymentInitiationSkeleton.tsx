export default function PaymentInitiationSkeleton() {
  return (
    <div className="max-w-xl mx-auto px-3.5 py-4 sm:p-6 space-y-4 sm:space-y-6 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded-md"></div>

      {/* Main Payment Box Skeleton */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xs">
        
        {/* Header Skeleton */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 sm:pb-5 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="h-6 sm:h-7 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full self-start sm:self-auto"></div>
          </div>
          <div className="h-3.5 w-full sm:w-80 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        </div>

        {/* Request & Pricing Summary Box Skeleton */}
        <div className="bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 rounded-xl p-3.5 sm:p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0"></div>
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
            </div>
          </div>

          <hr className="border-dashed border-slate-200 dark:border-slate-700/70" />

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-3.5 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="h-11 sm:h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-xl"></div>

        {/* Footer Text Skeleton */}
        <div className="h-3 w-3/4 mx-auto bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
    </div>
  );
}
export default function SupportSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14 animate-pulse">
      {/* Hero & Search Bar Skeleton */}
      <div className="text-center space-y-4 max-w-2xl mx-auto flex flex-col items-center">
        {/* Badge Skeleton */}
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
        
        {/* Title Skeleton */}
        <div className="h-8 sm:h-10 w-4/5 sm:w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        
        {/* Subtitle Skeleton */}
        <div className="h-4 w-full sm:w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />

        {/* Search Bar Skeleton */}
        <div className="w-full max-w-xl mx-auto pt-2">
          <div className="h-11 sm:h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>
      </div>

      {/* Category Tabs Skeleton */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="h-10 w-28 sm:w-32 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"
          />
        ))}
      </div>

      {/* FAQ Accordion List Skeleton */}
      <div className="max-w-3xl mx-auto space-y-3">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-xs"
          >
            {/* Question Line Skeleton */}
            <div
              className={`h-4 bg-slate-200 dark:bg-slate-800 rounded-md ${
                idx % 2 === 0 ? 'w-3/4' : 'w-2/3'
              }`}
            />
            {/* Chevron Icon Placeholder */}
            <div className="w-4 h-4 bg-slate-200 dark:bg-slate-800 rounded shrink-0" />
          </div>
        ))}
      </div>

      {/* Need More Help Banner Skeleton */}
      <div className="bg-slate-200 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left w-full md:w-auto flex flex-col items-center md:items-start">
          <div className="h-6 sm:h-8 w-44 bg-slate-300 dark:bg-slate-700 rounded-lg" />
          <div className="h-3.5 sm:h-4 w-full sm:w-80 bg-slate-300 dark:bg-slate-700 rounded-md" />
        </div>

        {/* CTA Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <div className="h-10 w-full sm:w-40 bg-slate-300 dark:bg-slate-700 rounded-xl" />
          <div className="h-10 w-full sm:w-32 bg-slate-300 dark:bg-slate-700 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
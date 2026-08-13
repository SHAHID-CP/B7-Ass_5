export default function RentalRequestsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-1.5">
        <div className="h-7 sm:h-8 w-48 sm:w-60 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-4 w-64 sm:w-80 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>

      {/* Main Content Skeleton */}
      <section className="space-y-4 sm:space-y-6">
        {/* Rental List Grid Skeleton (6 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {[1, 2, 3, 4, 5, 6,7,8,9].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs flex flex-col justify-between"
            >
              {/* Card Header Content */}
              <div className="flex gap-3 items-center">
                {/* Image Placeholder */}
                <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>

                {/* Info Lines */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                </div>
              </div>

              {/* Card Footer Divider & Actions Placeholder */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between gap-2">
                <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="h-3.5 w-48 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
          
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
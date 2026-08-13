export default function PaymentHistorySkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-1.5">
        <div className="h-7 sm:h-8 w-48 sm:w-60 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-4 w-72 sm:w-96 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>

      {/* Content Card Wrapper Skeleton */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        
        {/* Mobile View Skeleton (Cards List) */}
        <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                </div>
                <div className="h-5 w-14 bg-slate-200 dark:bg-slate-800 rounded-md shrink-0"></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-12 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                </div>
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View Skeleton (Table View) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="p-4"><div className="h-3.5 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                <th className="p-4"><div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                <th className="p-4"><div className="h-3.5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                <th className="p-4"><div className="h-3.5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                <th className="p-4"><div className="h-3.5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                <th className="p-4"><div className="h-3.5 w-16 bg-slate-200 dark:bg-slate-800 rounded ml-auto"></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <tr key={item}>
                  <td className="p-4"><div className="h-4 w-44 bg-slate-200 dark:bg-slate-800 rounded-md"></div></td>
                  <td className="p-4"><div className="h-3.5 w-36 bg-slate-200 dark:bg-slate-800 rounded-md"></div></td>
                  <td className="p-4"><div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div></td>
                  <td className="p-4"><div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div></td>
                  <td className="p-4"><div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md"></div></td>
                  <td className="p-4 text-right"><div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg ml-auto"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar Skeleton */}
        <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
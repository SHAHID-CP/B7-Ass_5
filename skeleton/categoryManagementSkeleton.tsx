import React from 'react';

export default function CategoryManagementSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
        <div className="space-y-1.5">
          <div className="h-5 sm:h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-3 w-64 sm:w-80 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        </div>
      </div>

      {/* 2. Add New Category Form Skeleton */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="h-10 flex-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60"></div>
          <div className="h-10 w-full sm:w-36 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
        </div>
      </div>

      {/* 3. Categories Content Area Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        
        {/* Mobile View Skeleton (Cards) */}
        <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
            </div>
          ))}
        </div>

        {/* Desktop View Skeleton (Table) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            {/* Table Header Skeleton */}
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-1/3">
                  <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </th>
                <th className="py-3.5 px-4">
                  <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </th>
                <th className="py-3.5 px-4 text-right">
                  <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded ml-auto"></div>
                </th>
              </tr>
            </thead>

            {/* Table Body Skeleton Rows */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="py-4 px-4">
                    <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded font-mono"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg ml-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between p-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
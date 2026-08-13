import React from 'react';

export default function AdminSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-pulse">
      
      {/* 1. Page Header Skeleton */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
          <div className="space-y-1.5">
            <div className="h-5 sm:h-6 w-48 sm:w-64 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            <div className="h-3 w-80 bg-slate-200 dark:bg-slate-800 rounded-md hidden sm:block"></div>
          </div>
        </div>
        {/* Refresh Button Placeholder */}
        <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>

      {/* 2. Overview Metrics Section Skeleton */}
      <section className="space-y-3">
        <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
            >
              <div className="space-y-2">
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
              </div>
              <div className="w-11 h-11 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
            </div>
          ))}
        </div>

        {/* Breakdown Card Skeleton */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`space-y-2 ${i === 1 ? 'border-x border-slate-200 dark:border-slate-800 px-2' : ''}`}>
              <div className="h-2.5 w-16 sm:w-24 bg-slate-200 dark:bg-slate-800 rounded mx-auto"></div>
              <div className="h-5 w-10 sm:w-12 bg-slate-200 dark:bg-slate-800 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. User Management Section Skeleton */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>

          {/* Search & Filter Bar */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-full sm:w-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>
        </div>

        {/* Table Container Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          
          {/* Mobile View Skeleton */}
          <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="h-3 w-36 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </div>
                  <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-2">
                    <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </div>
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View Skeleton */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4"><div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                  <th className="py-3.5 px-4"><div className="h-3 w-10 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                  <th className="py-3.5 px-4"><div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                  <th className="py-3.5 px-4"><div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div></th>
                  <th className="py-3.5 px-4 text-right"><div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded ml-auto"></div></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[...Array(6)].map((_, i) => (
                  <tr key={i}>
                    {/* User */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1.5">
                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="h-3 w-40 bg-slate-200 dark:bg-slate-800 rounded"></div>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="py-3.5 px-4">
                      <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                    </td>
                    {/* Date */}
                    <td className="py-3.5 px-4">
                      <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    </td>
                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    </td>
                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg ml-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="flex items-center justify-between p-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="h-3 w-44 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
              <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
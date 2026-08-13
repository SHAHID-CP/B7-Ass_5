import React from 'react';

export default function AdminPropertiesSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
        <div className="space-y-2">
          <div className="h-5 sm:h-6 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-3 w-56 sm:w-80 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        </div>
      </div>

      {/* 2. Main Content Area Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        
        {/* Mobile View Skeleton (Responsive Cards) */}
        <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 space-y-3">
              {/* Card Header: Title & Availability */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-md shrink-0"></div>
              </div>

              {/* Card Middle Box: Category & Landlord */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="space-y-1.5">
                  <div className="h-2.5 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-3.5 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2.5 w-14 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>
              </div>

              {/* Card Footer: Monthly Rent */}
              <div className="flex items-center justify-between pt-1">
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View Skeleton (Table View) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            {/* Table Header */}
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4"><div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div></th>
              </tr>
            </thead>

            {/* Table Rows */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[...Array(6)].map((_, i) => (
                <tr key={i}>
                  {/* Title */}
                  <td className="py-3.5 px-4">
                    <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </td>
                  {/* Location */}
                  <td className="py-3.5 px-4">
                    <div className="h-3.5 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </td>
                  {/* Category Tag */}
                  <td className="py-3.5 px-4">
                    <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  </td>
                  {/* Landlord Name */}
                  <td className="py-3.5 px-4">
                    <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </td>
                  {/* Price */}
                  <td className="py-3.5 px-4">
                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </td>
                  {/* Availability Badge */}
                  <td className="py-3.5 px-4">
                    <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls Skeleton */}
        <div className="flex items-center justify-between p-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="h-3.5 w-52 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
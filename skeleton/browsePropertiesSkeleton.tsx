import React from 'react';

export default function BrowsePropertiesSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 animate-pulse">
      {/* 2. Property Cards Grid Skeleton (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
          >
            {/* Image Box Skeleton */}
            <div className="h-48 bg-slate-200 dark:bg-slate-800 relative">
              {/* Badge Skeleton */}
              <div className="absolute top-3 right-3 h-5 w-16 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
            </div>

            {/* Card Content Skeleton */}
            <div className="p-5 space-y-3">
              {/* Title */}
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4"></div>

              {/* Description (2 lines) */}
              <div className="space-y-1.5 pt-1">
                <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
              </div>

              {/* Location */}
              <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mt-2"></div>

              {/* Footer (Price & Button) */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-3">
                {/* Price */}
                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                {/* View Details Button */}
                <div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Pagination Skeleton */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>

    </div>
  );
}
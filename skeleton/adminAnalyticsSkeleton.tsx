import React from 'react';

export default function AdminAnalyticsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
        <div className="space-y-1.5">
          <div className="h-5 sm:h-6 w-48 sm:w-56 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-3 w-64 sm:w-96 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        </div>
      </div>

      {/* 2. Primary KPI Cards Skeleton (4 Grid Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
            </div>
            <div className="w-11 h-11 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
          </div>
        ))}
      </div>

      {/* 3. Charts Grid Section (2 Pie Charts Skeleton) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div 
            key={i} 
            className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
          >
            {/* Chart Title Skeleton */}
            <div className="space-y-1.5">
              <div className="h-5 w-44 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
              <div className="h-3 w-56 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>

            {/* Circular Donut/Pie Skeleton Placeholder */}
            <div className="h-64 w-full flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-[18px] border-slate-200 dark:border-slate-800"></div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bar Chart Skeleton (Properties per Category) */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        {/* Title Skeleton */}
        <div className="space-y-1.5">
          <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
          <div className="h-3 w-60 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>

        {/* Bar Chart Simulation Placeholder */}
        <div className="h-72 w-full pt-6 flex items-end justify-between gap-3 px-4 border-b border-slate-100 dark:border-slate-800">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full flex flex-col items-center gap-2">
              <div 
                className="w-full max-w-[40px] bg-slate-200 dark:bg-slate-800 rounded-t-lg"
                style={{ height: `${(i % 3 + 1) * 25 + 20}%` }}
              ></div>
              <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
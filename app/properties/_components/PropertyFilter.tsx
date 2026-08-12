'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Category } from '@/lib/types';

export default function PropertyFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoryId') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'createdAt-desc');

  // Update URL params
  const applyFilter = (searchValue: string, categoryValue: string, sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) params.set('search', searchValue.trim());
    else params.delete('search');

    if (categoryValue) params.set('categoryId', categoryValue);
    else params.delete('categoryId');

    if (sortValue) params.set('sort', sortValue);
    else params.delete('sort');

    // Filter change hole standard practice holo page 1 e niye jaoya
    params.set('page', '1');

    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilter(search, selectedCategory, sortBy);
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('');
    setSortBy('createdAt-desc');
    startTransition(() => {
      router.push('/properties');
    });
  };

  const isFiltered = Boolean(search || selectedCategory || sortBy !== 'createdAt-desc');

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center transition-colors"
    >
      {/* Search Input Field */}
      <div className="flex-1 relative">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 sm:py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Select Category Dropdown */}
      <div className="w-full sm:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            applyFilter(search, e.target.value, sortBy);
          }}
          className="w-full sm:w-auto border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2.5 sm:py-2 text-base sm:text-sm bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 cursor-pointer transition"
        >
          <option value="" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            All Categories
          </option>
          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="w-full sm:w-auto">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            applyFilter(search, selectedCategory, e.target.value);
          }}
          className="w-full sm:w-auto border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2.5 sm:py-2 text-base sm:text-sm bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 cursor-pointer transition"
        >
          <option value="createdAt-desc" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            Newest First
          </option>
          <option value="createdAt-asc" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            Oldest First
          </option>
          <option value="price-asc" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            Price: Low to High
          </option>
          <option value="price-desc" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            Price: High to Low
          </option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-5 py-2.5 sm:py-2 rounded-xl font-medium text-xs sm:text-sm transition shrink-0 shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span>Filter</span>
        </button>

        {isFiltered && (
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2.5 sm:py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
            title="Clear Filters"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
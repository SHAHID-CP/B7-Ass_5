'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Category } from '@/lib/types';

export default function PropertyFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoryId') || '');

  // Update URL params
  const applyFilter = (searchValue: string, categoryValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    } else {
      params.delete('search');
    }

    if (categoryValue) {
      params.set('categoryId', categoryValue);
    } else {
      params.delete('categoryId');
    }

    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilter(search, selectedCategory);
  };

  // Clear search and category
  const handleReset = () => {
    setSearch('');
    setSelectedCategory('');
    startTransition(() => {
      router.push('/properties');
    });
  };

  const isFiltered = Boolean(search || selectedCategory);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center"
    >
      {/* Search Input Field */}
      <div className="flex-1 relative">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 shrink-0 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-base sm:text-sm text-gray-800 placeholder:text-xs sm:placeholder:text-sm transition"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full cursor-pointer"
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
            applyFilter(search, e.target.value); // Dropdown চেঞ্জ করার সাথে সাথে ফিল্টার হবে
          }}
          className="w-full sm:w-auto border border-gray-300 rounded-xl px-3 py-2.5 sm:py-2 text-base sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-gray-700 cursor-pointer transition"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 sm:py-2 rounded-xl font-medium text-xs sm:text-sm transition shrink-0 shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span>Filter</span>
        </button>

        {/* Reset Button (যদি ফিল্টার অ্যাপ্লাই করা থাকে) */}
        {isFiltered && (
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2.5 sm:py-2 border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
            title="Clear Filters"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
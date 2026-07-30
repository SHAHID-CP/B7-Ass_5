import { Suspense } from 'react';
import { getCategories, getProperties } from './_action/propertyServices';
import PropertyFilter from './_components/PropertyFilter';
import { Property } from '@/lib/types';
import PropertyCard from './_components/PropertyCard';



interface PageProps {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  // Fetch data directly on the server concurrently
  const [categories, properties] = await Promise.all([
    getCategories(),
    getProperties(resolvedParams),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Explore Properties</h1>
        <p className="text-gray-500 text-sm">Find your next rental home from available listings</p>
      </div>

      {/* Filter Bar Component */}
      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse rounded-lg" />}>
        <PropertyFilter categories={categories} />
      </Suspense>

      {/* Property Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border border-dashed rounded-lg">
          No properties match your filter.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop: Property) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}
    </div>
  );
}
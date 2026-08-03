import Link from 'next/link';

import { Building2, MapPin, Search, ArrowRight, Tag } from 'lucide-react';
import { getCategories, getProperties } from './properties/_action/publicPropertyActions';
import HeroSection from '@/components/shared/HeroSection';


export default async function HomePage() {
  const [propertiesRes, categoriesRes] = await Promise.all([
    getProperties({ limit: 6 }),
    getCategories(),
  ]);

  const featuredProperties = propertiesRes?.data || [];
  const categories = categoriesRes?.data || [];

  return (
    <div className="min-h-screen space-y-12 pb-12">

      <HeroSection></HeroSection>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Explore by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/properties?categoryId=${cat.id}`}
              className="p-4 bg-white border rounded-xl shadow-sm hover:border-blue-500 hover:shadow-md transition text-center space-y-2 group"
            >
              <Tag className="w-6 h-6 text-blue-600 mx-auto group-hover:scale-110 transition" />
              <p className="font-semibold text-gray-800 group-hover:text-blue-600">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Featured Properties</h2>
            <p className="text-sm text-gray-500">Handpicked recent listings for you</p>
          </div>
          <Link
            href="/properties"
            className="text-blue-600 hover:text-blue-700 font-semibold text-xs whitespace-nowrap md:text-sm flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.slice(0, 6).map((item: any) => (
            <div key={item.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="h-48 bg-gray-200 relative flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-12 h-12 text-gray-400" />
                )}
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {item.category?.name || 'Rental'}
                </span>
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> {item.location}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t pt-3 mt-3">
                  <span className="text-lg font-bold text-blue-600">৳{item.price}<span className="text-xs text-gray-500 font-normal">/mo</span></span>
                  <Link
                    href={`/properties/${item.id}`}
                    className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
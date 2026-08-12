import Link from 'next/link';
import { Building2, MapPin, ArrowRight, Tag, Sparkles, LayoutGrid } from 'lucide-react';
import { getCategories, getProperties } from './properties/_action/publicPropertyActions';
import HeroSection from '@/components/shared/HeroSection';
import LandingExtraSections from '@/components/shared/LandingExtraSections';

export default async function HomePage() {
  const [propertiesRes, categoriesRes] = await Promise.all([
    getProperties({ limit: 6 }),
    getCategories(),
  ]);

  const featuredProperties = propertiesRes?.data?.items || [];
  const categories = categoriesRes?.data || [];

  return (
    <div className="min-h-screen space-y-12 pb-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">

      <HeroSection />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Categories</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Explore by Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Find your ideal rental property type tailored to your living needs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/properties?categoryId=${cat.id}`}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition text-center space-y-2 group"
            >
              <Tag className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto group-hover:scale-110 transition" />
              <p className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end sm:items-center gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Popular Deals</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Featured Properties
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Handpicked recent listings verified for high comfort and quality.
            </p>
          </div>

          <Link
            href="/properties"
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-xs whitespace-nowrap md:text-sm flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredProperties.slice(0, 6).map((item: any) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md dark:hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div className="h-48 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover hover:scale-105 transition duration-300" 
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-slate-400 dark:text-slate-600" />
                  )}
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {item.category?.name || 'Property'}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2">{item.description}</p>
                  
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {item.location}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-3">
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">৳{item.price}</span>
                    <Link
                      href={`/properties/${item.id}`}
                      className="text-xs font-semibold px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-xl transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </section>

      <LandingExtraSections />
    </div>
  );
}
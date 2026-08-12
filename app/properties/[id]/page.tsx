'use client';

import { use, useEffect, useState } from 'react';
import RentalRequestModal from './RentalRequestModal';
import { Building2, MapPin, User, Star, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { getPropertyById } from '../_action/publicPropertyActions';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function PropertyDetailsPage({ params }: Props) {
  const { id } = use(params);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await getPropertyById(id);
      if (res?.success) setProperty(res.data);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 sm:py-32">
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-emerald-600 dark:text-emerald-500" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-16 sm:py-20 px-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300">Property Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 transition-colors">
      {/* Title & Header */}
      <div className="space-y-1.5 sm:space-y-2">
        <span className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full inline-block border border-emerald-200/50 dark:border-emerald-800/50">
          {property.category?.name || 'Property'}
        </span>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
          {property.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-xs sm:text-sm font-medium">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" /> {property.location}
        </p>
      </div>

      {/* Property Hero Image */}
      <div className="h-52 sm:h-64 md:h-80 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs">
        {property.image ? (
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <Building2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-slate-300 dark:text-slate-600" />
        )}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Side: Description & Reviews */}
        <div className="md:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">About Property</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{property.description}</p>
          </div>

          {/* Reviews Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" /> 
              Tenant Reviews ({property.reviews?.length || 0})
            </h2>
            {property.reviews && property.reviews.length > 0 ? (
              <div className="space-y-2.5 sm:space-y-3">
                {property.reviews.map((rev: any) => (
                  <div key={rev.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs sm:text-sm space-y-1 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{rev.tenant?.name}</span>
                      <span className="text-amber-500 font-bold text-xs sm:text-sm">★ {rev.rating}/5</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">No reviews yet for this property.</p>
            )}
          </div>
        </div>

        {/* Right Side: CTA & Landlord Box */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
            <div className="text-center pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">৳{property.price}</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm"> / month</span>
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-500 dark:text-slate-400">Availability:</span>
              {property.isAvailable ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Available
                </span>
              ) : (
                <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Booked
                </span>
              )}
            </div>

            {/* Request Rental CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!property.isAvailable}
              className="cursor-pointer w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-2.5 sm:py-3 text-sm sm:text-base rounded-xl shadow-xs transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {property.isAvailable ? 'Request Rental' : 'Not Available'}
            </button>
          </div>

          {/* Landlord Card */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
            <User className="w-8 h-8 sm:w-9 sm:h-9 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shrink-0" />
            <div>
              <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium">Listed by Landlord</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{property.landlord?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <RentalRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={{
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
        }}
      />
    </div>
  );
}
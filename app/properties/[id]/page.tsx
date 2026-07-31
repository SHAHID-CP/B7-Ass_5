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
  // const { id } = await params;
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
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-700">Property Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Title & Header */}
      <div className="space-y-2">
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
          {property.category?.name || 'Property'}
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900">{property.title}</h1>
        <p className="text-gray-500 flex items-center gap-1 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" /> {property.location}
        </p>
      </div>

      {/* Image Banner */}
      <div className="h-80 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border">
        {property.image ? (
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <Building2 className="w-20 h-20 text-gray-300" />
        )}
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Description & Reviews */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border rounded-xl p-6 space-y-3 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">About Property</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
          </div>

          {/* Reviews Section */}
          <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Tenant Reviews ({property.reviews?.length || 0})
            </h2>
            {property.reviews && property.reviews.length > 0 ? (
              <div className="space-y-3">
                {property.reviews.map((rev: any) => (
                  <div key={rev.id} className="p-3 bg-gray-50 rounded-lg text-sm space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{rev.tenant?.name}</span>
                      <span className="text-yellow-500 font-bold">★ {rev.rating}/5</span>
                    </div>
                    <p className="text-gray-600 text-xs">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No reviews yet for this property.</p>
            )}
          </div>
        </div>

        {/* Right Side: CTA & Landlord Box */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
            <div className="text-center pb-4 border-b">
              <span className="text-3xl font-extrabold text-blue-600">৳{property.price}</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Availability:</span>
              {property.isAvailable ? (
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Available
                </span>
              ) : (
                <span className="text-red-600 font-bold flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Booked
                </span>
              )}
            </div>

            {/* Request Rental CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!property.isAvailable}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition disabled:opacity-50"
            >
              {property.isAvailable ? 'Request Rental' : 'Not Available'}
            </button>
          </div>

          <div className="bg-gray-50 border rounded-xl p-4 flex items-center gap-3">
            <User className="w-8 h-8 text-gray-400 bg-white p-1 rounded-full border" />
            <div>
              <p className="text-xs text-gray-400 font-medium">Listed by Landlord</p>
              <p className="text-sm font-bold text-gray-800">{property.landlord?.name}</p>
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
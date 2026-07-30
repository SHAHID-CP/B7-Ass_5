import Link from 'next/link';
import { MapPin, User, ArrowRight } from 'lucide-react';
import { Property } from '@/lib/types';


interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    title,
    description,
    location,
    price,
    isAvailable,
    images,
    category,
    landlord,
  } = property;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden group">
      
      {/* Property Image & Status Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={images || '/placeholder-property.jpg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {category?.name || 'Property'}
        </span>

        {/* Availability Badge */}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
            isAvailable
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}
        >
          {isAvailable ? 'Available' : 'Rented'}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          
          {/* Price */}
          <div className="flex items-baseline gap-1 text-blue-600 font-bold text-xl">
            <span>৳ {price.toLocaleString()}</span>
            <span className="text-gray-500 text-xs font-normal">/ month</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed pt-1">
            {description}
          </p>
        </div>

        {/* Footer Info: Landlord & View Details Action */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <div className="w-6 h-6 rounded-full bg-gray-100 border flex items-center justify-center text-gray-600">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-gray-700 truncate max-w-[110px]">
              {landlord?.name || 'Landlord'}
            </span>
          </div>

          <Link
            href={`/properties/${id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
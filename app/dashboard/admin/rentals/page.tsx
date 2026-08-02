'use client';

import { useEffect, useState } from 'react';
import { getAllRentalsAdmin } from '../_action/adminActions';
import { FileText, CheckCircle2, XCircle, Loader2, CreditCard, User, Building } from 'lucide-react';

interface RentalItem {
  id: string;
  status: string;
  createdAt?: string;
  property?: {
    id?: string;
    title?: string;
    price?: number;
    isAvailable?: boolean;
  };
  tenant?: {
    id?: string;
    name?: string;
    email?: string;
  };
  payment?: {
    status?: string;
    amount?: number;
  };
}

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRentals = async () => {
      setLoading(true);
      const res = await getAllRentalsAdmin();
      if (res?.success) {
        setRentals(res.data || []);
      }
      setLoading(false);
    };
    loadRentals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-blue-600" />
        <span>Loading all rental requests...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="p-2 bg-purple-50 text-blue-600 rounded-xl shrink-0">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">
            All Rental Requests
          </h1>
          <p className="text-xs text-gray-500">
            Overview of all tenant rental applications and payment status
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      {rentals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 p-6 space-y-2">
          <FileText className="w-10 h-10 text-gray-300 mx-auto" />
          <p className="text-xs sm:text-sm font-medium text-gray-500">
            No rental requests found in the system.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          {/* Mobile View: Responsive Cards */}
          <div className="block md:hidden divide-y divide-gray-100">
            {rentals.map((item) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {item.property?.title || 'N/A'}
                    </h3>
                    <p className="text-xs font-extrabold text-gray-900 pl-5">
                      ৳{item.property?.price || item.payment?.amount || 0}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shrink-0 ${
                      item.status === 'PAID' || item.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : item.status === 'PENDING'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 bg-gray-50/60 p-2.5 rounded-xl border border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Tenant</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1">
                      <User className="w-3 h-3 text-gray-400" />
                      {item.tenant?.name || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Payment</span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        item.payment?.status === 'COMPLETED'
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}
                    >
                      <CreditCard className="w-3 h-3" />
                      {item.payment?.status || 'PENDING'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-500 text-[11px]">Property Available:</span>
                  {item.property?.isAvailable ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-600 font-semibold text-[11px]">
                      <XCircle className="w-3.5 h-3.5 text-rose-500" /> No
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50/80 uppercase text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4">Property Title</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Availability</th>
                  <th className="py-3.5 px-4">Tenant Name</th>
                  <th className="py-3.5 px-4">Payment Status</th>
                  <th className="py-3.5 px-4">Rental Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rentals.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    {/* Property Title */}
                    <td className="py-3.5 px-4 font-bold text-gray-900 max-w-[220px] truncate">
                      {item.property?.title || 'N/A'}
                    </td>

                    {/* Property Price */}
                    <td className="py-3.5 px-4 font-extrabold text-gray-900">
                      ৳{item.property?.price || item.payment?.amount || 0}
                    </td>

                    {/* Property Availability */}
                    <td className="py-3.5 px-4">
                      {item.property?.isAvailable ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-200/60">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-rose-200/60">
                          <XCircle className="w-3 h-3 text-rose-600" /> No
                        </span>
                      )}
                    </td>

                    {/* Tenant Name */}
                    <td className="py-3.5 px-4 font-medium text-gray-800">
                      {item.tenant?.name || 'N/A'}
                    </td>

                    {/* Payment Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                          item.payment?.status === 'COMPLETED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                            : 'bg-amber-50 text-amber-700 border-amber-200/60'
                        }`}
                      >
                        {item.payment?.status || 'PENDING'}
                      </span>
                    </td>

                    {/* Rental Request Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${
                          item.status === 'PAID' || item.status === 'APPROVED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                            : item.status === 'PENDING'
                            ? 'bg-amber-50 text-amber-700 border-amber-200/60'
                            : 'bg-rose-50 text-rose-700 border-rose-200/60'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
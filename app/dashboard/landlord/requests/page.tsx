'use client';

import { useEffect, useState } from 'react';
import {
  getLandlordRentalRequests,
  updateRentalRequestStatus,
  getTenantHistory,
} from '../_action/landlordActions';
import {
  Inbox,
  CheckCircle,
  XCircle,
  Loader2,
  Check,
  X,
  History,
  Mail,
  Phone,
  Building,
  User,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

interface RentalRequest {
  id: string;
  status: string;
  createdAt: string;
  tenant: {
    id: string;
    name: string;
  };
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    isAvailable: boolean;
  };
}

interface TenantHistoryData {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  createdAt?: string;
  rentalRequests?: Array<{
    id: string;
    status: string;
    createdAt: string;
    property?: {
      id: string;
      title: string;
      location: string;
      price: number;
    };
  }>;
}

export default function ManageRequestsPage() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Tenant History Modal States
  const [selectedTenantHistory, setSelectedTenantHistory] = useState<TenantHistoryData | null>(null);
  const [fetchingHistory, setFetchingHistory] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const loadRequests = async () => {
    setLoading(true);
    const res = await getLandlordRentalRequests();
    if (res?.data) {
      setRequests(Array.isArray(res.data) ? res.data : res.data.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = requests.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle Request Status Change
  const handleStatusUpdate = async (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setUpdatingId(id);
    const res = await updateRentalRequestStatus(id, newStatus);

    if (res?.error) {
      toast.error(`Error: ${res.error}`);
    } else {
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );
      toast.success("Status changes successfully");
    }
    setUpdatingId(null);
  };

  // Open Tenant History Modal and Fetch Data
  const handleOpenTenantHistory = async (tenantId: string) => {
    setFetchingHistory(true);
    setHistoryModalOpen(true);
    setSelectedTenantHistory(null);

    const res = await getTenantHistory(tenantId);
    if (res?.success && res.data) {
      setSelectedTenantHistory(res.data);
    } else {
      toast(res?.error || 'Failed to fetch tenant history');
      setHistoryModalOpen(false);
    }
    setFetchingHistory(false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-blue-600" />
        <span>Loading rental requests...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
          <Inbox className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">Manage Rental Requests</h1>
          <p className="text-xs text-gray-500">
            Review and respond to rental applications from tenants
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      {requests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 p-6 space-y-2">
          <Inbox className="w-10 h-10 text-gray-300 mx-auto" />
          <p className="text-xs sm:text-sm font-medium text-gray-500">No rental requests found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          {/* Mobile View: Cards */}
          <div className="block md:hidden divide-y divide-gray-100">
            {currentRequests.map((item) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm">{item.property?.title || 'N/A'}</h3>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400 shrink-0" /> {item.property?.location || 'N/A'}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shrink-0 ${
                      item.status === 'APPROVED' || item.status === 'PAID'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : item.status === 'REJECTED'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-extrabold text-gray-900">৳{item.property?.price || 0}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 text-[11px]">Tenant:</span>
                    <span className="font-semibold text-gray-800">{item.tenant?.name || 'N/A'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-gray-50 gap-2">
                  <button
                    onClick={() => handleOpenTenantHistory(item.tenant?.id)}
                    className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-200/60 hover:bg-purple-100 rounded-lg text-xs font-medium transition"
                  >
                    <History className="w-3.5 h-3.5" /> History
                  </button>

                  <div className="flex items-center gap-1.5">
                    {updatingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600 my-1" />
                    ) : (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(item.id, 'APPROVED')}
                          disabled={item.status === 'APPROVED'}
                          className="cursor-pointer flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-40"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(item.id, 'REJECTED')}
                          disabled={item.status === 'REJECTED'}
                          className="cursor-pointer flex items-center gap-1 px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-40"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                      </>
                    )}
                  </div>
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
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Availability</th>
                  <th className="py-3.5 px-4">Tenant Name</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Tenant History</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentRequests.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 font-bold text-gray-900 max-w-[200px] truncate">
                      {item.property?.title || 'N/A'}
                    </td>

                    <td className="py-3.5 px-4 text-gray-600 max-w-[160px] truncate">
                      {item.property?.location || 'N/A'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      ৳{item.property?.price || 0}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.property?.isAvailable ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-200/60">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-rose-200/60">
                          <XCircle className="w-3 h-3 text-rose-600" /> No
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-gray-800">
                      {item.tenant?.name || 'N/A'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                          item.status === 'APPROVED' || item.status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : item.status === 'REJECTED'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleOpenTenantHistory(item.tenant?.id)}
                        className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 rounded-lg text-xs font-medium transition"
                        title="View Tenant History"
                      >
                        <History className="w-3.5 h-3.5" /> History
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {updatingId === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin mx-auto text-blue-600" />
                      ) : (
                        <div className="flex justify-center items-center gap-1.5">
                          <button
                            onClick={() => handleStatusUpdate(item.id, 'APPROVED')}
                            disabled={item.status === 'APPROVED'}
                            className="cursor-pointer flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-40"
                            title="Approve Request"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(item.id, 'REJECTED')}
                            disabled={item.status === 'REJECTED'}
                            className="cursor-pointer flex items-center gap-1 px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-40"
                            title="Reject Request"
                          >
                            <X className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <p>
                Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
                <span className="font-semibold text-gray-900">
                  {Math.min(startIndex + itemsPerPage, requests.length)}
                </span>{' '}
                of <span className="font-semibold text-gray-900">{requests.length}</span> entries
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tenant History Modal */}
      {historyModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50"
          onClick={() => setHistoryModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 relative shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setHistoryModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-sm sm:text-base font-bold text-gray-900 border-b border-gray-100 pb-2.5 flex items-center gap-2">
              <History className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" /> Tenant History & Profile
            </h2>

            {fetchingHistory ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-2">
                <Loader2 className="w-7 h-7 animate-spin text-purple-600" />
                <p className="text-xs text-gray-500">Loading tenant details...</p>
              </div>
            ) : selectedTenantHistory ? (
              <div className="space-y-4">
                {/* User Info Header */}
                <div className="flex items-center gap-3.5 bg-purple-50/70 p-3.5 rounded-xl border border-purple-100/80">
                  {selectedTenantHistory.profileImage ? (
                    <img
                      src={selectedTenantHistory.profileImage}
                      alt={selectedTenantHistory.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-purple-200 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-bold text-lg shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                  )}

                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                      {selectedTenantHistory.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-600 flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{selectedTenantHistory.email}</span>
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-600 flex items-center gap-1.5 truncate">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{selectedTenantHistory.phoneNumber || 'N/A'}</span>
                    </p>
                  </div>
                </div>

                {/* First 3 Rental Requests */}
                <div>
                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-gray-400" /> Recent Requests (First 3)
                  </h4>

                  {selectedTenantHistory.rentalRequests &&
                  selectedTenantHistory.rentalRequests.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTenantHistory.rentalRequests.slice(0, 3).map((req) => (
                        <div
                          key={req.id}
                          className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/60 text-xs gap-2"
                        >
                          <div className="min-w-0">
                            <p className="font-bold text-gray-800 truncate">
                              {req.property?.title || 'Unknown Property'}
                            </p>
                            <p className="text-[11px] text-gray-500 truncate mt-0.5">
                              {req.property?.location} — ৳{req.property?.price}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                              req.status === 'APPROVED' || req.status === 'PAID'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                : req.status === 'REJECTED'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                                : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-xl text-center border border-gray-100">
                      No previous rental requests found.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-rose-500 text-center py-4">
                No data available.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
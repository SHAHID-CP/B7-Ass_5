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
} from 'lucide-react';

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

  // Handle Request Status Change
  const handleStatusUpdate = async (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setUpdatingId(id);
    const res = await updateRentalRequestStatus(id, newStatus);

    if (res.error) {
      alert(`Error: ${res.error}`);
    } else {
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );
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
      alert(res?.error || 'Failed to fetch tenant history');
      setHistoryModalOpen(false);
    }
    setFetchingHistory(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b">
        <Inbox className="w-6 h-6 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Rental Requests</h1>
          <p className="text-sm text-gray-500">
            Review and respond to rental applications from tenants
          </p>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed">
          <Inbox className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No rental requests found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
          <table className="w-full text-left text-xs text-gray-600 min-w-[800px]">
            <thead className="bg-gray-100 uppercase text-gray-700 font-semibold border-b">
              <tr>
                <th className="py-3 px-4">Property Title</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Is Available</th>
                <th className="py-3 px-4">Tenant Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Tenant History</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  {/* Property Title */}
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {item.property?.title || 'N/A'}
                  </td>

                  {/* Location */}
                  <td className="py-3 px-4 text-gray-600">
                    {item.property?.location || 'N/A'}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    ৳{item.property?.price || 0}
                  </td>

                  {/* Availability */}
                  <td className="py-3 px-4">
                    {item.property?.isAvailable ? (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                        <CheckCircle className="w-3 h-3" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                        <XCircle className="w-3 h-3" /> No
                      </span>
                    )}
                  </td>

                  {/* Tenant Name */}
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {item.tenant?.name || 'N/A'}
                  </td>

                  {/* Request Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                        item.status === 'APPROVED' || item.status === 'PAID'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'REJECTED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Tenant History Button */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenTenantHistory(item.tenant?.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 rounded text-xs font-medium transition"
                      title="View Tenant History"
                    >
                      <History className="w-3.5 h-3.5" /> History
                    </button>
                  </td>

                  {/* Approve / Reject Actions */}
                  <td className="py-3 px-4 text-center">
                    {updatingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto text-blue-600" />
                    ) : (
                      <div className="flex justify-center items-center gap-1.5">
                        <button
                          onClick={() => handleStatusUpdate(item.id, 'APPROVED')}
                          disabled={item.status === 'APPROVED'}
                          className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition disabled:opacity-40"
                          title="Approve Request"
                        >
                          <Check className="w-3 h-3" /> Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(item.id, 'REJECTED')}
                          disabled={item.status === 'REJECTED'}
                          className="flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition disabled:opacity-40"
                          title="Reject Request"
                        >
                          <X className="w-3 h-3" /> Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tenant History Modal */}
      {historyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-5 relative shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setHistoryModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <History className="w-5 h-5 text-purple-600" /> Tenant History & Profile
            </h2>

            {fetchingHistory ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-2">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                <p className="text-xs text-gray-500">Loading tenant details...</p>
              </div>
            ) : selectedTenantHistory ? (
              <div className="space-y-4">
                {/* User Info Header */}
                <div className="flex items-center gap-4 bg-purple-50 p-3.5 rounded-lg border border-purple-100">
                  {selectedTenantHistory.profileImage ? (
                    <img
                      src={selectedTenantHistory.profileImage}
                      alt={selectedTenantHistory.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-purple-300"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-bold text-xl">
                      <User className="w-7 h-7" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-base">
                      {selectedTenantHistory.name}
                    </h3>
                    <p className="text-xs text-gray-600 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {selectedTenantHistory.email}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {selectedTenantHistory.phoneNumber || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* First 3 Rental Requests */}
                <div>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Building className="w-4 h-4 text-gray-500" /> Recent Rental Requests (First 3)
                  </h4>

                  {selectedTenantHistory.rentalRequests &&
                  selectedTenantHistory.rentalRequests.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTenantHistory.rentalRequests.slice(0, 3).map((req) => (
                        <div
                          key={req.id}
                          className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 text-xs"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">
                              {req.property?.title || 'Unknown Property'}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              {req.property?.location} — ৳{req.property?.price}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              req.status === 'APPROVED' || req.status === 'PAID'
                                ? 'bg-green-100 text-green-700'
                                : req.status === 'REJECTED'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded text-center">
                      No previous rental requests found.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-red-500 text-center py-4">
                No data available.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { getCurrentUserProfile, updateUserProfile } from './_action/profileAction';
import { 
  Mail, 
  Phone, 
  Shield, 
  Calendar, 
  Edit3, 
  X, 
  CheckCircle, 
  Loader2 
} from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Edit Form State
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    profileImage: '',
  });

  // Load User Profile
  const loadProfile = async () => {
    setLoading(true);
    const res = await getCurrentUserProfile();
    if (res?.success && res.data) {
      setProfile(res.data);
      setFormData({
        name: res.data.name || '',
        phoneNumber: res.data.phoneNumber || '',
        profileImage: res.data.profileImage || '',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Handle Form Submit
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const res = await updateUserProfile(formData);

    if (res?.success) {
      alert('Profile updated successfully!');
      setIsModalOpen(false);
      await loadProfile(); 
    } else {
      alert(res?.error || 'Failed to update profile');
    }
    setUpdating(false);
  };


  const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile?.name || 'User'
  )}&background=0D8ABC&color=fff&size=128`;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 sm:p-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Top Cover Banner */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-slate-900 to-blue-900"></div>

        {/* Profile Info Area */}
        <div className="px-4 sm:px-6 pb-6 relative">
          
          <div className="flex justify-center sm:justify-start -mt-12 sm:-mt-16 mb-3">
            <img
              src={profile?.profileImage || defaultImage}
              alt={profile?.name || 'User Profile'}
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImage;
              }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white object-cover bg-slate-100 shadow-md shrink-0"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
                {profile?.name || 'N/A'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
              <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-mono font-semibold uppercase">
                {profile?.role}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> {profile?.status}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl overflow-hidden">
              <div className="p-2.5 bg-white text-blue-600 rounded-lg shadow-sm shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 font-medium">Email Address</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 break-all truncate">
                  {profile?.email || 'N/A'}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl overflow-hidden">
              <div className="p-2.5 bg-white text-green-600 rounded-lg shadow-sm shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 font-medium">Phone Number</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                  {profile?.phoneNumber || 'Not Added'}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl overflow-hidden">
              <div className="p-2.5 bg-white text-purple-600 rounded-lg shadow-sm shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 font-medium">Account Role</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 uppercase truncate">
                  {profile?.role}
                </p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl overflow-hidden">
              <div className="p-2.5 bg-white text-amber-600 rounded-lg shadow-sm shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 font-medium">Member Since</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Update Profile</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdate} className="p-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tanvir Hasan"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="e.g. +8801712345678"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Profile Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  value={formData.profileImage}
                  onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50"
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
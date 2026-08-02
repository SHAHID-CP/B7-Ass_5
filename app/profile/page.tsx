'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import { getCurrentUserProfile, updateUserProfile } from './_action/profileAction';
import { 
  Mail, 
  Phone, 
  Shield, 
  Calendar, 
  Edit3, 
  X, 
  CheckCircle, 
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { ProfileFormData, profileSchema } from '@/utils/contactValidation';
import { toast } from 'sonner';


interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  role: string;
  status: string;
  createdAt: string;
}




export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      profileImage: '',
    },
  });


  const watchedImage = watch('profileImage');

  // Load User Profile Data
  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUserProfile();
      if (res?.success && res.data) {
        setProfile(res.data);
        // Reset form values with loaded data
        reset({
          name: res.data.name || '',
          phoneNumber: res.data.phoneNumber || '',
          profileImage: res.data.profileImage || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Handle Form Submit
  const onSubmit = async (data: ProfileFormData) => {
    try {
      const res = await updateUserProfile(data);

      if (res?.success) {
        toast('Profile updated successfully!');
        setIsModalOpen(false);
        await loadProfile(); 
      } else {
        toast(res?.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast('An unexpected error occurred.');
    }
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
      {/* Title & Edit Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-xs cursor-pointer active:scale-95"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Cover Banner */}
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
                {profile?.role || 'User'}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> {profile?.status || 'Active'}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl overflow-hidden">
              <div className="p-2.5 bg-white text-blue-600 rounded-lg shadow-xs shrink-0">
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
              <div className="p-2.5 bg-white text-green-600 rounded-lg shadow-xs shrink-0">
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
              <div className="p-2.5 bg-white text-purple-600 rounded-lg shadow-xs shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 font-medium">Account Role</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 uppercase truncate">
                  {profile?.role || 'N/A'}
                </p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl overflow-hidden">
              <div className="p-2.5 bg-white text-amber-600 rounded-lg shadow-xs shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 font-medium">Member Since</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Update Profile</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="e.g. Tanvir Hasan"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
                {errors.name && (
                  <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.name.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register('phoneNumber')}
                  placeholder="e.g. 01712345678"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
                {errors.phoneNumber && (
                  <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Profile Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  {...register('profileImage')}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
                {errors.profileImage && (
                  <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.profileImage.message}</p>
                )}

                {/* Live Avatar Preview */}
                {watchedImage && !errors.profileImage && (
                  <div className="flex items-center gap-3 mt-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <img
                      src={watchedImage}
                      alt="Avatar Preview"
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0 bg-white"
                      onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                    />
                    <div className="text-[11px] text-slate-500 min-w-0">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-blue-600" /> Image Preview
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-semibold transition disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isSubmitting ? (
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
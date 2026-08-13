'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { getCurrentUserProfile, updateUserProfile } from '@/app/profile/_action/profileAction';
import ProfileSkeleton from '@/skeleton/profileSkeleton';

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUserProfile();
      if (res?.success && res.data) {
        setProfile(res.data);
        reset({
          name: res.data.name || '',
          phoneNumber: res.data.phoneNumber || '',
          profileImage: res.data.profileImage || '',
        });
      }
    } catch (error) {
      toast.error('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      let finalImageUrl = data.profileImage;

      if (selectedFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: 'POST', body: formData }
        );

        const imgbbData = await imgbbRes.json();

        if (imgbbData.success) {
          finalImageUrl = imgbbData.data.url;
        } else {
          toast.error('Image upload failed!');
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      const updatedData = { ...data, profileImage: finalImageUrl };
      const res = await updateUserProfile(updatedData);

      if (res?.success) {
        toast.success('Profile updated successfully!');
        setIsModalOpen(false);
        setSelectedFile(null);
        await loadProfile();
      } else {
        toast.error(res?.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      setUploading(false);
    }
  };

  const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile?.name || 'User'
  )}&background=059669&color=fff&size=128`;

  if (loading) {
    return (
    <ProfileSkeleton></ProfileSkeleton> 
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Edit Button Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Profile</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your personal credentials and account details
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-xs cursor-pointer"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        {/* Cover Banner with Emerald Gradient */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent"></div>
        </div>

        {/* Profile Info Area */}
        <div className="px-4 sm:px-6 pb-6 relative">
          {/* Avatar Placement */}
          <div className="flex justify-center sm:justify-start -mt-12 sm:-mt-16 mb-4">
            <img
              src={profile?.profileImage || defaultImage}
              alt={profile?.name || 'User Profile'}
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImage;
              }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-slate-900 object-cover bg-slate-100 dark:bg-slate-800 shadow-md shrink-0"
            />
          </div>

          {/* User Name & Status Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
                {profile?.name || 'N/A'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
              <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider">
                {profile?.role || 'User'}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-800/40 px-3 py-1 rounded-full font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> {profile?.status || 'Active'}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Address */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60 overflow-hidden">
              <div className="p-2.5 bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 rounded-lg shadow-xs shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Email Address</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 break-all truncate">
                  {profile?.email || 'N/A'}
                </p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60 overflow-hidden">
              <div className="p-2.5 bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 rounded-lg shadow-xs shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Phone Number</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {profile?.phoneNumber || 'Not Added'}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60 overflow-hidden">
              <div className="p-2.5 bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 rounded-lg shadow-xs shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Account Role</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase truncate">
                  {profile?.role || 'N/A'}
                </p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60 overflow-hidden">
              <div className="p-2.5 bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 rounded-lg shadow-xs shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Member Since</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">Update Profile</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedFile(null);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-5 space-y-4">
              {/* Full Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="e.g. Tanvir Hasan"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
                />
                {errors.name && (
                  <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.name.message}</p>
                )}
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register('phoneNumber')}
                  placeholder="e.g. 01712345678"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:focus:border-emerald-500 transition"
                />
                {errors.phoneNumber && (
                  <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Profile Picture Upload Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 dark:file:bg-emerald-950 file:text-emerald-700 dark:file:text-emerald-400 hover:file:bg-emerald-100 transition cursor-pointer border border-slate-200 dark:border-slate-700 rounded-xl"
                />

                {/* Avatar Preview Box */}
                {(selectedFile || watchedImage) && (
                  <div className="flex items-center gap-3 mt-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <img
                      src={selectedFile ? URL.createObjectURL(selectedFile) : watchedImage}
                      alt="Avatar Preview"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0 bg-white dark:bg-slate-900"
                    />
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 min-w-0">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {selectedFile ? 'New Image Selected' : 'Current Avatar'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-semibold transition disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isSubmitting || uploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      {uploading ? 'Uploading Image...' : 'Updating...'}
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
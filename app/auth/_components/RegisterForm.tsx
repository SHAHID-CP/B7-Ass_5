'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { UserPlus, Loader2, Eye, EyeOff } from 'lucide-react';
import { RegisterInput, registerSchema } from '@/lib/validations';
import { toast } from 'sonner';
import { registerAction } from '../_actions/authActions';

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, null);
  const [, startTransition] = useTransition();

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'TENANT',
    },
  });

  // Handle Server Action Feedback
  useEffect(() => {
    if (state) {
      if (!state.success) {
        toast.error(state.message || 'Registration failed');

        // Server action থেকে specific field error আসলে তা যুক্ত হবে
        if (state.errors?.name) setError('name', { message: state.errors.name });
        if (state.errors?.email) setError('email', { message: state.errors.email });
        if (state.errors?.password) setError('password', { message: state.errors.password });
        if (state.errors?.role) setError('role', { message: state.errors.role });
      } else {
        toast.success(state.message || 'Account created successfully!');
      }
    }
  }, [state, setError]);

  const onSubmit = (data: RegisterInput) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-md w-full bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-xs space-y-5 sm:space-y-6">
      <div className="text-center space-y-1">
        <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mx-auto mb-1.5" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create an Account</h2>
        <p className="text-xs text-gray-500">Join RentNest as a Tenant or Landlord</p>
      </div>

      {/* Global Error Banner */}
      {state && !state.success && (
        <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200/80 font-medium">
          {state.message || 'Registration failed! Please try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            {...register('name')}
            className={`w-full px-3.5 py-2.5 sm:py-2 border rounded-xl text-base sm:text-sm focus:outline-none transition ${
              errors.name
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600'
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-3.5 py-2.5 sm:py-2 border rounded-xl text-base sm:text-sm focus:outline-none transition ${
              errors.email
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`w-full pl-3.5 pr-10 py-2.5 sm:py-2 border rounded-xl text-base sm:text-sm focus:outline-none transition ${
                errors.password
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 transition cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-rose-500 text-xs mt-1 font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Role Select */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">I am a</label>
          <select
            {...register('role')}
            className={`w-full px-3.5 py-2.5 sm:py-2 border rounded-xl text-base sm:text-sm bg-white focus:outline-none cursor-pointer transition ${
              errors.role
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600'
            }`}
          >
            <option value="TENANT">Tenant (Looking to Rent)</option>
            <option value="LANDLORD">Landlord (Listing Property)</option>
          </select>
          {errors.role && (
            <p className="text-rose-500 text-xs mt-1 font-medium">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer mt-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            'Register'
          )}
        </button>
      </form>

      {/* Footer Link */}
      <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
          Sign In here
        </Link>
      </div>
    </div>
  );
}
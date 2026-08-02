'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { LogIn, Loader2, Eye, EyeOff } from 'lucide-react';
import { loginSchema, LoginInput } from '@/lib/validations';
import { loginAction } from '../_actions/authActions';
import { toast } from 'sonner';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '';

  // Password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);

  // Binding redirectTo parameter to the action
  const [state, action, isPending] = useActionState(
    loginAction.bind(null, redirectTo),
    null
  );
  const [, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle Server Action Response & Toast Notifications
  useEffect(() => {
    if (state) {
      if (!state.success) {
        toast.error(state.message || 'Login failed! Please check your credentials.');
        
        // If server returns specific field errors
        if (state.errors?.email) {
          setError('email', { message: state.errors.email });
        }
        if (state.errors?.password) {
          setError('password', { message: state.errors.password });
        }
      } else if (state.success) {
        toast.success('Successfully logged in!');
      }
    }
  }, [state, setError]);

  const onSubmit = (data: LoginInput) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-md w-full bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-xs space-y-5 sm:space-y-6">
      <div className="text-center space-y-1">
        <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mx-auto mb-1.5" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Sign in to RentNest</h2>
        <p className="text-xs text-gray-500">
          Access your Tenant, Landlord, or Admin Portal
        </p>
      </div>

      {/* Global Server Error Message Banner */}
      {state && !state.success && (
        <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200/80 font-medium">
          {state.message || 'Login failed! Please check your credentials.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-3.5 py-2.5 sm:py-2 border rounded-xl text-base sm:text-sm focus:outline-none transition ${
              errors.email
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600'
            }`}
            placeholder="tenant@rentnest.com"
          />
          {errors.email && (
            <p className="text-rose-500 text-xs mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Password
          </label>
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
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-rose-500 text-xs mt-1 font-medium">
              {errors.password.message}
            </p>
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
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Footer / Register Link */}
      <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register here
        </Link>
      </div>
    </div>
  );
}
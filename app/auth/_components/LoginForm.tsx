'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { LogIn, Loader2, Eye, EyeOff, UserCheck } from 'lucide-react';
import { loginSchema, LoginInput } from '@/lib/validations';
import { googleLoginAction, loginAction } from '../_actions/authActions';
import { toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get('redirectTo') ?? '';

  // Password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
    setValue, 
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Auto fill handler function
  const handleAutoFill = (email: string, password: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', password, { shouldValidate: true });
  };

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

  // Google Login Handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setIsGoogleLoading(true);

      startTransition(async () => {
        try {
          const res = await googleLoginAction(tokenResponse.access_token, redirectTo);
          toast.success('Google login Successfully');
          if (res && !res.success) {
            toast.error(res.message || 'Google login failed!');
          }
        } catch (err) {
        } finally {
          setIsGoogleLoading(false);
        }
      });
    },
    onError: () => {
      toast.error('Google Sign-In was cancelled or failed.');
    },
  });

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

      {/* Demo Credentials Section / Role Buttons */}
      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/70 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Demo Accounts (Auto-fill)</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleAutoFill('admin@gmail.com', '12345678')}
            className="px-2 py-1.5 bg-white hover:bg-blue-50 hover:border-blue-300 text-gray-700 hover:text-blue-600 text-xs font-medium rounded-lg border border-gray-200 transition text-center shadow-2xs active:scale-95 cursor-pointer"
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => handleAutoFill('landlord@gmail.com', '12345678')}
            className="px-2 py-1.5 bg-white hover:bg-blue-50 hover:border-blue-300 text-gray-700 hover:text-blue-600 text-xs font-medium rounded-lg border border-gray-200 transition text-center shadow-2xs active:scale-95 cursor-pointer"
          >
            Landlord
          </button>
          <button
            type="button"
            onClick={() => handleAutoFill('tenant11@gmail.com', '12345678')}
            className="px-2 py-1.5 bg-white hover:bg-blue-50 hover:border-blue-300 text-gray-700 hover:text-blue-600 text-xs font-medium rounded-lg border border-gray-200 transition text-center shadow-2xs active:scale-95 cursor-pointer"
          >
            Tenant
          </button>
        </div>
      </div>

      {/* Google Sign-In Button */}
      <button
        type="button"
        onClick={() => handleGoogleLogin()}
        disabled={isGoogleLoading || isPending}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 active:scale-95 text-gray-700 font-semibold py-2.5 rounded-xl text-xs sm:text-sm transition shadow-xs cursor-pointer disabled:opacity-50"
      >
        {isGoogleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-2">
        <div className="border-t border-gray-200 w-full" />
        <span className="bg-white px-3 text-xs text-gray-400 font-medium absolute">
          OR
        </span>
      </div>

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
          disabled={isPending || isGoogleLoading}
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
'use client';

import { useActionState, useEffect, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { loginSchema, LoginInput } from '@/lib/validations';
import { loginAction } from '../_actions/authActions';
import { toast } from 'sonner';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '';

  // Binding redirectTo parameter to the action
  const [state, action, isPending] = useActionState(
    loginAction.bind(null, redirectTo),
    null
  );
  const [, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message || 'Login failed');
    }
  }, [state]);

  const onSubmit = (data: LoginInput) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div className="text-center">
        <LogIn className="w-10 h-10 text-blue-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">Sign in to RentNest</h2>
        <p className="text-xs text-gray-500 mt-1">
          Access your Tenant, Landlord, or Admin Portal
        </p>
      </div>

      {state && !state.success && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
          {state.message || 'Login failed! Please check your credentials.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="tenant@rentnest.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded text-sm transition disabled:opacity-50"
        >
          {isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center text-xs text-gray-500">
        Don't have an account?{' '}
        <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
}
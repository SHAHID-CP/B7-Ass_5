'use client';

import { useActionState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { RegisterInput, registerSchema } from '@/lib/validations';
import { toast } from 'sonner';
import { registerAction } from '../_actions/authActions';

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, null);
  const [, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'TENANT',
    },
  });

  // Backend error alert using toast
  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message || 'Registration failed');
    }
  }, [state]);

  // Form submit bridging React Hook Form to Server Action via FormData
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
    <div className="max-w-md w-full bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div className="text-center">
        <UserPlus className="w-10 h-10 text-blue-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
        <p className="text-xs text-gray-500 mt-1">Join RentNest as a Tenant or Landlord</p>
      </div>

      {state && !state.success && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
          {state.message || 'Registration failed! Please try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="john@example.com"
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

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">I am a</label>
          <select
            {...register('role')}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="TENANT">Tenant (Looking to Rent)</option>
            <option value="LANDLORD">Landlord (Listing Property)</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded text-sm transition disabled:opacity-50"
        >
          {isPending ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div className="text-center text-xs text-gray-500">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
          Sign In here
        </Link>
      </div>
    </div>
  );
}
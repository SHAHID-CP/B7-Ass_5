import { Suspense } from 'react';
import LoginForm from '../_components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-center text-sm text-gray-500">Loading form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
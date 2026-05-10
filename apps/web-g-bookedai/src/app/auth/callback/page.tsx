'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { buildAuthRedirectUrl } from '../../../lib/auth-redirect';

function CallbackHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const provider = searchParams.get('provider');
    const error = searchParams.get('error');

    if (error) {
      window.location.href = `/login?error=${error}`;
      return;
    }

    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_provider', provider || 'openai');

      // Support cross-domain redirect if ?redirect= param is present
      const redirect = searchParams.get('redirect');
      if (redirect) {
        window.location.href = buildAuthRedirectUrl(redirect, token, provider || 'openai');
      } else {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/login?error=no_token';
    }
  }, [searchParams]);

  return (
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
      <p className="mt-4 text-gray-600">Completing sign in...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense fallback={<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />}>
        <CallbackHandler />
      </Suspense>
    </div>
  );
}

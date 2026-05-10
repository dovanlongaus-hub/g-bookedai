/**
 * Shared cross-domain auth utilities for all BookedAI apps.
 * Import from '@bookedai/ui/lib/auth' or copy into your app.
 */

/** Check URL for auth_token param (cross-domain transfer) and persist it. */
export function initAuth(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const token = params.get('auth_token');
  const provider = params.get('auth_provider');

  if (token) {
    localStorage.setItem('auth_token', token);
    if (provider) localStorage.setItem('auth_provider', provider);
    // Remove auth params from URL without reload
    const url = new URL(window.location.href);
    url.searchParams.delete('auth_token');
    url.searchParams.delete('auth_provider');
    window.history.replaceState({}, '', url.pathname + url.search);
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function getAuthProvider(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_provider');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_provider');
  window.location.href = 'https://g.bookedai.au/login';
}

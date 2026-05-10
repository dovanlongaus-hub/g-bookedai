/**
 * Cross-domain auth redirect helper for g.bookedai.au login page.
 * After login succeeds, call redirectWithToken() to pass the auth token
 * to the target app (e.g. app.longcare.au) via URL parameter.
 */

/**
 * Build a redirect URL that includes the auth token as a query parameter.
 * The target app should call initAuth() on load to pick it up.
 */
export function buildAuthRedirectUrl(
  targetUrl: string,
  token: string,
  provider?: string,
): string {
  const url = new URL(targetUrl);
  url.searchParams.set('auth_token', token);
  if (provider) url.searchParams.set('auth_provider', provider);
  return url.toString();
}

/**
 * After a successful login, check if there is a ?redirect= param in the
 * current URL. If so, redirect to that URL with the auth token appended.
 * Otherwise redirect to the default destination.
 */
export function redirectAfterLogin(
  token: string,
  provider: string,
  defaultPath = '/',
): void {
  const params = new URLSearchParams(window.location.search);
  const redirectTarget = params.get('redirect');

  if (redirectTarget) {
    // Cross-domain redirect: append token to target URL
    window.location.href = buildAuthRedirectUrl(redirectTarget, token, provider);
  } else {
    // Same-domain redirect
    window.location.href = defaultPath;
  }
}

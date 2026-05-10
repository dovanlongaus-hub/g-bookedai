/**
 * firebase-client.ts
 *
 * Firebase client SDK initialisation for the LongCare web app.
 *
 * Sprint P1 contract:
 *   - The `firebase` npm package is NOT yet installed in this app.
 *   - The NEXT_PUBLIC_FIREBASE_* env vars are also not set yet.
 *   - This module MUST therefore compile and ship in the Next.js build
 *     today, and silently no-op at runtime, so that adding Firebase later
 *     becomes a single `pnpm add firebase` + env wiring step.
 *
 * Implementation strategy:
 *   - Read config from NEXT_PUBLIC_FIREBASE_* env vars (browser-safe).
 *   - Use dynamic `import('firebase/app')` / `import('firebase/auth')` so
 *     TypeScript and the bundler don't fail at build time when the package
 *     is absent. Wrap in try/catch and fall back to `null` for clean
 *     no-op semantics.
 *   - Cast the Firebase types to `unknown` at our boundary so callers in
 *     this codebase do not depend on the missing types either.
 *
 * Once `pnpm add firebase` has run and the project credentials are issued
 * by Sprint P1 backend onboarding, this file works as-is — no further
 * changes required.
 */

type FirebaseConfig = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
};

let firebaseApp: unknown = null;
let firebaseAuth: unknown = null;

const config: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * True when both API key and project ID are present in env. We don't try to
 * validate the actual Firebase project — that happens lazily inside
 * getFirebaseAuth().
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(config.apiKey && config.projectId);
}

/**
 * Public config snapshot, useful for diagnostics / debug pages. Never logs
 * the API key in prod.
 */
export function getFirebaseConfigSummary(): Pick<FirebaseConfig, "projectId" | "authDomain" | "appId"> & { configured: boolean } {
  return {
    projectId: config.projectId,
    authDomain: config.authDomain,
    appId: config.appId,
    configured: isFirebaseConfigured(),
  };
}

/**
 * Lazily initialise Firebase Auth. Returns `null` if the package is not
 * installed or the env is incomplete — callers MUST handle that.
 */
export async function getFirebaseAuth(): Promise<unknown> {
  if (!isFirebaseConfigured()) return null;
  if (firebaseAuth) return firebaseAuth;

  try {
    // Dynamic imports keep TypeScript / webpack happy when `firebase` is
    // not yet a dependency. The strings are intentionally kept whole so
    // bundlers can still resolve them once the package is installed.
    const appModule: any = await import(/* webpackIgnore: false */ "firebase/app" as string).catch(() => null);
    const authModule: any = await import(/* webpackIgnore: false */ "firebase/auth" as string).catch(() => null);

    if (!appModule || !authModule) {
      console.warn(
        "[firebase-client] firebase package not installed yet; auth disabled. Run `pnpm add firebase` once Sprint P1 backend is provisioned.",
      );
      return null;
    }

    const { initializeApp, getApps } = appModule;
    const { getAuth } = authModule;

    firebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(config);
    firebaseAuth = getAuth(firebaseApp);
    return firebaseAuth;
  } catch (err) {
    console.warn("[firebase-client] failed to initialise Firebase auth", err);
    return null;
  }
}

/**
 * Trigger Google sign-in via popup. Returns the Firebase user credential
 * (typed as `unknown` here to avoid pulling in firebase types). Throws
 * `Error('Firebase not configured')` if the SDK is missing.
 */
export async function signInWithGoogle(): Promise<unknown> {
  const auth = await getFirebaseAuth();
  if (!auth) throw new Error("Firebase not configured");

  const authModule: any = await import("firebase/auth" as string);
  const { GoogleAuthProvider, signInWithPopup } = authModule;
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

/**
 * Trigger email-link sign-in. Sends a magic link; the redirect target
 * page must call `signInWithEmailLink` to complete. Throws if SDK missing.
 */
export async function sendEmailSignInLink(email: string, redirectUrl: string): Promise<void> {
  const auth = await getFirebaseAuth();
  if (!auth) throw new Error("Firebase not configured");

  const authModule: any = await import("firebase/auth" as string);
  const { sendSignInLinkToEmail } = authModule;

  await sendSignInLinkToEmail(auth, email, {
    url: redirectUrl,
    handleCodeInApp: true,
  });

  if (typeof window !== "undefined") {
    window.localStorage.setItem("longcare:emailForSignIn", email);
  }
}

/**
 * Sign out the current user. No-op if SDK missing or no session.
 */
export async function signOut(): Promise<void> {
  const auth = await getFirebaseAuth();
  if (!auth) return;
  const authModule: any = await import("firebase/auth" as string);
  const { signOut: fbSignOut } = authModule;
  await fbSignOut(auth);
}

/**
 * Get a fresh ID token for the currently signed-in user. Useful for
 * authenticated calls to api.g.bookedai.au. Returns null if not signed in
 * or SDK missing.
 */
export async function getIdToken(forceRefresh = false): Promise<string | null> {
  const auth = (await getFirebaseAuth()) as { currentUser?: { getIdToken: (f?: boolean) => Promise<string> } } | null;
  if (!auth || !auth.currentUser) return null;
  return auth.currentUser.getIdToken(forceRefresh);
}

'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Honour Do Not Track / explicit opt-out before any script is injected.
// Note: types are declared in `@/lib/analytics` (single source of truth) —
// importing the module here would couple the script tag to client bundle
// for that file; since `@/lib/analytics` only declares globals it has no
// runtime cost when imported, but we keep this file dependency-free and
// rely on the analytics.ts side-effect declaration being picked up by tsc.
function isOptedOut(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.localStorage.getItem('analytics-opt-out') === 'true') return true;
  } catch {
    // localStorage may be unavailable (private mode); fall through to DNT.
  }
  const nav = window.navigator as Navigator & { doNotTrack?: string; msDoNotTrack?: string };
  const dnt =
    nav.doNotTrack ||
    (window as unknown as { doNotTrack?: string }).doNotTrack ||
    nav.msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}

export function Analytics() {
  // Defer enabling until after mount so we can inspect localStorage / DNT.
  // Server render returns null which keeps the initial HTML free of trackers
  // and prevents a hydration mismatch.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isOptedOut()) return;
    // Defensive guard: if a previous render already injected gtag (e.g.
    // from another mount during fast refresh), don't re-inject.
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      setEnabled(false);
      return;
    }
    setEnabled(true);
  }, []);

  if (!enabled) return null;
  if (!GA4_ID && !GTM_ID) return null;

  return (
    <>
      {GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`if (!window.__lc_ga4_init) {
              window.__lc_ga4_init = true;
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            }`}
          </Script>
        </>
      )}
      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`if (!window.__lc_gtm_init) {
            window.__lc_gtm_init = true;
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          }`}
        </Script>
      )}
    </>
  );
}

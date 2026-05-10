// Resource hints — preconnect / dns-prefetch for known third-party origins.
//
// Render once near the top of <head> (e.g. inside `app/layout.tsx`'s root
// layout, before any <Script>). Browsers use these hints to warm up DNS
// resolution + TLS handshake for origins they *will* contact, which lets
// the actual request (when fired) skip 100-300ms of setup.
//
// Trade-off: each `preconnect` opens a real socket. Don't list more than
// ~6 origins — beyond that the budget burns RAM/battery without payoff.
// `dns-prefetch` is essentially free, so we use it for "maybe-needed"
// origins that don't justify a full preconnect.
//
// This component renders `<link>` elements as JSX children of the parent
// <head>. In Next.js 15 App Router, returning <link> tags from a client or
// server component placed under a layout is valid — Next hoists them.

export function ResourceHints() {
  return (
    <>
      {/* Google Tag Manager + Google Analytics 4 — loaded by the analytics
          script after first interaction, but we want DNS resolved early. */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Booking domain — every primary CTA navigates here, so opening the
          socket pre-click shaves perceived latency on the first booking. */}
      <link rel="preconnect" href="https://book.longcare.au" />
      <link rel="dns-prefetch" href="https://book.longcare.au" />

      {/* App domain — the authenticated surface (post-purchase). Cheap
          dns-prefetch is enough; not every visitor reaches it. */}
      <link rel="dns-prefetch" href="https://app.longcare.au" />

      {/* Google Fonts — `crossOrigin` required because gstatic returns CORS
          headers; without it the preconnect creates a *separate* socket from
          the actual font fetch and the warm-up is wasted. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
    </>
  );
}

'use client';

// Client wrapper for ssr:false dynamic imports.
// Next 15 disallows `ssr: false` from server components, so this is the
// boundary that makes it possible to keep the layout a server component.

import { LazyChatWidget, LazyExitIntentPopup } from '@/lib/lazy-components';

export function GlobalOverlays() {
  return (
    <>
      <LazyChatWidget />
      <LazyExitIntentPopup />
    </>
  );
}

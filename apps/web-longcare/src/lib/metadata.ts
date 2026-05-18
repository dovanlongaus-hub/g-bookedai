import type { Metadata } from 'next';

export type PageMetaInput = {
  title: string;          // ≤ 60 chars
  description: string;    // ≤ 160 chars
  path: string;           // canonical path, e.g. '/services/ai-mentor'
  image?: string;         // optional override; defaults to /api/og?title=...
  noIndex?: boolean;
  type?: 'website' | 'article';
  /**
   * Optional hreflang map for i18n. Keys are BCP 47 language tags
   * (e.g. 'en-AU', 'vi', 'zh-CN', 'x-default'). Values are absolute URLs.
   * Defaults to a single 'en-AU' + 'x-default' pointing at the canonical.
   * Phase 2 i18n will add 'vi' and 'zh-CN' variants.
   */
  languages?: Record<string, string>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://longcare.au';
const SITE_NAME = 'LongCare AU';

export function getPageMetadata(input: PageMetaInput): Metadata {
  const url = `${SITE_URL}${input.path}`;
  const ogImage = input.image ?? `/api/og?title=${encodeURIComponent(input.title)}`;
  const languages = input.languages ?? {
    'en-AU': url,
    'x-default': url,
  };
  return {
    title: input.title,
    description: input.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      locale: 'en_AU',
      type: input.type ?? 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

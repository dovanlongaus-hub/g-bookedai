import type { Metadata } from 'next';

export type PageMetaInput = {
  title: string;          // ≤ 60 chars
  description: string;    // ≤ 160 chars
  path: string;           // canonical path, e.g. '/services/ai-mentor'
  image?: string;         // optional override; defaults to /api/og?title=...
  noIndex?: boolean;
  type?: 'website' | 'article';
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://longcare.au';
const SITE_NAME = 'LongCare AU';

export function getPageMetadata(input: PageMetaInput): Metadata {
  const url = `${SITE_URL}${input.path}`;
  const ogImage = input.image ?? `/api/og?title=${encodeURIComponent(input.title)}`;
  return {
    title: input.title,
    description: input.description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
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

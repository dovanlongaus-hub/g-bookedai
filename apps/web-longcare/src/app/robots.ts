import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    // Sitemap + Atom feeds (discoverable to crawlers and feed readers).
    // The XML sitemap remains canonical; RSS/Atom links are surfaced via
    // <link rel="alternate" type="application/atom+xml"> tags in <head>.
    sitemap: [
      'https://longcare.au/sitemap.xml',
      'https://longcare.au/blog/rss.xml',
      'https://longcare.au/changelog/rss.xml',
      'https://longcare.au/case-studies/rss.xml',
    ],
    host: 'https://longcare.au',
  };
}

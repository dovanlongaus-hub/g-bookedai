import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://longcare.au';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/ai-starter`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/services/ai-mentor`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/services/packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/get-started`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/mentors`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/testimonials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/courses`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  // Blog posts - add slugs here as new posts are published
  const blogSlugs = [
    'getting-started-with-ai',
    'prompt-engineering-basics',
    'ai-tools-for-small-business',
    'chatgpt-vs-gemini',
    'ai-automation-for-sme',
  ];

  const blogPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticPages, ...blogPages];
}

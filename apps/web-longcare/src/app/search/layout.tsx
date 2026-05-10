import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata({
  title: 'Search | LongCare AU',
  description:
    'Search LongCare AU services, blog articles, guides, and pages. Find AI mentoring, courses, and resources fast.',
  path: '/search',
  noIndex: true,
});

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}

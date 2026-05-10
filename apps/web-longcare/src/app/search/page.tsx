import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { SearchClient } from './search-client';

export const metadata: Metadata = getPageMetadata({
  title: 'Search — LongCare AU',
  description:
    'Find services, agents, learning paths, industry solutions, governance, and resources across LongCare AU.',
  path: '/search',
  noIndex: true,
});

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const initialQuery = (sp?.q ?? '').toString();

  return (
    <>
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Search', url: '/search' },
          ]}
        />
      </div>
      <SearchClient initialQuery={initialQuery} />
    </>
  );
}

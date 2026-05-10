import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata';
import { AssessmentClient } from './assessment-client';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Readiness Assessment — Free 6-Min Quiz | LongCare AU',
  description:
    'Discover your AI maturity level, get personalised recommendations, and an ROI estimate. Free 12-question assessment for Australian SMEs.',
  path: '/resources/ai-readiness',
});

const quizSchema = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'AI Readiness Assessment',
  description:
    'A 12-question assessment that scores your organisation across data readiness, team capability, process maturity, and AI use cases — and returns personalised next steps.',
  educationalAlignment: {
    '@type': 'AlignmentObject',
    alignmentType: 'assesses',
    targetName: 'AI maturity for Australian SMEs',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    url: 'https://longcare.au',
  },
  educationalLevel: 'Beginner to Intermediate',
  timeRequired: 'PT6M',
  inLanguage: 'en-AU',
  url: 'https://longcare.au/resources/ai-readiness',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://longcare.au',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Resources',
      item: 'https://longcare.au/resources',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'AI Readiness Assessment',
      item: 'https://longcare.au/resources/ai-readiness',
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AssessmentClient />
    </>
  );
}

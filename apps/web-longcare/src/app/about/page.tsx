import { getPageMetadata } from '../../lib/metadata';
import { AboutTranslated } from './about-translated';

export const metadata = getPageMetadata({
  title: 'About — Practical AI Adoption | LongCare AU',
  description:
    'Founded by Dr. Long Do, LongCare AU helps Australian SMEs and professionals adopt AI through practical mentoring and measurable outcomes.',
  path: '/about',
});

// JSON-LD stays server-rendered in English for SEO continuity. Localised
// schema with `inLanguage` per locale lands in Phase 2 (server-side routing).
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LongCare AU',
  url: 'https://longcare.au',
  logo: 'https://longcare.au/logo.png',
  description:
    'AI mentoring and practical AI adoption services for Australian SMEs and professionals.',
  founder: {
    '@type': 'Person',
    name: 'Dr. Long Do',
    jobTitle: 'Founder & Lead AI Mentor',
  },
  areaServed: { '@type': 'Country', name: 'Australia' },
  sameAs: [],
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {/*
        Phase 1 (delivered): client-side language preview via NextIntlClientProvider.
        URL stays /about for all locales — content swaps in-place when the user
        picks a language from the LocaleSwitcher. SEO continuity preserved
        because metadata + JSON-LD remain server-rendered in English.

        Phase 2 (planned): move app routes into [locale] segment + middleware
        composition for true server-rendered i18n with hreflang. See
        docs/longcare/I18N_GUIDE.md.
      */}
      <AboutTranslated />
    </div>
  );
}

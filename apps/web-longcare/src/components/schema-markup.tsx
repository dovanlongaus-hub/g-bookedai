export function LocalBusinessSchema() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@longcare.au';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Longcare AU',
    description: 'AI-powered mentoring sessions and learning programs for individuals and SMEs',
    url: 'https://longcare.au',
    email: contactEmail,
    areaServed: { '@type': 'Country', name: 'Australia' },
    priceRange: '$29 - $3,000+',
    paymentAccepted: ['Credit Card', 'Bank Transfer', 'PayID'],
    currenciesAccepted: 'AUD',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Mentoring Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: '30-min AI Starter Session', description: 'Quick introduction to AI tools' },
          price: '29.00',
          priceCurrency: 'AUD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: '1-hour AI Mentor', description: 'Deep-dive mentoring session' },
          price: '99.00',
          priceCurrency: 'AUD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: '5-Session Package', description: 'Structured AI learning path' },
          price: '450.00',
          priceCurrency: 'AUD',
        },
      ],
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://longcare.au/#website',
    name: 'LongCare AU',
    alternateName: 'Longcare',
    url: 'https://longcare.au',
    inLanguage: 'en-AU',
    publisher: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://longcare.au/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an AI Mentoring Session?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An AI Mentoring Session is a personalised one-on-one session where an expert guides you through using AI tools effectively for your specific needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I book a session?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit book.longcare.au, choose your preferred service, select an available time slot, and complete payment with card or bank transfer.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept credit/debit cards via Stripe and Australian bank transfers (BSB/Account or PayID).',
        },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

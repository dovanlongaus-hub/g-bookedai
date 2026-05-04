export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://longcare.au${item.url}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        {items.map((item, i) => (
          <span key={i}>
            {i > 0 && <span style={{ margin: '0 0.5rem' }}>/</span>}
            {i < items.length - 1 ? (
              <a href={item.url} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{item.name}</a>
            ) : (
              <span style={{ color: 'var(--accent)' }}>{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

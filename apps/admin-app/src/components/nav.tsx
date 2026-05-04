'use client';

export function AdminNav() {
  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/marketing', label: 'Marketing' },
    { href: '/emails', label: 'Emails' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(5,5,16,0.9)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>Longcare Admin</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>powered by BookedAI</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.85rem' }}>{l.label}</a>
          ))}
          <a href="https://longcare.au" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.85rem' }}>View Site</a>
        </div>
      </div>
    </nav>
  );
}

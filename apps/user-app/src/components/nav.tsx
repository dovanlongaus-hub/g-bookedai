'use client';

export function UserNav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(5,5,16,0.9)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 56 }}>
        <a href="https://longcare.au" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/logo.png" alt="LongCare.au — Long Term Care. AI Powered. Future Ready." className="h-10 w-auto" />
        </a>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="/" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.85rem' }}>Dashboard</a>
          <a href="https://book.longcare.au" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.85rem' }}>Book Session</a>
          <a href="https://g.longcare.au" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.85rem' }}>AI Chat</a>
          <a href="/notifications" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.85rem' }}>Notifications</a>
          <a href="/settings" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.85rem' }}>Settings</a>
          <a href={`https://g.bookedai.au/login?redirect=${encodeURIComponent('https://app.longcare.au')}`} style={{ background: 'var(--primary, #6366f1)', color: '#fff', padding: '0.4rem 1rem', borderRadius: 6, fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Sign In</a>
        </div>
      </div>
    </nav>
  );
}

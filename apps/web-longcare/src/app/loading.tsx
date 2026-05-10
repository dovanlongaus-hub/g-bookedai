export default function Loading() {
  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div
          style={{
            height: 40,
            width: '60%',
            borderRadius: 8,
            background: '#E2E8F0',
            animation: 'shimmer 1.5s infinite',
            backgroundSize: '200% 100%',
            backgroundImage:
              'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
          }}
        />
        <div style={{ height: 20, width: '80%', borderRadius: 6, background: '#E2E8F0', marginTop: 16 }} />
        <div style={{ height: 20, width: '70%', borderRadius: 6, background: '#E2E8F0', marginTop: 8 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: 48 }}>
          {[1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                height: 200,
                borderRadius: 16,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

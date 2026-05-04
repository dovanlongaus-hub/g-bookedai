export function Skeleton({ width = '100%', height = 20, radius = 8 }: { width?: string | number; height?: number; radius?: number }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <Skeleton width="60%" height={24} />
      <div style={{ marginTop: 12 }}><Skeleton width="100%" height={16} /></div>
      <div style={{ marginTop: 8 }}><Skeleton width="80%" height={16} /></div>
      <div style={{ marginTop: 16 }}><Skeleton width={120} height={40} radius={20} /></div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <Skeleton width="25%" height={16} />
          <Skeleton width="30%" height={16} />
          <Skeleton width="15%" height={16} />
          <Skeleton width="20%" height={16} />
        </div>
      ))}
    </div>
  );
}

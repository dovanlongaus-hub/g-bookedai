export function DotsPattern({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.35] ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
      }}
    />
  );
}

'use client';

export function StarterIllustration() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 160 }}>
      <defs>
        <linearGradient id="starter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" rx="16" fill="url(#starter-grad)" />
      <circle cx="200" cy="80" r="25" fill="#22d3ee" opacity="0.3" />
      <rect x="175" y="110" width="50" height="5" rx="2" fill="#22d3ee" opacity="0.4" />
      <rect x="160" y="120" width="80" height="40" rx="6" fill="#1e1e2e" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6" />
      <circle cx="120" cy="60" r="3" fill="#22d3ee" opacity="0.6" />
      <circle cx="280" cy="50" r="4" fill="#6366f1" opacity="0.5" />
      <circle cx="300" cy="90" r="2" fill="#22d3ee" opacity="0.4" />
      <circle cx="100" cy="100" r="3" fill="#6366f1" opacity="0.3" />
      <path d="M195 55 L205 75 L198 75 L205 95" stroke="#22d3ee" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="320" cy="160" r="15" stroke="#22d3ee" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M320 150 V160 H328" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <text x="315" y="180" fill="#22d3ee" fontSize="8" opacity="0.5">30min</text>
    </svg>
  );
}

export function MentorIllustration() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 160 }}>
      <defs>
        <linearGradient id="mentor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" rx="16" fill="url(#mentor-grad)" />
      <circle cx="160" cy="75" r="20" fill="#6366f1" opacity="0.3" />
      <rect x="145" y="100" width="30" height="50" rx="8" fill="#6366f1" opacity="0.2" />
      <circle cx="240" cy="75" r="20" fill="#a855f7" opacity="0.3" />
      <rect x="225" y="100" width="30" height="50" rx="8" fill="#a855f7" opacity="0.2" />
      <path d="M180 85 Q200 70 220 85" stroke="#6366f1" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.5" />
      <circle cx="200" cy="50" r="12" stroke="#a855f7" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M194 50 Q200 42 206 50 M194 53 Q200 61 206 53" stroke="#a855f7" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M320 40 L323 48 L330 48 L324 53 L326 60 L320 56 L314 60 L316 53 L310 48 L317 48Z" fill="#f59e0b" opacity="0.4" />
      <text x="100" y="170" fill="#6366f1" fontSize="10" opacity="0.4">Deep Dive 1-on-1</text>
    </svg>
  );
}

export function Package5Illustration() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 160 }}>
      <defs>
        <linearGradient id="pkg5-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" rx="16" fill="url(#pkg5-grad)" />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <circle cx={100 + i * 55} cy={100} r={12} fill="#10b981" opacity={0.2 + i * 0.15} />
          <text x={100 + i * 55} y={104} textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold" opacity={0.6 + i * 0.08}>{i + 1}</text>
          {i < 4 && <line x1={112 + i * 55} y1={100} x2={143 + i * 55} y2={100} stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />}
        </g>
      ))}
      <path d="M80 130 L320 130" stroke="#10b981" strokeWidth="1" opacity="0.2" />
      <path d="M315 125 L325 130 L315 135" fill="#10b981" opacity="0.3" />
      <text x="200" y="155" textAnchor="middle" fill="#10b981" fontSize="10" opacity="0.4">Structured Learning Path</text>
    </svg>
  );
}

export function Package10Illustration() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 160 }}>
      <defs>
        <linearGradient id="pkg10-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" rx="16" fill="url(#pkg10-grad)" />
      <path d="M175 60 L185 45 L200 55 L215 45 L225 60" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.5" />
      <rect x="175" y="60" width="50" height="15" rx="3" fill="#f59e0b" opacity="0.2" />
      <rect x="160" y="90" width="80" height="60" rx="6" fill="#1e1e2e" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" />
      <rect x="175" y="100" width="50" height="4" rx="2" fill="#f59e0b" opacity="0.3" />
      <rect x="180" y="110" width="40" height="3" rx="1.5" fill="#f59e0b" opacity="0.2" />
      <rect x="185" y="120" width="30" height="3" rx="1.5" fill="#f59e0b" opacity="0.2" />
      <circle cx="200" cy="140" r="6" fill="#f59e0b" opacity="0.3" />
      <text x="200" y="175" textAnchor="middle" fill="#f59e0b" fontSize="10" opacity="0.4">Complete AI Mastery</text>
    </svg>
  );
}

export function TransformIllustration() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 160 }}>
      <defs>
        <linearGradient id="transform-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" rx="16" fill="url(#transform-grad)" />
      <rect x="170" y="50" width="60" height="100" rx="4" fill="#1e1e2e" stroke="#ec4899" strokeWidth="1.5" opacity="0.4" />
      {[0,1,2,3].map(r => [0,1].map(c => (
        <rect key={`${r}-${c}`} x={180 + c * 25} y={60 + r * 22} width="15" height="12" rx="2" fill="#ec4899" opacity={0.15 + r * 0.05} />
      )))}
      <path d="M310 110 L300 80 L290 110" fill="#8b5cf6" opacity="0.3" />
      <path d="M295 115 L300 105 L305 115" fill="#ec4899" opacity="0.3" />
      <path d="M230 100 Q260 80 290 95" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.3" />
      <text x="200" y="175" textAnchor="middle" fill="#ec4899" fontSize="10" opacity="0.4">Enterprise AI Transformation</text>
    </svg>
  );
}

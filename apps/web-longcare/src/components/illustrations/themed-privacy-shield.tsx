type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function ThemedPrivacyShield({ className, width = 400, height = 400 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of layered AI privacy shield"
      viewBox="0 0 400 400"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tps-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <radialGradient id="tps-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="400" rx="20" fill="#F1F5F9" />

      {/* Aura behind shield */}
      <circle cx="200" cy="206" r="170" fill="url(#tps-glow)" />

      {/* Deflected PII tokens */}
      <g
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="700"
        fontSize="11"
      >
        <g>
          <rect x="22" y="60" width="56" height="22" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.4" />
          <text x="50" y="76" textAnchor="middle" fill="#991B1B">PII</text>
        </g>
        <g>
          <rect x="324" y="80" width="62" height="22" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.4" />
          <text x="355" y="96" textAnchor="middle" fill="#991B1B">DOB</text>
        </g>
        <g>
          <rect x="14" y="280" width="68" height="22" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.4" />
          <text x="48" y="296" textAnchor="middle" fill="#991B1B">Card #</text>
        </g>
        <g>
          <rect x="316" y="296" width="70" height="22" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.4" />
          <text x="351" y="312" textAnchor="middle" fill="#991B1B">Medicare</text>
        </g>
      </g>

      {/* Deflection rays */}
      <g stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" fill="none">
        <path d="M84 76 Q120 110 134 130" strokeDasharray="3 4" />
        <path d="M320 92 Q280 120 264 134" strokeDasharray="3 4" />
        <path d="M86 286 Q124 254 138 240" strokeDasharray="3 4" />
        <path d="M318 304 Q280 270 262 254" strokeDasharray="3 4" />
      </g>

      {/* Shield outer */}
      <path
        d="M200 60
           L300 96
           L300 198
           Q300 282 200 332
           Q100 282 100 198
           L100 96 Z"
        fill="url(#tps-shield)"
        stroke="#0F172A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Shield inner panel */}
      <path
        d="M200 84
           L284 114
           L284 196
           Q284 268 200 312
           Q116 268 116 196
           L116 114 Z"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* 4 stacked layers */}
      <g
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="600"
        fontSize="11"
        fill="#0F172A"
      >
        {/* Layer 1: Encryption */}
        <rect x="130" y="130" width="140" height="30" rx="6" fill="#0369A1" />
        <text x="200" y="150" textAnchor="middle" fill="#FFFFFF" letterSpacing="0.3">Encryption</text>
        {/* Layer 2: Consent */}
        <rect x="130" y="166" width="140" height="30" rx="6" fill="#0EA5E9" />
        <text x="200" y="186" textAnchor="middle" fill="#FFFFFF" letterSpacing="0.3">Consent</text>
        {/* Layer 3: Access Control */}
        <rect x="130" y="202" width="140" height="30" rx="6" fill="#22D3EE" />
        <text x="200" y="222" textAnchor="middle" fill="#0F172A" letterSpacing="0.3">Access Control</text>
        {/* Layer 4: Audit */}
        <rect x="130" y="238" width="140" height="30" rx="6" fill="#059669" />
        <text x="200" y="258" textAnchor="middle" fill="#FFFFFF" letterSpacing="0.3">Audit</text>
      </g>

      {/* Top emerald check badge */}
      <g transform="translate(200 96)">
        <circle r="14" fill="#059669" stroke="#0F172A" strokeWidth="1.6" />
        <path
          d="M-6 0 L-2 5 L7 -5"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Sparkles */}
      <g fill="#059669">
        <circle cx="60" cy="200" r="3" />
        <circle cx="340" cy="200" r="3" />
        <circle cx="200" cy="356" r="3" opacity="0.7" />
      </g>
    </svg>
  );
}

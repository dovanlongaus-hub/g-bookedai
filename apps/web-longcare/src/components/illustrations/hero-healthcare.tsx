type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroHealthcare({ className, width = 480, height = 360 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of AI-assisted healthcare workflow with stethoscope, clipboard, and AI orb"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hh-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <radialGradient id="hh-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <pattern id="hh-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#CBD5E1" opacity="0.4" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="480" height="360" rx="20" fill="#F1F5F9" />
      <rect width="480" height="360" rx="20" fill="url(#hh-dots)" />

      {/* Decorative DNA helix corner hint */}
      <g opacity="0.35" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round">
        <path d="M30 30 Q42 42 30 54 Q18 66 30 78" fill="none" />
        <path d="M52 30 Q40 42 52 54 Q64 66 52 78" fill="none" />
        <line x1="32" y1="38" x2="50" y2="38" />
        <line x1="32" y1="58" x2="50" y2="58" />
      </g>

      {/* Pulse rings around AI orb */}
      <circle cx="356" cy="168" r="92" stroke="#38BDF8" strokeWidth="1" opacity="0.18" fill="none" />
      <circle cx="356" cy="168" r="74" stroke="#38BDF8" strokeWidth="1" opacity="0.28" fill="none" />
      <circle cx="356" cy="168" r="105" fill="url(#hh-glow)" />

      {/* Stethoscope */}
      <g stroke="#334155" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M88 110 L88 178 Q88 220 130 230 Q172 240 172 278" />
        <path d="M126 110 L126 178 Q126 210 158 220" />
        <line x1="88" y1="110" x2="88" y2="100" />
        <line x1="126" y1="110" x2="126" y2="100" />
        <circle cx="88" cy="98" r="6" fill="#334155" />
        <circle cx="126" cy="98" r="6" fill="#334155" />
      </g>
      {/* Stethoscope bell */}
      <circle cx="172" cy="288" r="18" fill="#0369A1" stroke="#0F172A" strokeWidth="2" />
      <circle cx="172" cy="288" r="9" fill="#0EA5E9" opacity="0.55" />

      {/* Clipboard */}
      <g>
        <rect x="200" y="140" width="124" height="148" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <rect x="234" y="130" width="56" height="18" rx="4" fill="#0F172A" />
        <line x1="216" y1="174" x2="308" y2="174" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
        <line x1="216" y1="174" x2="278" y2="174" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
        <line x1="216" y1="200" x2="308" y2="200" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
        <line x1="216" y1="200" x2="262" y2="200" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        <line x1="216" y1="226" x2="308" y2="226" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
        <line x1="216" y1="226" x2="294" y2="226" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
        <line x1="216" y1="252" x2="308" y2="252" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* AI orb */}
      <circle cx="356" cy="168" r="56" fill="url(#hh-orb)" />
      <circle cx="342" cy="154" r="12" fill="#FFFFFF" opacity="0.35" />
      {/* Plus / medical cross overlay */}
      <g>
        <rect x="349" y="146" width="14" height="44" rx="3" fill="#FFFFFF" />
        <rect x="334" y="161" width="44" height="14" rx="3" fill="#FFFFFF" />
      </g>

      {/* Small accent dots */}
      <circle cx="416" cy="118" r="5" fill="#0369A1" />
      <circle cx="298" cy="318" r="4" fill="#059669" />
      <circle cx="430" cy="232" r="4" fill="#0EA5E9" opacity="0.6" />
    </svg>
  );
}

type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function HeroRetail({ className, width = 480, height = 360 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Illustration of AI-assisted retail with shopping bag, price tags, and storefront"
      viewBox="0 0 480 360"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hr-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <radialGradient id="hr-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="480" height="360" rx="20" fill="#F1F5F9" />

      {/* Storefront window frame */}
      <g stroke="#CBD5E1" strokeWidth="2" fill="none">
        <rect x="36" y="58" width="408" height="240" rx="6" />
        <line x1="36" y1="92" x2="444" y2="92" />
        <line x1="240" y1="92" x2="240" y2="298" />
      </g>
      {/* Storefront awning */}
      <path d="M30 58 L450 58 L444 50 L36 50 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
      <text
        x="240"
        y="80"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#0F172A"
        letterSpacing="2"
      >
        SHOP
      </text>

      {/* Glow behind orb */}
      <circle cx="362" cy="178" r="98" fill="url(#hr-glow)" />

      {/* Shopping bag silhouette */}
      <g>
        {/* Handles */}
        <path
          d="M122 188 Q122 158 152 158 Q182 158 182 188"
          stroke="#0369A1"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Bag body */}
        <path
          d="M96 188 L208 188 L196 296 L108 296 Z"
          fill="#0369A1"
        />
        <path
          d="M96 188 L208 188 L204 200 L100 200 Z"
          fill="#0F172A"
          opacity="0.35"
        />
        {/* Bag fold line */}
        <line x1="96" y1="188" x2="208" y2="188" stroke="#0F172A" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Price tags */}
      <g>
        {/* Tag 1 */}
        <path d="M232 130 L290 130 L302 148 L290 166 L232 166 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="244" cy="148" r="4" fill="#D97706" />
        <line x1="256" y1="142" x2="288" y2="142" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="256" y1="154" x2="280" y2="154" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g>
        {/* Tag 2 */}
        <path d="M260 188 L318 188 L330 206 L318 224 L260 224 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="272" cy="206" r="4" fill="#059669" />
        <line x1="284" y1="200" x2="316" y2="200" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="284" y1="212" x2="308" y2="212" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g>
        {/* Tag 3 */}
        <path d="M232 244 L290 244 L302 262 L290 280 L232 280 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="244" cy="262" r="4" fill="#0369A1" />
        <line x1="256" y1="256" x2="288" y2="256" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="256" y1="268" x2="282" y2="268" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* AI orb */}
      <circle cx="362" cy="178" r="54" fill="url(#hr-orb)" />
      <circle cx="348" cy="164" r="12" fill="#FFFFFF" opacity="0.35" />
      {/* Shopping cart icon overlay (white) */}
      <g stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M338 162 L344 162 L350 192 L380 192 L386 168 L348 168" />
        <circle cx="354" cy="202" r="3" fill="#FFFFFF" stroke="none" />
        <circle cx="376" cy="202" r="3" fill="#FFFFFF" stroke="none" />
      </g>

      {/* "Sale" sticker badge in corner */}
      <g transform="translate(412 60) rotate(12)">
        <circle cx="0" cy="0" r="22" fill="#D97706" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          SALE
        </text>
      </g>

      {/* AI sparks */}
      <g fill="#0EA5E9">
        <circle cx="408" cy="124" r="3" />
        <circle cx="296" cy="316" r="3" fill="#059669" />
        <circle cx="424" cy="232" r="3" opacity="0.7" />
      </g>
    </svg>
  );
}

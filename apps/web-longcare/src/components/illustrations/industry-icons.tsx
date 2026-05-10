import type { ReactNode } from "react";

type IconProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

const PRIMARY = "#0369A1";
const ACCENT = "#059669";

const iconWrap = (
  ariaLabel: string,
  width: number | string,
  height: number | string,
  className: string | undefined,
  children: ReactNode,
) => (
  <svg
    role="img"
    aria-label={ariaLabel}
    viewBox="0 0 64 64"
    width={width}
    height={height}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export function IndustryHealthcare({ className, width = 64, height = 64 }: IconProps) {
  return iconWrap(
    "Healthcare industry icon: stethoscope with medical cross",
    width,
    height,
    className,
    <>
      <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
      {/* stethoscope tubes */}
      <path
        d="M22 18 v12 a10 10 0 0 0 20 0 v-12"
        stroke={PRIMARY}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* earpieces */}
      <circle cx="22" cy="18" r="2.5" fill={PRIMARY} />
      <circle cx="42" cy="18" r="2.5" fill={PRIMARY} />
      {/* lower bend */}
      <path d="M32 40 v6 a4 4 0 0 0 4 4 h2" stroke={PRIMARY} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* bell */}
      <circle cx="42" cy="50" r="6" fill={ACCENT} />
      {/* cross inside bell */}
      <path d="M42 47 v6 M39 50 h6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </>,
  );
}

export function IndustryRetail({ className, width = 64, height = 64 }: IconProps) {
  return iconWrap(
    "Retail industry icon: shopping bag with handle",
    width,
    height,
    className,
    <>
      <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
      {/* handle */}
      <path d="M24 24 a8 8 0 0 1 16 0" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* bag body */}
      <path
        d="M18 24 h28 l-3 26 a3 3 0 0 1 -3 3 H24 a3 3 0 0 1 -3 -3 z"
        fill={PRIMARY}
      />
      {/* tag */}
      <circle cx="40" cy="34" r="3" fill="#FFFFFF" />
      <line x1="40" y1="34" x2="44" y2="38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </>,
  );
}

export function IndustryHospitality({ className, width = 64, height = 64 }: IconProps) {
  return iconWrap(
    "Hospitality industry icon: coffee cup with steam",
    width,
    height,
    className,
    <>
      <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
      {/* steam */}
      <path d="M24 16 q-3 4 0 8" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M32 14 q-3 4 0 8" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M40 16 q-3 4 0 8" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* cup body */}
      <path
        d="M18 30 h24 v12 a8 8 0 0 1 -8 8 H26 a8 8 0 0 1 -8 -8 z"
        fill={PRIMARY}
      />
      {/* handle */}
      <path
        d="M42 34 a5 5 0 0 1 0 10"
        stroke={PRIMARY}
        strokeWidth="3"
        fill="none"
      />
      {/* saucer */}
      <rect x="14" y="50" width="32" height="3" rx="1.5" fill={PRIMARY} />
    </>,
  );
}

export function IndustryRealEstate({ className, width = 64, height = 64 }: IconProps) {
  return iconWrap(
    "Real estate industry icon: house with key",
    width,
    height,
    className,
    <>
      <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
      {/* roof */}
      <path d="M14 32 L32 16 L50 32" stroke={PRIMARY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* body */}
      <rect x="20" y="32" width="24" height="18" rx="2" fill={PRIMARY} />
      {/* door */}
      <rect x="29" y="38" width="6" height="12" rx="1" fill="#FFFFFF" />
      {/* window */}
      <rect x="36" y="36" width="6" height="6" rx="1" fill="#FFFFFF" />
      {/* key bow */}
      <circle cx="48" cy="50" r="4" fill={ACCENT} stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="48" y1="46" x2="48" y2="42" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="44" x2="50" y2="44" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
    </>,
  );
}

export function IndustryTrades({ className, width = 64, height = 64 }: IconProps) {
  return iconWrap(
    "Trades industry icon: wrench tool",
    width,
    height,
    className,
    <>
      <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
      {/* wrench */}
      <path
        d="M22 22 a8 8 0 0 1 11 11 l13 13 a3 3 0 1 1 -4 4 l-13 -13 a8 8 0 0 1 -11 -11 l5 5 l4 -4 z"
        fill={PRIMARY}
      />
      {/* bolt accent */}
      <circle cx="46" cy="46" r="3" fill={ACCENT} />
    </>,
  );
}

export function IndustryEducation({ className, width = 64, height = 64 }: IconProps) {
  return iconWrap(
    "Education industry icon: open book and graduation cap",
    width,
    height,
    className,
    <>
      <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
      {/* graduation cap */}
      <path d="M14 26 L32 18 L50 26 L32 34 Z" fill={ACCENT} />
      <path d="M22 30 v6 a10 6 0 0 0 20 0 v-6" stroke={ACCENT} strokeWidth="2" fill="none" />
      <line x1="48" y1="26" x2="48" y2="34" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
      {/* book */}
      <path d="M14 40 q9 -4 18 0 q9 -4 18 0 v10 q-9 -4 -18 0 q-9 -4 -18 0 z" fill={PRIMARY} />
      <line x1="32" y1="40" x2="32" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
    </>,
  );
}

export function IndustryProfessional({ className, width = 64, height = 64 }: IconProps) {
  return iconWrap(
    "Professional services industry icon: briefcase",
    width,
    height,
    className,
    <>
      <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
      {/* handle */}
      <path d="M26 22 v-3 a2 2 0 0 1 2 -2 h8 a2 2 0 0 1 2 2 v3" stroke={PRIMARY} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* briefcase */}
      <rect x="14" y="22" width="36" height="26" rx="3" fill={PRIMARY} />
      {/* mid divider */}
      <rect x="14" y="32" width="36" height="3" fill={ACCENT} />
      {/* lock */}
      <rect x="29" y="34" width="6" height="4" rx="1" fill="#FFFFFF" />
    </>,
  );
}

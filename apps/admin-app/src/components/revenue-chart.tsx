'use client';

const MOCK_DATA = [
  { month: 'Jan', revenue: 450 },
  { month: 'Feb', revenue: 820 },
  { month: 'Mar', revenue: 1200 },
  { month: 'Apr', revenue: 1850 },
  { month: 'May', revenue: 2400 },
];

const MAX = Math.max(...MOCK_DATA.map(d => d.revenue));
const WIDTH = 600;
const HEIGHT = 200;
const PADDING = 40;
const BAR_WIDTH = 60;
const GAP = 30;

export function RevenueChart() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT + 40}`} style={{ width: '100%', maxWidth: WIDTH }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = PADDING + (HEIGHT - PADDING) * (1 - pct);
          return (
            <g key={i}>
              <line x1={PADDING} y1={y} x2={WIDTH - 10} y2={y} stroke="rgba(255,255,255,0.06)" />
              <text x={4} y={y + 4} fill="#555" fontSize="10">${Math.round(MAX * pct)}</text>
            </g>
          );
        })}

        {/* Bars */}
        {MOCK_DATA.map((d, i) => {
          const barHeight = ((d.revenue / MAX) * (HEIGHT - PADDING));
          const x = PADDING + 20 + i * (BAR_WIDTH + GAP);
          const y = HEIGHT - barHeight;
          return (
            <g key={i}>
              <defs>
                <linearGradient id={`bar-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <rect x={x} y={y} width={BAR_WIDTH} height={barHeight} rx={4} fill={`url(#bar-${i})`} />
              <text x={x + BAR_WIDTH / 2} y={HEIGHT + 20} fill="#888" fontSize="11" textAnchor="middle">{d.month}</text>
              <text x={x + BAR_WIDTH / 2} y={y - 8} fill="#22c55e" fontSize="11" fontWeight="600" textAnchor="middle">${d.revenue}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

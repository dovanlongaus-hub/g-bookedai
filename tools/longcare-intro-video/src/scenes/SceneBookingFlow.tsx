import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SLOTS = ['9:00', '10:30', '12:00', '14:00', '15:30', '17:00'];

export const SceneBookingFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  // Calendar appears
  const calOp = interpolate(frame, [25, 60], [0, 1], { extrapolateRight: 'clamp' });
  const calY = interpolate(frame, [25, 60], [40, 0], { extrapolateRight: 'clamp' });

  // Click highlight pulses around frame 130
  const clickPulse = interpolate(
    frame,
    [125, 145, 165],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Confirmation card slides in around frame 200
  const confSp = spring({
    frame: Math.max(frame - 200, 0),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const confOp = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: 'clamp' });

  // Email mock at frame 290
  const emailSp = spring({
    frame: Math.max(frame - 290, 0),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const emailOp = interpolate(frame, [290, 320], [0, 1], { extrapolateRight: 'clamp' });

  const fadeOut = interpolate(frame, [360, 390], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Selected slot: Wed 14:00
  const SELECTED_DAY = 2;
  const SELECTED_SLOT = 3;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, #F0F9FF 100%)`,
        padding: '70px 100px',
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 4,
          color: COLORS.primary2,
          opacity: titleOp,
        }}
      >
        BOOKING — TRUTH ENGINE CONFIRMED
      </div>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 800,
          margin: '12px 0 40px',
          letterSpacing: -2,
          opacity: titleOp,
          color: COLORS.textDark,
        }}
      >
        Book in 60 seconds. Confirmed instantly.
      </h2>

      <div style={{ display: 'flex', gap: 40, flex: 1, alignItems: 'flex-start' }}>
        {/* Calendar mock */}
        <div
          style={{
            flex: 1,
            background: COLORS.white,
            borderRadius: 28,
            padding: 32,
            boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
            border: `1px solid ${COLORS.border}`,
            opacity: calOp,
            transform: `translateY(${calY}px)`,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: COLORS.textDark }}>
            Choose your session — May 2026
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            {DAYS.map((d) => (
              <div
                key={d}
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: COLORS.textMuted,
                  textAlign: 'center',
                  paddingBottom: 8,
                  letterSpacing: 1,
                }}
              >
                {d}
              </div>
            ))}
            {SLOTS.map((slot, slotIdx) =>
              DAYS.map((d, dayIdx) => {
                const isSelected = dayIdx === SELECTED_DAY && slotIdx === SELECTED_SLOT;
                const isAvailable = (dayIdx + slotIdx) % 3 !== 0;
                return (
                  <div
                    key={`${d}-${slot}`}
                    style={{
                      padding: '14px 8px',
                      borderRadius: 12,
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 600,
                      background: isSelected
                        ? `linear-gradient(135deg, ${COLORS.primary1}, ${COLORS.primary2})`
                        : isAvailable
                        ? '#F1F5F9'
                        : '#FAFAFA',
                      color: isSelected ? '#fff' : isAvailable ? COLORS.textDark : COLORS.textLight,
                      border: isSelected
                        ? `2px solid ${COLORS.primary1}`
                        : `2px solid transparent`,
                      boxShadow: isSelected
                        ? `0 0 0 ${clickPulse * 16}px rgba(124,58,237,${0.3 * (1 - clickPulse)})`
                        : 'none',
                    }}
                  >
                    {slot}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column — confirmation + email */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Confirmation card */}
          <div
            style={{
              background: COLORS.white,
              borderRadius: 24,
              padding: 32,
              boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
              border: `2px solid ${COLORS.emerald}`,
              opacity: confOp,
              transform: `scale(${0.85 + confSp * 0.15}) translateY(${(1 - confSp) * 20}px)`,
              transformOrigin: 'top left',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: COLORS.emerald,
                color: '#fff',
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 1,
                marginBottom: 16,
              }}
            >
              ✓ CONFIRMED
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${COLORS.primary1}, ${COLORS.primary3})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#fff',
                }}
              >
                SK
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.textDark }}>
                  Sarah Kim — AI Mentor
                </div>
                <div style={{ fontSize: 16, color: COLORS.textMuted, marginTop: 2 }}>
                  1:1 Strategy Session · 60 min
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                paddingTop: 18,
                borderTop: `1px solid ${COLORS.border}`,
                fontSize: 18,
                color: COLORS.textDark,
                fontWeight: 600,
              }}
            >
              Wed 13 May · 14:00 AEST · Google Meet
            </div>
          </div>

          {/* Email mock */}
          <div
            style={{
              background: COLORS.white,
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 16px 50px rgba(15,23,42,0.08)',
              border: `1px solid ${COLORS.border}`,
              opacity: emailOp,
              transform: `scale(${0.9 + emailSp * 0.1}) translateY(${(1 - emailSp) * 16}px)`,
              transformOrigin: 'top left',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
                color: COLORS.textMuted,
                marginBottom: 8,
              }}
            >
              <span style={{ fontWeight: 700, color: COLORS.primary2 }}>Gmail</span>
              <span>·</span>
              <span>booking@longcare.au</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.textDark }}>
              Your session is confirmed ✨
            </div>
            <div style={{ fontSize: 16, color: COLORS.textMuted, marginTop: 6, lineHeight: 1.5 }}>
              Calendar invite sent. Google Meet link inside.
              See you Wed 13 May at 14:00.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

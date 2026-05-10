import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { SceneBannerIntro } from './scenes/SceneBannerIntro';
import { SceneHook } from './scenes/SceneHook';
import { SceneAIMentor } from './scenes/SceneAIMentor';
import { SceneLearningFlow } from './scenes/SceneLearningFlow';
import { SceneBookingFlow } from './scenes/SceneBookingFlow';
import { ScenePayments } from './scenes/ScenePayments';
import { SceneOutcome } from './scenes/SceneOutcome';
import { SceneBannerOutro } from './scenes/SceneBannerOutro';
import { LogoOverlay } from './components/LogoOverlay';
import { SubtitleBar } from './components/SubtitleBar';
import { COLORS, FONT } from './theme';

const { fontFamily } = loadFont();

// Total: 1800 frames (60s @ 30fps).
//   0–150     (0–5s)   Banner intro          (no logo, no subtitle)
//   150–300   (5–10s)  Hook
//   300–540   (10–18s) AI Mentor
//   540–840   (18–28s) Learning Flow
//   840–1140  (28–38s) Booking
//   1140–1440 (38–48s) Payments
//   1440–1620 (48–54s) Outcome
//   1620–1800 (54–60s) Banner outro
//
// LogoOverlay covers 150–1620 (frames 150 + 1470).
const T = {
  bannerIn: { from: 0, dur: 150 },
  hook: { from: 150, dur: 150 },
  aiMentor: { from: 300, dur: 240 },
  learning: { from: 540, dur: 300 },
  booking: { from: 840, dur: 300 },
  payment: { from: 1140, dur: 300 },
  outcome: { from: 1440, dur: 180 },
  bannerOut: { from: 1620, dur: 180 },
};

const LOGO_FROM = 150;
const LOGO_DUR = 1470; // hides at 1620 (banner outro takes over)

export const MainComp: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: fontFamily ?? FONT.family,
        color: COLORS.textDark,
        width,
        height,
      }}
    >
      {/* Audio tracks (muxed by Remotion) */}
      <Audio src={staticFile('vo.mp3')} volume={1.0} />
      <Audio src={staticFile('bgm.mp3')} volume={0.12} />

      {/* Scenes */}
      <Sequence from={T.bannerIn.from} durationInFrames={T.bannerIn.dur}>
        <SceneBannerIntro />
      </Sequence>

      <Sequence from={T.hook.from} durationInFrames={T.hook.dur}>
        <SceneHook />
        <SubtitleBar
          text="Meet LongCare. Your AI mentor for Australian businesses."
          totalFrames={T.hook.dur}
        />
      </Sequence>

      <Sequence from={T.aiMentor.from} durationInFrames={T.aiMentor.dur}>
        <SceneAIMentor />
        <SubtitleBar
          text="Personal AI guidance, anytime."
          totalFrames={T.aiMentor.dur}
        />
      </Sequence>

      <Sequence from={T.learning.from} durationInFrames={T.learning.dur}>
        <SceneLearningFlow />
        <SubtitleBar
          text="From first chat to deployed agent — in 4 weeks."
          totalFrames={T.learning.dur}
        />
      </Sequence>

      <Sequence from={T.booking.from} durationInFrames={T.booking.dur}>
        <SceneBookingFlow />
        <SubtitleBar
          text="Book a session in 60 seconds. Confirmed instantly."
          totalFrames={T.booking.dur}
        />
      </Sequence>

      <Sequence from={T.payment.from} durationInFrames={T.payment.dur}>
        <ScenePayments />
        <SubtitleBar
          text="Stripe · BNPL · PayID · BPAY · VietQR"
          totalFrames={T.payment.dur}
        />
      </Sequence>

      <Sequence from={T.outcome.from} durationInFrames={T.outcome.dur}>
        <SceneOutcome />
        <SubtitleBar
          text="150+ Australian businesses · 4.9★ rating"
          totalFrames={T.outcome.dur}
        />
      </Sequence>

      <Sequence from={T.bannerOut.from} durationInFrames={T.bannerOut.dur}>
        <SceneBannerOutro />
      </Sequence>

      {/* Logo overlay only on middle scenes (5s–54s) */}
      <Sequence from={LOGO_FROM} durationInFrames={LOGO_DUR}>
        <LogoOverlay />
      </Sequence>
    </AbsoluteFill>
  );
};

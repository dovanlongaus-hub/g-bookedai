import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

// Bundle analyzer is OPT-IN only. Production builds (`pnpm build`) are
// unaffected; pass `ANALYZE=true pnpm build` to emit per-route HTML reports
// under `.next/analyze/`. The wrapper is a no-op when the env var is unset,
// so there is zero runtime impact on regular CI / Cloud Run builds.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@bookedai/shared'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      // P0 — empty/duplicate pages collapsed into canonical routes.
      { source: '/pricing', destination: '/services', permanent: true },
      { source: '/get-started', destination: '/services', permanent: true },
      { source: '/mentors', destination: '/about#team', permanent: true },
      // P1 IA migration — legacy lead-gen routes consolidated under /resources.
      { source: '/quiz', destination: '/resources/ai-readiness', permanent: true },
      { source: '/discovery', destination: '/resources/ai-readiness', permanent: true },
      { source: '/courses', destination: '/academy', permanent: true },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

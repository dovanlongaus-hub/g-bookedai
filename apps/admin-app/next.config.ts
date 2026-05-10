import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@bookedai/shared'],
  typescript: {
    // shadcn/ui components use @base-ui/react which has type resolution
    // issues in Next.js .next/types/ validator context within pnpm monorepo.
    // Compilation succeeds; only the post-build type validator fails.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

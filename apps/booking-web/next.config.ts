import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@bookedai/shared'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

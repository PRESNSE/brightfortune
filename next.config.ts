import type { NextConfig } from 'next';

const config: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  poweredByHeader: false,
  reactStrictMode: true,
  outputFileTracingIncludes: { '/**': ['./content/**/*'] },
  async redirects() {
    return [
      { source: '/main.htm', destination: '/', permanent: true },
      { source: '/aboutus.htm', destination: '/who-we-are', permanent: true },
    ];
  },
  async headers() {
    return [
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }, { key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
};
export default config;

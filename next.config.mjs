/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placeholder.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  i18n: {
    locales: ['it'],
    defaultLocale: 'it',
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com https://api.mapbox.com https://events.mapbox.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://*.mapbox.com; connect-src 'self' https://*.mapbox.com https://api.mapbox.com https://events.mapbox.com https://vercel.live",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  experimental: {
    optimizeFonts: true,
    modern: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
};

export default nextConfig;
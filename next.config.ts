import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const cacheHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,  // don't leak "X-Powered-By: Next.js"
  reactStrictMode: true,   // catch bugs early
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,  // cache optimized images for 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  serverExternalPackages: ["@prisma/client"],  // prevent Prisma from being bundled into each function
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  outputFileTracingExcludes: {
    '*': [
      'public/**/*.mp4',
      'public/**/*.png',
      'public/**/*.jpg',
      'public/**/*.jpeg',
      'public/**/*.webp',
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Long-lived cache for static images
      {
        source: "/img/:path*",
        headers: cacheHeaders,
      },
      // Long-lived cache for fonts
      {
        source: "/fonts/:path*",
        headers: cacheHeaders,
      },
      // Cache JS/CSS assets
      {
        source: "/_next/static/:path*",
        headers: cacheHeaders,
      },
    ];
  },
};

export default nextConfig;

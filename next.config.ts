import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;

// 'unsafe-inline'/'unsafe-eval' on script-src are what Next's inline bootstrap
// and dev runtime need; the value of the policy here is that everything else
// (fetch targets, frames, fonts, objects) is pinned to this origin plus the
// OpenStreetMap embed used on the contact and Herat pages.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'self' https://www.openstreetmap.org",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    // Every asset is local now, so no remote host needs to be whitelisted.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 180, 256, 384],
    minimumCacheTTL: ONE_YEAR,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "swiper"],
  },
  // 301 is used explicitly instead of `permanent: true` (which emits 308).
  // Both are permanent to Google, but 301 is what every third-party SEO
  // crawler and legacy client understands without special-casing.
  async redirects() {
    return [
      // The software/database page used to live under a brand-registration URL
      // that never described its content. Permanent so the old links and any
      // accumulated ranking follow it.
      {
        source: "/brand-registration",
        destination: "/software-solutions",
        statusCode: 301,
      },
      // /database-solutions is now a real page of its own, so the historic
      // alias points at it instead of at the software page.
      {
        source: "/database-journey",
        destination: "/database-solutions",
        statusCode: 301,
      },
      // The portfolio moved from a nested path that described nothing to a
      // clean, linkable URL.
      {
        source: "/portfolios/site",
        destination: "/portfolio",
        statusCode: 301,
      },
      {
        source: "/portfolios",
        destination: "/portfolio",
        statusCode: 301,
      },
      // /logo-design now has a topically correct destination: the graphic
      // design service page.
      {
        source: "/logo-design",
        destination: "/graphic-design",
        statusCode: 301,
      },
      // Order requests are handled by the contact page; /order was linked from
      // an older hero and never had a page of its own.
      {
        source: "/order",
        destination: "/contact",
        statusCode: 301,
      },
    ];
  },

  async headers() {
    return [
      {
        // Hashed filenames are not used here, but these assets are content-stable
        // and cheap to bust by renaming, so a long immutable TTL is safe.
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` },
        ],
      },
      {
        source: "/:all*(png|jpg|jpeg|webp|avif|gif|svg|ico)",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

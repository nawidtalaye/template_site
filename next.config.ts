import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self' https:",
  "frame-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
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
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 180, 256, 384],
    minimumCacheTTL: ONE_YEAR,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "swiper"],
  },
  async redirects() {
    return [
      // Old multi-page routes permanently redirected to the single-page showcase sections
      {
        source: "/oil-and-gas-software",
        destination: "/#intro",
        statusCode: 301,
      },
      {
        source: "/software-solutions",
        destination: "/#features",
        statusCode: 301,
      },
      {
        source: "/business-systems",
        destination: "/#modules",
        statusCode: 301,
      },
      {
        source: "/database-solutions",
        destination: "/#capabilities",
        statusCode: 301,
      },
      {
        source: "/erp",
        destination: "/#modules",
        statusCode: 301,
      },
      {
        source: "/accounting-software",
        destination: "/#modules",
        statusCode: 301,
      },
      {
        source: "/web-design",
        destination: "/#plans",
        statusCode: 301,
      },
      {
        source: "/graphic-design",
        destination: "/#showcase",
        statusCode: 301,
      },
      {
        source: "/portfolio",
        destination: "/#showcase",
        statusCode: 301,
      },
      {
        source: "/portfolio/:slug",
        destination: "/#showcase",
        statusCode: 301,
      },
      {
        source: "/about",
        destination: "/#about",
        statusCode: 301,
      },
      {
        source: "/herat",
        destination: "/#about",
        statusCode: 301,
      },
      {
        source: "/contact",
        destination: "/#contact",
        statusCode: 301,
      },
      {
        source: "/blog",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/blog/:slug",
        destination: "/",
        statusCode: 301,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` },
        ],
      },
      {
        source: "/:all*(png|jpg|jpeg|webp|avif|gif|svg|ico|mp4)",
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

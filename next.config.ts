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
  // Preview and tunnel hosts used during development and review.
  allowedDevOrigins: ["*.e2b.app", "*.arena.ai", "localhost"],
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
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    // The site is a single page: every legacy service URL now lands on the
    // section that carries the same content. Only anchors that exist.
    return [
      { source: "/oil-and-gas-software", destination: "/#intro", statusCode: 301 },
      { source: "/oil-and-gas", destination: "/#industry", statusCode: 301 },
      { source: "/petroleum-software", destination: "/#intro", statusCode: 301 },
      { source: "/fuel-management", destination: "/#modules", statusCode: 301 },
      { source: "/software-solutions", destination: "/#areas", statusCode: 301 },
      { source: "/business-systems", destination: "/#modules", statusCode: 301 },
      { source: "/database-solutions", destination: "/#showcase", statusCode: 301 },
      { source: "/erp", destination: "/#modules", statusCode: 301 },
      { source: "/accounting-software", destination: "/#modules", statusCode: 301 },
      { source: "/solutions", destination: "/#industry", statusCode: 301 },

      // Design & portfolio legacy
      { source: "/web-design", destination: "/#showcase", statusCode: 301 },
      { source: "/graphic-design", destination: "/#showcase", statusCode: 301 },
      { source: "/portfolio", destination: "/#customers", statusCode: 301 },
      { source: "/portfolio/:slug", destination: "/#customers", statusCode: 301 },
      { source: "/projects", destination: "/#customers", statusCode: 301 },
      { source: "/projects/:slug", destination: "/#customers", statusCode: 301 },

      // Company pages
      { source: "/about", destination: "/#about", statusCode: 301 },
      { source: "/about-us", destination: "/#about", statusCode: 301 },
      { source: "/herat", destination: "/#about", statusCode: 301 },
      { source: "/contact", destination: "/#contact", statusCode: 301 },
      { source: "/contact-us", destination: "/#contact", statusCode: 301 },

      // Pricing & trust
      { source: "/pricing", destination: "/#plans", statusCode: 301 },
      { source: "/plans", destination: "/#plans", statusCode: 301 },
      { source: "/customers", destination: "/#customers", statusCode: 301 },
      { source: "/clients", destination: "/#customers", statusCode: 301 },

      // Blog and language prefixes removed -> home
      { source: "/blog", destination: "/", statusCode: 301 },
      { source: "/blog/:slug", destination: "/", statusCode: 301 },
      { source: "/news", destination: "/", statusCode: 301 },
      { source: "/news/:slug", destination: "/", statusCode: 301 },
      { source: "/articles", destination: "/", statusCode: 301 },
      { source: "/articles/:slug", destination: "/", statusCode: 301 },
      { source: "/fa/:path*", destination: "/", statusCode: 301 },
      { source: "/en/:path*", destination: "/", statusCode: 301 },
    ];
  },

  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` }],
      },
      {
        source: "/:all*(png|jpg|jpeg|webp|avif|gif|svg|ico|mp4)",
        headers: [{ key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

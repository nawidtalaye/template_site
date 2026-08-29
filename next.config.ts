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
      // Core oil & gas legacy pages -> relevant sections
      { source: "/oil-and-gas-software", destination: "/#intro", statusCode: 301 },
      { source: "/oil-and-gas", destination: "/#intro", statusCode: 301 },
      { source: "/petroleum-software", destination: "/#intro", statusCode: 301 },
      { source: "/fuel-management", destination: "/#features", statusCode: 301 },
      { source: "/software-solutions", destination: "/#features", statusCode: 301 },
      { source: "/business-systems", destination: "/#modules", statusCode: 301 },
      { source: "/database-solutions", destination: "/#capabilities", statusCode: 301 },
      { source: "/erp", destination: "/#modules", statusCode: 301 },
      { source: "/accounting-software", destination: "/#modules", statusCode: 301 },
      { source: "/services", destination: "/#services", statusCode: 301 },
      { source: "/services/:slug", destination: "/#services", statusCode: 301 },
      { source: "/products", destination: "/#modules", statusCode: 301 },
      { source: "/products/:slug", destination: "/#modules", statusCode: 301 },
      { source: "/solutions", destination: "/#capabilities", statusCode: 301 },
      { source: "/solutions/:slug", destination: "/#capabilities", statusCode: 301 },

      // Design & portfolio legacy
      { source: "/web-design", destination: "/#plans", statusCode: 301 },
      { source: "/graphic-design", destination: "/#showcase", statusCode: 301 },
      { source: "/portfolio", destination: "/#showcase", statusCode: 301 },
      { source: "/portfolio/:slug", destination: "/#showcase", statusCode: 301 },
      { source: "/projects", destination: "/#showcase", statusCode: 301 },
      { source: "/projects/:slug", destination: "/#showcase", statusCode: 301 },

      // Company pages
      { source: "/about", destination: "/#about", statusCode: 301 },
      { source: "/about-us", destination: "/#about", statusCode: 301 },
      { source: "/herat", destination: "/#about", statusCode: 301 },
      { source: "/team", destination: "/#team", statusCode: 301 },
      { source: "/contact", destination: "/#contact", statusCode: 301 },
      { source: "/contact-us", destination: "/#contact", statusCode: 301 },

      // Pricing & trust
      { source: "/pricing", destination: "/#plans", statusCode: 301 },
      { source: "/plans", destination: "/#plans", statusCode: 301 },
      { source: "/customers", destination: "/#trust", statusCode: 301 },
      { source: "/clients", destination: "/#trust", statusCode: 301 },

      // Blog removed -> home
      { source: "/blog", destination: "/", statusCode: 301 },
      { source: "/blog/:slug", destination: "/", statusCode: 301 },
      { source: "/news", destination: "/", statusCode: 301 },
      { source: "/news/:slug", destination: "/", statusCode: 301 },
      { source: "/articles", destination: "/", statusCode: 301 },
      { source: "/articles/:slug", destination: "/", statusCode: 301 },

      // Catch-all for any other legacy single pages that might have existed
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

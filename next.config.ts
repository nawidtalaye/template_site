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
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    // Every legacy route now resolves to the matching section of the single page.
    const sectionFor: Record<string, string> = {
      "/oil-and-gas-software": "intro",
      "/oil-and-gas": "intro",
      "/petroleum-software": "intro",

      "/fuel-management": "modules",
      "/software-solutions": "modules",
      "/business-systems": "modules",
      "/erp": "modules",
      "/accounting-software": "modules",
      "/products": "modules",

      "/database-solutions": "capabilities",
      "/solutions": "capabilities",

      "/services": "process",

      "/web-design": "showcase",
      "/graphic-design": "showcase",
      "/portfolio": "showcase",
      "/projects": "showcase",

      "/pricing": "plans",
      "/plans": "plans",

      "/customers": "trust",
      "/clients": "trust",

      "/about": "about",
      "/about-us": "about",
      "/herat": "about",
      "/team": "team",

      "/contact": "contact",
      "/contact-us": "contact",
    };

    return [
      ...Object.entries(sectionFor).map(([source, section]) => ({
        source,
        destination: `/#${section}`,
        statusCode: 301 as const,
      })),
      // Wildcard legacy detail pages collapse onto the same sections.
      { source: "/services/:slug", destination: "/#process", statusCode: 301 as const },
      { source: "/products/:slug", destination: "/#modules", statusCode: 301 as const },
      { source: "/solutions/:slug", destination: "/#capabilities", statusCode: 301 as const },
      { source: "/portfolio/:slug", destination: "/#showcase", statusCode: 301 as const },
      { source: "/projects/:slug", destination: "/#showcase", statusCode: 301 as const },
      // Editorial content was retired with the multi-page site.
      { source: "/blog", destination: "/", statusCode: 301 as const },
      { source: "/blog/:slug", destination: "/", statusCode: 301 as const },
      { source: "/news", destination: "/", statusCode: 301 as const },
      { source: "/news/:slug", destination: "/", statusCode: 301 as const },
      { source: "/articles", destination: "/", statusCode: 301 as const },
      { source: "/articles/:slug", destination: "/", statusCode: 301 as const },
      { source: "/fa/:path*", destination: "/", statusCode: 301 as const },
      { source: "/en/:path*", destination: "/", statusCode: 301 as const },
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

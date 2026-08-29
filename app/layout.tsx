import type { Metadata } from "next";
import localFont from "next/font/local";
import "./legacy-base.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo";
import { companyInfo, siteUrl } from "@/lib/site-content";

// WOFF2 rather than the TTFs that ship alongside them: same faces, ~70% smaller
// (25-27KB vs 84-86KB each), so the swap from the fallback font happens sooner
// and the text reflow it causes is smaller.
const iranYekan = localFont({
  src: [
    {
      path: "../public/fonts/IRANYekanXFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-ExtraBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iranyekan-next",
  display: "swap",
  // The visible typography comes from the `IranYekan*` faces declared in
  // legacy-base.css, which override `body` with `!important`. This family is
  // only reached through the `font-iranyekan*` Tailwind utilities, so
  // preloading it would download ~130KB that never paints anything.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${companyInfo.title} | ${companyInfo.brandName}`,
    template: `%s | ${companyInfo.brandName}`,
  },
  description: companyInfo.shortDescription,
  applicationName: companyInfo.legalName,
  // No default canonical here on purpose: every page sets its own. A default
  // would silently point a new page at the home page.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "fa_AF",
    siteName: companyInfo.legalName,
    url: siteUrl,
    title: `${companyInfo.title} | ${companyInfo.brandName}`,
    description: companyInfo.shortDescription,
    images: [{ url: "/images/novatech-logo-social.webp", width: 1200, height: 630, alt: `لوگوی ${companyInfo.brandName}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${companyInfo.title} | ${companyInfo.brandName}`,
    description: companyInfo.shortDescription,
    images: ["/images/novatech-logo-social.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-AF" dir="rtl" data-scroll-behavior="smooth">
      <head>
        {/* The two faces that paint above the fold on every page. They are
            referenced from a stylesheet, so without these hints the browser
            only discovers them after CSS parsing, which is what makes the
            fallback-to-brand-font swap visible. */}
        <link
          rel="preload"
          href="/fonts/IRANYekanXFaNum-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IRANYekanXFaNum-ExtraBlack.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${iranYekan.variable} font-sans antialiased text-text-dark bg-white flex flex-col min-h-screen`}>
        <a href="#main-content" className="skip-to-content">
          رفتن به محتوای اصلی
        </a>
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        {/* Organization and WebSite are site-wide identity; pages add their own
            WebPage, BreadcrumbList and Service nodes that reference them by @id. */}
        <JsonLd data={graph(organizationSchema, websiteSchema)} />
      </body>
    </html>
  );
}

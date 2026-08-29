import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo";
import { companyInfo, siteUrl } from "@/lib/site-content";

const iranYekan = localFont({
  src: [
    { path: "../public/fonts/IRANYekanXFaNum-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/IRANYekanXFaNum-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/IRANYekanXFaNum-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/IRANYekanXFaNum-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/IRANYekanXFaNum-ExtraBlack.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-iranyekan-next",
  display: "swap",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa-AF" dir="rtl" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href="/fonts/IRANYekanXFaNum-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/IRANYekanXFaNum-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${iranYekan.variable} font-sans antialiased text-slate-900 bg-white flex flex-col min-h-screen`}>
        <a href="#main-content" className="skip-to-content">رفتن به محتوای اصلی</a>
        <Header />
        <main id="main-content" className="flex-grow bg-white">{children}</main>
        <Footer />
        <JsonLd data={graph(organizationSchema, websiteSchema)} />
      </body>
    </html>
  );
}

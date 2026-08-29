import type { Metadata } from "next";
import { companyInfo, siteUrl } from "@/lib/site-content";

const DEFAULT_OG_IMAGE = {
  url: "/images/novatech-logo-social.webp",
  width: 1200,
  height: 630,
  alt: `لوگوی ${companyInfo.brandName}`,
};

/**
 * Builds page metadata from a single description of the page, so no page can
 * ship with a missing canonical, a duplicated title or an Open Graph block that
 * contradicts the `<title>`.
 *
 * `title` is the page-specific part; the brand suffix comes from the template in
 * the root layout, except when `fullTitle` is passed for a page whose title must
 * read differently from `%s | نواتیک`.
 */
export function buildMetadata({
  title,
  fullTitle,
  description,
  path,
  image,
  imageAlt,
  noIndex,
  type = "website",
}: {
  title: string;
  fullTitle?: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const url = `${siteUrl}${path}`;
  const socialTitle = fullTitle ?? `${title} | ${companyInfo.brandName}`;
  const ogImage = image
    ? { url: image, alt: imageAlt ?? title }
    : DEFAULT_OG_IMAGE;

  return {
    ...(fullTitle ? { title: { absolute: fullTitle } } : { title }),
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type,
      locale: "fa_AF",
      siteName: companyInfo.legalName,
      title: socialTitle,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
  };
}

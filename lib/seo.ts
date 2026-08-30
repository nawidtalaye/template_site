import { companyInfo, siteUrl } from "@/lib/site-content";

/**
 * Every JSON-LD node published by the site is built here so the business facts
 * can never drift between pages. Nothing in this file invents data: each field
 * is read from `companyInfo`, which is the single source of truth for the real
 * company name, address, coordinates, phone numbers and social profiles.
 *
 * Deliberately absent: aggregateRating, review, award, numberOfEmployees and
 * foundingDate. None of them is verifiable from the project, so none is claimed.
 */

export const ORGANIZATION_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: companyInfo.addressStreet,
  addressLocality: companyInfo.addressCity,
  addressRegion: companyInfo.addressRegion,
  addressCountry: companyInfo.addressCountry,
};

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: companyInfo.legalName,
  alternateName: [companyInfo.brandName, companyInfo.latinName],
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/novatech-logo-social.webp`,
    width: 1200,
    height: 630,
  },
  image: `${siteUrl}/images/novatech-logo-social.webp`,
  email: companyInfo.email,
  description: companyInfo.shortDescription,
  telephone: [companyInfo.primaryPhoneHref, companyInfo.secondaryPhoneHref],
  address: postalAddress,
  areaServed: [
    { "@type": "Country", name: "Afghanistan" },
    { "@type": "City", name: "Herat" },
  ],
  knowsLanguage: ["fa-AF", "ps", "en"],
  sameAs: [companyInfo.instagramUrl],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: companyInfo.primaryPhoneHref,
      email: companyInfo.email,
      contactType: "sales",
      areaServed: "AF",
      availableLanguage: ["fa-AF", "ps", "en"],
    },
    {
      "@type": "ContactPoint",
      telephone: companyInfo.secondaryPhoneHref,
      contactType: "customer support",
      areaServed: "AF",
      availableLanguage: ["fa-AF", "ps", "en"],
    },
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteUrl,
  name: companyInfo.brandName,
  alternateName: companyInfo.legalName,
  inLanguage: "fa-AF",
  publisher: { "@id": ORGANIZATION_ID },
};

export function webPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${siteUrl}${path}#webpage`,
    url: `${siteUrl}${path}`,
    name,
    description,
    inLanguage: "fa-AF",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: { "@id": ORGANIZATION_ID },
  };
}

export function serviceSchema({
  path,
  name,
  description,
  serviceType,
  offerCatalog,
}: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  offerCatalog?: string[];
}) {
  return {
    "@type": "Service",
    "@id": `${siteUrl}${path}#service`,
    name,
    description,
    serviceType,
    url: `${siteUrl}${path}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "City", name: "Herat" },
      { "@type": "Country", name: "Afghanistan" },
    ],
    availableLanguage: ["fa-AF", "ps", "en"],
    ...(offerCatalog && offerCatalog.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name,
            itemListElement: offerCatalog.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item },
            })),
          },
        }
      : {}),
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

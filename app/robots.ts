import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-content";

/**
 * Nothing is blocked except the API route, which returns no indexable content.
 * CSS, JS and images stay crawlable on purpose: blocking them stops Google from
 * rendering the pages the way a visitor sees them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

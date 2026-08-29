import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-content";

/**
 * Sitemap for single-page Oil & Gas showcase of NovaTech Soft.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}

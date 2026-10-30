import type { MetadataRoute } from "next";
import { readySites } from "@/data/readySites";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://nexoradesign.online").replace(/\/$/, "");

/** Public New York storefront URLs. Old /ready, /services and legal URLs redirect. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${siteUrl}/pricing`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${siteUrl}/contacts`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/docs/privacy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${siteUrl}/docs/terms`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${siteUrl}/docs/accessibility`, priority: 0.3, changeFrequency: "yearly" },
  ];

  const productPages: MetadataRoute.Sitemap = readySites.flatMap(({ slug }) => [
    { url: `${siteUrl}/ready/${slug}`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/ready/${slug}/story`, priority: 0.6, changeFrequency: "monthly" },
  ]);
  return [...staticPages, ...productPages];
}

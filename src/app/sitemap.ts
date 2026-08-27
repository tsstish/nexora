import type { MetadataRoute } from "next";
import { services } from "@/data/services";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/ready`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/accessibility`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages.map((p) => ({ ...p, lastModified: now })), ...servicePages];
}

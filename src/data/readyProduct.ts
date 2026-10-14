import { readySites, type ReadySite } from "./readySites";

const slugs: Record<string, string> = {
  "dental-clinic": "mida",
  "private-teacher": "lea-nord",
  "brow-artist": "facet",
  "media-kit": "media-kit",
};

const categories: Record<string, string> = {
  "dental-clinic": "Стоматологии и клиники",
  "private-teacher": "Частные преподаватели",
  "brow-artist": "Beauty-мастера",
  "media-kit": "Блогеры и авторы",
};

export function readyProductPath(site: ReadySite): string {
  return "/ready/" + (slugs[site.slug] || site.slug);
}

export function readyCategory(site: ReadySite): string {
  return categories[site.slug] || site.title;
}

export function findReadyProduct(slug: string): ReadySite | undefined {
  return readySites.find((site) => slugs[site.slug] === slug);
}

export const readyProductSlugs = readySites.map((site) => slugs[site.slug]);

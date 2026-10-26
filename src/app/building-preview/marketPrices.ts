/** Preview-only prices. ILS is sourced from the published NeXora data.
 * USD and RUB are independent proposed market price lists for review,
 * NOT approved prices and NOT automatic FX conversions.
 */
export type Currency = "ILS" | "USD" | "RUB";

export const priceProposal = {
  monthly: {
    compact: { USD: 79, RUB: 5900 },
    landing: { USD: 99, RUB: 7900 },
    business: { USD: 129, RUB: 10900 },
  },
  ready: {
    "dental-clinic": { USD: 1690, RUB: 139000 },
    "private-teacher": { USD: 1190, RUB: 99000 },
    "brow-artist": { USD: 390, RUB: 34900 },
    "media-kit": { USD: 1390, RUB: 119000 },
  },
  service: {
    "mini-site": { USD: 590, RUB: 49000 },
    landing: { USD: 1490, RUB: 119000 },
    "business-site": { USD: 2690, RUB: 219000 },
    ecommerce: { USD: 5900, RUB: 489000 },
    "digital-product": { USD: 4790, RUB: 379000 },
    "brand-start": { USD: 950, RUB: 79000 },
  },
  addon: {
    page: { USD: 225, RUB: 16900 },
    form: { USD: 149, RUB: 11900 },
    "smart-form": { USD: 299, RUB: 23900 },
    seo: { USD: 490, RUB: 38900 },
    integration: { USD: 490, RUB: 38900 },
    module: { USD: 490, RUB: 38900 },
    language: { USD: 390, RUB: 29900 },
    rtl: { USD: 169, RUB: 12900 },
    brand: { USD: 850, RUB: 69900 },
  },
  maintenance: {
    care: { USD: 119, RUB: 9900 },
    "care-plus": { USD: 215, RUB: 17900 },
  },
} as const;

export type PriceGroup = keyof typeof priceProposal;

export function localizedPrice(group: PriceGroup, key: string, originalIls: number, currency: Currency) {
  if (currency === "ILS") return originalIls;
  const groupPrices = priceProposal[group] as unknown as Record<string, Record<"USD" | "RUB", number>>;
  return groupPrices[key]?.[currency] ?? null;
}

export function formatCurrency(value: number, currency: Currency) {
  const locale = currency === "RUB" ? "ru-RU" : currency === "USD" ? "en-US" : "he-IL";
  const text = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
  const unit = currency === "USD" ? "$" : currency === "RUB" ? "₽" : "₪";
  return currency === "USD" ? unit + text : text + " " + unit;
}

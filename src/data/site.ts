export const siteConfig = {
  name: "NeXora",
  descriptor: "Digital Presence Design",
  location: "Хайфа, Израиль",
  phoneDisplay: "055-282-3660",
  phoneHref: "tel:+972552823660",
  whatsapp: "https://wa.me/972552823660",
  telegram: "https://t.me/tss_tish",
  telegramDisplay: "@tss_tish",
  // Заполнить после подключения доменной почты, например hello@your-domain.co.il.
  email: "",
  portfolioOffer: {
    discountPercent: 20,
    slots: 3,
  },
} as const;

export function whatsappUrl(message: string) {
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

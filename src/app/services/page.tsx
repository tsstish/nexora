import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServicesHub } from "@/components/ServicesHub";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Услуги и стоимость разработки сайтов в Израиле",
  description:
    "Услуги NeXora: мини-сайты, лендинги, бизнес-сайты, интернет-магазины, MVP и Brand Start. Актуальные цены, дополнительные языки, RTL, SEO, интеграции и сопровождение.",
  keywords: [
    "создание сайтов в Израиле",
    "стоимость сайта Израиль",
    "разработка сайтов для бизнеса",
    "лендинг Израиль",
    "бизнес сайт Израиль",
    "интернет магазин Израиль",
    "разработка MVP Израиль",
    "веб дизайн Израиль",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Услуги и стоимость | NeXora",
    description:
      "Сайты и digital-продукты для бизнеса: форматы, стоимость, дополнительные возможности и сопровождение.",
    url: "/services",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Услуги NeXora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Услуги и стоимость | NeXora",
    description:
      "Сайты и digital-продукты для бизнеса в Израиле.",
    images: ["/opengraph-image.png"],
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Услуги и стоимость NeXora",
    url: `${siteUrl}/services`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/services/${service.slug}`,
        name: service.name,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServicesHub />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { siteConfig } from "@/data/site";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
  default: "Создание сайтов для бизнеса в Израиле | NeXora",
  template: "%s | NeXora",
},
description:
  "Создание сайтов для бизнеса в Израиле: лендинги, бизнес-сайты, интернет-магазины и цифровые продукты. Индивидуальный UX/UI-дизайн, разработка и запуск.",
  applicationName: "NeXora",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
  title: "Создание сайтов для бизнеса в Израиле | NeXora",
  description:
    "Лендинги, бизнес-сайты, интернет-магазины и цифровые продукты для бизнеса. Индивидуальный дизайн, разработка и запуск.",
    url: "/",
    siteName: "NeXora",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "NeXora — Digital Presence Design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeXora — Digital Presence Design",
    description: "Сайты и цифровые продукты, которые умеют больше.",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ed",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${siteUrl}/#organization`,
  name: siteConfig.name,
  url: siteUrl,
  description: "Digital-студия: индивидуальные сайты, цифровые продукты и брендинг для бизнеса.",
  telephone: "+972552823660",
  areaServed: { "@type": "Country", name: "Israel" },
  address: { "@type": "PostalAddress", addressLocality: "Haifa", addressCountry: "IL" },
  sameAs: [siteConfig.telegram],
  knowsAbout: ["Next.js", "React", "UX/UI", "web development", "branding", "digital products"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
    {children}
    <AnalyticsConsent />
  </body></html>;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, serviceMap, type ServiceSlug } from "@/data/services";
import { ServiceContent } from "@/components/ServiceContent";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export function generateStaticParams(){ return services.map(s=>({slug:s.slug})); }

const serviceSeo: Record<
  ServiceSlug,
  { title: string; description: string }
> = {
  "mini-site": {
    title: "Создание мини-сайта для бизнеса в Израиле",
    description:
      "Компактный мини-сайт для малого бизнеса, специалиста или личного бренда в Израиле. Индивидуальный дизайн, мобильная версия, WhatsApp, аналитика и запуск.",
  },

  landing: {
    title: "Создание лендинга в Израиле",
    description:
      "Разработка индивидуального лендинга для бизнеса в Израиле: структура, UX/UI-дизайн, Next.js, мобильная адаптация, базовая SEO-подготовка, аналитика и запуск.",
  },

  "business-site": {
    title: "Создание сайта для бизнеса в Израиле",
    description:
      "Разработка многостраничного сайта для бизнеса в Израиле. Индивидуальная структура и UX/UI-дизайн, Next.js, мобильная адаптация, SEO-подготовка и аналитика.",
  },

  ecommerce: {
    title: "Создание интернет-магазина в Израиле",
    description:
      "Разработка интернет-магазина в Израиле: каталог, карточки товаров, корзина, оформление заказа, подключение оплаты, мобильная версия и ecommerce-аналитика.",
  },

  "digital-product": {
    title: "Разработка MVP и веб-приложений в Израиле",
    description:
      "Разработка MVP, личных кабинетов, внутренних систем и веб-приложений для бизнеса в Израиле. UX/UI, Next.js, база данных и индивидуальная бизнес-логика.",
  },

  "brand-start": {
    title: "Логотип и фирменный стиль для бизнеса в Израиле",
    description:
      "Brand Start от NeXora: логотип, цветовая палитра, типографика и базовая визуальная система для нового или обновляемого бизнеса в Израиле.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceMap[slug as ServiceSlug];

  if (!service) return {};

  const seo = serviceSeo[service.slug];

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: `/services/${service.slug}`,
    },

    openGraph: {
      title: `${seo.title} | NeXora`,
      description: seo.description,
      type: "website",
      url: `/services/${service.slug}`,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${service.name} — NeXora`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${seo.title} | NeXora`,
      description: seo.description,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const service=serviceMap[slug as ServiceSlug]; if(!service) notFound();
 const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000").replace(/\/$/,"");
 const serviceJsonLd={
   "@context":"https://schema.org",
   "@type":"Service",
   name:service.name,
   description:service.short,
   url:`${siteUrl}/services/${service.slug}`,
   areaServed:{"@type":"Country",name:"Israel"},
   provider:{"@id":`${siteUrl}/#organization`},
 };
 return <>
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceJsonLd).replace(/</g,"\\u003c")}}/>
   <a className="skip-link" href="#service-main">Перейти к содержимому</a>
   <header className="service-topbar"><a href="/" className="brand-lockup" aria-label="NeXora — главная"><Image src="/brand/nexora-wordmark.png" alt="NeXora" width={190} height={68}/><span className="brand-rule"/><span className="brand-tag">DIGITAL<br/>PRESENCE<br/>DESIGN</span></a><a className="service-home-link" href="/#formats">Все форматы →</a></header>
   <main id="service-main" className="service-page-shell"><ServiceContent service={service}/></main>
   <footer className="service-page-footer"><span>© {new Date().getFullYear()} {siteConfig.name}</span><nav aria-label="Юридическая информация"><a href="/privacy">Конфиденциальность</a><a href="/terms">Условия</a><a href="/accessibility">Доступность</a></nav></footer>
 </>
}

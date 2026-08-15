import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, serviceMap, type ServiceSlug } from "@/data/services";
import { ServiceContent } from "@/components/ServiceContent";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export function generateStaticParams(){ return services.map(s=>({slug:s.slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params; const service=serviceMap[slug as ServiceSlug];
 if(!service) return {};
 return {
   title:`${service.name} в Израиле — ${service.priceLabel}`,
   description:`${service.short} ${service.priceLabel}. Индивидуальная структура, дизайн и современная разработка NeXora.`,
   alternates:{canonical:`/services/${service.slug}`},
   openGraph:{title:`${service.name} — NeXora`,description:service.short,type:"website",url:`/services/${service.slug}`,images:[{url:"/opengraph-image.png",width:1200,height:630,alt:"NeXora — Digital Presence Design"}]},
   twitter:{card:"summary_large_image",title:`${service.name} — NeXora`,description:service.short,images:["/opengraph-image.png"]}
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

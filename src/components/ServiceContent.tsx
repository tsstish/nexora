import Link from "next/link";
import type { Service } from "@/data/services";
import { siteConfig, whatsappUrl } from "@/data/site";
import { ServiceVisual } from "./ServiceVisual";

export function ServiceContent({service,compact=false}:{service:Service;compact?:boolean}){
 const offer = `Здравствуйте! Меня интересует ${service.name} в NeXora. Хочу обсудить задачу и Portfolio Offer −${siteConfig.portfolioOffer.discountPercent}%.`;
 const serviceHeadings: Record<string, string> = {
  "mini-site": "Мини-сайт для бизнеса",
  "landing": "Создание лендинга для бизнеса",
  "business-site": "Создание сайта для бизнеса",
  "ecommerce": "Создание интернет-магазина",
  "digital-product": "Разработка MVP и веб-приложений",
  "brand-start": "Логотип и фирменный стиль",
};

const heading = serviceHeadings[service.slug] || service.name;
 return <div className={compact?"service-detail compact":"service-detail"}>
  <section className="service-detail-hero">
    <div className="service-detail-copy">
      <div className="eyebrow">{service.index} · ФОРМАТ РАБОТЫ</div>
      <h1>{heading}</h1>
      <p className="service-tagline">{service.tagline}</p>
      <div className="service-meta"><strong>{service.priceLabel}</strong><span>{service.duration}</span>{service.technicalNote&&<em>{service.technicalNote}</em>}</div>
      <div className="portfolio-chip">−{siteConfig.portfolioOffer.discountPercent}% · Portfolio Offer · первые {siteConfig.portfolioOffer.slots} проекта</div>
    </div>
    <ServiceVisual service={service}/>
  </section>

  <section className="service-story"><div><span>Кому подходит</span><h2>Когда это ваш вариант</h2></div><ul>{service.forWhom.map(x=><li key={x}>{x}</li>)}</ul></section>

  <section className="service-outcomes"><div className="eyebrow">ЧТО ВЫ ПОЛУЧИТЕ</div><div className="outcome-grid">{service.outcomes.map(o=><article key={o.title}><h3>{o.title}</h3><p>{o.text}</p></article>)}</div></section>

  <section className="included-grid"><article><span>Входит</span><h2>Что точно входит</h2><ul>{service.includes.map(x=><li key={x}>{x}</li>)}</ul></article><article><span>Не входит автоматически</span><h2>Где заканчивается стартовый объём</h2><ul>{service.excludes.map(x=><li key={x}>{x}</li>)}</ul></article></section>

  <section className="price-factors"><div><span>Стоимость</span><h2>{service.priceLabel} — это стартовый ориентир</h2><p>Финальная стоимость определяется после короткого брифа и согласования объёма.</p></div><ul>{service.priceFactors.map(x=><li key={x}>{x}</li>)}</ul></section>

  <section className="choose-another"><div className="glass-orb" aria-hidden="true"/><div><span>А если нужен другой формат?</span><h2>Не продаём более дорогой вариант, если задачу можно решить проще.</h2><p>{service.chooseAnother}</p></div></section>

  <section className="service-final-cta"><div><span>Не уверены, что выбрать?</span><h2>Покажите задачу — поможем выбрать формат.</h2><p>Portfolio Offer даёт −{siteConfig.portfolioOffer.discountPercent}% на одну из первых {siteConfig.portfolioOffer.slots} работ при согласии на публикацию кейса. Проект может появиться в портфолио NeXora с активной ссылкой на ваш бизнес — это дополнительная точка контакта и ещё одно упоминание бренда.</p></div><a className="cta" href={whatsappUrl(offer)} target="_blank" rel="noreferrer">{service.cta} →</a></section>

  {!compact&&<div className="service-back"><Link href="/services">← Вернуться ко всем услугам и стоимости</Link></div>}
 </div>
}

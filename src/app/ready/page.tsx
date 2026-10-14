import type { Metadata } from "next";
import Link from "next/link";
import { readySites } from "@/data/readySites";
import { monthlyPlans } from "@/data/readyMonthly";
import { readyProductPath, readyCategory } from "@/data/readyProduct";
import { ReadyHeader, ReadyFooter } from "@/components/ReadyShell";
import { ReadyPreview } from "@/components/ReadyPreview";
import styles from "./shop.module.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://nexoradesign.online").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Готовые сайты с адаптацией для бизнеса в Израиле",
  description: "Выберите уже разработанный сайт и адаптируйте его под свой бизнес. Покупка от 1 400 ₪ или Ready Monthly от 249 ₪/мес.",
  alternates: { canonical: "/ready" },
  openGraph: { title: "Готовые сайты с адаптацией | Ready by NeXora", description: "Ваш логотип, фотографии и тексты. Выберите готовый сайт и закажите адаптацию — покупка или подписка.", url: "/ready", type: "website" },
};

export default function ReadyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Готовые сайты NeXora",
    url: siteUrl + "/ready",
    mainEntity: { "@type": "ItemList", itemListElement: readySites.map((site, index) => ({
      "@type": "ListItem", position: index + 1, name: site.name + " — " + site.title, url: siteUrl + readyProductPath(site),
    })) },
  };
  return <div className={styles.shop}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <a href="#ready-main" className="skip-link">Перейти к содержимому</a>
    <ReadyHeader />
    <main id="ready-main">
      <section className={styles.shopHero}>
        <div>
          <div className={styles.kicker}>READY BY NEXORA / ВЫБЕРИТЕ СВОЙ САЙТ</div>
          <h1>Готовые сайты.<br /><em>Под ваш бизнес.</em></h1>
          <p>Выбираете понравившийся дизайн. Мы адаптируем его под ваш бренд, тексты, фото и услуги — и подготовим к запуску.</p>
          <div className={styles.shopActions}>
            <a href="#ready-collection" className={styles.glassButton}>Смотреть сайты <span>↓</span></a>
            <Link href="/services" className={styles.glassOutline}>Индивидуальный сайт ↗</Link>
          </div>
          <div className={styles.quickProof}><span>Ваш логотип и фотографии</span><span>Покупка или Monthly</span><span>С запуском и поддержкой</span></div>
        </div>
        <div className={styles.heroSample} aria-label="Превью коллекции MIDA и FACET">
          <ReadyPreview site={readySites[0]} />
          <ReadyPreview site={readySites[2]} />
        </div>
      </section>
      <section className={styles.catalog} id="ready-collection">
        <div className={styles.catalogTop}><div><span className={styles.kicker}>READY / КОЛЛЕКЦИЯ</span><h2>Выберите свой сайт</h2></div><p>Откройте понравившийся вариант, посмотрите демо, стоимость и условия.</p></div>
        <div className={styles.grid}>
          {readySites.map((site, index) => {
            const monthly = monthlyPlans[site.monthlyPlan];
            const url = readyProductPath(site);
            return <article className={styles.productCard} key={site.slug} id={"concept-" + site.slug}>
              <div className={styles.productTop}><span>READY / {String(index + 1).padStart(3, "0")}</span><span>{site.formatLabel}</span></div>
              <Link href={url} aria-label={"Подробнее о сайте " + site.name}><ReadyPreview site={site} /></Link>
              <div className={styles.productBottom}>
                <div className={styles.productHead}><div><h3>{site.name}</h3><p>{readyCategory(site)}</p></div></div>
                <div className={styles.priceRow}>
                  <span>Купить <strong>от {site.priceFrom.toLocaleString("ru-RU")} ₪</strong></span>
                  <span>Monthly <strong>{monthly.price} ₪/мес.</strong></span>
                </div>
                <div className={styles.cardLinks}>
                  <Link href={url} className={styles.glassButton + " " + styles.detailLink}>Смотреть подробнее ↗</Link>
                  <a href={site.demoUrl} target="_blank" rel="noreferrer" data-analytics-event="ready_demo_open" data-concept={site.slug}>Открыть демо ↗</a>
                </div>
              </div>
            </article>;
          })}
        </div>
      </section>
      <section className={styles.steps} aria-label="Как заказать готовый сайт">
        <div><b>01</b><span>Выберите сайт</span></div>
        <div><b>02</b><span>Расскажите о вашем бизнесе</span></div>
        <div><b>03</b><span>Получите адаптированный сайт</span></div>
      </section>
      <section className={styles.endStrip}>
        <div><h2>Нужен сайт с нуля?</h2><p>Создадим дизайн и функциональность именно для вашей задачи.</p></div>
        <Link className={styles.glassButton} href="/services">Индивидуальная разработка ↗</Link>
      </section>
    </main>
    <ReadyFooter />
  </div>;
}

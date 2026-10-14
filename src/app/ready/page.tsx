import type { Metadata } from "next";
import Link from "next/link";
import { readySites } from "@/data/readySites";
import { monthlyPlans } from "@/data/readyMonthly";
import { readyProductPath, readyCategory } from "@/data/readyProduct";
import { ReadyHeader, ReadyFooter } from "@/components/ReadyShell";
import { ReadyPreview } from "@/components/ReadyPreview";
import { ReadyHeroArtwork } from "@/components/ReadyHeroArtwork";
import styles from "./shop.module.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://nexoradesign.online").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Готовые сайты с адаптацией для бизнеса в Израиле",
  description: "Выберите уже разработанный сайт и адаптируйте его под свой бизнес. Покупка от 1 400 ₪ или Ready Monthly от 249 ₪/мес.",
  alternates: { canonical: "/ready" },
  openGraph: { title: "Готовые сайты с адаптацией | Ready by NeXora", description: "Ваш логотип, фотографии и тексты. Выберите готовый сайт и закажите адаптацию — покупка или подписка.", url: "/ready", type: "website" },
};

function FeatureIcon({ kind }: { kind: "logo" | "photo" | "text" | "cart" }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "logo") return <svg {...common} aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h4M8 16h6" /></svg>;
  if (kind === "photo") return <svg {...common} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 16-5-5L5 21" /></svg>;
  if (kind === "text") return <svg {...common} aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>;
  return <svg {...common} aria-hidden="true"><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M2 3h2l3.2 13h12L22 7H5" /></svg>;
}

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
        <div className={styles.heroText}>
          <div className={styles.kicker}>READY / КАТАЛОГ</div>
          <h1>Готовые сайты<br /><em>с адаптацией под ваш бизнес</em></h1>
          <p>Вы выбираете основу, а мы адаптируем сайт под ваш бренд, тексты и задачи.</p>
          <div className={styles.heroFeatures}>
            <span><FeatureIcon kind="logo" />Ваш логотип</span>
            <span><FeatureIcon kind="photo" />Ваши фото</span>
            <span><FeatureIcon kind="text" />Ваш текст</span>
            <span><FeatureIcon kind="cart" />Купить или Monthly</span>
          </div>
          <div className={styles.shopActions}>
            <a href="#ready-collection" className={styles.glassButton}>Смотреть каталог <span>→</span></a>
            <Link href="/services" className={styles.glassOutline}>Индивидуальная разработка</Link>
          </div>
        </div>
        <ReadyHeroArtwork />
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
                <div className={styles.productHead}><div><h3>{site.name}</h3><p>{readyCategory(site)}</p><small>{site.name === "MIDA" ? "Сайт для стоматологической клиники" : site.name === "LEA NORD" ? "Сайт для преподавателя и частных занятий" : site.name === "FACET" ? "Сайт для beauty-мастера" : "Интерактивный сайт для автора контента"}</small></div></div>
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

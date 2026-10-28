import Image from "next/image";
import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { monthlyPlans } from "@/data/readyMonthly";
import { FeaturedGallery } from "./FeaturedGallery";
import { CurrencySelector } from "./CurrencyControl";
import { whatsappUrl } from "@/data/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "NeXora / новая главная — витрина концепций",
  robots: { index: false, follow: false },
  alternates: { canonical: "/building-preview" },
  description: "Экспериментальная витрина готовых сайтов NeXora.",
};

const categoryNames: Record<string, string> = {
  "dental-clinic": "Клиники и стоматологии",
  "private-teacher": "Образование и эксперты",
  "brow-artist": "Beauty-мастера",
  "media-kit": "Авторы и блогеры",
};

export default function BuildingPreview() {
  const concepts = readySites.map((site) => ({
    slug: site.slug,
    name: site.name,
    heading: categoryNames[site.slug] ?? site.title,
    description: site.shortDescription,
    formatLabel: site.formatLabel,
    priceFrom: site.priceFrom,
    monthlyPrice: monthlyPlans[site.monthlyPlan].price,
    monthlyPlan: site.monthlyPlan,
    features: site.features.slice(0, 3),
    demoUrl: site.demoUrl,
  }));

  return (
    <main className={styles.page} id="loft-preview">
      <div className={styles.scene}>
        <header className={styles.header}>
          <a href="/building-preview" className={styles.logo} aria-label="NeXora — главная">
            <Image src="/brand/nexora-wordmark.png" width={1254} height={439} alt="NeXora" priority />
            <span>DIGITAL PRESENCE DESIGN</span>
          </a>
          <nav className={styles.nav} aria-label="Меню">
            <a href="#collection">Готовые сайты</a>
            <a href="/building-preview/pricing#individual">Услуги</a>
            <a href="/building-preview/pricing">Стоимость</a>
            <a href="/building-preview/pricing#monthly">Подписка</a>
          </nav>
          <div className={styles.headerActions}>
            <CurrencySelector />
            <a href={whatsappUrl("Здравствуйте! Хочу обсудить сайт NeXora.")} target="_blank" rel="noopener noreferrer" className={styles.headerCta}>Обсудить проект <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <section className={styles.hero} aria-labelledby="loft-title">
          <div className={styles.glassPanel}>
            <span className={styles.eyebrow}>NEXORA / READY COLLECTION</span>
            <h1 id="loft-title">Готовые сайты<br />для реального<br />бизнеса</h1>
            <p>Вы выбираете концепцию — мы адаптируем её под ваш бизнес.</p>
            <div className={styles.facts}>
              <div><b aria-hidden="true">◇</b><span>Готовые<br />концепции</span></div>
              <div><b aria-hidden="true">✳</b><span>Адаптация<br />под ваш бизнес</span></div>
              <div><b aria-hidden="true">↗</b><span>Запуск до<br />7 рабочих дней*</span></div>
            </div>
            <small>* После получения всех материалов. Срок зависит от продукта.</small>
          </div>
          <FeaturedGallery concepts={concepts} />
        </section>
      </div>
      <section className={styles.catalogIntro}>
        <div className={styles.catalogIntroInner}>
          <div>
            <span className={styles.eyebrow}>THE READY COLLECTION</span>
            <h2>Больше, чем<br />готовый шаблон.</h2>
          </div>
          <div className={styles.catalogIntroCopy}>
            <p>Каждая концепция уже разработана на кодовой базе. Мы адаптируем её под бизнес, бренд и задачи.</p>
            <a href="#collection">Вернуться к коллекции <span aria-hidden="true">↗</span></a>
            <a className={styles.pricingNav} href="/building-preview/pricing#individual">Индивидуальная разработка и услуги ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}

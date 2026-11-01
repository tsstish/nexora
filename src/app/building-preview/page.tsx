import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { monthlyPlans } from "@/data/readyMonthly";
import { FeaturedGallery } from "./FeaturedGallery";
import { MobileShowroom } from "./MobileShowroom";
import { CityBackdrop } from "./CityBackdrop";
import { StudioHeader } from "./StudioHeader";
import { HomeContent } from "./HomeContent";
import { CurrencyPrice } from "./CurrencyControl";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Готовые сайты и разработка сайтов для бизнеса | NeXora" },
  alternates: { canonical: "/" },
  description: "Готовые сайты для бизнеса с адаптацией под ваш бренд, подписка от 249 ₪/мес и индивидуальная разработка. NeXora — сайты на кодовой базе, не конструктор.",
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
      <div className={`${styles.scene} nx-city-stage`}>
        <CityBackdrop time="morning" />
        <StudioHeader />

        <div className={styles.desktopShowroom}>
        <section className={styles.hero} aria-labelledby="loft-title">
          <div className={`${styles.glassPanel} nx-hero-copy`}>
            <span className={styles.eyebrow}>NEXORA / ГОТОВЫЕ САЙТЫ ДЛЯ БИЗНЕСА</span>
            <h1 id="loft-title">Сайт, который<br />не нужно<br />собирать.</h1>
            <p className={styles.heroDescription}>Выбираете работающую концепцию — мы адаптируем её под ваш бренд, тексты и задачи. Хостинг и поддержка включены.</p>
            <div className={styles.heroStartingPrice}>Подписка <strong><CurrencyPrice group="monthly" priceId="compact" ils={249} prefix="от " perMonth /></strong><span>Без стартового взноса</span></div>
            <div className={styles.heroActions}>
              <a href="#collection">Выбрать сайт <span aria-hidden="true">↗</span></a>
              <Link href="/pricing">Посмотреть цены <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <FeaturedGallery concepts={concepts} />
        </section>
        </div>
        <MobileShowroom concepts={concepts} />
      </div>
      <HomeContent />
    </main>
  );
}

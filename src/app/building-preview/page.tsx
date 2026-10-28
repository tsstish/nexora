import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { monthlyPlans } from "@/data/readyMonthly";
import { FeaturedGallery } from "./FeaturedGallery";
import { CityBackdrop } from "./CityBackdrop";
import { StudioHeader } from "./StudioHeader";
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
      <div className={`${styles.scene} nx-city-stage`}>
        <CityBackdrop time="morning" />
        <StudioHeader />

        <section className={styles.hero} aria-labelledby="loft-title">
          <div className={`${styles.glassPanel} nx-glass`}>
            <span className={styles.eyebrow}>NEXORA / READY COLLECTION</span>
            <h1 id="loft-title">Готовые сайты<br />для реального<br />бизнеса</h1>
            <p>Это уже работающие сайты, а не макеты. Вы выбираете подходящий пример — мы превращаем его в сайт вашего бизнеса.</p>
            <div className={styles.adaptationNote}>
              <span className={styles.adaptationEyebrow}>Вместо демонстрационного бренда — ваш</span>
              <strong>Ваш логотип, цвета, фотографии, тексты и контакты</strong>
              <small>Оформление адаптируем в рамках выбранной концепции</small>
            </div>
            <div className={styles.facts} aria-label="Как вы получаете сайт">
              <div><b aria-hidden="true">01</b><span>Выбираете<br />готовый сайт</span></div>
              <div><b aria-hidden="true">02</b><span>Мы адаптируем<br />под вас</span></div>
              <div><b aria-hidden="true">03</b><span>Запускаем<br />ваш сайт*</span></div>
            </div>
            <small>* Адаптация — до 7 рабочих дней после получения материалов, в зависимости от продукта. Сайт разработан на кодовой базе, не в конструкторе.</small>
          </div>
          <FeaturedGallery concepts={concepts} />
        </section>
      </div>

    </main>
  );
}

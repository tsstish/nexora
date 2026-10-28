import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { monthlyPlans } from "@/data/readyMonthly";
import { FeaturedGallery } from "./FeaturedGallery";
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
      <div className={styles.scene}>
        <StudioHeader />

        <section className={styles.hero} aria-labelledby="loft-title">
          <div className={styles.glassPanel}>
            <span className={styles.eyebrow}>NEXORA / READY COLLECTION</span>
            <h1 id="loft-title">Готовые сайты<br />для реального<br />бизнеса</h1>
            <p>Каждая концепция уже разработана на кодовой базе — не конструкторе. Вы выбираете готовый сайт, а мы адаптируем его под ваш бизнес, бренд и задачи.</p>
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

    </main>
  );
}

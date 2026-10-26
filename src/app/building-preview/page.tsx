import Image from "next/image";
import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "NeXora / новый дизайн — тест hero",
  robots: { index: false, follow: false },
};

const directions = [
  { slug: "dental-clinic", number: "01", heading: "Клиники и beauty", note: "Для клиник и частной практики" },
  { slug: "private-teacher", number: "02", heading: "Образование", note: "Для экспертов и преподавателей" },
  { slug: "brow-artist", number: "03", heading: "Услуги", note: "Для частных мастеров" },
];

export default function BuildingPreview() {
  const featured = directions.map((d) => ({ ...d, site: readySites.find((s) => s.slug === d.slug) }));
  return (
    <main className={styles.page} id="loft-preview">
      <div className={styles.scene}>
        <header className={styles.header}>
          <a href="/building-preview" className={styles.logo} aria-label="NeXora — дизайн-прототип">
            <Image src="/brand/nexora-wordmark.png" width={1254} height={439} alt="NeXora" priority />
            <span>DIGITAL PRESENCE DESIGN</span>
          </a>
          <nav className={styles.nav} aria-label="Меню">
            <a href="#collection">Готовые сайты</a>
            <a href="/services">Услуги</a>
            <a href="/ready/monthly">Как это работает</a>
          </nav>
          <a href="/#start-project" className={styles.headerCta}>Обсудить проект <span aria-hidden="true">↗</span></a>
        </header>
        <section className={styles.hero} aria-labelledby="loft-title">
          <div className={styles.glassPanel}>
            <span className={styles.eyebrow}>NEXORA / READY COLLECTION</span>
            <h1 id="loft-title">Готовые сайты<br/>для реального<br/>бизнеса</h1>
            <p>Вы выбираете концепцию — мы адаптируем её под ваш бизнес.</p>
            <a href="#collection" className={styles.cta}>Смотреть коллекцию <span aria-hidden="true">↗</span></a>
            <div className={styles.facts}>
              <div><b>◇</b><span>Готовые<br/>концепции</span></div>
              <div><b>✳</b><span>Адаптация<br/>под ваш бизнес</span></div>
              <div><b>↗</b><span>Запуск до<br/>7 рабочих дней*</span></div>
            </div>
            <small>* После получения всех материалов. Срок зависит от продукта.</small>
          </div>
          <div className={styles.showroom} aria-label="Три направления готовых сайтов">
            {featured.map((item, i) => (
              <article key={item.slug} className={i === 0 ? styles.windowMain : styles.window}>
                <div className={styles.windowTitle}>
                  <span>{item.number} /</span>
                  <h2>{item.heading}</h2>
                  <p>{item.note}</p>
                  <a href={item.site?.demoUrl ?? "/ready"} target="_blank" rel="noopener noreferrer">
                    Смотреть демо ↗
                  </a>
                </div>
                <div className={styles.windowArtwork} aria-hidden="true">
                  <i>READY / NEXORA</i>
                  <strong>{item.site?.name ?? "READY"}</strong>
                  <em>{item.site?.formatLabel ?? "Готовый сайт"}</em>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <section id="collection" className={styles.collection}>
        <span className={styles.eyebrow}>ГОТОВЫЕ САЙТЫ / 04 КОНЦЕПЦИИ</span>
        <div className={styles.collectionRow}>
          <h2>Выберите направление</h2>
          <p>Здесь будет настоящий каталог с фильтрами и оригинальными скриншотами. Пока проверяем композицию первого экрана.</p>
        </div>
      </section>
    </main>
  );
}

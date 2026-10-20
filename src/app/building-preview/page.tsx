import Image from "next/image";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Digital Building — визуальный прототип",
  robots: { index: false, follow: false },
};

export default function BuildingPreview() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/building-preview" className={styles.brand} aria-label="NeXora — прототип">
          <Image
            src="/brand/nexora-wordmark.png"
            alt="NeXora"
            width={1254}
            height={439}
            priority
          />
        </a>

        <nav className={styles.nav} aria-label="Навигация">
          <a href="/ready">Готовые сайты</a>
          <a href="/services">Услуги</a>
          <a href="/ready/monthly">Подписка</a>
        </nav>

        <a className={styles.contact} href="/#start-project">Обсудить проект ↗</a>
      </header>

      <div className={styles.sky} aria-hidden="true">
        <div className={styles.roofline} />
      </div>

      <section className={styles.signage} aria-label="NeXora — Digital Studio">
        <span className={styles.motto}>DIGITAL SPACES<br />FOR REAL BUSINESS</span>

        <div className={styles.sign}>
          <Image
            src="/brand/nexora-wordmark.png"
            alt="NeXora"
            width={1254}
            height={439}
            priority
          />
          <span>ГОТОВЫЕ РЕШЕНИЯ · ИНДИВИДУАЛЬНАЯ РАЗРАБОТКА</span>
        </div>

        <p className={styles.statement}>Сайты, которые<br />работают на ваш бизнес</p>
      </section>

      <div className={styles.lowerEdge} aria-hidden="true" />
    </main>
  );
}

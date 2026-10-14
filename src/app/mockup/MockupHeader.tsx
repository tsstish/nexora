import Image from "next/image";
import Link from "next/link";
import styles from "./mockup.module.css";

export function MockupHeader() {
  return <div className={styles.container}>
    <header className={styles.header}>
      <Link className={styles.brand} href="/mockup" aria-label="NeXora — мокап главной страницы">
        <Image src="/brand/nexora-wordmark.png" alt="NeXora" width={188} height={66} priority />
      </Link>
      <nav className={styles.nav} aria-label="Навигация">
        <a href="/mockup#catalog">Готовые сайты</a>
        <a href="/mockup#how">Как это работает</a>
        <a href="/mockup#options">Покупка и подписка</a>
        <Link href="/mockup#custom">Сайт с нуля</Link>
      </nav>
      <a className={styles.navCta} href="/mockup#catalog">Выбрать концепцию <span>↗</span></a>
      <details className={styles.mobileMenu}>
        <summary aria-label="Открыть меню"><i /><i /></summary>
        <div>
          <a href="/mockup#catalog">Готовые сайты</a>
          <a href="/mockup#how">Как это работает</a>
          <a href="/mockup#options">Покупка и подписка</a>
          <Link href="/mockup#custom">Сайт с нуля</Link>
        </div>
      </details>
    </header>
  </div>;
}

"use client";

import Link from "next/link";
import { CurrencyPrice } from "./CurrencyControl";
import { ReadyShowcase, type ReadyConcept } from "./ReadyShowcase";
import styles from "./MobileShowroom.module.css";

export function MobileShowroom({ concepts }: { concepts: ReadyConcept[] }) {
  return (
    <div className={styles.mobile}>
      <section className={styles.intro} aria-labelledby="mobile-showroom-title">
        <span className={styles.eyebrow}>NEXORA / READY MONTHLY</span>
        <h1 id="mobile-showroom-title">Сайт, который<br/><em>не нужно собирать.</em></h1>
        <p>Выбираете готовую концепцию. Мы адаптируем её под ваш бизнес, запустим и поддержим.</p>
        <div className={styles.offerLine}>
          <strong><CurrencyPrice group="monthly" priceId="compact" ils={249} prefix="от " perMonth /></strong>
          <span>Без стартового взноса</span>
        </div>
        <Link href="/pricing" className={styles.pricingLink}>Стоимость и условия <span aria-hidden="true">↗</span></Link>
      </section>
      <ReadyShowcase concepts={concepts} />
    </div>
  );
}

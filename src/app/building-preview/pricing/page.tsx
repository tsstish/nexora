import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { addons, maintenancePlans, services } from "@/data/services";
import { monthlyPlanList } from "@/data/readyMonthly";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Стоимость разработки — NeXora (прототип)",
  robots: { index: false, follow: false },
};

const format = (value: number) => new Intl.NumberFormat("ru-RU").format(value) + " ₪";

export default function LoftPricing() {
  return (
    <main className={styles.pricingPage}>
      <div className={styles.pricingShell}>
        <header className={styles.pricingHeader}>
          <Link href="/building-preview" className={styles.pricingBrand} aria-label="NeXora — вернуться к витрине">
            <Image src="/brand/nexora-wordmark.png" alt="NeXora" width={1254} height={439} priority />
          </Link>
          <Link href="/building-preview" className={styles.pricingBack}>← Вернуться к коллекции</Link>
        </header>

        <section className={styles.pricingHero}>
          <span className={styles.eyebrow}>NEXORA / SERVICES & PRICING</span>
          <h1>Хорошая работа.<br /><em>Прозрачная стоимость.</em></h1>
          <p>Готовые решения по подписке, приобретение сайта или индивидуальная разработка. Выбираем формат под конкретную задачу бизнеса.</p>
        </section>

        <section className={styles.pricingSection} aria-labelledby="individual-heading">
          <div className={styles.pricingTitle}>
            <span>01 / ИНДИВИДУАЛЬНАЯ РАЗРАБОТКА</span>
            <h2 id="individual-heading">Создадим под вашу задачу.</h2>
          </div>
          <div className={styles.servicePriceGrid}>
            {services.map((service) => (
              <article key={service.slug} className={styles.servicePriceCard}>
                <span className={styles.serviceNumber}>{service.index} /</span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.short}</p>
                </div>
                <div className={styles.servicePriceBottom}>
                  <strong>{service.priceLabel}</strong>
                  <span>{service.duration}</span>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.pricingFinePrint}>Указаны стартовые цены. Итоговая стоимость зависит от объёма контента, функциональности и согласованного технического задания.</p>
        </section>

        <section className={styles.pricingSection} aria-labelledby="ready-heading">
          <div className={styles.pricingTitle}>
            <span>02 / READY MONTHLY</span>
            <h2 id="ready-heading">Сайт по подписке.</h2>
          </div>
          <div className={styles.planPriceGrid}>
            {monthlyPlanList.map((plan) => (
              <div className={styles.planPriceCard} key={plan.id}>
                <span>{plan.name}</span>
                <strong>{format(plan.price)} <small>/ мес.</small></strong>
                <p>{plan.purpose}</p>
              </div>
            ))}
          </div>
          <p className={styles.pricingFinePrint}>В ежемесячную стоимость входят хостинг, два пакета правок и еженедельная техническая проверка. Покупка выбранной концепции оплачивается отдельно по её актуальной цене.</p>
          <Link className={styles.pricingTextLink} href="/ready/monthly">Полные условия подписки ↗</Link>
        </section>

        <section className={styles.pricingSection} aria-labelledby="extras-heading">
          <div className={styles.pricingTitle}>
            <span>03 / ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ</span>
            <h2 id="extras-heading">Детали тоже имеют значение.</h2>
          </div>
          <div className={styles.extraPriceList}>
            {addons.map((addon, index) => (
              <div className={styles.extraPriceRow} key={addon.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{addon.name}</span>
                <strong>от {format(addon.price)}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.pricingSection} aria-labelledby="support-heading">
          <div className={styles.pricingTitle}>
            <span>04 / ПОДДЕРЖКА</span>
            <h2 id="support-heading">После запуска мы остаёмся рядом.</h2>
          </div>
          <div className={styles.planPriceGrid}>
            {maintenancePlans.map((plan) => (
              <div className={styles.planPriceCard} key={plan.id}>
                <span>{plan.name}</span>
                <strong>{format(plan.price)} <small>/ мес.</small></strong>
                <p>{plan.included.slice(0, 2).join(" · ")}</p>
              </div>
            ))}
          </div>
          <p className={styles.pricingFinePrint}>Эти планы обслуживания отделены от поддержки, уже включённой в Ready Monthly.</p>
        </section>

        <footer className={styles.pricingFooter}>
          <h2>Обсудим ваш проект?</h2>
          <Link href="/#start-project">Связаться с NeXora ↗</Link>
        </footer>
      </div>
    </main>
  );
}

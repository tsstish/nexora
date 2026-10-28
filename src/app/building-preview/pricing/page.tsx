import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { addons, maintenancePlans, services } from "@/data/services";
import { monthlyPlanList, monthlySupport } from "@/data/readyMonthly";
import { readySites } from "@/data/readySites";
import { monthlyStart, monthlyCancel, monthlyBuyout } from "@/data/readyConditions";
import { whatsappUrl } from "@/data/site";
import { CurrencyPrice, CurrencySelector } from "../CurrencyControl";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: { absolute: "Стоимость сайтов: подписка и разработка | NeXora" },
  description: "Стоимость сайтов NeXora: подписка, готовые сайты с адаптацией, индивидуальная разработка, дополнительные услуги и поддержка.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/building-preview/pricing" },
};

const nav = [
  { id: "monthly", label: "Сайт по подписке", number: "01" },
  { id: "individual", label: "Индивидуальная разработка", number: "02" },
  { id: "extras", label: "Дополнительные услуги", number: "03" },
  { id: "support", label: "Поддержка", number: "04" },
];

const minimumReady = readySites.reduce((a, b) => (a.priceFrom < b.priceFrom ? a : b));
const minimumService = services.reduce((a, b) => (a.price < b.price ? a : b));
const minimumMonthly = monthlyPlanList.reduce((a, b) => (a.price < b.price ? a : b));

export default function LoftPricing() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/building-preview" className={styles.brand} aria-label="NeXora — главная">
            <Image src="/brand/nexora-wordmark.png" alt="NeXora" width={1254} height={439} priority />
          </Link>
          <div className={styles.headerLinks}>
            <CurrencySelector />
            <Link href="/building-preview#collection">К коллекции ↗</Link>
          </div>
        </header>

        <section className={styles.hero} aria-labelledby="pricing-title">
          <div className={styles.heroCopy}>
            <span className={styles.overline}>NEXORA / FORMATS & PRICING</span>
            <h1 id="pricing-title">У каждого проекта<br /><em>своя форма.</em></h1>
            <p>Готовый сайт по подписке, выкуп с адаптацией или индивидуальная разработка.</p>
            <span className={styles.currentNote}>₪ — действующие цены. $ и ₽ — предварительный прайс для согласования.</span>
          </div>
          <nav className={styles.heroIndex} aria-label="Разделы стоимости">
            <div className={styles.indexHead}><span>PRICE INDEX</span><span>01 — 04</span></div>
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.indexRow}>
                <span>{item.number}</span><span>{item.label}</span><span aria-hidden="true">↘</span>
              </a>
            ))}
          </nav>
        </section>

        <section aria-label="Три варианта заказа" className={styles.pathSummary}>
          <a href="#monthly" className={styles.pathSummaryItem}>
            <span>01 / ПОДПИСКА</span>
            <strong><CurrencyPrice group="monthly" priceId={minimumMonthly.id} ils={minimumMonthly.price} prefix="от " perMonth /></strong>
            <span className={styles.pathSummaryAction}>Хостинг и поддержка включены ↗</span>
          </a>
          <Link href="/building-preview#collection" className={styles.pathSummaryItem}>
            <span>02 / ГОТОВЫЙ САЙТ С АДАПТАЦИЕЙ</span>
            <strong><CurrencyPrice group="ready" priceId={minimumReady.slug} ils={minimumReady.priceFrom} prefix="от " /></strong>
            <span className={styles.pathSummaryAction}>К коллекции ↗</span>
          </Link>
          <a href="#individual" className={styles.pathSummaryItem}>
            <span>03 / РАЗРАБОТКА С НУЛЯ</span>
            <strong><CurrencyPrice group="service" priceId={minimumService.slug} ils={minimumService.price} prefix="от " /></strong>
            <span className={styles.pathSummaryAction}>Сравнить форматы ↗</span>
          </a>
        </section>

        <section id="monthly" className={`${styles.section} ${styles.monthlySection}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>01 / READY MONTHLY</span>
            <h2>Сайт по подписке.</h2>
            <p>Без стартового платежа. Три формата для разных задач бизнеса.</p>
          </div>
          <div className={styles.monthlyGrid}>
            {monthlyPlanList.map((plan, index) => (
              <article key={plan.id} className={styles.monthlyCard}>
                <span className={styles.cardIndex}>0{index + 1} / READY</span>
                <h3>{plan.name}</h3>
                <p>{plan.purpose}</p>
                <strong className={styles.bigPrice}><CurrencyPrice group="monthly" priceId={plan.id} ils={plan.price} perMonth /></strong>
              </article>
            ))}
          </div>
          <div className={styles.monthlyEssentials} aria-label="Основные условия подписки">
            <span>Хостинг включён</span>
            <span>2 пакета правок / до {monthlySupport.editMinutes} минут в месяц суммарно</span>
            <span>Проверка каждую неделю</span>
            <span>Отмена в любой момент*</span>
          </div>
          <details id="how-monthly" className={styles.disclosure}>
            <summary>
              <span>Как работает подписка — подробные условия</span>
              <span className={styles.disclosurePlus} aria-hidden="true">+</span>
            </summary>
            <div className={styles.disclosureBody}>
              <div><h3>Начало работы</h3><p>{monthlyStart}</p></div>
              <div><h3>Хостинг и проверки</h3><p>Размещение сайта включено на оплаченный период. {monthlySupport.checksDescription}</p></div>
              <div><h3>Контентные правки</h3><p>{monthlySupport.editsDescription}</p></div>
              <div><h3>Отмена и выкуп</h3><p>{monthlyCancel}</p><p>{monthlyBuyout}</p></div>
            </div>
          </details>
          <p className={styles.finePrint}>* После отмены сайт работает до конца оплаченного месяца, затем отключается. Выкуп возможен отдельно.</p>
        </section>

        <div className={styles.architecturalBreak} aria-hidden="true">
          <div className={styles.architectureCaption}>NEXORA / CUSTOM PROJECTS</div>
          <div className={styles.architectureLetter}>N<span>/</span></div>
          <span className={styles.architectureSide}>DESIGN · DEVELOPMENT</span>
        </div>

        <section id="individual" className={`${styles.section} ${styles.individualSection}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>02 / CUSTOM DEVELOPMENT</span>
            <h2>Когда готового<br /><em>недостаточно.</em></h2>
            <p>Выберите формат. Состав работ и сроки — внутри каждого пункта.</p>
          </div>
          <div className={styles.customList}>
            {services.map((service) => (
              <details key={service.slug} className={styles.serviceEntry}>
                <summary className={styles.customRow}>
                  <span className={styles.rowNumber}>{service.index}</span>
                  <span className={styles.serviceName}>{service.name}</span>
                  <strong className={styles.servicePrice}><CurrencyPrice group="service" priceId={service.slug} ils={service.price} prefix="от " /></strong>
                  <span className={styles.expandMark} aria-hidden="true">+</span>
                </summary>
                <div className={styles.serviceBody}>
                  <p>{service.short}</p>
                  <span>Срок: {service.duration}</span>
                  <div className={styles.serviceIncludes}>
                    {service.includes.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <a href={whatsappUrl(`Здравствуйте! Хочу обсудить ${service.name.toLowerCase()} от NeXora.`)} target="_blank" rel="noopener noreferrer">Обсудить этот формат ↗</a>
                </div>
              </details>
            ))}
          </div>
          <p className={styles.noteOnLight}>Стартовая цена зависит от согласованной структуры, функций и материалов.</p>
        </section>

        <section id="extras" className={`${styles.section} ${styles.extrasSection}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>03 / ADDITIONAL WORK</span>
            <h2>Тонкая настройка.</h2>
            <p>Дополнительные работы согласуются отдельно.</p>
          </div>
          <div className={styles.extrasGrid}>
            {addons.map((addon, index) => (
              <div key={addon.id} className={styles.extraRow}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{addon.name}</span>
                <strong><CurrencyPrice group="addon" priceId={addon.id} ils={addon.price} prefix="от " /></strong>
              </div>
            ))}
          </div>
        </section>

        <section id="support" className={`${styles.section} ${styles.supportSection}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>04 / MAINTENANCE</span>
            <h2>Поддержка после запуска.</h2>
            <p>Для сайтов вне Ready Monthly.</p>
          </div>
          <div className={styles.supportGrid}>
            {maintenancePlans.map((plan) => (
              <article key={plan.id}>
                <span className={styles.overline}>MAINTENANCE / {plan.id.toUpperCase()}</span>
                <h3>{plan.name}</h3>
                <strong><CurrencyPrice group="maintenance" priceId={plan.id} ils={plan.price} perMonth /></strong>
                <ul>{plan.included.slice(0, 2).map((item) => <li key={item}>{item}</li>)}</ul>
                <details className={styles.supportDisclosure}>
                  <summary>Полный состав услуг <span aria-hidden="true">+</span></summary>
                  <ul>{plan.included.slice(2).map((item) => <li key={item}>{item}</li>)}</ul>
                </details>
              </article>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div><span className={styles.overline}>NEXORA / LET'S TALK</span><h2>Расскажите о задаче.</h2></div>
          <a href={whatsappUrl("Здравствуйте! Хочу обсудить стоимость проекта NeXora.")} target="_blank" rel="noopener noreferrer">Обсудить проект ↗</a>
        </footer>
      </div>
    </main>
  );
}

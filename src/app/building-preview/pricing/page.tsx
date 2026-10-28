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
  title: { absolute: "Стоимость сайтов и разработки | NeXora" },
  description: "Форматы работы NeXora: сайты по подписке, покупка готового сайта с адаптацией, индивидуальная разработка, дополнительные услуги и поддержка.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/building-preview/pricing" },
};

const nav = [
  { id: "monthly", label: "Подписка и что в неё входит", number: "01" },
  { id: "individual", label: "Индивидуальная разработка", number: "02" },
  { id: "extras", label: "Дополнительные услуги", number: "03" },
  { id: "support", label: "Поддержка", number: "04" },
];

const minimumReadyPrice = Math.min(...readySites.map((site) => site.priceFrom));
const minimumServicePrice = Math.min(...services.map((service) => service.price));
const minimumMonthlyPrice = Math.min(...monthlyPlanList.map((plan) => plan.price));

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

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.overline}>NEXORA / FORMATS & PRICING</span>
            <h1>У каждого проекта<br /><em>своя форма.</em></h1>
            <p>Подписка, готовый сайт с адаптацией или индивидуальная разработка. Выбирайте формат под задачу, а не под красивое название тарифа.</p>
            <span className={styles.currentNote}>₪ — действующий прайс. $ и ₽ — предварительные цены для согласования, не конвертация по курсу.</span>
          </div>
          <nav className={styles.heroIndex} aria-label="Разделы стоимости">
            <div className={styles.indexHead}><span>THE INDEX</span><span>01—04</span></div>
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.indexRow}>
                <span>{item.number}</span><span>{item.label}</span><span aria-hidden="true">↘</span>
              </a>
            ))}
          </nav>
        </section>

        <section aria-label="Три способа получить сайт" className={styles.pathSummary}>
          <a href="#monthly" className={styles.pathSummaryItem}>
            <span>01 / САЙТ ПО ПОДПИСКЕ</span>
            <strong><CurrencyPrice group="monthly" priceId="compact" ils={minimumMonthlyPrice} prefix="от " perMonth /></strong>
            <span className={styles.pathSummaryAction}>С поддержкой и хостингом ↗</span>
          </a>
          <Link href="/building-preview#collection" className={styles.pathSummaryItem}>
            <span>02 / ГОТОВЫЙ САЙТ С АДАПТАЦИЕЙ</span>
            <strong><CurrencyPrice group="ready" priceId="brow-artist" ils={minimumReadyPrice} prefix="от " /></strong>
            <span className={styles.pathSummaryAction}>Выбрать концепцию ↗</span>
          </Link>
          <a href="#individual" className={styles.pathSummaryItem}>
            <span>03 / ИНДИВИДУАЛЬНАЯ РАЗРАБОТКА</span>
            <strong><CurrencyPrice group="service" priceId="mini-site" ils={minimumServicePrice} prefix="от " /></strong>
            <span className={styles.pathSummaryAction}>Посмотреть форматы ↗</span>
          </a>
        </section>

        <section id="monthly" className={`${styles.section} ${styles.monthlySection}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>01 / READY MONTHLY</span>
            <h2>Сайт работает.<br /><em>Вы занимаетесь бизнесом.</em></h2>
            <p>Без стартового платежа. Хостинг, два пакета правок и еженедельная техническая проверка включены.</p>
            <a className={styles.underlineLink} href="#how-monthly">Как работает подписка ↓</a>
          </div>
          <div className={styles.monthlyGrid}>
            {monthlyPlanList.map((plan, index) => (
              <article key={plan.id} className={styles.monthlyCard}>
                <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")} / PLAN</span>
                <h3>{plan.name}</h3>
                <p>{plan.purpose}</p>
                <strong className={styles.bigPrice}><CurrencyPrice group="monthly" priceId={plan.id} ils={plan.price} perMonth /></strong>
              </article>
            ))}
          </div>

          <div id="how-monthly" className={styles.monthlyExplanation}>
            <div className={styles.explanationHeading}>
              <span className={styles.overline}>READY MONTHLY / КАК ЭТО РАБОТАЕТ</span>
              <h3>Сайт — ваш.<br />Заботы — наши.</h3>
              <p>Выбираете готовую концепцию, мы адаптируем её под материалы и задачи вашего бизнеса. Дальше сайт работает по ежемесячной подписке.</p>
            </div>
            <div className={styles.explanationList}>
              <div><span>01</span><div><strong>Без стартового платежа</strong><p>{monthlyStart}</p></div></div>
              <div><span>02</span><div><strong>Хостинг и технический контроль</strong><p>Хостинг включён на весь оплаченный период. {monthlySupport.checksDescription}</p></div></div>
              <div><span>03</span><div><strong>Два пакета правок в месяц</strong><p>{monthlySupport.editsDescription}</p></div></div>
              <div><span>04</span><div><strong>Отмена и выкуп</strong><p>{monthlyCancel}</p><p>{monthlyBuyout}</p></div></div>
            </div>
          </div>
        </section>

        <section id="individual" className={`${styles.section} ${styles.individualSection}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>02 / CUSTOM DEVELOPMENT</span>
            <h2>Когда готового<br /><em>недостаточно.</em></h2>
            <p>Индивидуальная структура, визуальная система и разработка под задачу. Стоимость зависит от объёма работ и согласованных функций.</p>
          </div>
          <div className={styles.customList}>
            {services.map((service) => (
              <div key={service.slug} className={styles.customRow}>
                <span className={styles.rowNumber}>{service.index}</span>
                <div><h3>{service.name}</h3><p>{service.short}</p></div>
                <span className={styles.duration}>{service.duration}</span>
                <strong><CurrencyPrice group="service" priceId={service.slug} ils={service.price} prefix="от " /></strong>
              </div>
            ))}
          </div>
        </section>

        <section id="extras" className={`${styles.section} ${styles.extrasSection}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>03 / ADDITIONAL WORK</span>
            <h2>Тонкая настройка.</h2>
            <p>Дополнительные страницы, функции, интеграции и языки — отдельные работы с согласованным объёмом.</p>
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
            <h2>Сайт живёт<br /><em>после запуска.</em></h2>
            <p>Отдельные программы обслуживания для сайтов, которым требуется постоянная поддержка.</p>
          </div>
          <div className={styles.supportGrid}>
            {maintenancePlans.map((plan) => (
              <article key={plan.id}>
                <span className={styles.overline}>SERVICE PLAN</span>
                <h3>{plan.name}</h3>
                <strong><CurrencyPrice group="maintenance" priceId={plan.id} ils={plan.price} perMonth /></strong>
                <ul>{plan.included.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className={styles.finePrint}>Обслуживание отдельно от поддержки, включённой в Ready Monthly. Все цены «от» зависят от окончательного объёма работ.</p>
        </section>

        <footer className={styles.footer}>
          <div><span className={styles.overline}>LET'S BUILD SOMETHING USEFUL</span><h2>Расскажите о задаче.</h2></div>
          <a href={whatsappUrl("Здравствуйте! Хочу обсудить стоимость проекта NeXora.")} target="_blank" rel="noopener noreferrer">Обсудить проект ↗</a>
        </footer>
      </div>
    </main>
  );
}

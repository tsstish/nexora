import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { addons, maintenancePlans, services } from "@/data/services";
import { monthlyPlanList, monthlySupport } from "@/data/readyMonthly";
import { readySites } from "@/data/readySites";
import { whatsappUrl } from "@/data/site";
import { CurrencyPrice, CurrencySelector } from "../CurrencyControl";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: { absolute: "Стоимость сайтов и разработки | NeXora" },
  description: "Форматы работы NeXora: сайты по подписке, готовые решения с адаптацией, индивидуальная разработка, дополнительные услуги и поддержка.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/building-preview/pricing" },
};

const siteCategory: Record<string, string> = {
  "dental-clinic": "Клиники и стоматологии",
  "private-teacher": "Образование и эксперты",
  "brow-artist": "Beauty-мастера",
  "media-kit": "Блогеры и авторы",
};

const nav = [
  { id: "monthly", label: "Подписка", number: "01" },
  { id: "ready", label: "Покупка готового сайта", number: "02" },
  { id: "individual", label: "Индивидуальная разработка", number: "03" },
  { id: "extras", label: "Дополнительные услуги", number: "04" },
  { id: "support", label: "Поддержка", number: "05" },
];

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
            <p>Готовая концепция, подписка или сайт с нуля. Показываем, из чего складывается стоимость — без бесконечных одинаковых пакетов.</p>
            <span className={styles.currentNote}>₪ — действующие цены. $ и ₽ — предварительные предложения для согласования.</span>
          </div>
          <nav className={styles.heroIndex} aria-label="Разделы стоимости">
            <div className={styles.indexHead}><span>THE INDEX</span><span>01—05</span></div>
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.indexRow}>
                <span>{item.number}</span><span>{item.label}</span><span aria-hidden="true">↘</span>
              </a>
            ))}
          </nav>
        </section>

        <section id="monthly" className={styles.section}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>01 / READY MONTHLY</span>
            <h2>Сайт работает.<br /><em>Вы занимаетесь бизнесом.</em></h2>
            <p>Без стартового платежа. Хостинг, поддержка, два пакета правок и еженедельная техническая проверка включены.</p>
            <Link className={styles.underlineLink} href="/building-preview/ready/brow-artist#monthly">Как работает подписка ↗</Link>
          </div>
          <div className={styles.monthlyGrid}>
            {monthlyPlanList.map((plan, index) => (
              <article key={plan.id} className={styles.monthlyCard}>
                <span className={styles.cardIndex}>{String(index + 1).padStart(2,"0")} / PLAN</span>
                <h3>{plan.name}</h3>
                <p>{plan.purpose}</p>
                <strong className={styles.bigPrice}><CurrencyPrice group="monthly" priceId={plan.id} ils={plan.price} perMonth /></strong>
              </article>
            ))}
          </div>
          <p className={styles.finePrint}>{monthlySupport.summary}. Дополнительные работы согласуются отдельно.</p>
        </section>

        <section id="ready" className={styles.section}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>02 / READY PURCHASE</span>
            <h2>Выберите готовое.<br /><em>Сделаем вашим.</em></h2>
            <p>Покупка уже разработанного сайта с адаптацией под бренд, тексты, фотографии и способы связи.</p>
          </div>
          <div className={styles.readyList}>
            {readySites.map((site, index) => (
              <Link key={site.slug} href={`/building-preview/ready/${site.slug}#purchase`} className={styles.readyRow}>
                <span className={styles.rowNumber}>{String(index + 1).padStart(2,"0")}</span>
                <span><strong>{siteCategory[site.slug] ?? site.title}</strong><small>{site.name} / {site.formatLabel}</small></span>
                <span className={styles.readyPrice}><CurrencyPrice group="ready" priceId={site.slug} ils={site.priceFrom} prefix="от " /></span>
                <span className={styles.rowArrow} aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section id="individual" className={styles.section}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>03 / CUSTOM DEVELOPMENT</span>
            <h2>Когда готового<br /><em>недостаточно.</em></h2>
            <p>Индивидуальная структура, визуальная система и разработка под задачу. Цена начинается с конкретного объёма работ, а не с красивой упаковки.</p>
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

        <section id="extras" className={styles.section}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>04 / ADDITIONAL WORK</span>
            <h2>Тонкая настройка.</h2>
            <p>Дополнительные страницы, функции, интеграции и языки — отдельные работы с прозрачной стартовой стоимостью.</p>
          </div>
          <div className={styles.extrasGrid}>
            {addons.map((addon, index) => (
              <div key={addon.id} className={styles.extraRow}>
                <span>{String(index + 1).padStart(2,"0")}</span>
                <span>{addon.name}</span>
                <strong><CurrencyPrice group="addon" priceId={addon.id} ils={addon.price} prefix="от " /></strong>
              </div>
            ))}
          </div>
        </section>

        <section id="support" className={styles.section}>
          <div className={styles.sectionHeading}>
            <span className={styles.overline}>05 / MAINTENANCE</span>
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

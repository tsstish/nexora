import Link from "next/link";
import type { Metadata } from "next";
import { addons, maintenancePlans, services } from "@/data/services";
import { monthlyPlanList, monthlySupport } from "@/data/readyMonthly";
import { readySites } from "@/data/readySites";
import { monthlyStart, monthlyCancel, monthlyBuyout } from "@/data/readyConditions";
import { whatsappUrl } from "@/data/site";
import { CurrencyPrice } from "../CurrencyControl";
import { CityBackdrop } from "../CityBackdrop";
import { StudioHeader } from "../StudioHeader";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: { absolute: "Стоимость разработки сайтов и подписки | NeXora" },
  description: "Сколько стоит сайт для бизнеса: подписка от 249 ₪ в месяц, готовые сайты с адаптацией, индивидуальная разработка и поддержка NeXora.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/building-preview/pricing" },
};

const firstReady = readySites.reduce((lowest, current) =>
  current.priceFrom < lowest.priceFrom ? current : lowest);
const firstCustom = services.reduce((lowest, current) =>
  current.price < lowest.price ? current : lowest);
const firstMonthly = monthlyPlanList.reduce((lowest, current) =>
  current.price < lowest.price ? current : lowest);

const addonGroups: { number: string; title: string; caption: string; ids: string[] }[] = [
  {
    number: "01",
    title: "Страницы и формы",
    caption: "Больше возможностей для обращения",
    ids: ["page", "form", "smart-form"],
  },
  {
    number: "02",
    title: "Функции и продвижение",
    caption: "Новые сценарии и подключения",
    ids: ["seo", "integration", "module"],
  },
  {
    number: "03",
    title: "Языки и айдентика",
    caption: "Расширение аудитории и образа",
    ids: ["language", "rtl", "brand"],
  },
];

export default function LoftPricing() {
  return (
    <main className={styles.page}>
      <div className={`${styles.dayScene} nx-city-stage`}>
        <CityBackdrop time="day" />
        <StudioHeader />
        <div className={styles.shell}>
          <section className={styles.hero} aria-labelledby="pricing-title">
            <div className={`${styles.heroGlass} nx-glass`}>
              <span className={styles.overline}>NEXORA / УСЛУГИ И СТОИМОСТЬ</span>
              <h1 id="pricing-title">Сайты под бизнес — <em>цены по делу</em></h1>
              <p>Готовая концепция по подписке, покупка сайта с адаптацией или разработка под вашу задачу</p>
              <a className={`${styles.heroLink} nx-action nx-action--outline`} href="#monthly">Посмотреть форматы <span aria-hidden="true">↘</span></a>
            </div>
            <div className={styles.citySignature} aria-hidden="true">
              <span>NEXORA / DIGITAL PRESENCE DESIGN</span>
              <span>01 — 04 / SERVICES</span>
            </div>
          </section>

          <nav className={styles.entryStrip} aria-label="Выбор способа разработки сайта">
            <a href="#monthly" className={styles.entry}>
              <span className={styles.entryNumber}>01 / ПОДПИСКА</span>
              <strong><CurrencyPrice group="monthly" priceId={firstMonthly.id} ils={firstMonthly.price} prefix="от " perMonth /></strong>
              <span className={styles.entryNote}>Без стартового взноса <span aria-hidden="true">↗</span></span>
            </a>
            <Link href="/building-preview#collection" className={styles.entry}>
              <span className={styles.entryNumber}>02 / ГОТОВЫЙ САЙТ</span>
              <strong><CurrencyPrice group="ready" priceId={firstReady.slug} ils={firstReady.priceFrom} prefix="от " /></strong>
              <span className={styles.entryNote}>Выбрать концепцию <span aria-hidden="true">↗</span></span>
            </Link>
            <a href="#individual" className={styles.entry}>
              <span className={styles.entryNumber}>03 / САЙТ С НУЛЯ</span>
              <strong><CurrencyPrice group="service" priceId={firstCustom.slug} ils={firstCustom.price} prefix="от " /></strong>
              <span className={styles.entryNote}>Индивидуальная разработка <span aria-hidden="true">↗</span></span>
            </a>
          </nav>
        </div>
      </div>

      <section id="monthly" className={`${styles.chapter} ${styles.monthlyChapter}`}>
        <div className={styles.shell}>
          <header className={styles.chapterHeading}>
            <span className={styles.overline}>01 / READY MONTHLY</span>
            <div className={styles.headingPair}>
              <h2>Сайт по подписке</h2>
              <p>Вы выбираете готовую концепцию, мы адаптируем её под бизнес. Хостинг и техническая поддержка включены</p>
            </div>
          </header>
          <p className={styles.mobileSwipe}>Тарифы — листайте в сторону →</p>
          <div className={styles.planGrid}>
            {monthlyPlanList.map((plan, index) => (
              <article key={plan.id} className={`${styles.plan} ${index === 0 ? styles.featuredPlan : ""}`}>
                <div className={styles.planTop}><span>0{index + 1} / READY</span><span>{index === 0 ? "НАЧАТЬ ЗДЕСЬ" : "NEXORA MONTHLY"}</span></div>
                <h3>{plan.name}</h3>
                <p>{plan.purpose}</p>
                <div className={styles.planPrice}>
                  <CurrencyPrice group="monthly" priceId={plan.id} ils={plan.price} perMonth />
                </div>
              </article>
            ))}
          </div>
          <div className={styles.monthlyLine}>
            <span>Хостинг</span><span>2 пакета правок — до {monthlySupport.editMinutes} минут суммарно</span>
            <span>Еженедельная проверка</span>
          </div>
          <details className={styles.terms} id="how-monthly">
            <summary><span>Что входит в подписку и как её отменить</span><span aria-hidden="true">+</span></summary>
            <div className={styles.termsGrid}>
              <div><h3>Запуск</h3><p>{monthlyStart}</p></div>
              <div><h3>Правки</h3><p>{monthlySupport.editsDescription}</p></div>
              <div><h3>Технический контроль</h3><p>{monthlySupport.checksDescription}</p></div>
              <div><h3>Отмена и выкуп</h3><p>{monthlyCancel}</p><p>{monthlyBuyout}</p></div>
            </div>
          </details>
        </div>
      </section>

      <section id="individual" className={`${styles.chapter} ${styles.customChapter}`}>
        <div className={styles.shell}>
          <div className={styles.editorialLayout}>
            <div className={styles.editorialHeading}>
              <span className={styles.overline}>02 / INDIVIDUAL</span>
              <h2>Не вписывается<br />в готовое?</h2>
              <p>Создадим структуру, дизайн и функциональность под ваш проект</p>
              <span className={styles.editorialStamp}>DESIGNED FOR YOUR BUSINESS <b aria-hidden="true">↗</b></span>
            </div>
            <div className={styles.serviceDirectory}>
              {services.map((service) => (
                <details key={service.slug} className={styles.service}>
                  <summary>
                    <span className={styles.serviceIndex}>{service.index}</span>
                    <span className={styles.serviceTitle}>{service.name}</span>
                    <strong><CurrencyPrice group="service" priceId={service.slug} ils={service.price} prefix="от " /></strong>
                    <span className={styles.servicePlus} aria-hidden="true">+</span>
                  </summary>
                  <div className={styles.serviceContent}>
                    <p>{service.short}</p>
                    <span>Срок: {service.duration}</span>
                    <ul>{service.includes.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}</ul>
                    <a href={whatsappUrl(`Здравствуйте! Интересует ${service.name.toLowerCase()} от NeXora.`)}
                      target="_blank" rel="noopener noreferrer">Обсудить этот формат ↗</a>
                  </div>
                </details>
              ))}
              <p className={styles.serviceFootnote}>Стоимость «от» уточняется после обсуждения объёма работ</p>
            </div>
          </div>
        </div>
      </section>

      <section id="extras" className={`${styles.chapter} ${styles.addonsChapter}`}>
        <div className={styles.shell}>
          <header className={styles.chapterHeading}>
            <span className={styles.overline}>03 / ADDITIONAL SERVICES</span>
            <div className={styles.headingPair}>
              <h2>Нужны дополнительные возможности?</h2>
              <p>Дополняем сайт тем, что действительно нужно: страницы, интеграции, языки и индивидуальные функции</p>
            </div>
          </header>
          <div className={styles.addonGroups}>
            {addonGroups.map((group) => (
              <article className={styles.addonGroup} key={group.number}>
                <header className={styles.addonGroupHead}>
                  <span>{group.number} / MODULES</span>
                  <h3>{group.title}</h3>
                  <p>{group.caption}</p>
                </header>
                <div className={styles.addonItems}>
                  {addons.filter((addon) => group.ids.includes(addon.id)).map((addon) => (
                    <div key={addon.id} className={styles.addonItem}>
                      <span>{addon.name}</span>
                      <strong><CurrencyPrice group="addon" priceId={addon.id} ils={addon.price} prefix="от " /></strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.mobileAddonGroups}>
            {addonGroups.map((group, i) => (
              <details key={group.number} open={i === 0}>
                <summary>
                  <span className={styles.addonMobileNumber}>{group.number}</span>
                  <span><strong>{group.title}</strong><small>{group.caption}</small></span>
                  <span className={styles.addonMobilePlus} aria-hidden="true">+</span>
                </summary>
                <div className={styles.mobileAddonItems}>
                  {addons.filter((addon) => group.ids.includes(addon.id)).map((addon) => (
                    <div key={addon.id}>
                      <span>{addon.name}</span>
                      <strong><CurrencyPrice group="addon" priceId={addon.id} ils={addon.price} prefix="от " /></strong>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="support" className={`${styles.chapter} ${styles.supportChapter}`}>
        <div className={styles.shell}>
          <div className={styles.supportLayout}>
            <div className={styles.supportIntro}>
              <span className={styles.overline}>04 / WEBSITE CARE</span>
              <h2>Запустили сайт.<br />Что дальше?</h2>
              <p>Поддержка для сайтов вне Ready Monthly. Выберите нужный объём обслуживания</p>
            </div>
            <div className={styles.supportOptions}>
              {maintenancePlans.map((plan, index) => (
                <article key={plan.id} className={styles.supportOption}>
                  <div className={styles.supportMeta}><span>0{index + 1} / SUPPORT</span><span>{index === 0 ? "REGULAR" : "EXTENDED"}</span></div>
                  <div className={styles.supportTitle}>
                    <h3>{plan.name}</h3>
                    <strong><CurrencyPrice group="maintenance" priceId={plan.id} ils={plan.price} perMonth /></strong>
                  </div>
                  <ul>{plan.included.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
                  <details>
                    <summary>Все условия <span aria-hidden="true">+</span></summary>
                    <ul>{plan.included.slice(3).map((item) => <li key={item}>{item}</li>)}</ul>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.endCta}>
        <div className={styles.shell}>
          <span className={styles.overline}>NEXORA / START A PROJECT</span>
          <div className={styles.endCtaRow}>
            <h2>Расскажите, какой сайт вам нужен</h2>
            <a href={whatsappUrl("Здравствуйте! Хочу обсудить стоимость сайта NeXora.")}
              target="_blank" rel="noopener noreferrer" className="nx-action nx-action--primary">Обсудить сайт для бизнеса <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}

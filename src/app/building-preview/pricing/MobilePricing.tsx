"use client";

import { useState } from "react";
import Link from "next/link";
import { services, addons, maintenancePlans } from "@/data/services";
import { monthlyPlanList, monthlySupport } from "@/data/readyMonthly";
import { readySites } from "@/data/readySites";
import { monthlyStart, monthlyCancel, monthlyBuyout } from "@/data/readyConditions";
import { whatsappUrl } from "@/data/site";
import { CurrencyPrice } from "../CurrencyControl";
import styles from "./MobilePricing.module.css";

type Format = "monthly" | "purchase" | "custom";
const formats: { id: Format; title: string; caption: string }[] = [
  { id: "monthly", title: "Подписка", caption: "Ежемесячная оплата" },
  { id: "purchase", title: "Готовый", caption: "Купить с адаптацией" },
  { id: "custom", title: "С нуля", caption: "Индивидуальный проект" },
];

export function MobilePricing() {
  const [format, setFormat] = useState<Format>("monthly");
  return (
    <div className={styles.mobile}>
      <section className={styles.hero} aria-labelledby="mobile-pricing-title">
        <span className={styles.eyebrow}>NEXORA / УСЛУГИ И СТОИМОСТЬ</span>
        <h1 id="mobile-pricing-title">Сайт под задачу.<br/><em>Цена по делу</em></h1>
        <p>Три формата — выберите подходящий и сразу посмотрите стоимость</p>
      </section>

      <section className={styles.formats} id="mobile-formats" aria-labelledby="mobile-formats-title">
        <span className={styles.kicker}>01 / ФОРМАТ РАБОТЫ</span>
        <h2 id="mobile-formats-title">Как вы хотите получить сайт?</h2>
        <div className={styles.formatTabs} role="tablist" aria-label="Способ заказа сайта">
          {formats.map(item => (
            <button type="button" role="tab" key={item.id} id={`mobile-format-tab-${item.id}`}
              aria-controls="mobile-format-panel" aria-selected={format === item.id}
              className={format === item.id ? styles.selected : ""}
              onClick={() => setFormat(item.id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                const index = formats.findIndex(x => x.id === item.id);
                const next = (index + (event.key === "ArrowRight" ? 1 : -1) + formats.length) % formats.length;
                setFormat(formats[next].id);
                const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button[role="tab"]');
                buttons?.[next]?.focus();
              }}
            ><strong>{item.title}</strong><small>{item.caption}</small></button>
          ))}
        </div>
        <div id="mobile-format-panel" role="tabpanel" aria-labelledby={`mobile-format-tab-${format}`}
          className={styles.formatPanel}>
          {format === "monthly" && (
            <>
              <h3>Сайт по подписке</h3>
              <p>Стартового взноса нет. Хостинг, технические проверки и правки включены</p>
              <div className={styles.priceRows}>
                {monthlyPlanList.map(plan => (
                  <div key={plan.id} className={styles.priceRow}>
                    <div><strong>{plan.name}</strong><small>{plan.purpose}</small></div>
                    <span className={styles.amount}><CurrencyPrice group="monthly" priceId={plan.id} ils={plan.price} perMonth /></span>
                  </div>
                ))}
              </div>
              <details className={styles.disclosure}>
                <summary>Подробные условия подписки <b aria-hidden="true">+</b></summary>
                <div><p>{monthlyStart}</p><p>{monthlySupport.editsDescription}</p>
                  <p>{monthlySupport.checksDescription}</p><p>{monthlyCancel}</p><p>{monthlyBuyout}</p></div>
              </details>
              <a className={styles.action} href={whatsappUrl("Здравствуйте! Интересует готовый сайт NeXora по подписке.")}
                target="_blank" rel="noopener noreferrer">Обсудить подписку ↗</a>
            </>
          )}
          {format === "purchase" && (
            <>
              <h3>Готовый сайт с адаптацией</h3>
              <p>Вы выбираете существующий сайт, мы заменяем бренд, фотографии, тексты и контакты</p>
              <div className={styles.priceRows}>
                {readySites.map(site => (
                  <Link href={`/building-preview/ready/${site.slug}`} key={site.slug} className={styles.priceRow}>
                    <div><strong>{site.title.split(",")[0]}</strong><small>Демо: {site.name}</small></div>
                    <span className={styles.amount}><CurrencyPrice group="ready" priceId={site.slug} ils={site.priceFrom} prefix="от " /></span>
                  </Link>
                ))}
              </div>
              <Link className={styles.action} href="/building-preview#mobile-collection">Посмотреть все сайты ↗</Link>
            </>
          )}
          {format === "custom" && (
            <>
              <h3>Индивидуальная разработка</h3>
              <p>С нуля проектируем сайт под ваш продукт, задачи и функциональность</p>
              <div className={styles.customRows}>
                {services.map(service => (
                  <details key={service.slug}>
                    <summary>
                      <span><strong>{service.name}</strong><small>Подробности ↘</small></span>
                      <span className={styles.amount}><CurrencyPrice group="service" priceId={service.slug} ils={service.price} prefix="от " /></span>
                    </summary>
                    <div className={styles.customDetails}>
                      <p>{service.short}</p><p>Срок: {service.duration}</p>
                      <ul>{service.includes.slice(0, 4).map(item => <li key={item}>{item}</li>)}</ul>
                    </div>
                  </details>
                ))}
              </div>
              <a className={styles.action} href={whatsappUrl("Здравствуйте! Хочу обсудить индивидуальную разработку сайта NeXora.")}
                target="_blank" rel="noopener noreferrer">Обсудить разработку ↗</a>
            </>
          )}
        </div>
      </section>

      <section className={styles.other} aria-labelledby="mobile-optional-title">
        <span className={styles.kicker}>02 / ПОСЛЕ ВЫБОРА</span>
        <h2 id="mobile-optional-title">Дополнительные возможности</h2>
        <p>Когда нужны особые функции или поддержка после запуска</p>
        <details className={styles.extra}>
          <summary><span><strong>Дополнительные услуги</strong><small>Формы, интеграции, языки, SEO</small></span><span aria-hidden="true">+</span></summary>
          <div className={styles.extraContent}>
            {addons.map(item => (
              <div key={item.id}><span>{item.name}</span><strong><CurrencyPrice group="addon" priceId={item.id} ils={item.price} prefix="от " /></strong></div>
            ))}
          </div>
        </details>
        <details className={styles.extra}>
          <summary><span><strong>Поддержка сайта</strong><small>Care и Care Plus</small></span><span aria-hidden="true">+</span></summary>
          <div className={styles.extraContent}>
            {maintenancePlans.map(plan => (
              <div key={plan.id}><span>{plan.name}</span>
                <strong><CurrencyPrice group="maintenance" priceId={plan.id} ils={plan.price} perMonth /></strong>
                <p>{plan.included.slice(0,2).join(" · ")}</p>
              </div>
            ))}
            <small>Для сайтов вне Ready Monthly</small>
          </div>
        </details>
        <Link href="/building-preview/contacts#brief" className={styles.contact}>Не знаете, что выбрать? <strong>Расскажите о задаче ↗</strong></Link>
      </section>
    </div>
  );
}

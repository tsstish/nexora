"use client";

import { useState } from "react";
import Link from "next/link";
import { CurrencyPrice } from "./CurrencyControl";
import styles from "./MobileShowroom.module.css";

type Concept = {
  slug: string;
  name: string;
  heading: string;
  description: string;
  formatLabel: string;
  priceFrom: number;
  monthlyPrice: number;
  monthlyPlan: string;
  demoUrl: string;
};

export function MobileShowroom({ concepts }: { concepts: Concept[] }) {
  const [selected, setSelected] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewInteractive, setPreviewInteractive] = useState(false);
  if (!concepts.length) return null;
  const active = concepts[selected] ?? concepts[0];

  return (
    <div className={styles.mobile}>
      <section className={`${styles.intro} nx-hero-copy`} aria-labelledby="mobile-showroom-title">
        <span className={styles.eyebrow}>NEXORA / READY COLLECTION</span>
        <h1 id="mobile-showroom-title">Готовый сайт.<br/><em>Ваш бренд</em></h1>
        <p>Выберите работающий сайт — мы заменим логотип, цвета, фотографии и тексты под ваш бизнес</p>
        <div className={styles.introBottom}><span>Не макет и не конструктор</span><span>Адаптация до 7 рабочих дней*</span></div>
      </section>

      <section className={styles.catalog} id="mobile-collection" aria-label="Готовые концепции">
        <div className={styles.sectionHead}>
          <span>01 / КОЛЛЕКЦИЯ</span><span>{String(selected + 1).padStart(2,"0")} / {String(concepts.length).padStart(2,"0")}</span>
        </div>
        <h2>Для какого бизнеса?</h2>
        <div className={styles.choices} role="group" aria-label="Направление готового сайта">
          {concepts.map((site, index) => (
            <button type="button" key={site.slug} aria-pressed={index === selected}
              className={index === selected ? styles.selected : ""}
              onClick={() => { setSelected(index); setPreviewVisible(false); setPreviewInteractive(false); }}>
              <span>{String(index + 1).padStart(2,"0")}</span>
              <strong>{site.heading}</strong>
            </button>
          ))}
        </div>

        <article className={styles.product} aria-live="polite">
          <div className={styles.productHeading}>
            <div>
              <span className={styles.productEyebrow}>ГОТОВЫЙ САЙТ / {active.formatLabel}</span>
              <h3>{active.heading}</h3>
            </div>
            <span className={styles.demoBrand}>Демо: {active.name}</span>
          </div>

          <div className={styles.preview}>
            <span className={styles.previewTag}>Работающий сайт · демонстрация</span>
            <div className={`${styles.iframeClip} ${previewInteractive ? styles.isInteractive : ""}`}>
              <iframe
                key={active.slug}
                src={active.demoUrl}
                title={`Работающий сайт ${active.name} — мобильное демо`}
                loading="eager"
                scrolling={previewInteractive ? "yes" : "no"}
                tabIndex={previewInteractive ? 0 : -1}
              />
            </div>
            <button
              className={styles.previewInteraction}
              type="button"
              aria-pressed={previewInteractive}
              onClick={() => setPreviewInteractive((current) => !current)}
            >
              {previewInteractive ? "Завершить просмотр внутри" : "Листать сайт прямо здесь"}
              <span aria-hidden="true">{previewInteractive ? "✕" : "↕"}</span>
            </button>
            <a href={active.demoUrl} target="_blank" rel="noopener noreferrer"
              data-analytics-event="ready_demo_open" data-concept={active.slug}>Открыть демо целиком ↗</a>
          </div>

          <div className={styles.brandLine}>
            <span>{active.name} — пример оформления</span>
            <strong>В вашем сайте будет ваш бренд</strong>
          </div>

          <div className={styles.prices}>
            <div>
              <span>Сайт по подписке</span>
              <strong><CurrencyPrice group="monthly" priceId={active.monthlyPlan} ils={active.monthlyPrice} perMonth /></strong>
            </div>
            <div>
              <span>Покупка с адаптацией</span>
              <strong><CurrencyPrice group="ready" priceId={active.slug} ils={active.priceFrom} prefix="от " /></strong>
            </div>
          </div>
          <Link href={`/ready/${active.slug}`} className={styles.action}>
            Подробнее о сайте и условиях <span aria-hidden="true">↗</span>
          </Link>
          <button className={styles.moreToggle} type="button" aria-expanded={previewVisible}
            onClick={() => setPreviewVisible(v => !v)}>
            {previewVisible ? "Скрыть описание" : "Что можно изменить и что входит"} <span aria-hidden="true">{previewVisible ? "−" : "+"}</span>
          </button>
          {previewVisible && <div className={styles.moreContent}>
            <p>Заменим фирменные цвета, логотип, изображения, тексты и контакты в рамках выбранной концепции. Дополнительные функции оцениваются отдельно</p>
            <p>* После получения всех материалов; сроки зависят от продукта</p>
          </div>}
        </article>
      </section>
    </div>
  );
}

"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./page.module.css";

type Concept = {
  slug: string;
  name: string;
  heading: string;
  description: string;
  formatLabel: string;
  priceFrom: number;
  features: string[];
  demoUrl: string;
};

export function FeaturedGallery({ concepts }: { concepts: Concept[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = concepts.length;

  if (total === 0) {
    return <div className={styles.galleryEmpty}>Готовые концепции скоро появятся.</div>;
  }

  const active = concepts[activeIndex] ?? concepts[0];
  const number = String(activeIndex + 1).padStart(2, "0");

  function move(step: number) {
    setActiveIndex((previous) => (previous + step + total) % total);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % total;
    else if (event.key === "ArrowLeft") next = (index - 1 + total) % total;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = total - 1;
    else return;

    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryHeading}>
        <span>SELECTED READY CONCEPTS</span>
        <span className={styles.galleryCount}>{number} <i>/</i> {String(total).padStart(2, "0")}</span>
      </div>

      <section
        id="feature-panel"
        role="tabpanel"
        aria-labelledby={`concept-tab-${active.slug}`}
        className={styles.activePanel}
      >
        <div className={styles.activeDetails}>
          <span className={styles.activeIndex}>{number} / READY</span>
          <p className={styles.conceptKicker}>Готовая концепция для бизнеса</p>
          <h2>{active.heading}</h2>
          <p className={styles.activeDescription}>{active.description}</p>
          <div className={styles.featureList}>
            {active.features.slice(0, 2).map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
          <div className={styles.activeFooter}>
            <div className={styles.price}>
              <small>Готовый сайт с адаптацией от</small>
              <strong>{new Intl.NumberFormat("ru-RU").format(active.priceFrom)} ₪</strong>
            </div>
            <a
              className={styles.demoButton}
              href={active.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="ready_demo_open"
              data-concept={active.slug}
            >
              Смотреть демо <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.detailsLink} href={`/ready#concept-${active.slug}`}>
              Подробнее об условиях <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className={styles.liveArea}>
          <div className={styles.liveLabel}>
            <span className={styles.liveIndicator} aria-hidden="true" />
            LIVE SITE PREVIEW
            <span>{active.name}</span>
          </div>
          <div className={styles.liveViewport}>
            <iframe
              key={active.slug}
              src={active.demoUrl}
              title={`Превью готового сайта ${active.name}`}
              loading="lazy"
              scrolling="no"
              tabIndex={-1}
            />
          </div>
          <a
            href={active.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.liveOpen}
            aria-label={`Открыть демо ${active.name} в новой вкладке`}
            data-analytics-event="ready_demo_open"
            data-concept={active.slug}
          >
            Открыть на весь экран ↗
          </a>
        </div>
      </section>

      <div className={styles.selector} id="collection">
        <div className={styles.selectorHeading}>
          <div>
            <span className={styles.selectorEyebrow}>THE READY COLLECTION</span>
            <h3>Выберите направление</h3>
          </div>
          <div className={styles.arrowControls}>
            <button type="button" onClick={() => move(-1)} aria-label="Предыдущая концепция">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Следующая концепция">→</button>
          </div>
        </div>
        <div role="tablist" aria-label="Готовые концепции NeXora" className={styles.tabRail}>
          {concepts.map((site, index) => (
            <button
              key={site.slug}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="feature-panel"
              id={`concept-tab-${site.slug}`}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`${styles.tab} ${index === activeIndex ? styles.tabActive : ""}`}
            >
              <span className={styles.tabNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.tabName}>{site.heading}</span>
              <span className={styles.tabArrow} aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

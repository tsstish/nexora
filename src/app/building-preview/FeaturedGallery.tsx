"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./page.module.css";
import { CurrencyPrice } from "./CurrencyControl";

type Concept = {
  slug: string;
  name: string;
  heading: string;
  description: string;
  formatLabel: string;
  priceFrom: number;
  monthlyPrice: number;
  monthlyPlan: string;
  features: string[];
  demoUrl: string;
};

function SitePreview({ name, slug, url }: { name: string; slug: string; url: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ width: 480, height: 310 });
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 700px)").matches) setMode("mobile");
    const el = frameRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setFrame({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { setInteractive(false); }, [slug, mode]);

  const virtualWidth = mode === "desktop" ? 1280 : 390;
  const scale = Math.max(.1, frame.width / virtualWidth);
  const virtualHeight = Math.max(300, frame.height / scale);

  return (
    <div className={styles.liveArea}>
      <div className={styles.liveLabel}>
        <span className={styles.liveIndicator} aria-hidden="true" />
        <span>ДЕМО-САЙТ / {name}</span>
        <div className={styles.previewModes} role="group" aria-label="Вид сайта">
          <button
            type="button"
            aria-pressed={mode === "desktop"}
            className={mode === "desktop" ? styles.previewModeActive : ""}
            onClick={() => setMode("desktop")}
          >Десктоп</button>
          <button
            type="button"
            aria-pressed={mode === "mobile"}
            className={mode === "mobile" ? styles.previewModeActive : ""}
            onClick={() => setMode("mobile")}
          >Телефон</button>
        </div>
      </div>
      <div
        ref={frameRef}
        className={`${styles.liveViewport} ${interactive ? styles.previewInteractive : ""}`}
        aria-label={`Предпросмотр сайта ${name}`}
      >
        <iframe
          key={`${slug}-${mode}`}
          src={url}
          title={`Реальное демо: ${name}`}
          loading="lazy"
          scrolling="yes"
          tabIndex={interactive ? 0 : -1}
          style={{
            width: virtualWidth,
            height: virtualHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
        {!interactive && (
          <span className={styles.previewHint}>Работающее демо · {mode === "desktop" ? "десктоп" : "телефон"}</span>
        )}
      </div>
      <div className={styles.previewActions}>
        <button
          type="button"
          className={styles.previewExplore}
          aria-pressed={interactive}
          onClick={() => setInteractive((v) => !v)}
        >
          {interactive ? "Завершить просмотр" : "Листать сайт внутри"} ↕
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="ready_demo_open"
          data-concept={slug}
        >Открыть демо ↗</a>
      </div>
    </div>
  );
}

export function FeaturedGallery({ concepts }: { concepts: Concept[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = concepts.length;

  if (total === 0) return <div className={styles.galleryEmpty}>Коллекция скоро появится.</div>;

  const active = concepts[activeIndex] ?? concepts[0];
  const number = String(activeIndex + 1).padStart(2, "0");


  function move(step: number) { setActiveIndex((prev) => (prev + step + total) % total); }

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
    <>
      <div className={styles.gallery}>
      <div className={styles.galleryHeading}>
        <span>ГОТОВЫЕ САЙТЫ / ВЫБЕРИТЕ ПРИМЕР</span>
        <span className={styles.galleryCount}>{number} <i>/</i> {String(total).padStart(2, "0")}</span>
      </div>

      <section id="feature-panel" role="tabpanel" aria-labelledby={`concept-tab-${active.slug}`} className={styles.activePanel}>
        <div className={styles.activeDetails}>
          <span className={styles.activeIndex}>{number} / READY</span>
          <p className={styles.conceptKicker}>Готовый сайт для бизнеса</p>
          <h2>{active.heading}</h2>
          <p className={styles.activeDescription}>{active.description}</p>
          <div className={styles.brandTransformation} aria-label="Как мы адаптируем выбранный сайт">
            <span><small>В демо</small><strong>{active.name}</strong></span>
            <b aria-hidden="true">→</b>
            <span><small>После адаптации</small><strong>Ваш бренд</strong></span>
          </div>
          <p className={styles.brandExplanation}>Заменим логотип, цвета, фото, тексты и контакты на ваши</p>
          <div className={styles.featureList}>
            {active.features.slice(0, 2).map((feature) => <span key={feature}>{feature}</span>)}
          </div>

          <div className={styles.offers}>
            <div className={styles.monthlyOffer}>
              <div>
                <span className={styles.offerLabel}><span className={styles.desktopOfferLabel}>Сайт по подписке · хостинг и поддержка</span><span className={styles.mobileOfferLabel}>Подписка</span></span>
                <strong><CurrencyPrice group="monthly" priceId={active.monthlyPlan} ils={active.monthlyPrice} perMonth /></strong>
              </div>
            </div>
            <div className={styles.buyOffer}>
              <div>
                <span className={styles.offerLabel}><span className={styles.desktopOfferLabel}>Покупка готового сайта с адаптацией</span><span className={styles.mobileOfferLabel}>Покупка сайта</span></span>
                <strong><CurrencyPrice group="ready" priceId={active.slug} ils={active.priceFrom} prefix="от " /></strong>
              </div>
            </div>
          </div>
          <a className={styles.conditionsLink} href="/pricing">Стоимость и условия <span aria-hidden="true">↗</span></a>

          <a className={`${styles.demoButton} nx-action nx-action--primary`} href={active.demoUrl} target="_blank" rel="noopener noreferrer"
            data-analytics-event="ready_demo_open" data-concept={active.slug}>
            Открыть готовый сайт <span aria-hidden="true">↗</span>
          </a>
        </div>
        <SitePreview name={active.name} slug={active.slug} url={active.demoUrl} />
      </section>

      </div>
      <div className={styles.selector} id="collection">
        <div className={styles.selectorHeading}>
          <div><span className={styles.selectorEyebrow}>THE READY COLLECTION</span><h3>Выберите направление</h3></div>
          <div className={styles.arrowControls}>
            <button type="button" onClick={() => move(-1)} aria-label="Предыдущая концепция">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Следующая концепция">→</button>
          </div>
        </div>
        <span className={styles.mobileTabHint}>Листайте направления →</span>
        <div className={styles.tabRail} role="tablist" aria-label="Готовые концепции NeXora">
          {concepts.map((site, index) => (
            <button key={site.slug}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button" role="tab" aria-selected={index === activeIndex}
              aria-controls="feature-panel" id={`concept-tab-${site.slug}`}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`${styles.tab} ${index === activeIndex ? styles.tabActive : ""}`}>
              <span className={styles.tabNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.tabName}>{site.heading}</span>
              <span className={styles.tabArrow} aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

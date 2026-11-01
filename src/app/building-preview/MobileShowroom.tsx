"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

type PreviewMode = "mobile" | "desktop";

/** A real, scrollable website view at the selected virtual screen width. */
function DemoFrame({ name, slug, url, mode, interactive }: {
  name: string; slug: string; url: string; mode: PreviewMode; interactive: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameSize, setFrameSize] = useState({ width: 340, height: 350 });
  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;
    const update = () => {
      setFrameSize({ width: Math.max(1, element.clientWidth), height: Math.max(1, element.clientHeight) });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const virtualWidth = mode === "desktop" ? 1280 : 390;
  const scale = Math.max(.1, frameSize.width / virtualWidth);
  const virtualHeight = Math.ceil(frameSize.height / scale);
  return (
    <div ref={frameRef} className={interactive ? styles.modalViewport : styles.miniViewport}>
      <iframe
        key={slug + "-" + mode}
        src={url}
        title={name + " — " + (mode === "mobile" ? "телефон" : "компьютер")}
        loading={interactive ? "eager" : "lazy"}
        scrolling="yes"
        tabIndex={interactive ? 0 : -1}
        style={{
          width: virtualWidth, height: Math.max(300, virtualHeight),
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
          pointerEvents: interactive ? "auto" : "none",
        }}
      />
    </div>
  );
}

export function MobileShowroom({ concepts }: { concepts: Concept[] }) {
  const [selected, setSelected] = useState(0);
  const [visibleStart, setVisibleStart] = useState(0);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("mobile");
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      triggerRef.current?.focus();
    };
  }, [modalOpen]);

  if (!concepts.length) return null;
  const active = concepts[selected] ?? concepts[0];
  const displayed = Array.from({ length: Math.min(2, concepts.length) }, (_, i) => ({
    index: (visibleStart + i) % concepts.length,
    site: concepts[(visibleStart + i) % concepts.length],
  }));
  const changePair = (step: number) => {
    const next = (visibleStart + step * 2 + concepts.length * 2) % concepts.length;
    setVisibleStart(next);
    setSelected(next);
    setPreviewMode("mobile");
  };

  return (
    <div className={styles.mobile}>
      <section className={styles.intro} aria-labelledby="mobile-showroom-title">
        <span className={styles.eyebrow}>NEXORA / READY MONTHLY</span>
        <h1 id="mobile-showroom-title">Сайт, который<br/><em>не нужно собирать.</em></h1>
        <p>Выберите концепцию — мы адаптируем её под ваш бизнес. Запустим и поддержим.</p>
        <div className={styles.offerLine}>
          <strong><CurrencyPrice group="monthly" priceId="compact" ils={249} prefix="от " perMonth /></strong>
          <span>Без стартового взноса</span>
        </div>
        <Link className={styles.pricingLink} href="/pricing">Стоимость и условия <span aria-hidden="true">↗</span></Link>
      </section>

      <section className={styles.catalog} id="mobile-collection" aria-label="Коллекция готовых сайтов">
        <div className={styles.catalogTop}>
          <span className={styles.eyebrow}>01 / ГОТОВЫЕ САЙТЫ</span>
          <span className={styles.counter}>{String(selected + 1).padStart(2, "0")} / {String(concepts.length).padStart(2, "0")}</span>
        </div>
        <div className={styles.choiceHeader}>
          <h2>Выберите направление</h2>
          <div className={styles.pairControls} aria-label="Листать направления">
            <button type="button" aria-label="Предыдущие направления" disabled={concepts.length <= 2} onClick={() => changePair(-1)}>←</button>
            <button type="button" aria-label="Следующие направления" disabled={concepts.length <= 2} onClick={() => changePair(1)}>→</button>
          </div>
        </div>
        <div className={styles.choices} role="group" aria-label="Тип готового сайта">
          {displayed.map(({ site, index }) => (
            <button
              key={site.slug}
              type="button"
              aria-pressed={index === selected}
              className={index === selected ? styles.selected : ""}
              onClick={() => { setSelected(index); setPreviewMode("mobile"); }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{site.heading}</strong>
            </button>
          ))}
        </div>

        <article className={styles.product} aria-label={"Концепция " + active.name}>
          <div className={styles.productHeading}>
            <div>
              <span className={styles.productEyebrow}>РАБОТАЮЩЕЕ ДЕМО · {active.name.toUpperCase()}</span>
              <h3>{active.heading}</h3>
            </div>
            <span className={styles.productFormat}>{active.formatLabel}</span>
          </div>
          <div className={styles.adaptationNote}>
            <span className={styles.adaptationFlow}><b>{active.name}</b><span aria-hidden="true">→</span><b>ваш бренд</b></span>
            <p>Готовая структура. Адаптируем оформление, тексты, услуги и контакты.</p>
          </div>
          <div className={styles.prices}>
            <div><span>Подписка</span><strong><CurrencyPrice group="monthly" priceId={active.monthlyPlan} ils={active.monthlyPrice} perMonth /></strong></div>
            <div><span>Выкуп с адаптацией</span><strong><CurrencyPrice group="ready" priceId={active.slug} ils={active.priceFrom} prefix="от " /></strong></div>
          </div>
          <div className={styles.preview}>
            <DemoFrame name={active.name} slug={active.slug} url={active.demoUrl} mode="mobile" interactive={false} />
            <button
              ref={triggerRef}
              className={styles.openPreview}
              type="button"
              onClick={() => setModalOpen(true)}
              aria-haspopup="dialog"
            >
              <span aria-hidden="true">↗</span>
              Смотреть и листать сайт
            </button>
          </div>
          <div className={styles.productBottom}>
            <span>На кодовой базе — не конструктор</span>
            <Link href={`/ready/${active.slug}`}>О сайте и условиях ↗</Link>
          </div>
        </article>
      </section>

      {mounted && modalOpen && createPortal(
        <div className={styles.modalScrim} onMouseDown={event => {
          if (event.target === event.currentTarget) setModalOpen(false);
        }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-label={`Демо-сайт ${active.name}`}>
            <header className={styles.modalHeader}>
              <div>
                <span>LIVE DEMO / {active.name}</span>
                <strong>{active.heading}</strong>
              </div>
              <button ref={closeRef} type="button" className={styles.modalClose} aria-label="Закрыть демонстрацию" onClick={() => setModalOpen(false)}>×</button>
            </header>
            <div className={styles.modalTools}>
              <div className={styles.modeSwitch} role="group" aria-label="Выберите версию сайта">
                <button type="button" aria-pressed={previewMode === "mobile"} onClick={() => setPreviewMode("mobile")}>Телефон</button>
                <button type="button" aria-pressed={previewMode === "desktop"} onClick={() => setPreviewMode("desktop")}>Компьютер</button>
              </div>
              <a href={active.demoUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="ready_demo_open" data-concept={active.slug}>Во весь экран ↗</a>
            </div>
            <DemoFrame name={active.name} slug={active.slug} url={active.demoUrl} mode={previewMode} interactive />
            <p className={styles.modalHint}>Листайте сайт прямо внутри окна. Закрыть — × вверху.</p>
          </section>
        </div>,
        document.body
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CurrencyPrice } from "./CurrencyControl";
import styles from "./ReadyShowcase.module.css";
import { MidaGallery } from "./MidaGallery";

export type ReadyConcept = {
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

const stories: Record<string, { label: string; purpose: string }> = {
  "dental-clinic": {
    label: "Клиники и стоматологии",
    purpose: "Услуги, специалисты, цены и примеры работ — уже в продуманной структуре.",
  },
  "private-teacher": {
    label: "Образование и эксперты",
    purpose: "Знакомство со специалистом, форматы занятий и удобный путь к записи.",
  },
  "brow-artist": {
    label: "Beauty-мастера",
    purpose: "Услуги, фотографии работ и быстрый способ записаться к мастеру.",
  },
  "media-kit": {
    label: "Авторы и блогеры",
    purpose: "Ваш контент, аудитория и предложения брендам — в одной ссылке.",
  },
};

type PreviewMode = "desktop" | "mobile";

function LiveWindow({ name, slug, url, mode, interactive, enlarged = false }: {
  name: string; slug: string; url: string; mode: PreviewMode; interactive: boolean; enlarged?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 620, height: 320 });
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = () => setDimensions({ width: Math.max(1, node.clientWidth), height: Math.max(1, node.clientHeight) });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);
  const virtualWidth = mode === "desktop" ? 1280 : 390;
  const scale = Math.max(.08, dimensions.width / virtualWidth);
  return (
    <div ref={ref} className={enlarged ? styles.expandedFrame : styles.frame}>
      <iframe
        key={slug + "-" + mode}
        src={url}
        title={"Демо " + name + " — " + (mode === "desktop" ? "компьютер" : "телефон")}
        loading={enlarged ? "eager" : "lazy"}
        scrolling="yes"
        tabIndex={interactive ? 0 : -1}
        style={{
          width: virtualWidth,
          height: Math.max(300, Math.ceil(dimensions.height / scale)),
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
          pointerEvents: interactive ? "auto" : "none",
        }}
      />
    </div>
  );
}

export function ReadyShowcase({ concepts, variant = "desktop" }: { concepts: ReadyConcept[]; variant?: "desktop" | "mobile" }) {
  const [selected, setSelected] = useState(0);
  const [pairIndex, setPairIndex] = useState(0);
  const [mode, setMode] = useState<PreviewMode>("desktop");
  const [interactive, setInteractive] = useState(false);
  const [opened, setOpened] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHydrated(true);
    if (variant === "mobile") setMode("mobile");
  }, [variant]);
  useEffect(() => {
    if (!opened) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpened(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
      openRef.current?.focus();
    };
  }, [opened]);

  if (!concepts.length) return null;
  const active = concepts[selected] ?? concepts[0];
  const story = stories[active.slug] ?? { label: active.heading, purpose: active.description };
  const isMida = active.slug === "dental-clinic";
  const labelNumber = String(selected + 1).padStart(2, "0");
  const count = String(concepts.length).padStart(2, "0");

  function choose(index: number) {
    setSelected(index);
    setInteractive(false);
    setMode("desktop");
  }
  function move(step: number) {
    const next = (selected + step + concepts.length) % concepts.length;
    choose(next);
    setPairIndex(Math.floor(next / 2) * 2);
  }
  function movePair(step: number) {
    const next = (pairIndex + step * 2 + concepts.length * 2) % concepts.length;
    setPairIndex(next);
    choose(next);
  }
  function onKey(e: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    const next = e.key === "ArrowRight" ? (index + 1) % concepts.length
      : e.key === "ArrowLeft" ? (index - 1 + concepts.length) % concepts.length
      : e.key === "Home" ? 0 : e.key === "End" ? concepts.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    choose(next);
    setPairIndex(Math.floor(next / 2) * 2);
    document.getElementById("ready-tab-" + variant + "-" + concepts[next].slug)?.focus();
  }
  const visibleMobile = Array.from({ length: Math.min(2, concepts.length) }, (_, offset) => {
    const index = (pairIndex + offset) % concepts.length;
    return { index, site: concepts[index] };
  });

  return (
    <section className={styles.showcase} id={variant === "mobile" ? "mobile-collection" : "collection"} aria-label="Коллекция готовых сайтов NeXora">
      <div className={styles.overline}>
        <span><i className={styles.overlineDot} aria-hidden="true" /> NEXORA / ГОТОВЫЕ САЙТЫ</span>
        <span className={styles.count}>{labelNumber} <span>/</span> {count}</span>
      </div>

      <div className={styles.product}>
        <div className={styles.details}>
          <div className={styles.brand}>
            <span className={styles.demoPill}>ГОТОВАЯ КОНЦЕПЦИЯ</span>
            <span className={styles.brandName}>«{active.name}»</span>
          </div>
          <h2 className={styles.title}>Подходит для {isMida ? "клиник и стоматологий" : story.label.toLowerCase()}</h2>
          <p className={styles.purpose}>{isMida ? "Уже разработанный сайт с продуманной структурой услуг, специалистов, кейсов и обращений." : story.purpose}</p>
          <div className={styles.priceRow}>
            <span>Готовый сайт по подписке</span>
            <strong><CurrencyPrice group="monthly" priceId={active.monthlyPlan} ils={active.monthlyPrice} prefix="от " perMonth /></strong>
          </div>
          <p className={styles.adaptation}>
            <b>Структура уже готова.</b> Вы присылаете материалы — мы адаптируем логотип, цвета, фотографии, тексты, услуги и контакты под ваш бизнес.
          </p>
          <div className={styles.productActions}>
            <a className={styles.demoLink} href={active.demoUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="ready_demo_open" data-concept={active.slug}>Открыть готовый сайт ↗</a>
            <Link className={styles.detailsLink} href={"/ready/" + active.slug}>О сайте и условиях <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className={styles.preview}>
          {isMida ? (
            <MidaGallery variant={variant} />
          ) : (
            <>
              <div className={styles.previewBar}>
                <span><i aria-hidden="true" /> ДЕМО / {active.name}</span>
                <div className={styles.modes} role="group" aria-label="Размер предпросмотра">
                  <button type="button" aria-pressed={mode === "desktop"} onClick={() => { setMode("desktop"); setInteractive(false); }}>Компьютер</button>
                  <button type="button" aria-pressed={mode === "mobile"} onClick={() => { setMode("mobile"); setInteractive(false); }}>Телефон</button>
                </div>
              </div>
              <LiveWindow name={active.name} slug={active.slug} url={active.demoUrl} mode={mode} interactive={interactive} />
              <div className={styles.previewBottom}>
                <button type="button" className={styles.desktopScroll} aria-pressed={interactive} onClick={() => setInteractive(v => !v)}>
                  {interactive ? "Завершить просмотр" : "Листать демо внутри"} <span aria-hidden="true">↕</span>
                </button>
                <button ref={openRef} type="button" className={styles.expand} onClick={() => setOpened(true)} aria-haspopup="dialog">Увеличить и листать <span aria-hidden="true">↗</span></button>
                <a href={active.demoUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="ready_demo_open" data-concept={active.slug}>Открыть демо ↗</a>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.navigator}>
        <div className={styles.navIntro}>
          <div><span>ЕЩЁ ГОТОВЫЕ КОНЦЕПЦИИ</span><h3>Найдите своё направление</h3></div>
          <div className={styles.arrows}>
            <button type="button" aria-label="Предыдущая концепция" onClick={() => move(-1)}>←</button>
            <button type="button" aria-label="Следующая концепция" onClick={() => move(1)}>→</button>
          </div>
        </div>
        <div className={styles.desktopNav} role="group" aria-label="Выберите сайт">
          {concepts.map((site, i) => (
            <button id={"ready-tab-" + variant + "-" + site.slug} key={site.slug} type="button"
              aria-pressed={i === selected} onClick={() => choose(i)} onKeyDown={e => onKey(e, i)}>
              <small>{String(i + 1).padStart(2, "0")}</small><span>{stories[site.slug]?.label ?? site.heading}</span>
            </button>
          ))}
        </div>
        <div className={styles.mobileNav}>
          <div className={styles.mobileNavArrows}>
            <button type="button" aria-label="Предыдущие направления" onClick={() => movePair(-1)}>←</button>
            <button type="button" aria-label="Следующие направления" onClick={() => movePair(1)}>→</button>
          </div>
          <div className={styles.mobileNavCards} role="group" aria-label="Направления сайтов">
            {visibleMobile.map(({ site, index }) => (
              <button key={site.slug} type="button" aria-pressed={index === selected}
                onClick={() => choose(index)}>
                <small>{String(index + 1).padStart(2, "0")}</small><span>{stories[site.slug]?.label ?? site.heading}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {hydrated && opened && createPortal(
        <div className={styles.modalBackdrop} onMouseDown={e => { if (e.currentTarget === e.target) setOpened(false); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-label={"Работающее демо " + active.name}>
            <header className={styles.modalHeader}>
              <div><span>РАБОТАЮЩЕЕ ДЕМО</span><strong>{active.name}</strong></div>
              <button ref={closeRef} type="button" onClick={() => setOpened(false)} aria-label="Закрыть демонстрацию">×</button>
            </header>
            <div className={styles.modalTools}>
              <div className={styles.modes} role="group" aria-label="Размер демо в окне">
                <button type="button" aria-pressed={mode === "desktop"} onClick={() => setMode("desktop")}>Компьютер</button>
                <button type="button" aria-pressed={mode === "mobile"} onClick={() => setMode("mobile")}>Телефон</button>
              </div>
              <a href={active.demoUrl} target="_blank" rel="noopener noreferrer">Открыть полностью ↗</a>
            </div>
            <LiveWindow name={active.name} slug={active.slug} url={active.demoUrl} mode={mode} interactive enlarged />
            <p className={styles.modalHint}>Листайте сайт внутри окна. Закрыть — кнопка × или Esc.</p>
          </section>
        </div>, document.body
      )}
    </section>
  );
}

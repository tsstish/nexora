"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MidaGallery.module.css";

type Shot = { src: string; label: string; description: string; kind: "desktop" | "mobile"; };

const shots: Shot[] = [
  { src: "/ready/showcase/mida-desktop-home.png", kind: "desktop", label: "Главная", description: "Первый экран MIDA" },
  { src: "/ready/showcase/mida-desktop-services.png", kind: "desktop", label: "Услуги", description: "Процедуры и цены" },
  { src: "/ready/showcase/mida-desktop-process.png", kind: "desktop", label: "Подход", description: "Восстановление улыбки" },
  { src: "/ready/showcase/mida-mobile-home.png", kind: "mobile", label: "Главная · телефон", description: "Первый экран на телефоне" },
  { src: "/ready/showcase/mida-mobile-process.png", kind: "mobile", label: "Подход · телефон", description: "Страница лечения на телефоне" },
  { src: "/ready/showcase/mida-mobile-clinic.png", kind: "mobile", label: "Клиника · телефон", description: "Команда и клиника на телефоне" },
];

export function MidaGallery({ variant }: { variant: "desktop" | "mobile" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const [mounted, setMounted] = useState(false);
  const active = shots[activeIndex];
  const currentKind = active.kind;

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!enlarged) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setEnlarged(false); };
    window.addEventListener("keydown", onEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onEscape); };
  }, [enlarged]);

  const changeKind = (kind: "desktop" | "mobile") => {
    setActiveIndex(kind === "desktop" ? 0 : 3);
    setEnlarged(false);
  };

  const next = (direction: number) => setActiveIndex((n) => (n + direction + shots.length) % shots.length);

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryHead}>
        <div className={styles.headCopy}>
          <span className={styles.dots} aria-hidden="true"><i/><i/><i/></span>
          <span>ЭКРАНЫ САЙТА / MIDA</span>
        </div>
        <div className={styles.switcher} role="group" aria-label="Версия сайта">
          <button type="button" aria-pressed={currentKind === "desktop"} onClick={() => changeKind("desktop")}>Компьютер</button>
          <button type="button" aria-pressed={currentKind === "mobile"} onClick={() => changeKind("mobile")}>Телефон</button>
        </div>
      </div>

      <button className={styles.heroShot} type="button" onClick={() => setEnlarged(true)}
        aria-label={"Увеличить: " + active.description} title="Открыть изображение крупно">
        <img src={active.src} alt={"MIDA: " + active.description} width={active.kind === "desktop" ? 2048 : 624} height={active.kind === "desktop" ? 1240 : 1408} loading="eager" />
        <span className={styles.expandHint}>Увеличить ↗</span>
      </button>

      <div className={styles.thumbnails} aria-label="Шесть экранов сайта MIDA">
        {shots.map((shot, index) => (
          <button type="button" key={shot.src} onClick={() => setActiveIndex(index)}
            className={index === activeIndex ? styles.chosen : ""}
            aria-label={String(index + 1) + ". " + shot.description}
            aria-pressed={index === activeIndex}>
            <span className={styles.thumbFrame}>
              <img src={shot.src} alt="" width={shot.kind === "desktop" ? 2048 : 624} height={shot.kind === "desktop" ? 1240 : 1408} loading="lazy" />
            </span>
            <span className={styles.thumbLabel}>{shot.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.galleryFoot}>
        <span>{String(activeIndex + 1).padStart(2, "0")} / 06 <span className={styles.galleryCaption}>· {active.description}</span></span>
        <div>
          <button type="button" onClick={() => next(-1)} aria-label="Предыдущий скриншот">←</button>
          <button type="button" onClick={() => next(1)} aria-label="Следующий скриншот">→</button>
        </div>
      </div>

      {mounted && enlarged && createPortal(
        <div className={styles.lightbox} onMouseDown={(event) => { if (event.target === event.currentTarget) setEnlarged(false); }} role="presentation">
          <div className={styles.lightboxPanel} role="dialog" aria-modal="true" aria-label={active.description}>
            <div className={styles.lightboxHeader}>
              <span>MIDA / {active.description}</span>
              <button type="button" onClick={() => setEnlarged(false)} aria-label="Закрыть изображение">×</button>
            </div>
            <div className={styles.lightboxBody}>
              <img src={active.src} alt={"MIDA: " + active.description} width={active.kind === "desktop" ? 2048 : 624} height={active.kind === "desktop" ? 1240 : 1408} />
            </div>
            <p>Полный скриншот без обрезки. Закрыть — ×.</p>
          </div>
        </div>, document.body
      )}
    </div>
  );
}

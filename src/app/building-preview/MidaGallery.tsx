"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MidaGallery.module.css";

type Slide = { id: string; description: string; image?: string };

const mobileScreens = [
  { src: "/ready/showcase/mida-mobile-home.png", alt: "Главная страница MIDA на телефоне" },
  { src: "/ready/showcase/mida-mobile-process.png", alt: "Страница восстановления улыбки на телефоне" },
  { src: "/ready/showcase/mida-mobile-clinic.png", alt: "Страница клиники и команды на телефоне" },
] as const;

const slides: Slide[] = [
  { id: "home", image: "/ready/showcase/mida-desktop-home.png", description: "Главная страница MIDA" },
  { id: "services", image: "/ready/showcase/mida-desktop-services.png", description: "Процедуры и цены" },
  { id: "approach", image: "/ready/showcase/mida-desktop-process.png", description: "Подход к лечению" },
  { id: "phones", description: "Три мобильные страницы MIDA" },
];

function PhoneTriptych({ miniature = false }: { miniature?: boolean }) {
  return (
    <div className={miniature ? styles.phonesSmall : styles.phones} aria-label="Три экрана мобильного сайта MIDA">
      {mobileScreens.map(({ src, alt }, index) => (
        <div className={[styles.phone, index === 1 ? styles.phoneCenter : ""].join(" ")} key={src}>
          <div className={styles.phoneBezel} aria-hidden="true">
            <span className={styles.phoneSpeaker} />
            <img src={src} alt="" width={624} height={1408} loading={miniature ? "lazy" : "eager"} />
          </div>
          {!miniature && <span className={styles.visuallyHidden}>{alt}</span>}
        </div>
      ))}
    </div>
  );
}

function SlideImage({ slide, miniature = false }: { slide: Slide; miniature?: boolean }) {
  return slide.id === "phones" ? (
    <PhoneTriptych miniature={miniature} />
  ) : (
    <img
      src={slide.image}
      alt={miniature ? "" : slide.description}
      width={2048}
      height={1240}
      loading={miniature ? "lazy" : "eager"}
    />
  );
}

export function MidaGallery({ variant: _variant }: { variant: "desktop" | "mobile" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const active = slides[activeIndex];

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!enlarged) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEnlarged(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onEscape);
      triggerRef.current?.focus();
    };
  }, [enlarged]);

  return (
    <div className={styles.gallery}>
      <button
        ref={triggerRef}
        className={[styles.heroShot, active.id === "phones" ? styles.heroPhones : ""].join(" ")}
        style={{ aspectRatio: active.id === "services" ? "2048 / 1230" : active.id === "approach" ? "2048 / 1215" : "2048 / 1240" }}
        type="button"
        onClick={() => setEnlarged(true)}
        aria-label={"Увеличить: " + active.description}
        title="Посмотреть крупно"
      >
        <SlideImage slide={active} />
        <span className={styles.expandHint}>Увеличить ↗</span>
      </button>

      <div className={styles.thumbnails} role="group" aria-label="Четыре вида сайта MIDA">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.id}
            onClick={() => setActiveIndex(index)}
            className={index === activeIndex ? styles.chosen : ""}
            aria-label={(index + 1) + " из 4. " + slide.description}
            aria-pressed={index === activeIndex}
          >
            <span className={styles.thumbFrame}>
              <SlideImage slide={slide} miniature />
            </span>
          </button>
        ))}
      </div>

      {mounted && enlarged && createPortal(
        <div
          className={styles.lightbox}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setEnlarged(false); }}
          role="presentation"
        >
          <div className={styles.lightboxPanel} role="dialog" aria-modal="true" aria-label={active.description}>
            <div className={styles.lightboxHeader}>
              <span>MIDA / {active.description}</span>
              <button ref={closeRef} type="button" onClick={() => setEnlarged(false)} aria-label="Закрыть изображение">×</button>
            </div>
            <div className={[styles.lightboxBody, active.id === "phones" ? styles.lightboxPhones : ""].join(" ")}>
              <SlideImage slide={active} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

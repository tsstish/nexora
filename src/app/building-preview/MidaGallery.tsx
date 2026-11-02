"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MidaGallery.module.css";

type GalleryKind = "mida" | "facet" | "lea" | "maya";
type Slide = { id: string; description: string; image?: string; width: number; height: number };

const galleries: Record<GalleryKind, { name: string; slides: Slide[]; mobileScreens: { src: string; alt: string }[] }> = {
  mida: {
    name: "MIDA",
    slides: [
      { id: "home", image: "/ready/showcase/mida-desktop-home.png", description: "Главная страница MIDA", width: 2048, height: 1240 },
      { id: "services", image: "/ready/showcase/mida-desktop-services.png", description: "Процедуры и цены", width: 2048, height: 1230 },
      { id: "approach", image: "/ready/showcase/mida-desktop-process.png", description: "Подход к лечению", width: 2048, height: 1215 },
      { id: "phones", description: "Три мобильные страницы MIDA", width: 2048, height: 1240 },
    ],
    mobileScreens: [
      { src: "/ready/showcase/mida-mobile-home.png", alt: "Главная страница MIDA на телефоне" },
      { src: "/ready/showcase/mida-mobile-process.png", alt: "Страница восстановления улыбки на телефоне" },
      { src: "/ready/showcase/mida-mobile-clinic.png", alt: "Страница клиники и команды на телефоне" },
    ],
  },
  facet: {
    name: "FACET",
    slides: [
      { id: "home", image: "/ready/showcase/facet-desktop-home.png", description: "Главная страница FACET", width: 1600, height: 900 },
      { id: "services", image: "/ready/showcase/facet-desktop-gallery.png", description: "Примеры работ и галерея", width: 1600, height: 1000 },
      { id: "approach", image: "/ready/showcase/facet-desktop-about.png", description: "Мастер, подход и запись", width: 1600, height: 900 },
      { id: "phones", description: "Три мобильные страницы FACET", width: 1600, height: 900 },
    ],
    mobileScreens: [
      { src: "/ready/showcase/facet-mobile-home.png", alt: "FACET — главный экран на телефоне" },
      { src: "/ready/showcase/facet-mobile-gallery.png", alt: "FACET — галерея на телефоне" },
      { src: "/ready/showcase/facet-mobile-about.png", alt: "FACET — о мастере и запись на телефоне" },
    ],
  },
  lea: {
    name: "LEA NORD",
    slides: [
      { id: "home", image: "/ready/showcase/lea-desktop-home.png", description: "Главная страница LEA NORD", width: 1600, height: 900 },
      { id: "students", image: "/ready/showcase/lea-desktop-students.png", description: "Занятия для детей и взрослых", width: 1600, height: 900 },
      { id: "atmosphere", image: "/ready/showcase/lea-desktop-atmosphere.png", description: "Атмосфера и результаты занятий", width: 1600, height: 900 },
      { id: "phones", description: "Три мобильные страницы LEA NORD", width: 1600, height: 1000 },
    ],
    mobileScreens: [
      { src: "/ready/showcase/lea-mobile-home.png", alt: "Главная страница LEA NORD на телефоне" },
      { src: "/ready/showcase/lea-mobile-benefits.png", alt: "Почему ученики любят занятия — мобильная страница" },
      { src: "/ready/showcase/lea-mobile-lessons.png", alt: "Как проходят занятия — мобильная страница" },
    ],
  },
  maya: {
    name: "MAYA—LAVI",
    slides: [
      { id: "home", image: "/ready/showcase/maya-desktop-home.png", description: "Главная страница MAYA—LAVI", width: 1600, height: 900 },
      { id: "audience", image: "/ready/showcase/maya-desktop-audience.png", description: "Аудитория, охваты и показатели", width: 1600, height: 900 },
      { id: "cases", image: "/ready/showcase/maya-desktop-cases.png", description: "Кейсы и результаты сотрудничества", width: 1600, height: 900 },
      { id: "phones", description: "Три мобильные страницы MAYA—LAVI", width: 1600, height: 900 },
    ],
    mobileScreens: [
      { src: "/ready/showcase/maya-mobile-home.png", alt: "Главная страница MAYA—LAVI на телефоне" },
      { src: "/ready/showcase/maya-mobile-audience.png", alt: "Мобильная страница с показателями аудитории" },
      { src: "/ready/showcase/maya-mobile-cases.png", alt: "Мобильные кейсы и сотрудничество" },
    ],
  },
};

function PhoneTriptych({ mobileScreens, miniature = false }: { mobileScreens: {src:string;alt:string}[]; miniature?: boolean }) {
  return (
    <div className={miniature ? styles.phonesSmall : styles.phones} aria-label="Три экранa мобильного сайта">
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

function SlideImage({ slide, mobileScreens, miniature = false }: { slide: Slide; mobileScreens: {src:string;alt:string}[]; miniature?: boolean }) {
  return slide.id === "phones" ? (
    <PhoneTriptych mobileScreens={mobileScreens} miniature={miniature} />
  ) : (
    <img
      src={slide.image}
      alt={miniature ? "" : slide.description}
      width={slide.width}
      height={slide.height}
      loading={miniature ? "lazy" : "eager"}
    />
  );
}

export function MidaGallery({ variant: _variant, concept = "mida" }: { variant: "desktop" | "mobile"; concept?: GalleryKind }) {
  const { slides, mobileScreens, name } = galleries[concept];
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
        style={{ aspectRatio: "8 / 5" }}
        type="button"
        onClick={() => setEnlarged(true)}
        aria-label={"Увеличить: " + active.description}
        title="Посмотреть крупно"
      >
        <SlideImage slide={active} mobileScreens={mobileScreens} />
        <span className={styles.expandHint}>Увеличить ↗</span>
      </button>

      <div className={styles.thumbnails} role="group" aria-label={"Четыре вида сайта " + name}>
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
              <SlideImage slide={slide} mobileScreens={mobileScreens} miniature />
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
              <span>{name} / {active.description}</span>
              <button ref={closeRef} type="button" onClick={() => setEnlarged(false)} aria-label="Закрыть изображение">×</button>
            </div>
            <div className={[styles.lightboxBody, active.id === "phones" ? styles.lightboxPhones : ""].join(" ")}>
              <SlideImage slide={active} mobileScreens={mobileScreens} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ReadyDemo.module.css";

type Mode = "desktop" | "mobile";

export function ReadyDemo({ name, url }: { name: string; url: string }) {
  const [mode, setMode] = useState<Mode>("desktop");
  const [scale, setScale] = useState(0.75);
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== "desktop" || !canvasRef.current) return;
    const measure = () => {
      const width = canvasRef.current?.clientWidth ?? 900;
      setScale(Math.min(1, width / 1280));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [mode]);

  return (
    <div className={styles.viewer} aria-label={`Демо готового сайта ${name}`}>
      <div className={styles.toolbar}>
        <div className={styles.live}><span aria-hidden="true" /> Работающий сайт <b>{name}</b></div>
        <div className={styles.modes} role="group" aria-label="Размер экрана демо">
          <button type="button" aria-pressed={mode === "desktop"} onClick={() => {setMode("desktop");setLoaded(false);}}>
            <span aria-hidden="true">▣</span> <span className={styles.modeText}>Компьютер</span>
          </button>
          <button type="button" aria-pressed={mode === "mobile"} onClick={() => {setMode("mobile");setLoaded(false);}}>
            <span aria-hidden="true">▯</span> <span className={styles.modeText}>Телефон</span>
          </button>
        </div>
      </div>
      <div className={`${styles.frameStage} ${mode === "mobile" ? styles.phoneStage : styles.desktopStage}`}>
        <div className={styles.frameCanvas} ref={canvasRef}>
          {mode === "desktop" ? (
            <div
              className={styles.desktopPage}
              style={{ transform: `scale(${scale})` }}
            >
              <iframe
                key={`desktop-${url}`}
                src={url}
                title={`Полная десктопная версия ${name}`}
                loading="eager"
                onLoad={() => setLoaded(true)}
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : (
            <iframe
              key={`mobile-${url}`}
              className={styles.phonePage}
              src={url}
              title={`Мобильная версия ${name}`}
              loading="eager"
              onLoad={() => setLoaded(true)}
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <p>{loaded ? "Листайте и изучайте сайт внутри окна" : "Демо загружается. Если сайт не отображается, откройте его отдельно"}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">Открыть полноценное демо <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}

"use client";

import { CITY_ASSETS } from "./cityAtmospheres";
import { useCityAtmosphere } from "./CityAtmosphereProvider";
import styles from "./CityBackdrop.module.css";

/** Shared photographic stage across all NeXora pages.
 *  The legacy 'time' prop is kept for route compatibility but is intentionally
 *  ignored by the experimental city engine. Visitor-local phase wins.
 */
export type CityTime = "morning" | "day" | "sunset";
export function CityBackdrop({ time: _legacyTime }: { time?: CityTime }) {
  const { city, phase, hydrated } = useCityAtmosphere();
  const scene = CITY_ASSETS[city];

  return (
    <div className={`nx-city-backdrop ${styles.backdrop} ${styles[phase]} ${hydrated ? styles.ready : ""}`}
         data-city={city} data-phase={phase} aria-hidden="true">
      <div className={styles.dayImage} style={{backgroundImage: `url("${scene.day}")`, backgroundPosition: scene.focalDesktop }} />
      <div className={styles.nightImage} style={{backgroundImage: `url("${scene.night}")`, backgroundPosition: scene.focalDesktop }} />
      <div className={styles.light} />
      <div className={styles.vignette} />
      <style>{`@media(max-width:700px){[data-city="${city}"] .${styles.dayImage},[data-city="${city}"] .${styles.nightImage}{background-position:${scene.focalMobile}!important}}`}</style>
    </div>
  );
}

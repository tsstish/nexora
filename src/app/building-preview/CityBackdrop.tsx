"use client";

import type { CSSProperties } from "react";
import { CITY_ASSETS, type DayPhase } from "./cityAtmospheres";
import { useCityAtmosphere } from "./CityAtmosphereProvider";
import styles from "./CityBackdrop.module.css";

export type CityTime = "morning" | "day" | "sunset";
const PHASES:DayPhase[] = ["morning","day","sunset","night"];

/** One stationary panorama: 4 aligned light states + sky-masked slow clouds. */
export function CityBackdrop({ time: _legacyTime }: { time?: CityTime }) {
  const { city, phase, hydrated } = useCityAtmosphere();
  const scene = CITY_ASSETS[city];
  return (
    <div
      className={`nx-city-backdrop ${styles.backdrop} ${hydrated ? styles.ready : ""}`}
      data-city={city} data-phase={phase} aria-hidden="true"
      style={{
        "--city-pos-desktop": scene.focalDesktop,
        "--city-pos-mobile": scene.focalMobile,
      } as CSSProperties}
    >
      {PHASES.map(state => (
        <div key={state}
          className={`${styles.image} ${phase===state ? styles.imageActive : ""}`}
          style={{backgroundImage:`url("${scene[state]}")`}}
        />
      ))}
      {/* Four horizontally tiled, self-matching cirrus strips.
          The sky mask keeps every strip behind the buildings. */}
      <div className={styles.cloudMask}>
        <div className={`${styles.cloudTrack} ${styles.cloudTrackTop}`}>
          <span className={styles.cloudBand} />
          <span className={styles.cloudBand} />
        </div>
        <div className={`${styles.cloudTrack} ${styles.cloudTrackUpper}`}>
          <span className={styles.cloudBand} />
          <span className={styles.cloudBand} />
        </div>
        <div className={`${styles.cloudTrack} ${styles.cloudTrackMiddle}`}>
          <span className={styles.cloudBand} />
          <span className={styles.cloudBand} />
        </div>
        <div className={`${styles.cloudTrack} ${styles.cloudTrackLower}`}>
          <span className={styles.cloudBand} />
          <span className={styles.cloudBand} />
        </div>
      </div>
      <div className={styles.light} />
      <div className={styles.vignette} />
    </div>
  );
}

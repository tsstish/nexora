import styles from "./CityBackdrop.module.css";

export type CityTime = "morning" | "day" | "sunset";

/**
 * The same photographic frame on every top-level page.
 * Only the light treatment changes; cropping and image geometry do not.
 */
export function CityBackdrop({ time }: { time: CityTime }) {
  return (
    <div className={`nx-city-backdrop ${styles.backdrop} ${styles[time]}`} aria-hidden="true">
      <div className={styles.image} />
      <div className={styles.light} />
      <div className={styles.vignette} />
    </div>
  );
}

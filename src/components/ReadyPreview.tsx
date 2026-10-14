import type { ReadySite } from "@/data/readySites";
import styles from "@/app/ready/shop.module.css";

/** Only real live demos from readySites; no invented covers or external stock images. */
export function ReadyPreview({ site, size = "card" }: { site: ReadySite; size?: "card" | "detail" }) {
  return (
    <div className={size === "detail" ? styles.demoDetail : styles.demoCard}>
      <div className={styles.demoChrome} aria-hidden="true"><span>● ● ●</span><strong>{site.name}</strong><small>LIVE DEMO</small></div>
      <div className={styles.demoViewport}>
        <iframe
          src={site.demoUrl}
          title={"Живое превью сайта " + site.name}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}

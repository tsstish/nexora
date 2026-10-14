import Image from "next/image";
import type { ReadySite } from "@/data/readySites";
import styles from "@/app/ready/shop.module.css";

// These paths are reserved for the four ORIGINAL user-supplied screenshots.
// Do not replace them with generated previews or live iframe renderings.
const originals: Record<string, { src: string; width: number; height: number }> = {
  "dental-clinic": { src: "/ready/screenshots/mida.png", width: 2047, height: 1190 },
  "private-teacher": { src: "/ready/screenshots/lea-nord.png", width: 2048, height: 1181 },
  "brow-artist": { src: "/ready/screenshots/facet.png", width: 2048, height: 1199 },
  "media-kit": { src: "/ready/screenshots/media-kit.png", width: 2048, height: 1173 },
};

export function ReadyPreview({
  site, size = "card",
}: {
  site: ReadySite;
  size?: "card" | "detail";
}) {
  const screenshot = originals[site.slug];
  if (!screenshot) return null;
  return (
    <div className={size === "detail" ? styles.screenshotDetail : styles.screenshotCard}>
      <Image
        src={screenshot.src}
        alt={`Оригинальный скриншот демосайта ${site.name}`}
        width={screenshot.width}
        height={screenshot.height}
        sizes={size === "detail" ? "(max-width: 750px) 100vw, 65vw" : "(max-width: 680px) 100vw, (max-width: 1150px) 50vw, 25vw"}
        className={styles.screenshotImage}
        unoptimized
      />
    </div>
  );
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const alt = "NeXora — сайт, который не нужно собирать. Готовые сайты и разработка для бизнеса";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * NeXora link preview, 1200 × 630.
 * The photo and logo are the ORIGINAL assets used by the new NeXora website.
 * The logo is composited as-is (transparent PNG): no grayscale, no tint,
 * no redraw, no shadow, no glow, and no background behind the mark.
 */
export default async function OpenGraphImage() {
  const [logoSource, newYorkPhoto] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/nexora-wordmark.png")),
    readFile(join(process.cwd(), "public/cities/new-york/new-york-sunset.webp")),
  ]);

  // Resize only to fit. Resizing does not change colors or logo geometry.
  const logo = await sharp(logoSource)
    .resize(408, 143, { fit: "contain" })
    .png()
    .toBuffer();

  // Crop the ORIGINAL site's sunset image to the right-hand editorial panel.
  // No synthetic skyline, generative repaint, or recoloring.
  const skyline = await sharp(newYorkPhoto)
    .resize(600, 630, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  const typography = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- The left-hand page is the NeXora pearl brand background, not a logo box. -->
  <rect x="0" y="0" width="600" height="630" fill="#F6F3ED"/>
  <rect x="599" y="0" width="1" height="630" fill="#C4BEAF"/>
  <g fill="#13372F" font-family="DejaVu Serif, Georgia, serif" font-weight="400">
    <text x="62" y="296" font-size="53">Сайт, который</text>
    <text x="62" y="379" font-size="58">не нужно</text>
    <text x="62" y="455" font-size="58">собирать.</text>
  </g>
  <rect x="62" y="488" width="83" height="3" fill="#0F715E"/>
  <g fill="#53635F" font-family="DejaVu Sans, Arial, sans-serif" font-size="18">
    <text x="62" y="519">Выбираете концепцию —</text>
    <text x="62" y="546">мы адаптируем её под бизнес.</text>
  </g>
  <rect x="62" y="579" width="473" height="1" fill="#C7C6BE"/>
  <text x="62" y="607" fill="#0F715E" font-family="DejaVu Sans, Arial, sans-serif" font-size="14">READY MONTHLY   ·   ОТ 249 ₪ / МЕС</text>
</svg>`;

  const output = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: "#F6F3ED",
    },
  })
    .composite([
      { input: skyline, left: 600, top: 0 },
      { input: Buffer.from(typography, "utf8"), left: 0, top: 0 },
      { input: logo, left: 58, top: 70 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(output), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}

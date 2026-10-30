import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const alt = "NeXora — сайт, который не нужно собирать";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * NeXora share image: use the REAL sunset photograph from the live site's
 * source and the REAL full-color brand mark, without redrawing or filtering.
 * The city is subtle background texture, not the main subject.
 */
export default async function OpenGraphImage() {
  const [logoSource, skylineSource] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/nexora-wordmark.png")),
    readFile(join(process.cwd(), "public/cities/new-york/new-york-sunset.webp")),
  ]);

  const logo = await sharp(logoSource)
    .resize(452, 162, { fit: "contain", withoutEnlargement: true })
    .png()
    .toBuffer();

  const background = await sharp(skylineSource)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- The skyline from the real NeXora website is kept as a quiet backdrop. -->
    <linearGradient id="cityVeil" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F6F3ED" stop-opacity="0.985"/>
      <stop offset="45%" stop-color="#F6F3ED" stop-opacity="0.95"/>
      <stop offset="75%" stop-color="#F6F3ED" stop-opacity="0.87"/>
      <stop offset="100%" stop-color="#F6F3ED" stop-opacity="0.79"/>
    </linearGradient>
    <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F6F3ED" stop-opacity="0"/>
      <stop offset="100%" stop-color="#F6F3ED" stop-opacity="0.48"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#cityVeil)"/>
  <rect y="370" width="1200" height="260" fill="url(#bottomFade)"/>

  <g fill="#13372F" font-family="DejaVu Serif, Georgia, serif" font-weight="400" font-size="66">
    <text x="64" y="285">Сайт, который</text>
    <text x="64" y="369">не нужно</text>
    <text x="64" y="453">собирать.</text>
  </g>
  <rect x="66" y="479" width="65" height="3" fill="#0F715E"/>
  <g fill="#53635F" font-family="DejaVu Sans, Arial, sans-serif" font-size="19">
    <text x="66" y="523">Выбираете концепцию —</text>
    <text x="66" y="552">мы адаптируем её под бизнес.</text>
  </g>
  <rect x="66" y="581" width="1068" height="1" fill="#87928F" opacity="0.55"/>
  <text x="66" y="607" font-family="DejaVu Sans, Arial, sans-serif" font-size="15.5" font-weight="500" fill="#0F715E">READY MONTHLY   ·   ОТ 249 ₪ / МЕС</text>
  <text x="929" y="607" font-family="DejaVu Sans, Arial, sans-serif" font-size="16" fill="#13372F">nexoradesign.online</text>
</svg>`;
  const finalImage = await sharp(background)
    .composite([
      { input: Buffer.from(overlay, "utf8"), left: 0, top: 0 },
      { input: logo, left: 63, top: 36 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(finalImage), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}

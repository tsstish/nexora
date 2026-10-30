import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const alt = "NeXora — готовые сайты и разработка для бизнеса";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand assets are sourced directly from the repository.
// The actual NeXora letters, X and three spheres are never redrawn or recolored.
export default async function OpenGraphImage() {
  const [brand, skyline] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/nexora-wordmark.png")),
    readFile(join(process.cwd(), "public/cities/new-york/new-york-sunset.webp")),
  ]);

  const logoLeft = 74;
  const logoTop = 53;
  const padding = 11;
  const originalLogo = await sharp(brand)
    .resize(350, 122, { fit: "contain" })
    .png()
    .toBuffer();
  const paddedLogo = await sharp(originalLogo).extend({
    top: padding, bottom: padding, left: padding, right: padding,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).png().toBuffer();

  // A whisper of pearl below the original alpha, NOT a neon outline.
  // The graduated ambient light in the background does the real contrast work.
  const { data: mask, info } = await sharp(paddedLogo)
    .extractChannel("alpha")
    .blur(2.5)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pearlShadow = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < mask.length; i++) {
    const offset = i * 4;
    pearlShadow[offset] = 251;
    pearlShadow[offset + 1] = 246;
    pearlShadow[offset + 2] = 232;
    pearlShadow[offset + 3] = Math.round(mask[i] * 0.43);
  }
  const softUnderlay = await sharp(pearlShadow, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer();

  // Editorial composition: soft, borderless ambient light only behind the logo,
  // graceful serif headline and a restrained gold price highlight.
  const foreground = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#071f18" stop-opacity="0.98"/>
        <stop offset="36%" stop-color="#071f18" stop-opacity="0.95"/>
        <stop offset="65%" stop-color="#071f18" stop-opacity="0.64"/>
        <stop offset="100%" stop-color="#071f18" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="logoLight" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#f7efd9" stop-opacity="0.33"/>
        <stop offset="38%" stop-color="#f2e3c5" stop-opacity="0.24"/>
        <stop offset="72%" stop-color="#ebd8b8" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="#ebd8b8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="fine" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#e3ba7a"/>
        <stop offset="100%" stop-color="#e3ba7a" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <ellipse cx="258" cy="114" rx="258" ry="119" fill="url(#logoLight)"/>
    <g fill="#f9f4e9" font-family="Georgia, Liberation Serif, DejaVu Serif, serif" font-size="55" font-weight="400" letter-spacing="-0.9">
      <text x="73" y="260">Готовые сайты</text>
      <text x="73" y="327">и разработка</text>
      <text x="73" y="394">для бизнеса</text>
    </g>
    <rect x="76" y="420" width="275" height="2" fill="url(#fine)"/>
    <text x="75" y="461" font-family="DejaVu Sans, Arial, sans-serif" font-size="21" fill="#eee7d9">На кодовой базе — не конструктор</text>
    <rect x="73" y="482" width="468" height="62" rx="31" fill="#08251d" fill-opacity="0.32" stroke="#e9c38c" stroke-width="1.8"/>
    <text x="96" y="521" font-family="DejaVu Sans, Arial, sans-serif" font-size="20" fill="#f5eddf">Ready Monthly</text>
    <text x="281" y="521" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" fill="#f5eddf">от</text>
    <text x="314" y="525" font-family="Georgia, Liberation Serif, DejaVu Serif, serif" font-size="30" fill="#f2ca90">249</text>
    <text x="387" y="521" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" fill="#f5eddf">₪ / мес</text>
    <text x="78" y="590" font-family="DejaVu Sans, Arial, sans-serif" font-size="19" letter-spacing="0.5" fill="#e9c695">nexoradesign.online</text>
  </svg>`;

  const png = await sharp(skyline)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .composite([
      { input: Buffer.from(foreground), left: 0, top: 0 },
      { input: softUnderlay, left: logoLeft - padding, top: logoTop - padding },
      { input: originalLogo, left: logoLeft, top: logoTop },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=0, s-maxage=86400" },
  });
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const alt = "NeXora — готовые сайты и разработка для бизнеса";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// This image uses the actual, unmodified GitHub logo, not generated lettering.
// A PNG is generated at build time for consistent previews in messengers.
export default async function OpenGraphImage() {
  const [brand, skyline] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/nexora-wordmark.png")),
    readFile(join(process.cwd(), "public/cities/new-york/new-york-sunset.webp")),
  ]);
  const originalLogo = await sharp(brand)
    .resize(327, 115, { fit: "contain" })
    .png()
    .toBuffer();

  // Keep the actual NeXora artwork untouched. Both white layers are generated
  // solely from its alpha channel, giving the green lettering a soft white
  // shadow without adding a solid card behind the logo.
  const padding = 18;
  const logoWidth = 327;
  const logoHeight = 115;
  const paddedLogo = await sharp(originalLogo)
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const alphaToWhite = async (kind: "glow" | "outline") => {
    const mask = sharp(paddedLogo).extractChannel("alpha");
    const { data, info } = await (kind === "glow" ? mask.blur(10) : mask.dilate(3))
      .raw()
      .toBuffer({ resolveWithObject: true });
    const rgba = Buffer.alloc(info.width * info.height * 4);
    const opacity = kind === "glow" ? 0.76 : 0.76;
    for (let i = 0; i < data.length; i++) {
      const j = i * 4;
      rgba[j] = 255;
      rgba[j + 1] = 255;
      rgba[j + 2] = 255;
      rgba[j + 3] = Math.round(data[i] * opacity);
    }
    return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toBuffer();
  };
  const [whiteGlow, whiteOutline] = await Promise.all([
    alphaToWhite("glow"),
    alphaToWhite("outline"),
  ]);

  const foreground = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="shade" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#071f18" stop-opacity="0.99"/>
        <stop offset="34%" stop-color="#071f18" stop-opacity="0.97"/>
        <stop offset="65%" stop-color="#071f18" stop-opacity="0.62"/>
        <stop offset="100%" stop-color="#071f18" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="fine" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#e3ba7a"/>
        <stop offset="100%" stop-color="#e3ba7a" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <g fill="#f9f4ea" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="48" letter-spacing="-0.8">
      <text x="62" y="242">Готовые сайты</text>
      <text x="62" y="306">и разработка</text>
      <text x="62" y="370">для бизнеса</text>
    </g>
    <rect x="65" y="402" width="390" height="2" fill="url(#fine)"/>
    <text x="64" y="446" font-family="DejaVu Sans, Arial, sans-serif" font-size="22" fill="#f3eade">На кодовой базе — не конструктор</text>
    <rect x="62" y="474" width="421" height="65" rx="32.5" fill="#091e17" fill-opacity="0.42" stroke="#e8c38c" stroke-width="2"/>
    <text x="84" y="515" font-family="DejaVu Sans, Arial, sans-serif" font-size="23" fill="#f7edda">Ready Monthly от 249 ₪ / мес</text>
    <text x="65" y="588" font-family="DejaVu Sans, Arial, sans-serif" font-size="20" letter-spacing="0.6" fill="#e9c695">nexoradesign.online</text>
  </svg>`;

  const png = await sharp(skyline)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .composite([
      { input: Buffer.from(foreground), left: 0, top: 0 },
      { input: whiteGlow, left: 70 - padding, top: 40 - padding },
      { input: whiteOutline, left: 70 - padding, top: 40 - padding },
      { input: originalLogo, left: 70, top: 40 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=0, s-maxage=86400" },
  });
}

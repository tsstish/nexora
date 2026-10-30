import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const alt = "NeXora — готовые сайты и разработка для бизнеса";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand assets are sourced directly from the repository.
// The actual NeXora letters, X and three spheres are never redrawn; only grayscale is applied.
export default async function OpenGraphImage() {
  const [brand, skyline] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/nexora-wordmark.png")),
    readFile(join(process.cwd(), "public/cities/new-york/new-york-sunset.webp")),
  ]);

  const logoLeft = 70;
  const logoTop = 59;
  const padding = 10;
  const originalLogo = await sharp(brand)
    .resize(370, 130, { fit: "contain" })
    .png()
    .toBuffer();

  // The true logo contours and the three spheres are retained from GitHub.
  // Only a permitted neutral silver-grey treatment is applied, never a redraw.
  const monochromeLogo = await sharp(originalLogo)
    .grayscale()
    .normalise()
    .linear(1.04, 18)
    .sharpen(1, 1, 2)
    .tint({ r: 236, g: 236, b: 236 })
    .png()
    .toBuffer();

  const paddedLogo = await sharp(monochromeLogo).extend({
    top: padding, bottom: padding, left: padding, right: padding,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).png().toBuffer();
  const { data: mask, info } = await sharp(paddedLogo)
    .extractChannel("alpha").blur(2.2).raw()
    .toBuffer({ resolveWithObject: true });
  const shadowRgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < mask.length; i++) {
    const pos = i * 4;
    shadowRgba[pos] = 12;
    shadowRgba[pos + 1] = 22;
    shadowRgba[pos + 2] = 19;
    shadowRgba[pos + 3] = Math.round(mask[i] * 0.22);
  }
  const subtleShadow = await sharp(shadowRgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer();

  // Editorial composition: soft, borderless ambient light only behind the logo,
  // graceful serif headline and a restrained gold price highlight.
  const foreground = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#061f19" stop-opacity="1"/>
        <stop offset="42%" stop-color="#061f19" stop-opacity="0.98"/>
        <stop offset="67%" stop-color="#061f19" stop-opacity="0.74"/>
        <stop offset="100%" stop-color="#061f19" stop-opacity="0.03"/>
      </linearGradient>
      <linearGradient id="fine" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#d7b685"/>
        <stop offset="100%" stop-color="#d7b685" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <rect x="70" y="39" width="495" height="1" fill="url(#fine)" opacity="0.56"/>
    <g fill="#f3efe9" font-family="Georgia, Liberation Serif, DejaVu Serif, serif" font-size="53" font-weight="400" letter-spacing="-0.5">
      <text x="70" y="282">Готовые сайты</text>
      <text x="70" y="349">и разработка</text>
      <text x="70" y="416">для бизнеса</text>
    </g>
    <rect x="70" y="449" width="181" height="2" fill="#d7b685" opacity="0.87"/>
    <text x="70" y="487" font-family="DejaVu Sans, Arial, sans-serif" font-size="20" fill="#e6e6df">На кодовой базе — не конструктор</text>
    <rect x="70" y="545" width="1060" height="1" fill="#d2b995" opacity="0.42"/>
    <text x="70" y="578" font-family="DejaVu Sans, Arial, sans-serif" font-size="17" letter-spacing="0.3" fill="#e9cda0">READY MONTHLY   /   ОТ 249 ₪ В МЕСЯЦ</text>
    <text x="903" y="578" font-family="DejaVu Sans, Arial, sans-serif" font-size="16" fill="#eee7da">nexoradesign.online</text>
  </svg>`;

  const png = await sharp(skyline)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .composite([
      { input: Buffer.from(foreground), left: 0, top: 0 },
      { input: subtleShadow, left: logoLeft - padding + 2, top: logoTop - padding + 3 },
      { input: monochromeLogo, left: logoLeft, top: logoTop },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=0, s-maxage=86400" },
  });
}

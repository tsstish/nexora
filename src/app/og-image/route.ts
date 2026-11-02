import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-static";

const dimensions = { width: 1200, height: 630 };

/**
 * Official NeXora Open Graph image. The source photograph and original
 * NeXora wordmark are the exact existing website assets, not AI redraws.
 * Crop and overlays affect only the composition, never the brand mark.
 */
export async function GET() {
  const [logoFile, skylineFile] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/nexora-wordmark.png")),
    readFile(join(process.cwd(), "public/cities/new-york/new-york-sunset.webp")),
  ]);

  // Warm, subtle city on the left, transitioning into editorial cream on right.
  const photograph = await sharp(skylineFile)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  const originalWordmark = await sharp(logoFile)
    .resize(475, 175, { fit: "contain", withoutEnlargement: true })
    .png()
    .toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="cream" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#FBF8F0" stop-opacity="0.54"/>
        <stop offset=".26" stop-color="#FBF8F0" stop-opacity="0.66"/>
        <stop offset=".44" stop-color="#FBF8F0" stop-opacity=".91"/>
        <stop offset=".59" stop-color="#FBF8F0" stop-opacity=".99"/>
        <stop offset="1" stop-color="#FBF8F0" stop-opacity=".99"/>
      </linearGradient>
      <linearGradient id="lowerMist" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FCF9F2" stop-opacity="0"/>
        <stop offset="1" stop-color="#FCF9F2" stop-opacity=".65"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#cream)"/>
    <rect y="290" width="1200" height="340" fill="url(#lowerMist)"/>
    <g font-family="DejaVu Serif, Georgia, serif" fill="#13372F" font-weight="400">
      <text x="560" y="294" font-size="42">Профессиональный сайт,</text>
      <text x="560" y="356" font-size="42">который работает</text>
      <text x="560" y="418" font-size="42">на ваш бизнес</text>
    </g>
    <rect x="563" y="457" width="78" height="3" rx="1" fill="#BC9A4B"/>
    <text x="560" y="540" font-size="44" font-family="DejaVu Sans, Arial, sans-serif" fill="#13372F">от</text>
    <text x="645" y="540" font-size="61" font-family="DejaVu Serif, Georgia, serif" fill="#B99548">8</text>
    <text x="706" y="540" font-size="43" font-family="DejaVu Sans, Arial, sans-serif" fill="#13372F">₪ в день</text>
    <text x="560" y="583" font-size="17" font-family="DejaVu Sans, Arial, sans-serif" fill="#53635F">Подписка от 249 ₪ / мес. · Оплата помесячно</text>
  </svg>`;

  const image = await sharp(photograph)
    .composite([
      { input: Buffer.from(svg), left: 0, top: 0 },
      { input: originalWordmark, left: 560, top: 42 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(image), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}

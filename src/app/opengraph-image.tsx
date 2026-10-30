import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "NeXora — готовые сайты и разработка для бизнеса";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph card, built from the actual approved NeXora brand asset.
 * IMPORTANT: never recreate the logo in typography or image generation.
 * Read its original PNG verbatim from public/brand/nexora-wordmark.png.
 */
export default async function OpenGraphImage() {
  const [brand, panorama] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/nexora-wordmark.png")),
    readFile(join(process.cwd(), "public/cities/new-york/new-york-sunset.webp")),
  ]);
  const brandSrc = `data:image/png;base64,${brand.toString("base64")}`;
  const citySrc = `data:image/webp;base64,${panorama.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#09241c",
        color: "#f6f3ed",
      }}
    >
      {/* The exact approved New York view behind the new storefront. */}
      <img
        src={citySrc}
        alt=""
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          objectFit: "cover",
        }}
      />
      {/* Opaque left edge ensures white copy stays legible on a bright sky. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1000,
          height: 630,
          background:
            "linear-gradient(90deg, rgba(3,27,21,0.98) 0%, rgba(3,27,21,0.96) 34%, rgba(3,27,21,0.83) 59%, rgba(3,27,21,0.0) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 62,
          top: 36,
          width: 344,
          height: 132,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "11px 14px",
          border: "1px solid rgba(232,199,146,0.86)",
          borderRadius: 14,
          backgroundColor: "rgba(246,243,237,0.97)",
        }}
      >
        <img
          src={brandSrc}
          width={314}
          height={110}
          alt=""
          style={{ display: "block", objectFit: "contain" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 64,
          top: 202,
          width: 780,
          flexDirection: "column",
          gap: 1,
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: -1.5,
          lineHeight: 1.12,
          color: "#f7f1e7",
        }}
      >
        <div>Готовые сайты</div>
        <div>и разработка</div>
        <div>для бизнеса</div>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          left: 66,
          top: 411,
          fontSize: 24,
          color: "#e5e0d5",
        }}
      >
        На кодовой базе — не конструктор
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          left: 64,
          top: 470,
          padding: "13px 20px",
          borderRadius: 999,
          border: "1.5px solid #e9c28a",
          color: "#f6e9d2",
          fontSize: 23,
          backgroundColor: "rgba(1,22,17,0.25)",
        }}
      >
        Ready Monthly от 249 ₪ / мес
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          left: 67,
          top: 578,
          fontSize: 20,
          letterSpacing: 0.5,
          color: "#eacaa1",
        }}
      >
        nexoradesign.online
      </div>
    </div>,
    size,
  );
}

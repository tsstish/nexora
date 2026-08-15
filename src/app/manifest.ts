import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NeXora — Digital Presence Design",
    short_name: "NeXora",
    description: "Сайты, цифровые продукты и брендинг для бизнеса.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ed",
    theme_color: "#0f715e",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  };
}

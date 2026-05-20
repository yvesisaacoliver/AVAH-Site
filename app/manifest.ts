import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Instituto Avah",
    description:
      "Free, open-source AAC for non-verbal children. Privacy-first. Offline. RTL-native.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F6EFE4",
    theme_color: "#F6EFE4",
    orientation: "portrait",
    lang: "en",
    dir: "ltr",
    categories: ["education", "health", "lifestyle"],
    id: SITE_ORIGIN,
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

import type { MetadataRoute } from "next";
import { buildLocalizedUrl, SITE_PATHS, type SitePath } from "@/lib/site";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITE_PATHS.flatMap((path) => {
    return routing.locales.map((locale) => {
      const url = buildLocalizedUrl(locale, path as SitePath);
      const languages: Record<string, string> = {};
      for (const inner of routing.locales) {
        languages[inner] = buildLocalizedUrl(inner, path as SitePath);
      }
      languages["x-default"] = buildLocalizedUrl(routing.defaultLocale, path as SitePath);

      return {
        url,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: path === "/" ? 1.0 : 0.7,
        alternates: { languages },
      };
    });
  });
}

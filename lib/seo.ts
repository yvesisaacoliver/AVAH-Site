import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import {
  buildCanonical,
  buildHreflangAlternates,
  SITE_NAME,
  type SitePath,
} from "@/lib/site";

type PageMetaInput = {
  locale: string;
  path: SitePath;
  /** Translation namespace key for the page title (e.g. "nav.about"). */
  title: string;
  /** Translation namespace key for the page description (optional). */
  description?: string;
};

/**
 * Build per-page Metadata with canonical URL, hreflang alternates, and
 * Open Graph URL aligned with this locale's path. Falls back to org
 * defaults from the layout for any field not set here.
 */
export async function pageMetadata({
  locale,
  path,
  title: titleKey,
  description: descriptionKey,
}: PageMetaInput): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale });
  const title = t(titleKey);
  const description = descriptionKey ? t(descriptionKey) : undefined;
  const canonical = buildCanonical(typedLocale, path);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildHreflangAlternates(path),
    },
    openGraph: {
      title: `${title}, ${SITE_NAME}`,
      description,
      url: canonical,
      locale,
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${title}, ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}, ${SITE_NAME}`,
      description,
      images: ["/og.png"],
    },
  };
}

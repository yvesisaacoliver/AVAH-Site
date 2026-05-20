import { routing, type Locale } from "@/i18n/routing";

export const SITE_ORIGIN = "https://kinderhorizon.org";
export const SITE_NAME = "Instituto Avah";
export const SITE_LEGAL_NAME = "Instituto Avah";
export const SITE_INCORPORATION = "S0085100";
export const SITE_BUSINESS_NUMBER = "72195 3636 BC0001";
export const SITE_INCORPORATED_ON = "2026-04-17";
export const SITE_REGISTERED_OFFICE = "Langford, British Columbia, Canada";

export const SITE_PATHS = ["/", "/about", "/donate", "/download", "/privacy"] as const;
export type SitePath = (typeof SITE_PATHS)[number];

/**
 * Build a public URL for a given locale and path.
 *
 * The default locale ("en") is unprefixed, matching next-intl's
 * `localePrefix: "as-needed"` configuration. Other locales are prefixed.
 */
export function buildLocalizedUrl(locale: Locale, path: SitePath): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const normalized = path === "/" ? "" : path;
  return `${SITE_ORIGIN}${prefix}${normalized}`;
}

/**
 * Generate hreflang alternates for a given path across every supported locale,
 * plus an `x-default` pointing at the default locale.
 *
 * Returned shape matches Next.js Metadata's `alternates.languages`.
 */
export function buildHreflangAlternates(path: SitePath): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of routing.locales) {
    alternates[locale] = buildLocalizedUrl(locale, path);
  }
  alternates["x-default"] = buildLocalizedUrl(routing.defaultLocale, path);
  return alternates;
}

export function buildCanonical(locale: Locale, path: SitePath): string {
  return buildLocalizedUrl(locale, path);
}

import { defineRouting } from "next-intl/routing";

// Locales use BCP 47 codes. Regional variants (fr-CA, pt-BR, zh-Hans) are
// chosen deliberately so hreflang signals reach the right Google indexes
// (Canadian French audience, Brazilian Portuguese audience, Simplified
// Chinese script).
//
// Farsi (fa) was originally part of the public locale set but was removed
// on 2026-04-25 because we did not yet have real translations for it. The
// font infrastructure (Vazirmatn) and the message file scaffolding are
// preserved and dormant; re-add "fa" to `locales` and to `RTL_LOCALES`
// when professional Farsi translations land.
export const routing = defineRouting({
  locales: ["en", "es", "pt-BR"] as const,
  defaultLocale: "pt-BR",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const RTL_LOCALES: ReadonlyArray<Locale> = [];

export function isRtlLocale(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}

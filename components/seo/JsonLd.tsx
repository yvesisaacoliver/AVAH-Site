import {
  SITE_BUSINESS_NUMBER,
  SITE_INCORPORATED_ON,
  SITE_INCORPORATION,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_REGISTERED_OFFICE,
} from "@/lib/site";

type SchemaPayload = Record<string, unknown>;

/**
 * Renders a JSON-LD <script> tag with the given schema payload.
 * Server-rendered so it appears in the initial HTML for crawlers.
 */
export function JsonLd({ data, id }: { data: SchemaPayload | SchemaPayload[]; id?: string }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Combined Organization + NonprofitOrganization schema for KHF.
 * Rendered on every page via the root layout so search engines see
 * authoritative org metadata at every entry point.
 */
export function organizationSchema(): SchemaPayload {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "NonprofitOrganization"],
    "@id": `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    alternateName: "KHF",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/icon.png`,
    image: `${SITE_ORIGIN}/icon.png`,
    description:
      "Kinder Horizon Foundation builds Lighthouse AAC, a free, open-source, privacy-first augmentative communication app for non-verbal children.",
    foundingDate: SITE_INCORPORATED_ON,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Langford",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "seyed@kinderhorizon.org",
        contactType: "general",
        availableLanguage: ["en", "ar", "es", "fr-CA", "de", "pt-BR", "zh-Hans"],
      },
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "BC Society Incorporation",
        value: SITE_INCORPORATION,
      },
      {
        "@type": "PropertyValue",
        propertyID: "Canada Business Number",
        value: SITE_BUSINESS_NUMBER,
      },
    ],
    areaServed: "Worldwide",
    knowsLanguage: ["en", "ar", "es", "fr-CA", "de", "pt-BR", "zh-Hans"],
    sameAs: ["https://github.com/kinderhorizon"],
    founder: [
      {
        "@type": "Person",
        name: "Dr. Seyed Mohammad Javadi",
        jobTitle: "CEO + Co-Founder",
        email: "seyed@kinderhorizon.org",
      },
      {
        "@type": "Person",
        name: "Maryam Aliyar",
        jobTitle: "BCBA, Co-Founder + Clinical Lead",
        email: "maryam@kinderhorizon.org",
      },
    ],
    location: {
      "@type": "Place",
      address: SITE_REGISTERED_OFFICE,
    },
  };
}

/**
 * WebSite schema, lightweight. SearchAction is stubbed and can be
 * activated when on-site search lands.
 */
export function websiteSchema(): SchemaPayload {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    inLanguage: ["en", "ar", "es", "fr-CA", "de", "pt-BR", "zh-Hans"],
  };
}

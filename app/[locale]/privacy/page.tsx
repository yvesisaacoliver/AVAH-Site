import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowSquareOut, EnvelopeSimple, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

type ProviderEntry = {
  name: string;
  role: string;
  policyUrl: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/privacy",
    title: "seo.privacyTitle",
    description: "seo.privacyDescription",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  const explicitItems = t.raw("collect.explicitItems") as string[];
  const providers = t.raw("providers.items") as ProviderEntry[];

  return (
    <>
      <section className="kh-section kh-privacy-hero">
        <div className="container-kh kh-privacy-prose">
          <div className="kh-section-head" style={{ marginBottom: 24 }}>
            <div className="eyebrow">{t("hero.eyebrow")}</div>
            <h1 className="h-display kh-privacy-headline">{t("hero.headline")}</h1>
          </div>
          <p className="lede">{t("hero.lede")}</p>
          <p className="kh-privacy-updated">
            <span className="eyebrow kh-privacy-updated-label">{t("lastUpdatedLabel")}</span>
            <span className="kh-privacy-updated-value">{t("lastUpdatedValue")}</span>
          </p>
        </div>
      </section>

      <section className="kh-section kh-privacy-section">
        <div className="container-kh kh-privacy-prose">
          <h2 className="h2">{t("collect.heading")}</h2>
          <p>{t("collect.body")}</p>
          <p className="kh-privacy-explicit-intro">{t("collect.explicitIntro")}</p>
          <ul className="kh-privacy-list">
            {explicitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="kh-privacy-aside">
            <span className="kh-privacy-aside-icon" aria-hidden>
              <ShieldCheck weight="regular" size={20} />
            </span>
            <p>{t("collect.gclidNote")}</p>
          </div>
          <div className="kh-privacy-aside">
            <span className="kh-privacy-aside-icon" aria-hidden>
              <ShieldCheck weight="regular" size={20} />
            </span>
            <p>{t("collect.firstPartyAnalyticsNote")}</p>
          </div>
        </div>
      </section>

      <section className="kh-section kh-privacy-section kh-privacy-section-paper">
        <div className="container-kh kh-privacy-prose">
          <h2 className="h2">{t("providers.heading")}</h2>
          <p>{t("providers.intro")}</p>
          <ul className="kh-privacy-providers">
            {providers.map((provider) => (
              <li key={provider.name}>
                <div className="kh-privacy-provider-name">{provider.name}</div>
                <p>{provider.role}</p>
                <a
                  href={provider.policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kh-privacy-provider-link"
                >
                  <span>Privacy policy</span>
                  <ArrowSquareOut weight="regular" size={14} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="kh-section kh-privacy-section">
        <div className="container-kh kh-privacy-prose">
          <h2 className="h2">{t("children.heading")}</h2>
          <p>{t("children.body")}</p>
        </div>
      </section>

      <section className="kh-section kh-privacy-section kh-privacy-section-paper">
        <div className="container-kh kh-privacy-prose">
          <h2 className="h2">{t("contact.heading")}</h2>
          <p>{t("contact.body")}</p>
          <a
            className="btn btn-primary btn-lg"
            href="mailto:seyed@kinderhorizon.org?subject=Privacy%20question"
          >
            <EnvelopeSimple weight="regular" size={18} aria-hidden />
            <span>{t("contact.cta")}</span>
          </a>
        </div>
      </section>
    </>
  );
}

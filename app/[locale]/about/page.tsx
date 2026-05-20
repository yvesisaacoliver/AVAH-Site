import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/about",
    title: "seo.aboutTitle",
    description: "seo.aboutDescription",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tHome = await getTranslations("home.leadership");

  const governanceFacts = [
    { label: t("governance.incorporationLabel"), value: t("governance.incorporationValue") },
    { label: t("governance.businessNumberLabel"), value: t("governance.businessNumberValue") },
    { label: t("governance.establishedLabel"), value: t("governance.establishedValue") },
    { label: t("governance.registeredOfficeLabel"), value: t("governance.registeredOfficeValue") },
  ];

  return (
    <>
      <section className="kh-section kh-about-hero" style={{ paddingBlockStart: "var(--s-7)", paddingBlockEnd: "var(--s-5)" }}>
        <div className="container-kh">
          <div className="kh-section-head" style={{ marginBottom: 0 }}>
            <h1 className="h-display kh-about-headline">{t("hero.headline")}</h1>
          </div>
        </div>
      </section>

      <section className="kh-section kh-about-story">
        <div className="container-kh kh-about-prose">
          <h2 className="h2">{t("story.heading")}</h2>
          <p>{t("story.p1")}</p>
          <p>{t("story.p2")}</p>
          <p>{t("story.p3")}</p>
          <p>{t("story.p4")}</p>
          <p>{t("story.p5")}</p>
        </div>
      </section>

      <section className="kh-section kh-about-team">
        <div className="container-kh">
          <h2 className="h2 kh-about-section-heading">{t("team.heading")}</h2>
          <ul className="kh-founders">
            <li className="kh-founder">
              <div className="kh-founder-photo">
                <img
                  src="/images/team/ana-600.jpg"
                  alt={tHome("founderOneName")}
                  width={600}
                  height={600}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "80% 65%", display: "block" }}
                />
              </div>
              <div className="kh-founder-body">
                <div className="kh-founder-name">{tHome("founderOneName")}</div>
                <div className="kh-founder-title">{tHome("founderOneTitle")}</div>
                <p className="kh-founder-bio">{tHome("founderOneBio")}</p>
                <a className="kh-founder-email" href={`mailto:${tHome("founderOneEmail")}`}>
                  <EnvelopeSimpleIcon weight="regular" size={16} aria-hidden />
                  <span>{tHome("founderOneEmail")}</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="kh-section kh-about-governance">
        <div className="container-kh">
          <div className="kh-governance-grid">
            <div>
              <h2 className="h2 kh-about-section-heading">{t("governance.heading")}</h2>
              <p style={{ maxWidth: "52ch", color: "var(--color-ink-soft)" }}>
                {t("governance.body")}
              </p>
            </div>
            <dl className="kh-governance-facts">
              {governanceFacts.map((fact) => (
                <div key={fact.label} className="kh-governance-row">
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="kh-section kh-about-involved">
        <div className="container-kh kh-about-prose">
          <h2 className="h2">{t("involved.heading")}</h2>
          <p>{t("involved.body")}</p>
          <a
            className="btn btn-primary btn-lg"
            href="mailto:seyed@kinderhorizon.org?subject=Lighthouse%20AAC%20interest"
          >
            <EnvelopeSimpleIcon weight="regular" size={18} aria-hidden />
            <span>{t("involved.cta")}</span>
          </a>
        </div>
      </section>
    </>
  );
}

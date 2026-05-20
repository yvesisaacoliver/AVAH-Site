import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DonatePanel } from "@/components/donate/DonatePanel";
import { PixAlertBanner } from "@/components/donate/PixAlertBanner";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

const DONATIONS_COMING_SOON = true;
const PIX_ONLY = true;
const PIX_KEY = "6111722@vakinha.com.br";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/donate",
    title: "seo.donateTitle",
    description: "seo.donateDescription",
  });
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("donate");

  return (
    <section className="kh-donate-section">
      <div className="kh-donate-container">
        <div className="kh-donate-top">
          <div className="eyebrow">{t("section.eyebrow")}</div>
          <h1 className="kh-donate-section-title">{t("section.title")}</h1>
          <p className="kh-donate-section-sub">{t("section.subtitle")}</p>
        </div>

        <PixAlertBanner pixKey={PIX_KEY} />

        <div className="kh-donate-grid">
          <DonatePanel comingSoon={DONATIONS_COMING_SOON} pixKey={PIX_KEY} pixOnly={PIX_ONLY} />

          <aside className="kh-trust-panel">
            <div className="kh-trust-why">
              <h2 className="kh-trust-heading">{t("trust.heading")}</h2>
              <ul className="kh-trust-bullets">
                <li>{t("trust.bullet1")}</li>
                <li>{t("trust.bullet2")}</li>
                <li>{t("trust.bullet3")}</li>
              </ul>
            </div>
            <div className="kh-trust-contact">
              <p className="kh-trust-contact-label">{t("trust.contactHeading")}</p>
              <a
                href={`mailto:${t("trust.contactEmail")}`}
                className="kh-trust-contact-email"
              >
                {t("trust.contactEmail")}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

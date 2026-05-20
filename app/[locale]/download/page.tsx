import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  AndroidLogo,
  AppleLogo,
  Bluetooth,
  DownloadSimple,
  EnvelopeSimple,
  FloppyDisk,
  GithubLogo,
  GooglePlayLogo,
  Package,
  ShieldCheck,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/seo";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ size?: number | string; weight?: "regular"; "aria-hidden"?: boolean }>;
type Channel = { name: string; platform: string };

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/download",
    title: "seo.downloadTitle",
    description: "seo.downloadDescription",
  });
}

const TIER_ICONS: Record<string, IconComponent[]> = {
  tier1: [AppleLogo, GooglePlayLogo],
  tier2: [DownloadSimple, AndroidLogo, GithubLogo],
  tier3: [Bluetooth, WifiHigh],
};

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("download");

  const tiers = (["tier1", "tier2", "tier3"] as const).map((key) => ({
    key,
    label: t(`${key}.label`),
    subLabel: t(`${key}.subLabel`),
    heading: t(`${key}.heading`),
    body: t(`${key}.body`),
    channels: t.raw(`${key}.channels`) as Channel[],
    icons: TIER_ICONS[key],
  }));

  return (
    <>
      <section className="kh-section kh-download-hero">
        <div className="container-kh kh-download-prose">
          <div className="kh-section-head" style={{ marginBottom: 24 }}>
            <div className="eyebrow">{t("hero.eyebrow")}</div>
            <h1 className="h-display kh-download-headline">{t("hero.headline")}</h1>
          </div>
          <p className="lede">{t("hero.sub")}</p>
          <div className="kh-download-ctas">
            <a
              href="mailto:seyed@kinderhorizon.org?subject=Notify%20me%20when%20Lighthouse%20AAC%20is%20ready"
              className="btn btn-primary btn-lg"
            >
              <EnvelopeSimple weight="regular" size={18} aria-hidden />
              <span>{t("hero.notifyCta")}</span>
            </a>
            <a
              href="https://github.com/kinderhorizon"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              <GithubLogo weight="regular" size={18} aria-hidden />
              <span>{t("hero.githubCta")}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="kh-section kh-download-tiers">
        <div className="container-kh">
          <div className="kh-section-head" style={{ marginBottom: 48 }}>
            <h2 className="h1">{t("tiers.heading")}</h2>
            <p className="lede" style={{ marginTop: 12, maxWidth: 720 }}>
              {t("tiers.lede")}
            </p>
          </div>
          <ol className="kh-tiers">
            {tiers.map((tier) => (
              <li key={tier.key} className="kh-tier">
                <div className="kh-tier-meta">
                  <span className="kh-tier-label">{tier.label}</span>
                  <span className="kh-tier-sub">{tier.subLabel}</span>
                </div>
                <div className="kh-tier-content">
                  <h3 className="h3">{tier.heading}</h3>
                  <p>{tier.body}</p>
                  <ul className="kh-tier-channels">
                    {tier.channels.map((channel, index) => {
                      const Icon = tier.icons?.[index] ?? Package;
                      return (
                        <li key={channel.name}>
                          <span className="kh-tier-channel-icon" aria-hidden>
                            <Icon weight="regular" size={20} />
                          </span>
                          <div>
                            <div className="kh-tier-channel-name">{channel.name}</div>
                            <div className="kh-tier-channel-platform">{channel.platform}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="kh-section kh-download-verification">
        <div className="container-kh">
          <div className="kh-verification-grid">
            <div>
              <h2 className="h2 kh-about-section-heading">{t("verification.heading")}</h2>
              <p style={{ maxWidth: "52ch", color: "var(--color-ink-soft)" }}>
                {t("verification.body")}
              </p>
            </div>
            <dl className="kh-verification-facts">
              <div className="kh-verification-row">
                <dt>
                  <ShieldCheck weight="regular" size={14} aria-hidden />
                  <span>{t("verification.shaLabel")}</span>
                </dt>
                <dd>{t("verification.shaPlaceholder")}</dd>
              </div>
              <div className="kh-verification-row">
                <dt>
                  <FloppyDisk weight="regular" size={14} aria-hidden />
                  <span>{t("verification.signingKeyLabel")}</span>
                </dt>
                <dd>{t("verification.signingKeyPlaceholder")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="kh-section kh-download-opensource">
        <div className="container-kh kh-download-prose">
          <h2 className="h2 kh-about-section-heading">{t("openSource.heading")}</h2>
          <p>{t("openSource.body")}</p>
          <div className="kh-download-ctas">
            <a
              href="https://github.com/kinderhorizon"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <GithubLogo weight="regular" size={18} aria-hidden />
              <span>{t("openSource.githubCta")}</span>
            </a>
            <a
              href="https://github.com/kinderhorizon"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              <Package weight="regular" size={18} aria-hidden />
              <span>{t("openSource.issuesCta")}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

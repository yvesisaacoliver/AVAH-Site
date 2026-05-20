import { useTranslations } from "next-intl";
import { ArrowDown, Heart } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="kh-hero">
      <div className="container-kh">
        <div className="kh-hero-grid">
          <div className="kh-hero-text">
            <h1 className="h-display kh-hero-headline">
              <span className="kh-hero-word">{t("headline")}</span>
              <span className="kh-hero-word">{t("headlineEmph")}</span>
              <span className="kh-hero-word">{t("headlineLine3")}</span>
            </h1>
            <div className="kh-hero-ctas">
              <a href="https://www.vakinha.com.br/vaquinha/doe-avah" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <Heart weight="regular" size={18} aria-hidden />
                <span>{t("primaryCta")}</span>
              </a>
              <a href="#solution" className="btn btn-ghost btn-lg">
                <span>{t("secondaryCta")}</span>
                <ArrowDown weight="regular" size={18} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useTranslations } from "next-intl";
import { Clock, Cpu, MapPin } from "@phosphor-icons/react/dist/ssr";
import { PhotoCarousel } from "./PhotoCarousel";

export function Solution() {
  const t = useTranslations("home.solution");

  return (
    <section id="solution" className="kh-section kh-solution">
      <div className="container-kh">
        <div className="kh-solution-head">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="kh-solution-h">{t("headline")}</h2>
          <p className="lede">{t("lede")}</p>
        </div>
        <div className="kh-solution-demo">
          <div className="kh-solution-grid-wrap">
            <div className="kh-solution-tablet">
              <PhotoCarousel />
            </div>
          </div>
          <ul className="kh-glow-legend">
            <li>
              <span className="kh-legend-dot" aria-hidden />
              <span><strong>{t("legendGlowingLabel")}</strong> {t("legendGlowingItems")}</span>
            </li>
            <li>
              <span className="kh-legend-icon" aria-hidden>
                <Clock weight="regular" size={16} />
              </span>
              {t("legendTime")}
            </li>
            <li>
              <span className="kh-legend-icon" aria-hidden>
                <MapPin weight="regular" size={16} />
              </span>
              {t("legendLocation")}
            </li>
            <li>
              <span className="kh-legend-icon" aria-hidden>
                <Cpu weight="regular" size={16} />
              </span>
              {t("legendPrivacy")}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

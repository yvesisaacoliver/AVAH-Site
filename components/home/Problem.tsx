import { useTranslations } from "next-intl";

export function Problem() {
  const t = useTranslations("home.problem");

  const pillars = [
    { label: t("pillarOneLabel"), heading: t("pillarOneHeading"), body: t("pillarOneBody") },
    { label: t("pillarTwoLabel"), heading: t("pillarTwoHeading"), body: t("pillarTwoBody") },
    { label: t("pillarThreeLabel"), heading: t("pillarThreeHeading"), body: t("pillarThreeBody") },
  ];

  return (
    <section className="kh-section kh-problem">
      <div className="container-kh">
        <div className="kh-section-head">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="h1">{t("headline")}</h2>
        </div>
        <div className="kh-pillars">
          {pillars.map((pillar) => (
            <article key={pillar.heading} className="kh-pillar">
              <div className="kh-pillar-num">{pillar.label}</div>
              <h3 className="h3">{pillar.heading}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

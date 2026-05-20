import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type Status = "done" | "current" | "pending";

export function Roadmap() {
  const t = useTranslations("home.roadmap");

  const steps: Array<{ month: string; title: string; status: Status }> = [
    { month: t("stepZeroMonth"), title: t("stepZeroTitle"), status: "done" },
    { month: t("stepOneMonth"), title: t("stepOneTitle"), status: "done" },
    { month: t("stepTwoMonth"), title: t("stepTwoTitle"), status: "current" },
    { month: t("stepThreeMonth"), title: t("stepThreeTitle"), status: "pending" },
    { month: t("stepFourMonth"), title: t("stepFourTitle"), status: "pending" },
    { month: t("stepFiveMonth"), title: t("stepFiveTitle"), status: "pending" },
  ];

  return (
    <section className="kh-section kh-roadmap">
      <div className="container-kh">
        <div className="kh-section-head">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="h2">{t("headline")}</h2>
        </div>
        <ol className="kh-timeline">
          {steps.map((step) => (
            <li
              key={step.month}
              className={cn(
                "kh-step",
                step.status === "done" && "is-done",
                step.status === "current" && "is-current",
              )}
            >
              <div className="kh-step-marker"><span /></div>
              <div className="kh-step-content">
                <div className="kh-step-month">{step.month}</div>
                <div className="kh-step-title">{step.title}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

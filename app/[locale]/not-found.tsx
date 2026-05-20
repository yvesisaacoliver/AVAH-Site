import { useTranslations } from "next-intl";
import { ArrowRight, Heart } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/Logo";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="kh-section kh-not-found">
      <div className="container-kh kh-not-found-prose">
        <Logo size={88} className="kh-not-found-mark" />
        <div className="eyebrow kh-not-found-eyebrow">{t("eyebrow")}</div>
        <h1 className="h-display kh-not-found-headline">{t("headline")}</h1>
        <p className="kh-not-found-body">{t("body")}</p>
        <div className="kh-not-found-ctas">
          <Link href="/" className="btn btn-primary btn-lg">
            <ArrowRight weight="regular" size={18} aria-hidden />
            <span>{t("homeCta")}</span>
          </Link>
          <Link href="/donate" className="btn btn-ghost btn-lg">
            <Heart weight="regular" size={18} aria-hidden />
            <span>{t("donateCta")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

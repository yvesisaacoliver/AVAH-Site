import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations();
  const tFooter = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="kh-footer">
      <div className="container-kh">
        <div className="kh-footer-grid">
          <div className="kh-footer-brand">
            <Logo size={48} decorative />
            <p className="kh-footer-tag">{tFooter("tagline")}</p>
          </div>
          <div>
            <div className="eyebrow kh-footer-eyebrow">{tFooter("foundationLabel")}</div>
            <ul className="kh-footer-links">
              <li><Link href="/about">{t("nav.about")}</Link></li>
              <li><Link href="/donate">{t("nav.donateNav")}</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow kh-footer-eyebrow">{tFooter("buildLabel")}</div>
            <ul className="kh-footer-links">
              <li>
                <a href="mailto:InstitutoAvah@outlook.com">Email: InstitutoAvah@outlook.com</a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/avah_instituto?igsh=eHVxdnRhdnVvcjBi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Siga nosso Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@avahinstituto?_r=1&_t=ZS-96Ar5jIp15p"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Siga nosso TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="kh-footer-bottom">
          <span>{tFooter("copyright", { year: currentYear })}</span>
          <span>{tFooter("license")}</span>
        </div>
      </div>
    </footer>
  );
}

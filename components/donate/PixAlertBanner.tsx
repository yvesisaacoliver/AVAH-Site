"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Warning, Copy, Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export function PixAlertBanner({ pixKey }: { pixKey: string }) {
  const t = useTranslations("donate.pixAlert");
  const [copied, setCopied] = useState(false);

  function copyKey() {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="kh-pix-alert-banner">
      <div className="kh-pix-alert-header">
        <Warning weight="fill" size={22} className="kh-pix-alert-icon" aria-hidden />
        <h2 className="kh-pix-alert-title">{t("title")}</h2>
      </div>

      <p className="kh-pix-alert-body">{t("body")}</p>

      <div className="kh-pix-alert-key-section">
        <span className="kh-pix-alert-key-label">{t("keyLabel")}</span>
        <div className="kh-pix-alert-key-row">
          <code className="kh-pix-alert-key-value">{pixKey}</code>
          <button
            type="button"
            className={cn("btn btn-primary kh-pix-alert-copy-btn", copied && "is-success")}
            onClick={copyKey}
            aria-live="polite"
            aria-label={copied ? t("copiedBtn") : t("copyBtn")}
          >
            {copied
              ? <Check weight="bold" size={15} aria-hidden />
              : <Copy weight="regular" size={15} aria-hidden />
            }
            <span>{copied ? t("copiedBtn") : t("copyBtn")}</span>
          </button>
        </div>
      </div>

      <p className="kh-pix-alert-footer">{t("footer")}</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type TabId = "pix" | "card" | "monthly";

const CARD_AMOUNTS = [20, 50, 100, 250] as const;
const MONTHLY_AMOUNTS = [15, 30, 50, 100] as const;

export function DonatePanel({
  comingSoon,
  pixKey,
  pixOnly = false,
}: {
  comingSoon: boolean;
  pixKey: string;
  pixOnly?: boolean;
}) {
  const t = useTranslations("donate");
  const [activeTab, setActiveTab] = useState<TabId>("pix");
  const [copied, setCopied] = useState(false);

  const [cardAmt, setCardAmt] = useState<number | null>(50);
  const [cardCustom, setCardCustom] = useState(false);
  const [cardCustomVal, setCardCustomVal] = useState("");

  const [moAmt, setMoAmt] = useState<number | null>(30);
  const [moCustom, setMoCustom] = useState(false);
  const [moCustomVal, setMoCustomVal] = useState("");

  function copyKey() {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const TABS: { id: TabId; label: string; disabled: boolean }[] = [
    { id: "pix", label: t("tabs.pix"), disabled: false },
    { id: "card", label: t("tabs.card"), disabled: pixOnly },
    { id: "monthly", label: t("tabs.monthly"), disabled: pixOnly },
  ];

  return (
    <div className="kh-donate-panel">
      <div className="kh-tab-bar" role="tablist" aria-label="Método de doação">
        {TABS.map(({ id, label, disabled }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            aria-disabled={disabled}
            className={cn("kh-tab-btn", activeTab === id && "is-active", disabled && "is-disabled")}
            onClick={disabled ? undefined : () => setActiveTab(id)}
          >
            <span>{label}</span>
            {disabled && <span className="kh-tab-soon">{t("tabs.soon")}</span>}
          </button>
        ))}
      </div>

      {activeTab === "pix" && (
        <div className="kh-tab-pane">
          <h3 className="kh-pane-title">{t("pix.title")}</h3>
          <p className="kh-pane-sub">{t("pix.sub")}</p>

          <div className="kh-pix-key-block">
            <span className="kh-pix-key-label">{t("pix.keyLabel")}</span>
            <div className="kh-pix-key-row">
              <code className="kh-pix-key-value">{pixKey}</code>
              <button
                type="button"
                className={cn("kh-pix-copy-btn", copied && "is-copied")}
                onClick={copyKey}
                aria-label={copied ? t("pix.copiedLabel") : t("pix.copyLabel")}
              >
                {copied
                  ? <Check weight="bold" size={14} aria-hidden />
                  : <Copy weight="regular" size={14} aria-hidden />
                }
                <span>{copied ? t("pix.copiedLabel") : t("pix.copyLabel")}</span>
              </button>
            </div>
          </div>

          <ol className="kh-pix-steps" aria-label={t("pix.stepsLabel")}>
            <li className="kh-pix-step">
              <span className="kh-step-num" aria-hidden>1</span>
              <span>{t("pix.step1")}</span>
            </li>
            <li className="kh-pix-step">
              <span className="kh-step-num" aria-hidden>2</span>
              <span>{t("pix.step2")}</span>
            </li>
            <li className="kh-pix-step">
              <span className="kh-step-num" aria-hidden>3</span>
              <span>{t("pix.step3")}</span>
            </li>
          </ol>

          <button
            type="button"
            className={cn("btn btn-primary kh-pane-cta", copied && "is-success")}
            onClick={copyKey}
          >
            {copied
              ? <Check weight="bold" size={16} aria-hidden />
              : <Copy weight="regular" size={16} aria-hidden />
            }
            <span>{copied ? t("pix.copiedLabel") : t("pix.cta")}</span>
          </button>
        </div>
      )}

      {activeTab === "card" && (
        <div className="kh-tab-pane">
          <h3 className="kh-pane-title">{t("card.title")}</h3>

          <div className="kh-amount-grid" role="radiogroup" aria-label={t("card.amountLabel")}>
            {CARD_AMOUNTS.map((v) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={!cardCustom && cardAmt === v}
                className={cn("kh-amount-chip", !cardCustom && cardAmt === v && "is-selected")}
                onClick={() => { setCardAmt(v); setCardCustom(false); setCardCustomVal(""); }}
              >
                R${v}
              </button>
            ))}
            <button
              type="button"
              role="radio"
              aria-checked={cardCustom}
              className={cn("kh-amount-chip kh-amount-chip-other", cardCustom && "is-selected")}
              onClick={() => { setCardCustom(true); setCardAmt(null); }}
            >
              {t("card.customLabel")}
            </button>
          </div>

          {cardCustom && (
            <div className="kh-custom-block">
              <div className="kh-custom-wrap">
                <span className="kh-custom-prefix">R$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={5}
                  className="kh-custom-input"
                  placeholder={t("card.customPlaceholder")}
                  value={cardCustomVal}
                  onChange={(e) => setCardCustomVal(e.target.value)}
                  aria-label={t("card.customInputAriaLabel")}
                />
              </div>
              {cardCustomVal && Number(cardCustomVal) < 5 && (
                <p className="kh-validation is-error">{t("card.errInvalid")}</p>
              )}
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary kh-pane-cta"
            disabled={comingSoon}
            aria-disabled={comingSoon}
          >
            {comingSoon ? t("card.ctaDisabled") : t("card.cta")}
          </button>

          {comingSoon && <p className="kh-pane-note">{t("card.comingSoonNote")}</p>}
        </div>
      )}

      {activeTab === "monthly" && (
        <div className="kh-tab-pane">
          <h3 className="kh-pane-title">{t("monthly.title")}</h3>

          <div className="kh-amount-grid" role="radiogroup" aria-label={t("monthly.amountLabel")}>
            {MONTHLY_AMOUNTS.map((v) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={!moCustom && moAmt === v}
                className={cn("kh-amount-chip", !moCustom && moAmt === v && "is-selected")}
                onClick={() => { setMoAmt(v); setMoCustom(false); setMoCustomVal(""); }}
              >
                R${v}/mês
              </button>
            ))}
            <button
              type="button"
              role="radio"
              aria-checked={moCustom}
              className={cn("kh-amount-chip kh-amount-chip-other", moCustom && "is-selected")}
              onClick={() => { setMoCustom(true); setMoAmt(null); }}
            >
              {t("monthly.customLabel")}
            </button>
          </div>

          {moCustom && (
            <div className="kh-custom-block">
              <div className="kh-custom-wrap">
                <span className="kh-custom-prefix">R$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={5}
                  className="kh-custom-input"
                  placeholder={t("monthly.customPlaceholder")}
                  value={moCustomVal}
                  onChange={(e) => setMoCustomVal(e.target.value)}
                  aria-label={t("monthly.customInputAriaLabel")}
                />
              </div>
              {moCustomVal && Number(moCustomVal) < 5 && (
                <p className="kh-validation is-error">{t("monthly.errInvalid")}</p>
              )}
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary kh-pane-cta"
            disabled={comingSoon}
            aria-disabled={comingSoon}
          >
            {comingSoon ? t("monthly.ctaDisabled") : t("monthly.cta")}
          </button>

          <p className="kh-pane-note">{t("monthly.note")}</p>
        </div>
      )}
    </div>
  );
}

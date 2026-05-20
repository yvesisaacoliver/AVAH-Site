"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CaretDown, Globe } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const optionDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  es: "ltr",
  "pt-BR": "ltr",
};

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const locales = routing.locales as readonly Locale[];

  useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // When the menu opens, focus the option that activeIndex points at.
  // Setting activeIndex itself happens in the openers below, so we never
  // call setState from inside an effect.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const id = requestAnimationFrame(() => itemRefs.current[activeIndex]?.focus());
    return () => cancelAnimationFrame(id);
  }, [open, activeIndex]);

  function openMenu() {
    const initial = Math.max(0, locales.indexOf(currentLocale));
    setActiveIndex(initial);
    setOpen(true);
  }

  function toggleMenu() {
    if (open) {
      setOpen(false);
    } else {
      openMenu();
    }
  }

  function moveFocus(nextIndex: number) {
    const wrapped = (nextIndex + locales.length) % locales.length;
    setActiveIndex(wrapped);
    itemRefs.current[wrapped]?.focus();
  }

  function select(next: Locale) {
    setOpen(false);
    if (next === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  function onListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveFocus(activeIndex + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveFocus(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        moveFocus(0);
        break;
      case "End":
        event.preventDefault();
        moveFocus(locales.length - 1);
        break;
      case "Tab":
        // Close on Tab to stay consistent with native select semantics.
        setOpen(false);
        break;
    }
  }

  function onTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenu();
    }
  }

  const activeOptionId = activeIndex >= 0 ? `kh-locale-option-${locales[activeIndex]}` : undefined;

  return (
    <div className="kh-locale" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        className="kh-locale-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="kh-locale-menu"
        aria-label={t("switcher")}
        disabled={isPending}
        onClick={toggleMenu}
        onKeyDown={onTriggerKeyDown}
      >
        <Globe weight="regular" size={16} aria-hidden />
        <span
          className="kh-locale-name"
          lang={currentLocale}
          dir={optionDir[currentLocale]}
        >
          {t(`names.${currentLocale}`)}
        </span>
        <CaretDown weight="regular" size={12} aria-hidden />
      </button>
      {open && (
        <ul
          id="kh-locale-menu"
          className="kh-locale-menu"
          role="listbox"
          aria-label={t("switcher")}
          aria-activedescendant={activeOptionId}
          onKeyDown={onListKeyDown}
        >
          {locales.map((locale, index) => (
            <li
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              id={`kh-locale-option-${locale}`}
              key={locale}
              role="option"
              aria-selected={locale === currentLocale}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => select(locale)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  select(locale);
                }
              }}
              className={cn(locale === currentLocale && "is-current")}
            >
              <span lang={locale} dir={optionDir[locale]}>
                {t(`names.${locale}`)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Heart, List, X } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/Logo";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LocaleSwitcher } from "./LocaleSwitcher";

function isActiveHref(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { id: "home", href: "/", label: t("nav.home") },
    { id: "about", href: "/about", label: t("nav.about") },
    { id: "donate", href: "/donate", label: t("nav.donateNav") },
  ];

  return (
    <header className="kh-header backdrop-blur-md">
      <a href="#main" className="skip-link">
        {t("nav.skipToContent")}
      </a>

      <div className="container-kh kh-header-inner">
        <Link href="/" className="kh-logo">
          <Logo size={66} />

          <span className="kh-logo-text">
            <span className="kh-logo-name">AVAH</span>
            <span className="kh-logo-sub">INSTITUTO</span>
          </span>
        </Link>

        <nav className="kh-nav" aria-label="Primary">
          {navLinks.map((item) => {
            const active = isActiveHref(pathname, item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("kh-nav-link", active && "is-active")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="kh-header-right">
          <LocaleSwitcher />

          <a
            href="https://www.vakinha.com.br/vaquinha/doe-avah"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary kh-header-cta"
          >
            <Heart weight="regular" size={16} aria-hidden />
            <span>{t("nav.donate")}</span>
          </a>

          <button
            type="button"
            className="kh-burger"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X weight="regular" size={22} />
            ) : (
              <List weight="regular" size={22} />
            )}
          </button>
        </div>
      </div>

      <div className={cn("kh-mobile-menu", open && "is-open")}>
        {navLinks.map((item) => {
          const active = isActiveHref(pathname, item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn("kh-mobile-link", active && "is-active")}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}

        <a
          href="https://www.vakinha.com.br/vaquinha/doe-avah"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ marginTop: 16, width: "100%" }}
          onClick={() => setOpen(false)}
        >
          <Heart weight="regular" size={16} aria-hidden />
          <span>{t("nav.donate")}</span>
        </a>
      </div>
    </header>
  );
}
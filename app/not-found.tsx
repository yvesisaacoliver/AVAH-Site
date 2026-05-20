import Link from "next/link";
import "./globals.css";

/**
 * Root-level not-found, only reached when the URL falls outside the
 * [locale] tree (e.g. truly malformed paths). The locale-aware not-found
 * lives at app/[locale]/not-found.tsx and handles the common case.
 *
 * Next 16 auto-injects a DefaultLayout that provides <html><head><body>
 * for any route without an app/layout.tsx, so this component must NOT
 * render its own html/body or the result is nested document shells.
 * Inline styles keep this independent of next-intl, since by definition
 * we have no locale context here.
 */
export default function GlobalNotFound() {
  return (
    <main
      style={{
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        background: "#F6EFE4",
        color: "#1F3A44",
        minHeight: "100dvh",
        padding: "5rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "32rem", width: "100%", textAlign: "center" }}>
        <svg
          width="72"
          height="58"
          viewBox="0 0 200 160"
          aria-hidden
          style={{ display: "block", marginInline: "auto", marginBottom: "1.25rem" }}
        >
          <circle cx="100" cy="90" r="52" fill="#E8873C" />
          <g fill="#1F3A44">
            <circle cx="100" cy="78" r="10" />
            <path d="M 90 88 Q 90 118 84 138 L 116 138 Q 110 118 110 88 Z" />
          </g>
          <rect x="20" y="136" width="160" height="5" rx="2.5" fill="#1F3A44" />
        </svg>
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "#4F8A99",
            margin: 0,
          }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.04,
            margin: "0.5rem 0 1rem",
          }}
        >
          We could not find that page.
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.55,
            color: "#2C4A55",
            margin: "0 0 2rem",
          }}
        >
          The page you were looking for does not exist or has moved. The home page
          has everything you might be looking for.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "#E8873C",
            color: "#FFFFFF",
            padding: "0.875rem 1.625rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

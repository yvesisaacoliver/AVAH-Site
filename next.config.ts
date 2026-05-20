import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// React's dev runtime calls `eval()` for HMR / debugging features.
// Production React never does. We allow 'unsafe-eval' only in development
// so the dev console stays clean while the deployed site keeps a strict
// script-src. The Workers _headers file is the production source of
// truth and never includes 'unsafe-eval'.
const isDev = process.env.NODE_ENV !== "production";

const SCRIPT_SRC = [
  "'self'",
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  "https://static.cloudflareinsights.com",
].join(" ");

// Baseline Content Security Policy. Applied to every route via headers()
// below, and mirrored in public/_headers so Cloudflare's Static Assets
// binding emits the same policy when serving pre-built HTML directly.
//
// 'unsafe-inline' for script-src: required because Next.js inlines the
// React Server Components stream and hydration scripts. Inline-script XSS
// risk is mitigated because we never inject untrusted strings into the
// document.
//
// 'unsafe-inline' for style-src: covers Tailwind's runtime styles.
//
// script-src whitelists static.cloudflareinsights.com for Cloudflare Web
// Analytics. connect-src whitelists the same plus cloudflareinsights.com
// so the beacon can POST page-view events.
const CSP = [
  "default-src 'self'",
  `script-src ${SCRIPT_SRC}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://static.cloudflareinsights.com https://cloudflareinsights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "geolocation=()",
      "gyroscope=()",
      "interest-cohort=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // next/app is not in Next.js 16's exports map, so Turbopack can't resolve
    // it when generating its internal pages/_app.js compatibility shim.
    // Point it directly to the implementation file.
    resolveAlias: {
      "next/app": "next/dist/pages/_app",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { logEvent } from "./lib/log";

// We use the legacy `middleware.ts` filename (Next 16 deprecation warning)
// because Next 16's new `proxy.ts` runs on Node.js only, while OpenNext for
// Cloudflare and next-intl both target the Edge runtime. middleware.ts
// continues to run on Edge in Next 16 without a runtime export, and that
// is what OpenNext's Cloudflare adapter bundles for Workers.
const intlMiddleware = createMiddleware(routing);

const GCLID_COOKIE = "kh_gclid";
const GCLID_TTL_SECONDS = 60 * 60 * 24 * 90; // 90 days

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Capture Google Ads click ID for offline conversion tracking.
  // We set a first-party cookie only; no third-party script runs.
  // When a donor completes a Stripe payment server-side, the Worker reads
  // this cookie and pushes the conversion to the Google Ads API. See
  // section 3.6 of the implementation plan for the full flow.
  const gclid = request.nextUrl.searchParams.get("gclid");
  if (gclid) {
    response.cookies.set({
      name: GCLID_COOKIE,
      value: gclid,
      maxAge: GCLID_TTL_SECONDS,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true,
    });
    logEvent("gclid_capture", {
      path: request.nextUrl.pathname,
      country: request.headers.get("cf-ipcountry") ?? null,
    });
  }

  return response;
}

export const config = {
  // Match every path except internal Next assets, API routes, metadata routes
  // (sitemap, robots, opengraph-image, icon, apple-icon, manifest, twitter-image),
  // and static files (anything with a dot in the final segment).
  matcher: [
    "/((?!api|_next|_vercel|sitemap|robots|opengraph-image|twitter-image|icon|apple-icon|manifest|.*\\..*).*)",
  ],
};

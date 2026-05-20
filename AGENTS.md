<!-- BEGIN:khf-website-agent-rules -->
# Kinder Horizon Foundation: agent rules for this repo

## Brand voice
1. **No em dashes (U+2014) and no en dashes (U+2013) anywhere.** Use commas, parens, colons, regular hyphens, or sentence splits. The pre-commit hook (`.githooks/pre-commit`) enforces this; CI should too. Em dashes are the #1 public giveaway for AI-generated text and undercut the brand.
2. Use formal byline "Dr. Seyed Mohammad Javadi" in all official and public copy. Casual "Mahdi" stays out of the public site.
3. Maryam Aliyar is named publicly as "BCBA, Co-Founder + Clinical Lead". The independent directors are NOT named publicly.
4. The 12-year-old daughter is referenced as "our daughter", with no name and no full-face portrait.

## Stack
- Next.js 16 App Router, TypeScript strict, Tailwind v4 (CSS-first via `@theme`), next-intl v4 (`as-needed` prefix routing), `@opennextjs/cloudflare` deploying to Cloudflare Workers.
- Hardcoded user-facing strings are forbidden. Every string goes through `useTranslations` / `getTranslations` and lives in `messages/{locale}.json`.
- All CSS uses logical properties (`margin-inline-start`, `padding-block-end`, `text-align: start`) for RTL safety.
- Pages default to `export const dynamic = "force-static"`. Only API route handlers are dynamic.

## Stripe / donation security (when wiring up)
- Webhook handler reads body via `await request.text()`, never `request.json()`. Stripe signature verification needs the raw body.
- Client generates an `Idempotency-Key` (UUID) on form mount, sends as header to the route handler, and forwards to Stripe.
- Cloudflare Turnstile gates the Payment Intent route. Verify the token server-side before creating the intent.
- Never reference `STRIPE_SECRET_KEY` in client modules. Use `import 'server-only'` boundaries and Wrangler secrets.

## Privacy
- No analytics, no tracking pixels, no marketing telemetry, ever. The `/privacy` page enumerates this explicitly. Adding any third-party script requires explicit user approval.

## Next.js 16 specifics
- The middleware file is renamed to `proxy.ts` in this repo (Next 16 deprecation). Same export shape, same behavior.
- `params` and `searchParams` are Promises in page components.

## When in doubt
- Read the running context document at `~/Desktop/KHF/kinder-horizon-running-context-*.md` for the canonical decisions log. The version inside this repo is gitignored and may be ahead.
<!-- END:khf-website-agent-rules -->

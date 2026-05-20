/**
 * Structured logging for the Cloudflare Worker. Emits one JSON line per
 * event via `console.info` so events flow into Workers Logs and remain
 * grep-friendly in `wrangler tail` and the observability dashboard.
 *
 * Usage:
 *   logEvent("gclid_capture", { path: "/" });
 *
 * Keep field names snake_case and stable; we will query on these later.
 * Never log secrets, full email addresses, raw IPs, donor names, or card
 * data. Cloudflare's edge logs already capture IP and UA at the request
 * level; structured events should be domain-level signals only.
 */
export type LogFields = Record<string, string | number | boolean | null | undefined>;

export function logEvent(event: string, fields: LogFields = {}): void {
  const payload = {
    ts: new Date().toISOString(),
    event,
    ...fields,
  };
  // console.info ends up in Workers Logs at INFO level. Stringify so the
  // line is one self-contained JSON object regardless of nested values.
  console.info(JSON.stringify(payload));
}

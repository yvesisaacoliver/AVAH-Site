import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logEvent } from "@/lib/log";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const idempotencyKey = request.headers.get("idempotency-key");
  const country = request.headers.get("cf-ipcountry") ?? null;

  logEvent("donate_attempt_blocked", {
    reason: "coming_soon",
    has_idempotency_key: Boolean(idempotencyKey),
    country,
  });

  return NextResponse.json(
    {
      status: "coming_soon",
      message:
        "Donations are launching shortly. Email seyed@kinderhorizon.org to give now.",
    },
    { status: 503 },
  );
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logEvent } from "@/lib/log";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Body must be read as raw text (not request.json()) to preserve the exact
  // bytes Stripe signs when webhook verification is wired up in Phase 2.
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  logEvent("stripe_webhook_received_stub", {
    body_bytes: rawBody.length,
    has_signature: Boolean(signature),
  });

  return NextResponse.json(
    {
      status: "not_configured",
      message:
        "Stripe webhook receiver is not yet enabled. Donations launch with the BC Society bank account.",
    },
    { status: 503 },
  );
}

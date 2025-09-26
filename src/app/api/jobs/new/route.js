import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, ngrok-skip-browser-warning",
};

// Preflight handler (keeps browser + ngrok happy)
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  const origin = request.headers.get("origin") ?? undefined;
  try {
    const body = await request.json().catch(() => null);

    console.log("Request from: ", origin);

    console.log("[/api/jobs/new] received body:", body); // <-- server console log

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Respond with what we got
    return NextResponse.json(
      { ok: true, received: body },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error("[/api/jobs/new] error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

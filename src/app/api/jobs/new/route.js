// src/app/api/jobs/new/route.js
import { NextResponse } from "next/server";
import { newJob } from "../../modules/Supabase";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, ngrok-skip-browser-warning",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400, headers: corsHeaders }
    );
  }

  const result = await newJob(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 500, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    { ok: true, data: result.data, events: ["validated", "created_job"] },
    { status: 201, headers: corsHeaders }
  );
}

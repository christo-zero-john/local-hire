// src/app/api/jobs/[id]/route.js
import { NextResponse } from "next/server";
import { getJobById } from "../../modules/Supabase";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, ngrok-skip-browser-warning",
};

// Preflight handler (keeps browser + ngrok happy)
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET /api/jobs/[id] -> { ok: true, job: {...}, events: [...] }
export async function GET(request, { params }) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400, headers: corsHeaders }
    );
  }

  const { id } = body;

  console.log("[api] GET /api/jobs/[id]: received request", { id });

  // Validate ID parameter
  if (!id) {
    console.error("[api] GET /api/jobs/[id]: missing ID parameter");
    return NextResponse.json(
      { ok: false, error: "Job ID is required" },
      { status: 400, headers: corsHeaders }
    );
  }

  // Fetch job from Supabase
  const result = await getJobById(id);

  if (!result.ok) {
    console.error("[api] GET /api/jobs/[id]: failed to fetch job", {
      error: result.error,
    });

    // Return 404 for "not found" errors, 500 for others
    const statusCode = result.error === "Job not found" ? 404 : 500;
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: statusCode, headers: corsHeaders }
    );
  }

  console.log("[api] GET /api/jobs/[id]: success", { jobId: result.data?.id });

  // Return job data with events for Framer UI
  return NextResponse.json(
    {
      ok: true,
      job: result.data,
      events: ["fetched_job_by_id"],
    },
    { headers: corsHeaders }
  );
}

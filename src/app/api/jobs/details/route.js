// src/app/api/jobs/details/route.js
import { NextResponse } from "next/server";
import { getJobById } from "../../modules/Supabase";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, ngrok-skip-browser-warning",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET /api/jobs/details -> { ok: true, job: {...}, events: [...] }
export async function GET(request) {
  console.log("[api] GET /api/jobs/details: received request");

  // Get job ID from query parameters
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  console.log("[api] GET /api/jobs/details: received ID from query", { id });

  // Validate ID parameter
  if (!id) {
    console.error("[api] GET /api/jobs/details: missing ID parameter");
    return NextResponse.json(
      { ok: false, error: "Job ID is required as query parameter (?id=...)" },
      { status: 400, headers: corsHeaders }
    );
  }

  // Fetch job from Supabase
  const result = await getJobById(id);

  if (!result.ok) {
    console.error("[api] GET /api/jobs/details: failed to fetch job", {
      error: result.error,
    });

    // Return 404 for "not found" errors, 500 for others
    const statusCode = result.error === "Job not found" ? 404 : 500;
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: statusCode, headers: corsHeaders }
    );
  }

  console.log("[api] GET /api/jobs/details: success", {
    jobId: result.data?.id,
  });

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

// POST /api/jobs/details -> { ok: true, job: {...}, events: [...] }
export async function POST(request) {
  console.log("[api] POST /api/jobs/details: received request");

  try {
    const body = await request.json();
    console.log("[api] POST /api/jobs/details: received body", body);

    const { id } = body;

    // Validate ID parameter
    if (!id) {
      console.error("[api] POST /api/jobs/details: missing ID in body");
      return NextResponse.json(
        { ok: false, error: "Job ID is required in request body" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Fetch job from Supabase
    const result = await getJobById(id);

    if (!result.ok) {
      console.error("[api] POST /api/jobs/details: failed to fetch job", {
        error: result.error,
      });

      // Return 404 for "not found" errors, 500 for others
      const statusCode = result.error === "Job not found" ? 404 : 500;
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: statusCode, headers: corsHeaders }
      );
    }

    console.log("[api] POST /api/jobs/details: success", {
      jobId: result.data?.id,
    });

    // Return job data with events for Framer UI
    return NextResponse.json(
      {
        ok: true,
        job: result.data,
        events: ["fetched_job_by_id"],
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("[api] POST /api/jobs/details: error parsing body", error);
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400, headers: corsHeaders }
    );
  }
}

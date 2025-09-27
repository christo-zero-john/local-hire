// src/app/api/jobs/route.js
import { NextResponse } from "next/server";
import { fetchJobs } from "../modules/Supabase"; // adjust path if needed

const allowedRequestHeaders = [
  "content-type",
  "authorization",
  "ngrok-skip-browser-warning",
];

// helper to build CORS headers; echoes origin if present
function buildCorsHeaders(request) {
  const origin = request?.headers?.get?.("origin") || "*";
  return {
    "Access-Control-Allow-Origin":
      "https://project-hjidobg8incb0yzib1ur.framercanvas.com/",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": allowedRequestHeaders.join(", "),
    "Access-Control-Expose-Headers": "Content-Length,Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

// handle preflight
export async function OPTIONS(request) {
  const headers = buildCorsHeaders(request);
  return new NextResponse(null, { status: 204, headers });
}

export async function GET(request) {
  const headers = buildCorsHeaders(request);
  try {
    // adapt to how your fetchJobs returns data
    const jobs = await fetchJobs();
    return NextResponse.json(jobs, { status: 200, headers });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500, headers }
    );
  }
}

// if you also accept POST, add POST(request) and include same headers in the response

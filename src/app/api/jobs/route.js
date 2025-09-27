// src/app/api/jobs/route.js
import { NextResponse } from "next/server";
import { fetchJobs } from "../modules/Supabase";

/**
 * Configure allowed origins via env var ALLOWED_ORIGINS (comma separated).
 * Default is "*" (allow all).
 *
 * Example:
 *  ALLOWED_ORIGINS="https://mydomain.com,https://app.mydomain.com"
 */
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : ["*"];

/**
 * Build CORS headers for a given incoming request.
 * - If allowedOrigins contains "*", return wildcard origin.
 * - Otherwise, if the request's Origin is in the allowlist, echo it.
 * - We include ngrok-skip-browser-warning and expose it.
 */
function buildCorsHeaders(request) {
  const origin = request?.headers?.get?.("origin") || "";
  let accessControlAllowOrigin = "*";

  if (!allowedOrigins.includes("*")) {
    // If the request origin is allowed, echo it; otherwise fall back to first allowed origin.
    accessControlAllowOrigin = allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0] || "";
  }

  // If the browser sent Access-Control-Request-Headers (preflight), echo those back so custom headers are allowed.
  const requestedHeaders =
    request?.headers?.get?.("access-control-request-headers") ||
    "Content-Type, ngrok-skip-browser-warning";

  return {
    "Access-Control-Allow-Origin": accessControlAllowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": requestedHeaders,
    // Optional: if you want client JS to be able to read the ngrok header:
    "Access-Control-Expose-Headers": "ngrok-skip-browser-warning",
    // ngrok helper header (useful when exposing ngrok tunnels)
    "ngrok-skip-browser-warning": "true",
    // Tell caches that responses vary by Origin (important when echoing origin)
    Vary: "Origin",
  };
}

/**
 * OPTIONS (preflight) handler
 */
export async function OPTIONS(request) {
  const headers = buildCorsHeaders(request);
  // A short-lived preflight response
  return new NextResponse(null, { status: 204, headers });
}

/**
 * GET handler - fetch jobs and include CORS headers on the response
 */
export async function GET(request) {
  const headers = buildCorsHeaders(request);

  try {
    const result = await fetchJobs();

    if (!result?.ok) {
      return NextResponse.json(
        { ok: false, error: result?.error ?? "Unknown error" },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { ok: true, jobs: result.data, events: ["fetched_jobs"] },
      { headers }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500, headers }
    );
  }
}

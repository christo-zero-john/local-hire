// src/app/api/jobs/route.js
import { NextResponse } from "next/server";
import { fetchJobs } from "../modules/Supabase";

// Get allowed origins from environment or default to wildcard for development
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["*"];

// For development, allow all origins. For production, use specific origins
const corsOrigin = allowedOrigins.includes("*") ? "*" : allowedOrigins[0];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, ngrok-skip-browser-warning",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  const result = await fetchJobs();
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 500, headers: corsHeaders }
    );
  }
  // Include events so your Framer UI can surface “what happened”
  return NextResponse.json(
    { ok: true, jobs: result.data, events: ["fetched_jobs"] },
    { headers: corsHeaders }
  );
}

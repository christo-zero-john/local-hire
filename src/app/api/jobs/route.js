// src/app/api/jobs/route.js
import { NextResponse } from "next/server";
import { fetchJobs } from "../modules/Supabase";

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

// src/app/api/modules/Supabase.js

import { createClient } from "@supabase/supabase-js";

/**
 * Creates or returns a cached server-side Supabase client using the service role key.
 * - Requires env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * - Uses a global singleton to avoid recreating clients on hot reloads
 */
function getSupabaseAdmin() {
  // Validate required environment variables early
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    console.error("[supabase] Missing SUPABASE_URL");
    throw new Error("Missing SUPABASE_URL");
  }
  if (!serviceRoleKey) {
    console.error("[supabase] Missing SUPABASE_SERVICE_ROLE_KEY");
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  // Reuse a single instance across requests in dev
  if (!globalThis.__supabase_admin__) {
    console.log("[supabase] Creating new Supabase admin client");
    globalThis.__supabase_admin__ = createClient(url, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          "X-Client-Info": "local-hire-backend",
        },
      },
    });
  } else {
    // Optional: uncomment to see reuse
    // console.log("[supabase] Reusing cached Supabase admin client");
  }

  return globalThis.__supabase_admin__;
}

/**
 * Fetch all jobs from the 'jobs' table.
 * Returns { ok: boolean, data?: any[], error?: string }
 */
export async function fetchJobs() {
  const supabase = getSupabaseAdmin();

  console.log("[supabase] fetchJobs: starting");

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[supabase] fetchJobs: error", error);
    return { ok: false, error: error.message ?? "Failed to fetch jobs" };
  }

  console.log("[supabase] fetchJobs: success", { count: data?.length ?? 0 });
  return { ok: true, data: data ?? [] };
}

/**
 * Create a new job entry in the 'jobs' table.
 * - Expects a plain object with job fields (e.g., job_title, risk_level, work_date, duration_hours, full_address, employer_id, etc.)
 * - Returns { ok: boolean, data?: object, error?: string }
 */
export async function newJob(job) {
  const supabase = getSupabaseAdmin();

  console.log("[supabase] newJob: received job", job);

  console.log("[supabase] newJob: starting", { hasJob: !!job });

  // Minimal guardrails to catch common mistakes early
  if (!job || typeof job !== "object") {
    console.error("[supabase] newJob: invalid payload");
    return { ok: false, error: "Invalid job payload" };
  }
  if (!job.job_title) {
    console.warn("[supabase] newJob: missing 'job_title'");
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert([job])
    .select("*")
    .single();

  if (error) {
    console.error("[supabase] newJob: error", error);
    return { ok: false, error: error.message ?? "Failed to create job" };
  }

  console.log("[supabase] newJob: success", { id: data?.id });
  return { ok: true, data };
}

/**
 * Get a specific job by ID from the 'jobs' table.
 * - Expects a job ID (string or number)
 * - Returns { ok: boolean, data?: object, error?: string }
 */
export async function getJobById(jobId) {
  const supabase = getSupabaseAdmin();

  console.log("[supabase] getJobById: starting", { jobId });

  // Validate job ID
  if (!jobId) {
    console.error("[supabase] getJobById: missing job ID");
    return { ok: false, error: "Job ID is required" };
  }

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (error) {
    console.error("[supabase] getJobById: error", error);
    if (error.code === "PGRST116") {
      // No rows returned
      return { ok: false, error: "Job not found" };
    }
    return { ok: false, error: error.message ?? "Failed to fetch job" };
  }

  console.log("[supabase] getJobById: success", { id: data?.id });
  return { ok: true, data };
}

/**
 * Optional: export the raw admin client if you need advanced queries elsewhere.
 */
export function getSupabase() {
  return getSupabaseAdmin();
}

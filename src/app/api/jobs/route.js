// app/api/jobs/route.js
import { NextResponse } from "next/server";

const jobs = [
  {
    id: 1,
    title: "Wood Cutter",
    company: "Local Co",
    location: "Town A",
    description: "Cut wood",
  },
  {
    id: 2,
    title: "Gardener",
    company: "Green Ltd",
    location: "Town B",
    description: "Maintain gardens",
  },
  {
    id: 3,
    title: "Barista",
    company: "Cafe Good",
    location: "Town C",
    description: "Make beverages",
  },
  {
    id: 4,
    title: "Tutor",
    company: "Home Tuition",
    location: "Town D",
    description: "Teach math",
  },
  {
    id: 5,
    title: "Delivery",
    company: "FastShip",
    location: "Town E",
    description: "Local deliveries",
  },
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, ngrok-skip-browser-warning",
};

// Preflight handler (keeps browser + ngrok happy)
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET /api/jobs -> { jobs: [...] }
export async function GET() {
  return NextResponse.json({ jobs }, { headers: corsHeaders });
}

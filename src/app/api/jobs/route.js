// app/api/jobs/route.js
import { NextResponse } from "next/server";

const jobs = [
  {
    job_title: "Wood Cutter",
    job_risks: "High",
    work_date: "18-09-2025",
    work_duration: "7 Hours",
    full_address:
      "Kumar House, Bazar Road, Hosur, Krishnagiri, 635109, Near Old Bus Stand, Beside Ramesh Stores",
  },
  {
    job_title: "Residential Electrician (Wiring Repair)",
    job_risks: "High",
    work_date: "20-09-2025",
    work_duration: "4 Hours",
    full_address:
      "No. 23, Venkata Nagar, 4th Cross, Bangalore, Bangalore Urban, 560076, Opposite Venkateshwara Temple, Above Sai Medicals",
  },
  {
    job_title: "Plumber (Pipe Replacement)",
    job_risks: "Medium",
    work_date: "16-09-2025",
    work_duration: "5 Hours",
    full_address:
      "House A-12, Green Park Colony, Meerut, Meerut District, 250001, Near Central School, 2nd Gate",
  },
  {
    job_title: "House Painter (Interior)",
    job_risks: "Medium",
    work_date: "21-09-2025",
    work_duration: "8 Hours",
    full_address:
      "14B, Rose Villa, Old Mahabalipuram Road, Chennai, Chengalpattu, 600097, Landmark: Opposite Akshaya Bakery, Near Phase 2 Park",
  },
  {
    job_title: "Fruit Harvester (Seasonal)",
    job_risks: "Low",
    work_date: "14-09-2025",
    work_duration: "6 Hours",
    full_address:
      "Plot 48, Mango Orchard Lane, Taluk Road, Theni, Theni District, 625531, Landmark: Beside Cooperative Society, Near Checkpost",
  },
  {
    job_title: "Wood Cutter",
    job_risks: "High",
    work_date: "18-09-2025",
    work_duration: "7 Hours",
    full_address:
      "Kumar House, Bazar Road, Hosur, Krishnagiri, 635109, Near Old Bus Stand, Beside Ramesh Stores",
  },
  {
    job_title: "Residential Electrician (Wiring Repair)",
    job_risks: "High",
    work_date: "20-09-2025",
    work_duration: "4 Hours",
    full_address:
      "No. 23, Venkata Nagar, 4th Cross, Bangalore, Bangalore Urban, 560076, Opposite Venkateshwara Temple, Above Sai Medicals",
  },
  {
    job_title: "Plumber (Pipe Replacement)",
    job_risks: "Medium",
    work_date: "16-09-2025",
    work_duration: "5 Hours",
    full_address:
      "House A-12, Green Park Colony, Meerut, Meerut District, 250001, Near Central School, 2nd Gate",
  },
  {
    job_title: "House Painter (Interior)",
    job_risks: "Medium",
    work_date: "21-09-2025",
    work_duration: "8 Hours",
    full_address:
      "14B, Rose Villa, Old Mahabalipuram Road, Chennai, Chengalpattu, 600097, Landmark: Opposite Akshaya Bakery, Near Phase 2 Park",
  },
  {
    job_title: "Fruit Harvester (Seasonal)",
    job_risks: "Low",
    work_date: "14-09-2025",
    work_duration: "6 Hours",
    full_address:
      "Plot 48, Mango Orchard Lane, Taluk Road, Theni, Theni District, 625531, Landmark: Beside Cooperative Society, Near Checkpost",
  },
  {
    job_title: "Wood Cutter",
    job_risks: "High",
    work_date: "18-09-2025",
    work_duration: "7 Hours",
    full_address:
      "Kumar House, Bazar Road, Hosur, Krishnagiri, 635109, Near Old Bus Stand, Beside Ramesh Stores",
  },
  {
    job_title: "Residential Electrician (Wiring Repair)",
    job_risks: "High",
    work_date: "20-09-2025",
    work_duration: "4 Hours",
    full_address:
      "No. 23, Venkata Nagar, 4th Cross, Bangalore, Bangalore Urban, 560076, Opposite Venkateshwara Temple, Above Sai Medicals",
  },
  {
    job_title: "Plumber (Pipe Replacement)",
    job_risks: "Medium",
    work_date: "16-09-2025",
    work_duration: "5 Hours",
    full_address:
      "House A-12, Green Park Colony, Meerut, Meerut District, 250001, Near Central School, 2nd Gate",
  },
  {
    job_title: "House Painter (Interior)",
    job_risks: "Medium",
    work_date: "21-09-2025",
    work_duration: "8 Hours",
    full_address:
      "14B, Rose Villa, Old Mahabalipuram Road, Chennai, Chengalpattu, 600097, Landmark: Opposite Akshaya Bakery, Near Phase 2 Park",
  },
  {
    job_title: "Fruit Harvester (Seasonal)",
    job_risks: "Low",
    work_date: "14-09-2025",
    work_duration: "6 Hours",
    full_address:
      "Plot 48, Mango Orchard Lane, Taluk Road, Theni, Theni District, 625531, Landmark: Beside Cooperative Society, Near Checkpost",
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

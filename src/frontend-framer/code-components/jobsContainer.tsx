import * as React from "react";
import { JobsCard } from "https://framer.com/m/JobCard-BWd6.js@xRANG9JXc1cremTMJzg3";
import { addPropertyControls, ControlType } from "framer";

export default function JobsCardList(props) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const url = props.apiUrl;
        if (!url) throw new Error("No API URL provided");

        const request = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        };

        const response = await fetch(url, request);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log("Fetched data:", data);

        const jobsArray = Array.isArray(data?.jobs) ? data.jobs : [];

        const formattedItems = jobsArray.map((job) => ({
          id: job.id,
          title: job.job_title,
          riskLabel: job.job_risks,
          date: job.work_date,
          duration: job.work_duration,
          address: job.full_address,
          textColor: "#fff",
          riskColor:
            job.job_risks?.toLowerCase() === "high"
              ? "#dc143c"
              : job.job_risks?.toLowerCase() === "moderate"
              ? "#ffdf00"
              : "#4ee44e",
          durationColor:
            typeof job.work_duration === "number" && job.work_duration > 24
              ? "#FF6347"
              : typeof job.work_duration === "number" && job.work_duration > 12
              ? "#FFD600"
              : "#90EE90",
        }));

        if (!cancelled) setItems(formattedItems);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        if (!cancelled) setError(err?.message || "Failed to load jobs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [props.apiUrl]);

  if (loading)
    return <div style={{ textAlign: "center", color: "#999" }}>Loading...</div>;
  if (error)
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;
  if (!items.length)
    return (
      <div style={{ textAlign: "center", color: "#999" }}>No jobs found</div>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        height: "fit-content",
      }}
    >
      {items.map((item, index) => (
        <JobsCard
          key={index}
          id={item.id}
          title={item.title}
          riskLabel={item.riskLabel}
          date={item.date}
          duration={item.duration}
          address={item.address}
          textColor={item.textColor}
          riskColor={item.riskColor}
          durationColor={item.durationColor}
        />
      ))}
    </div>
  );
}

addPropertyControls(JobsCardList, {
  apiUrl: {
    type: ControlType.String,
    title: "API URL",
    defaultValue: "https://3bbb1af03833.ngrok-free.app/api/jobs",
  },
});

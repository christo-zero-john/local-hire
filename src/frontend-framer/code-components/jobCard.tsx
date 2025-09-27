import * as React from "react";
import { addPropertyControls, ControlType } from "framer";

export function JobsCard(props) {
  const {
    title,
    riskLabel,
    date,
    duration,
    address,
    textColor,
    riskColor,
    durationColor,
    id,
  } = props;
  console.log(props);
  return (
    <div
      style={{
        background: "#1F1F1F",
        borderRadius: 8,
        padding: 16,
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        color: textColor,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Top row: risk label + date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            background: riskColor,
            color: "#fff",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {riskLabel}
        </span>
        <span style={{ fontSize: 14, opacity: 0.8 }}>{date}</span>
      </div>

      {/* Title + duration */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{title}</h3>
        <span
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: durationColor,
          }}
        >
          {duration}
        </span>
      </div>

      {/* Address box */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: 12,
          fontSize: 14,
          lineHeight: 1.4,
          opacity: 0.9,
          fontWeight: "300",
        }}
      >
        {address}
      </div>
      <button
        onClick={() => (window.location.href = `/jobs/details?id=${id}`)}
        style={{
          background: "#14141400",
          color: "#f1f1f1",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: 8,
          fontSize: 14,
          opacity: 0.9,
          fontWeight: "300",
          width: "fit-content",
          height: "fit-content",
        }}
      >
        Details
      </button>
    </div>
  );
}

addPropertyControls(JobsCard, {
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Wood Cutter",
  },
  riskLabel: {
    type: ControlType.String,
    title: "Risk Label",
    defaultValue: "HIGH RISK",
  },
  date: {
    type: ControlType.String,
    title: "Date",
    defaultValue: "29 August",
  },
  duration: {
    type: ControlType.String,
    title: "Duration",
    defaultValue: "8 Hours",
  },
  address: {
    type: ControlType.String,
    title: "Address",
    defaultValue: "House name, city, district, pin, landmark",
  },
  textColor: { type: ControlType.Color, title: "Text", defaultValue: "#fff" },
  riskColor: {
    type: ControlType.Color,
    title: "Risk Badge",
    defaultValue: "#E63946",
  },
  durationColor: {
    type: ControlType.Color,
    title: "Duration",
    defaultValue: "#FFD600",
  },
  id: {
    type: ControlType.String,
    title: "Job ID",
    defaultValue: "1",
  },
});

import React from "react";

export default function Card({ title, value, change, color }) {
  return (
    <div className="card" style={{ borderTop: `4px solid ${color}` }}>
      <h3>{title}</h3>
      <p className="value">{value}</p>
      <span
        style={{
          color: change.startsWith("-") ? "#f44336" : "#4caf50",
          fontWeight: 500,
        }}
      >
        {change}
      </span>
    </div>
  );
}

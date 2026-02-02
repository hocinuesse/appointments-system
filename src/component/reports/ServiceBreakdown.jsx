import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import "./servicebreakdown.css";

const COLORS = [
  { key: "Mobile Apps", color: "#2563eb" },
  { key: "Web Development", color: "#06b6d4" },
  { key: "Cloud Architecture", color: "#10b981" },
  { key: "Brand Design", color: "#f59e0b" },
  { key: "Marketing", color: "#ef4444" },
  { key: "Other", color: "#a855f7" },
];

const data = [
  { name: "Mobile Apps", value: 34 },
  { name: "Web Development", value: 67 },
  { name: "Cloud Architecture", value: 56 },
  { name: "Brand Design", value: 89 },
  { name: "Marketing", value: 112 },
];

const ServiceBreakdown = ({ items = data }) => {
  return (
    <div className="service-breakdown w-full h-full">
      <div className="sb-head">
        <h3>Service Breakdown</h3>
        <p>Bookings by service type</p>
      </div>
      <div className="sb-chart">
        <ResponsiveContainer width="100%" height="100%" debounce={150}>
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={2}
              blendStroke
            >
              {items.map((entry, i) => {
                const c = COLORS.find((x) => x.key === entry.name)?.color || COLORS[i % COLORS.length].color;
                return <Cell key={`cell-${entry.name}`} fill={c} stroke="#fff" strokeWidth={3} />;
              })}
            </Pie>
            <Tooltip
              cursor={{ fill: "rgba(226,232,240,0.35)" }}
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
              formatter={(value, name) => [`${value} bookings`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="sb-legend">
        {items.slice(0, 5).map((entry, i) => {
          const c = COLORS.find((x) => x.key === entry.name)?.color || COLORS[i % COLORS.length].color;
          return (
            <div className="sb-legend-item" key={`legend-${entry.name}`}>
              <span className="sb-dot" style={{ backgroundColor: c }} />
              <span className="sb-label">{entry.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceBreakdown;

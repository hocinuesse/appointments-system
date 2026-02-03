import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAppointmentsStore from "../../store/appointmentsStore";
import useAnalyticsStore from "../../store/analyticsStore";

const Charts = () => {
  const appointments = useAppointmentsStore((state) => state.Appointments);
  const chartReport = useAnalyticsStore((state) => state.chartReport);

  const dataForChart = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months.map((month, index) => ({
      name: month,
      revenue: chartReport(index, appointments) || 0,
    }));
  }, [appointments, chartReport]);

  const maxRevenue = useMemo(() => {
    const max = Math.max(...dataForChart.map((d) => d.revenue), 1000);
    return Math.ceil(max / 1000) * 1000;
  }, [dataForChart]);

  return (
    <div className="w-full h-100 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-slate-800 text-lg font-extrabold tracking-tight">
            Revenue Analytics
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Real-time earnings tracking
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"></span>
            <span className="text-slate-600 text-xs font-semibold">
              Revenue
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%" debounce={500}>
        <AreaChart
          data={dataForChart}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
            dy={15}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            tickFormatter={(value) =>
              `$${value >= 1000 ? (value / 1000).toFixed(1) + "k" : value}`
            }
            domain={[0, maxRevenue]}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#3b82f6",
              strokeWidth: 2,
              strokeDasharray: "5 5",
            }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorRev)"
            isAnimationActive={true}
            animationBegin={800} // تأخير كافٍ لإنهاء حركة الـ Sidebar
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800">
        <p className="text-[10px] text-slate-400 mb-1 uppercase font-bold tracking-wider">
          {label}
        </p>
        <p className="text-sm font-bold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default React.memo(Charts);

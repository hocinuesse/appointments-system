import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAppointmentsStore from "../../store/appointmentsStore";

const Chart2 = () => {
  const chartLines = useAppointmentsStore((state) => state.chartLines);
  const Appointments = useAppointmentsStore((state) => state.Appointments);

  const data = useMemo(() => {
    return chartLines();
  }, [chartLines, Appointments]);

  return (
    <div className="w-full h-87.5 md:h-100 bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        <div>
          <h3 className="text-slate-900 text-lg font-bold">
            Weekly Appointments
          </h3>
          <p className="text-slate-500 text-xs">Status breakdown</p>
        </div>
        <div className="flex gap-3 text-[9px] font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span> Done
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span> Pending
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> Canceled
          </div>
        </div>
      </div>

      {/* الحاوية التي تحتضن الرسم يجب أن تأخذ flex-1 وتملك min-height */}
      <div className="flex-1 w-full min-h-55">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ left: -25, right: 5, top: 10, bottom: 0 }}
            barGap={2}
            barCategoryGap="15%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 10 }}
              allowDecimals={false}
            />
            <Tooltip cursor={{ fill: "#f8fafc" }} />
            <Bar dataKey="confirmed" fill="#16a34a" radius={[2, 2, 0, 0]} />
            <Bar dataKey="pending" fill="#f59e0b" radius={[2, 2, 0, 0]} />
            <Bar dataKey="cancelled" fill="#ef4444" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(Chart2);

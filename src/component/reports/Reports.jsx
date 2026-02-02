import React, { useEffect, useMemo } from "react";
import "./reports.css";
import { GoPeople, GoArrowUpRight } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa6";
import { LuCalendar, LuChartColumn } from "react-icons/lu";
import Charts from "./Charts";
import Chart2 from "./ِCharts2";
import TopServices from "./TopServices";
import ServiceBreakdown from "./ServiceBreakdown";
import useAppointmentsStore from "../../store/appointmentsStore";
import useClientsStore from "../../store/clientsStore";
import useAnalyticsStore from "../../store/analyticsStore";
import useAuthStore from "../../store/useAuthStore";

const Reports = () => {
  const fetchAppoint = useAppointmentsStore((state) => state.fetchAppoint);
  const fetchClient = useClientsStore((state) => state.fetchClient);
  const totalRevenu = useAnalyticsStore((state) => state.totalRevenu);
  const getAvgOrderValue = useAnalyticsStore((state) => state.getAvgOrderValue);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user?.uid) {
      const unsubAppointments = fetchAppoint(user.uid);
      const unsubClients = fetchClient(user.uid);
      const unsubRevenue = totalRevenu(user.uid);
      return () => {
        unsubAppointments?.();
        unsubClients?.();
        unsubRevenue?.();
      };
    }
  }, [user, fetchAppoint, fetchClient, totalRevenu]);

  const total = useAnalyticsStore((state) => state.total);
  const Appointments = useAppointmentsStore((state) => state.Appointments);
  const clients = useClientsStore((state) => state.clients);
  const AvgOrderValue = useAnalyticsStore((state) => state.AvgOrderValue);

  useEffect(() => {
    if (Appointments.length > 0 && total > 0) {
      getAvgOrderValue(Appointments);
    }
  }, [Appointments, total, getAvgOrderValue]);

  return (
    <div className="reports section">
      <div className="reports-head head">
        <h1>Reports & Analytics</h1>
        <p>Track your business performance and insights</p>
      </div>

      <div className="reports-carts">
        <div className="cart-reports shadow-lg rounded-xl">
          <div className="cart-head-reports">
            <p>Total Revenue</p>
            <FaDollarSign className="cart-icn text-green-600" />
          </div>
          <h1 className="text-green-600">${total || 0}</h1>
          <h3>
            <span className="text-green-500"><GoArrowUpRight className="icn-reports" /> +12.5%</span>
            <p>vs last period</p>
          </h3>
        </div>

        <div className="cart-reports shadow-lg rounded-xl">
          <div className="cart-head-reports">
            <p>Appointments</p>
            <LuCalendar className="cart-icn text-blue-600" />
          </div>
          <h1 className="text-blue-600">{Appointments?.length}</h1>
          <h3>
            <span className="text-green-500"><GoArrowUpRight className="icn-reports" /> +12.5%</span>
            <p>vs last period</p>
          </h3>
        </div>

        <div className="cart-reports shadow-lg rounded-xl">
          <div className="cart-head-reports">
            <p>Total Clients</p>
            <GoPeople className="cart-icn text-cyan-400" />
          </div>
          <h1 className="text-cyan-400">{clients?.length}</h1>
          <h3>
            <span className="text-green-500"><GoArrowUpRight className="icn-reports" /> +12.5%</span>
            <p>vs last period</p>
          </h3>
        </div>

        <div className="cart-reports shadow-lg rounded-xl">
          <div className="cart-head-reports">
            <p>Avg. Order Value</p>
            <LuChartColumn className="cart-icn text-orange-400" />
          </div>
          <h1 className="text-orange-400">${AvgOrderValue || 0}</h1>
          <h3>
            <span className="text-green-500"><GoArrowUpRight className="icn-reports" /> +12.5%</span>
            <p>vs last period</p>
          </h3>
        </div>
      </div>

      <div className="charts-reports">
        <div className="chart-report">
          <Charts />
        </div>
        <div className="chart-report">
          <Chart2 />
        </div>
      </div>

      <div className="Service-reports">
        <div className="service-report breakdown">
          <ServiceBreakdown />
        </div>
        <div className="service-report top-services">
          <TopServices />
        </div>
      </div>
    </div>
  );
};

export default Reports;
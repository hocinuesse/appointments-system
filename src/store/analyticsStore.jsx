import { create } from "zustand";
import { analyticsService } from "../services/analyticsService";

const useAnalyticsStore = create((set, get) => ({
  total: 0,
  AvgOrderValue: 0,

  totalRevenu: (uid) => {
    if (!uid) return;
    const unsub = analyticsService.fetchTotalRevenue(uid, (total) => {
      set({ total: total });
    });
    return unsub;
  },

  getAvgOrderValue: (appointments) => {
    const total = get().total;
    const confirmedCount = appointments.filter(
      (app) => app.status === "confirmed"
    ).length;
    set({
      AvgOrderValue:
        confirmedCount > 0 ? (total / confirmedCount).toFixed(2) : 0,
    });
  },

  chartReport: (month, appointments) => {
    const currentYear = new Date().getFullYear();
    const filtreMonth = appointments.filter((app) => {
      const date = new Date(app.date);
      return (
        date.getMonth() === month &&
        currentYear === date.getFullYear() &&
        app.status === "confirmed"
      );
    });
    return filtreMonth.reduce((sum, item) => sum + Number(item.price), 0);
  },
}));

export default useAnalyticsStore;

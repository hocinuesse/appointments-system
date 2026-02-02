import { create } from "zustand";
import { appointmentsService } from "../services/appointmentsService";
import { clientsService } from "../services/clientsService";

const useAppointmentsStore = create((set, get) => ({
  Appointments: [],
  filteredData: [],
  AllAppointmentsCount: 0,

  fetchAppoint: (uid) => {
    if (!uid) return;
    const unsub = appointmentsService.fetchAppointments(uid, (data) => {
      set({ Appointments: data, filteredData: data });
    });
    return unsub;
  },

  appointmentsCount: async (uid) => {
    if (!uid) return;
    const count = await appointmentsService.getAppointmentsCount(uid);
    set({ AllAppointmentsCount: count });
  },

  filterByStatus: (status, service = "All Service") => {
    const all = get().Appointments;
    const result = all.filter((app) => {
      const matchStatus = status === "All Status" || app.status === status;
      const matchService = service === "All Service" || app.service === service;
      return matchStatus && matchService;
    });
    set({ filteredData: result });
  },

  searchAppointments: (query) => {
    const all = get().Appointments;
    if (!query.trim()) {
      set({ filteredData: all });
    } else {
      const filtered = all.filter((data) =>
        data.name.toLowerCase().includes(query.toLowerCase()),
      );
      set({ filteredData: filtered });
    }
  },

  addAPpointements: async (info, user, item) => {
    try {
      const now = new Date().toISOString();

      await clientsService.updateClientWithAppointment(info, user, now);
      const docRef = await appointmentsService.addAppointment(
        info,
        user,
        now,
        item,
      );
    } catch (error) {
      console.error("Error Adding appointments: ", error);
      throw error;
    }
  },

  confermBtn: async (itemId , item) => {
    try {
      await appointmentsService.confirmAppointment(itemId , item);
      return true;
    } catch (error) {
      console.log("error faild to update", itemId);
      throw error;
    }
  },

  cancelBtn: async (itemID , item) => {
    try {
      await appointmentsService.cancelAppointment(itemID , item);
      return true;
    } catch (error) {
      console.log("failed to cancel ", itemID);
      throw error;
    }
  },

  chartLines: () => {
    const all = get().Appointments;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const StartOfW = new Date(today);
    StartOfW.setDate(today.getDate() - today.getDay());
    StartOfW.setHours(0, 0, 0, 0);
    const EndOfW = new Date(StartOfW);
    (EndOfW.setDate(StartOfW.getDate() + 6), EndOfW.setHours(23, 59, 59, 999));
    return days.map((day, index) => {
      const daysApp = all.filter((app) => {
        const appDate = new Date(app.date);
        return (
          appDate.getDay() === index && appDate >= StartOfW && appDate <= EndOfW
        );
      });
      return {
        name: day,
        confirmed: daysApp.filter((app) => app.status === "confirmed").length,
        pending: daysApp.filter((app) => app.status === "pending").length,
        cancelled: daysApp.filter((app) => app.status === "cancelled").length,
      };
    });
  },
}));

export default useAppointmentsStore;

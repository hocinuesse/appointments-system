import { create } from "zustand";
import { clientsService } from "../services/clientsService";

const useClientsStore = create((set, get) => ({
  clients: [],
  clientsFiltred: [],

  fetchClient: (uid) => {
    if (!uid) return;
    const unsub = clientsService.fetchClients(uid, (data) => {
      set({ clients: data, clientsFiltred: data });
    });
    return unsub;
  },

  searchClients: (client) => {
    const all = get().clients;
    if (client.trim()) {
      const filtredClient = all.filter((cl) =>
        cl.name.toLowerCase().includes(client.toLowerCase())
      );
      set({ clientsFiltred: filtredClient });
    } else {
      set({ clientsFiltred: all });
    }
  },

  updateClientWithAppointment: async (info, user, now) => {
    await clientsService.updateClientWithAppointment(info, user, now);
  },
}));

export default useClientsStore;

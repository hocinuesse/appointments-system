import { create } from "zustand";


const useNotificationsStore = create((set, get) => ({
  notification: [],
  notificationModul: false,
  Modul: false,

  addNotification: (item) =>
    set((state) => ({ notification: [item, ...state.notification] })),

  ToggleNotifcation: () =>
    set((state) => ({ notificationModul: !state.notificationModul })),

  clearNotification: () => set(() => ({ notification: [] })),

  togglemodul: () => set((state) => ({ Modul: !state.Modul })),
}));

export default useNotificationsStore;

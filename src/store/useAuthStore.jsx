import { create } from "zustand";
import { authService } from "../services/authService";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  initAuth: () => {
    const unsubscribe = authService.initAuth((client) => {
      set({ user: client, loading: false });
      console.log(client);
    });
    return unsubscribe;
  },
  logout: async () => {
    try {
      await authService.logout();
      set({ user: null });
      console.log("User logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  },
}));

export default useAuthStore;

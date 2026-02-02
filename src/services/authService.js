import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const authService = {
  initAuth: (onUserChanged) => {
    const unsubscribe = onAuthStateChanged(auth, (client) => {
      onUserChanged(client);
    });
    return unsubscribe;
  },

  logout: async () => {
    try {
      await signOut(auth);
      // setPersistence(auth, browserSessionPersistence);
      return true;
    } catch (error) {
      console.error("Logout error:", error.message);
      throw error;
    }
  },
};

import { db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  where,
  query,
  getCountFromServer,
} from "firebase/firestore";
import useNotificationsStore from "../store/notificationsStore";

export const appointmentsService = {
  fetchAppointments: (uid, onData) => {
    const myCollection = collection(db, "appoinetments");
    const q = query(myCollection, where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      onData(data);
    });
    return unsubscribe;
  },

  getAppointmentsCount: async (uid) => {
    const myCollection = collection(db, "appoinetments");
    const q = query(myCollection, where("uid", "==", uid));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  },

  addAppointment: async (info, user, now , item) => {
    const myCollection = collection(db, "appoinetments");
    const docRef = await addDoc(myCollection, {
      ...info,
      adedBy: user.displayName,
      createdAt: now,
    });
    useNotificationsStore.getState().addNotification(item)
  },

  confirmAppointment: async (itemId , item) => {
    const docref = doc(db, "appoinetments", itemId);
    await updateDoc(docref, { status: "confirmed" });
    useNotificationsStore.getState().addNotification(item)
  },

  cancelAppointment: async (itemId , item) => {
    const docref = doc(db, "appoinetments", itemId);
    await updateDoc(docref, { status: "cancelled" });
        useNotificationsStore.getState().addNotification(item)

  },
};

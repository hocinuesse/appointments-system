import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const analyticsService = {
  fetchTotalRevenue: (uid, onData) => {
    const myCollection = collection(db, "appoinetments");
    const q = query(
      myCollection,
      where("uid", "==", uid),
      where("status", "==", "confirmed")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const total = data.reduce((sum, item) => sum + Number(item.price), 0);
      onData(total);
    });
    return unsubscribe;
  },
};

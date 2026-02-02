import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

export const clientsService = {
  fetchClients: (uid, onData) => {
    const myCollection = collection(db, "clients");
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

  updateClientWithAppointment: async (info, user, now) => {
    const clientCollection = collection(db, "clients");
    const q = query(
      clientCollection,
      where("uid", "==", user.uid),
      where("number", "==", info.number)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const clientDoc = querySnapshot.docs[0];
      const clientRef = doc(db, "clients", clientDoc.id);
      await updateDoc(clientRef, {
        appointments: arrayUnion({
          ...info,
          createdAt: now,
        }),
        totalSpent: increment(Number(info.price)),
        lastVisit: now,
      });
      return { type: "updated", id: clientDoc.id };
    } else {
      const clientsInfo = {
        name: info.name,
        number: info.number,
        uid: user.uid,
        joinedAt: now,
        totalSpent: Number(info.price),
        appointments: [{ ...info, createdAt: now }],
        adedBy: user.displayName,
        email: info.email,
      };
      const docRef = await addDoc(clientCollection, clientsInfo);
      return { type: "created", id: docRef.id, data: clientsInfo };
    }
  },
};

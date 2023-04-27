import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const setUserDB = async ({ uid, email }, phone) => {
  await setDoc(doc(db, "users", uid), {
    phone,
  });
};

export const getUserDB = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const setUserDB = async ({ uid }, phone, fullName) => {
  await setDoc(doc(db, "users", uid), {
    phone,
    fullName,
  });
};

export const updateUserProfile = async ({ uid }, prop) => {
  await updateDoc(doc(db, "users", uid), {
    ...prop,
  });
};

export const getUserDB = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

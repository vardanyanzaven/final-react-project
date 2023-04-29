import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
export const updateUserProfile = async ({ uid }, prop) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      ...prop,
    });
  } catch (error) {
    console.log(error + "in update profile");
  }
};

export const setUserDB = async ({ uid }, phone, fullName, gender) => {
  await setDoc(doc(db, "users", uid), {
    phone,
    fullName,
    gender,
  });
};

export const getUserDB = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

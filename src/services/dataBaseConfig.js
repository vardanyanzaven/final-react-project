<<<<<<< HEAD
<<<<<<< HEAD
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

=======
import { doc, getDoc, setDoc } from "firebase/firestore";
=======
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
>>>>>>> 5fc7ead (push in my branch)
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

>>>>>>> 6e2238d (connecting db coll and coll push in redux store, authChangeHook logic moved to handleAuth.js)
export const getUserDB = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

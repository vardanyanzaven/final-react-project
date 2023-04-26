import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const setUserDB = async ({ uid, email }) => {
  await setDoc(doc(db, "users", uid), {
    email: email,
  });
};

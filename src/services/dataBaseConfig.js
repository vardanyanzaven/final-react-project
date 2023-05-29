import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { changeUserInfo } from "../store/slicers/userSlice";
export const updateUserProfile = async ({ uid }, prop, dispatch) => {
  const { userInfo, disp } = dispatch;
  try {
    await updateDoc(doc(db, "users", uid), {
      ...prop,
    });
    disp(
      changeUserInfo({
        ...userInfo,
        ...prop,
      })
    );
  } catch (error) {
    console.log(error + "in update profile");
  }
};

export const setUserDB = async ({ uid }, phone, fullName, gender) => {
  await setDoc(doc(db, "users", uid), {
    phone,
    fullName,
    gender,
    savedCars: [],
    type: "client",
    photoURL: null,
    purchases: [],
  });
};

export const getUserDB = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

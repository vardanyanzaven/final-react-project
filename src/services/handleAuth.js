import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { setUser } from "../store/slicers/userSlice";
import { getUserDB, setUserDB } from "./dataBaseConfig";
import { useAuth } from "../hooks/useAuth";
import { changeMessage } from "../store/slicers/statusSlice";
import { SUCCESS_MESSAGE } from "../constants/common";
import { getError } from "../utils/errors";

export const emailSignUp = async (
  email,
  password,
  mobile,
  fullName,
  gender,
  onClose,
  dispatch
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUserDB(user, mobile, fullName, gender);
    onClose();
    dispatch(changeMessage(SUCCESS_MESSAGE.loggedIn));
  } catch (e) {
    const error = getError(e);
    dispatch(changeMessage(error));
  }
};

export const emailSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const useAuthListener = (setLoading) => {
  const { userInfo } = useAuth();
  const disp = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        const dbData = user && (await getUserDB(user.uid));
        const res =
          dbData?.type === "driver"
            ? { ...dbData, myCars: dbData.myCars.map((ref) => ref.id) }
            : dbData;

        disp(
          setUser({
            userInfo: user
              ? {
                  ...userInfo,
                  ...res,
                  savedCars: dbData.savedCars.map((ref) => ref.id),
                  photoURL: user.photoURL,
                  purchases: dbData.purchases,
                }
              : {},
            email: user?.email,
            token: user?.accessToken,
            id: user?.uid,
          })
        );
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    });
  }, []);
};

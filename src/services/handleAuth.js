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
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/common";

export const emailSignUp = async (
  email,
  password,
  mobile,
  fullName,
  gender,
  onClose,
  dispatch
) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  try {
    setUserDB(user, mobile, fullName, gender);
    onClose();
    dispatch(changeMessage(SUCCESS_MESSAGE.loggedIn));
  } catch (e) {
    dispatch(changeMessage(ERROR_MESSAGE.something));
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
                  ...dbData,
                  savedCars: dbData?.savedCars.map((ref) => ref.id),
                  purchases: dbData?.purchases,
                  photoURL: user.photoURL,
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

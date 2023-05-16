import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { setUser } from "../store/slicers/userSlice";
import { getUserDB, setUserDB } from "./dataBaseConfig";
import { useAuth } from "../hooks/useAuth";

export const emailSignUp = async (
  email,
  password,
  mobile,
  fullName,
  gender,
  onClose
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(user, mobile, fullName, gender);
    setUserDB(user, mobile, fullName, gender).catch((e) => {
      throw new Error(e);
    });
    onClose();
  } catch (e) {
    console.log(e);
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
        disp(
          setUser({
            userInfo: user
              ? {
                  ...userInfo,
                  ...dbData,
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

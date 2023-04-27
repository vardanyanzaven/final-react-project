import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setUser } from "../store/slicers/userSlice";
import { getUserDB, setUserDB } from "./dataBaseConfig";
import { useAuth } from "../hooks/useAuth";

export const emailSignUp = async (email, password, phone, setLoading) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      setUserDB(user, phone);
    })
    .catch(({ message }) => console.log(message))
    .finally(() => setLoading(false));
};

export const emailSignIn = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch ({ message }) {
    return console.log(message);
  }
};

export const useAuthListener = (setLoading) => {
  const { userInfo } = useAuth();
  const disp = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const dbData = await getUserDB(user.uid);
      disp(
        setUser({
          userInfo: {
            ...userInfo,
            ...dbData,
            photoURL: user?.photoURL,
          },
          email: user?.email,
          token: user?.accessToken,
          id: user?.uid,
        })
      );
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);
};

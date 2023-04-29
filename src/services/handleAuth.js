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
  phone,
  fullName,
  gender,
  setLoading
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      setUserDB(user, phone, fullName, gender);
    })
    .catch(({ message }) => console.log(message + "in signup"))
    .finally(() => setLoading(false));
};

export const emailSignIn = async (email, password, setLoading) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch ({ message }) {
    return console.log(message);
  } finally {
    setLoading(false);
  }
};

export const useAuthListener = (setLoading) => {
  const { userInfo } = useAuth();
  const disp = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);
};

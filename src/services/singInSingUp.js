import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slicers/userSlice";

export const emailSignUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password).catch(({ message }) =>
    console.log(message)
  );

export const emailSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password).catch(({ message }) =>
    console.log(message)
  );

export const OnUserChangings = () => {
  const disp = useDispatch();
  onAuthStateChanged(auth, (user) => {
    disp(
      setUser({
        userInfo: {
          photoURL: user?.photoURL,
          phoneNumber: user?.phoneNumber,
        },
        email: user?.email,
        token: user?.accessToken,
        id: user?.uid,
      })
    );
  });
};

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export const emailSignUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password).catch(({ message }) =>
    console.log(message)
  );

export const emailSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password).catch(({ message }) =>
    console.log(message)
  );

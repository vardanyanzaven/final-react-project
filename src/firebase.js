import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtGterdnw_k0_SiU5b8uzgWC89wppL6wU",
  authDomain: "project-bd3ff.firebaseapp.com",
  projectId: "project-bd3ff",
  storageBucket: "project-bd3ff.appspot.com",
  messagingSenderId: "42668976829",
  appId: "1:42668976829:web:5ac7612e0eb0af0bf565d4",
  measurementId: "G-QYVPP2Q0ZR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();

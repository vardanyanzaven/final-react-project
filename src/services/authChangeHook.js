import { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slicers/userSlice";

export const useAuthListener = (setLoading) => {
  const disp = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);
};

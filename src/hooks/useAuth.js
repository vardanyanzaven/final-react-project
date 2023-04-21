import { useSelector } from "react-redux";
import { auth } from "../firebase";

export const useAuth = () => {
  const { email, id, token } = useSelector((state) => state.auth);
  const img = auth.currentUser?.photoURL;

  return {
    isAuth: !!email,
    email,
    token,
    img,
    id,
  };
};

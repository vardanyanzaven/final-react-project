import { useSelector } from "react-redux";

export const useAuth = () => {
  const { email, id, token, userInfo } = useSelector((state) => state.auth);

  return {
    isAuth: !!email,
    userInfo,
    email,
    token,
    id,
  };
};

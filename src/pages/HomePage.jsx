import React from "react";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { isAuth, userInfo } = useAuth();

  return (
    <>
      {isAuth ? (
        <div>Welcome to my site {userInfo.fullName}</div>
      ) : (
        <div>HomePage</div>
      )}
    </>
  );
};

export default HomePage;

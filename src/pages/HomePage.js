import React from "react";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { isAuth, email } = useAuth();

  return (
    <>{isAuth ? <div>Welcome to my site {email}</div> : <div>HomePage</div>}</>
  );
};

export default HomePage;

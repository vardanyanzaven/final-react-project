import React from "react";
import { Box } from "@mui/material";
import { mainStyles } from "./styles";

const Main = ({ children }) => {
  return <Box sx={mainStyles.box}>{children}</Box>;
};

export default Main;

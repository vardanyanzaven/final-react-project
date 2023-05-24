import React from "react";
import { Box } from "@mui/material";

const Main = ({ children }) => {
  return <Box sx={{ minHeight: "100vh" }}>{children}</Box>;
};

export default Main;

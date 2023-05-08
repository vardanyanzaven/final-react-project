import { Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../../hooks/useAuth";

const PersonalSettings = () => {
  const { email } = useAuth();
  return (
    <Box>
      <Typography>{email}</Typography>
    </Box>
  );
};

export default PersonalSettings;

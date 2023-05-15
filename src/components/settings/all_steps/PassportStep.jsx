import { TextField } from "@material-ui/core";
import { Box } from "@mui/joy";
import { InputLabel } from "@mui/material";
import React from "react";

const PassportStep = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
      <InputLabel
        htmlFor="file"
        sx={{
          cursor: "pointer",
          bgcolor: "#787812",
          width: "fit-content",
          paddingInline: "20px",
          borderRadius: "12px",
        }}>
        Enter your passport
      </InputLabel>
      <TextField id="file" type="file" style={{ display: "none" }} />
    </Box>
  );
};

export default PassportStep;

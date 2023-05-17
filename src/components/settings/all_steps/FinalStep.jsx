import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

const FinalStep = ({ completed, setCompleted, setNext }) => {
  const [preview, setPreview] = useState(null);

  const chooseSelfiPh = (e) => {
    if (!e.target.files[0]) {
      setNext(true);
      return;
    }
    setNext(false);
    setCompleted({ ...completed, selfie: e.target.files[0] });

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Upload your driver's license photo file for continue verification
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="inherit" component="label">
            Photo here
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={chooseSelfiPh}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          {preview && <img src={preview} height="200px" />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinalStep;

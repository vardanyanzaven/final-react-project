import * as React from "react";
import { useParams } from "react-router";
import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openDialog } from "../../../store/slicers/dialogSlice";
import { useAuth } from "../../../hooks/useAuth";
import { SERVICE_DATA } from "../../../constants/common";

export default function SelectedService() {
  const { serve } = useParams();
  const [info] = SERVICE_DATA(serve);
  const [booking, setbooking] = useState(false);
  const { isAuth } = useAuth();
  const disp = useDispatch();

  const openSignUp = () => {
    disp(
      openDialog({
        isSignUpOpen: true,
      })
    );
  };

  const handleBookClick = () => {
    alert("book success!");
    // something...
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: "75%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
        }}
      >
        <Typography variant="h4"> {info.name.toUpperCase()}</Typography>
        <img component="img" height="400" src={info.url} alt="info.name" />
        <Typography sx={{ m: 5, width: "65%" }}> {info.title}</Typography>
        <Button
          color="primary"
          disabled={false}
          size="medium"
          variant="outlined"
          sx={{ m: 1 }}
          onClick={isAuth ? handleBookClick : openSignUp}
        >
          Book now
        </Button>
      </Card>
    </Box>
  );
}

import * as React from "react";
import { useParams } from "react-router";
import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openDialog } from "../../../store/slicers/dialogSlice";
import { useAuth } from "../../../hooks/useAuth";
import { SERVICE_DATA } from "../../../constants/common";
import { Booking } from "./Booking";
import { selectedServiceStyle } from "./styles";

export default function SelectedService() {
  const { serve } = useParams();
  const [info] = SERVICE_DATA(serve);
  const [booking, setbooking] = useState(true);
  const { isAuth } = useAuth();
  const disp = useDispatch();

  const openSignUp = () => {
    disp(
      openDialog({
        isSignUpOpen: true,
        isSignInOpen: false,
      })
    );
  };

  const handleBookClick = () => {
    setbooking(false);
  };

  return booking ? (
    <Box sx={selectedServiceStyle.mainBox}>
      <Card sx={selectedServiceStyle.card}>
        {/* <Typography variant="h4"> {info.name.toUpperCase()}</Typography> */}
        <img
          component="img"
          height="400"
          src={info.url}
          alt="info.name"
          style={{ marginTop: "8%" }}
        />
        <Typography sx={{ m: 5, width: "65%" }}> {info.title}</Typography>
        <Button
          color="primary"
          disabled={false}
          size="medium"
          variant="outlined"
          sx={{ m: 1, mt: 1 }}
          onClick={isAuth ? handleBookClick : openSignUp}
        >
          Book now
        </Button>
      </Card>
    </Box>
  ) : (
    <Booking serviceName={info.name} />
  );
}

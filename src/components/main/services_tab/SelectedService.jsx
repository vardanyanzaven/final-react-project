import * as React from "react";
import { useParams } from "react-router";
import {
  Box,
  Button,
  Card,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openDialog } from "../../../store/slicers/dialogSlice";
import { useAuth } from "../../../hooks/useAuth";
import { SERVICE_DATA } from "../../../constants/common";
import { Booking } from "./Booking";
import { selectedServiceStyle } from "./styles";

const selServiceTheme = createTheme({
  typography: {
    fontFamily: ["Quicksand", "IBM Plex Sans", "Roboto", "sans-serif"].join(
      ","
    ),
  },
  palette: {
    gold: {
      light: "#FFC30F",
      main: "#F2B90D",
      dark: "#E8AE00",
      contrastText: "#007292",
    },
  },
});

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
    <ThemeProvider theme={selServiceTheme}>
      <Box sx={selectedServiceStyle.mainBox}>
        <Card sx={selectedServiceStyle.card}>
          <Typography variant="h4" color="#F2B90D"> {info.name.toUpperCase()}</Typography>
          <img
            height="500"
            src={info.url}
            alt="info.name"
            style={{ margin: "3rem 0 1rem 0" }}
          />
          <Typography variant="h6" sx={{ m: 5, width: "65%" }}>
            {" "}
            {info.title}
          </Typography>
          <Button
            variant="outlined"
            size="large"
            color="gold"
            sx={{
              border: "2px solid",
              fontWeight: "bold",
              transition: "all 0.15s",
              "&:hover": {
                border: "2px solid",
                transform: "scale(1.1)",
              },
            }}
            onClick={isAuth ? handleBookClick : openSignUp}
          >
            Book now
          </Button>
        </Card>
      </Box>
    </ThemeProvider>
  ) : (
    <Booking serviceName={info.name} />
  );
}

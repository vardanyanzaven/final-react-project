import { useParams } from "react-router";
import { SERVICE_DATA } from "./booking_form/servicesData";
import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import { Booking } from "./Booking";
import * as React from "react";

export default function SelectedService() {
  const { serve } = useParams();
  const [info] = SERVICE_DATA(serve);
  const [booking, setbooking] = useState(true);

  return booking ? (
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
          mt: 6,
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
          onClick={() => setbooking(false)}
        >
          Book now
        </Button>
      </Card>
    </Box>
  ) : (
    <Booking />
  );
}

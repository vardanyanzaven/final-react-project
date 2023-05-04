import * as React from "react";
import { useParams } from "react-router";
import { SERVICE_DATA } from "./booking_form/servicesData";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { CardContent } from "@material-ui/core";
import { Booking } from "./Booking";
import { useState } from "react";

export default function SelectedService() {
  const { serve } = useParams();
  const [info] = SERVICE_DATA(serve);
  const [booking, setbooking] = useState(false);

  // return booking ? (
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 20,
        textAlign: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4"> {info.name}</Typography>
        <CardMedia
          component="img"
          height="400"
          width="400"
          image={info.url}
          alt="info.name"
          sx={{ m: 4 }}
        />
        <CardContent
        // sx={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "center",

        // }}
        >
          <Typography sx={{ mb: 2 }}> {info.title}</Typography>
          <Button
            color="primary"
            disabled={false}
            size="medium"
            variant="outlined"
            onClick={() => setbooking(!booking)}
          >
            Book now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
  // ) : (
  //   <Booking />
  // );
}

import * as React from "react";
import { useParams } from "react-router";
import { SERVICE_DATA } from "./booking_form/servicesData";
import { Box, Button, Card, Typography } from "@mui/material";
import { Booking } from "./Booking";
import { useDispatch, useSelector } from "react-redux";
import { handleOpen } from "../../../store/slicers/serviceSlice";

export default function SelectedService() {
  const { serve } = useParams();
  const [info] = SERVICE_DATA(serve);
  const dispatch = useDispatch();
  const value = useSelector((state) => state.service.value);

  return value ? (
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
          maxWidth: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          {" "}
          {info.name.toUpperCase()}
        </Typography>
        <img component="img" height="400" src={info.url} alt="info.name" />
        <Typography sx={{ m: 5, width: "65%" }}> {info.title}</Typography>
        <Button
          color="primary"
          // disabled={}
          size="medium"
          variant="outlined"
          sx={{ m: 1 }}
          onClick={() => dispatch(handleOpen(!value))}
        >
          Book now
        </Button>
      </Card>
    </Box>
  ) : (
    <Booking value={value} dispatch={dispatch} />
  );
}

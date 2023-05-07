import React from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";
import DateForBooking from "./booking_form/DateForBooking";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import SelectServiceType from "./booking_form/SelectServiceType";
import SelectCars from "./booking_form/SelectcCars";

export const Booking = ({ value, dispatch }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        mt: 2,
      }}>
      <Box sx={{ display: "flex" }}>
        {/* <Box
          open={!value}
          onClose={() => dispatch(handleOpen(!value))}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        > */}
        <form
          style={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}>
          <Box>
            <Typography variant="h4"> Book Here</Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 1,
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "350px",
                alignItems: "center",
              }}>
              <SelectServiceType sx={{ width: 170 }} />
              <SelectCars sx={{ width: 170 }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "350px",
              }}>
              <TextField type="name " label=" name" sx={{ width: 170 }} />
              <TextField type="surname " label="surname" sx={{ width: 170 }} />
            </Box>

            <TextField fullWidth type="email" label="Email" required />
            <PhoneInput
              inputProps={{ name: "phone", required: false }}
              inputStyle={{ height: "56px", width: "100%" }}
              country={"am"}
            />

            {/* <DialogActions> </DialogActions> */}
            <DateForBooking />
          </Box>
        </form>

        <Box sx={{ width: 500, height: 500, border: 1 }}>
          <Typography> Here will be map </Typography>
        </Box>
      </Box>
    </Box>
  );
};

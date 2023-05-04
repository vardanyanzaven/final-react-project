// import React from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Divider,
// } from "@mui/material";
// import DatePickUP from "../services_tab/booking_details/DatePickUP";
// import SelectServiceType from "../services_tab/booking_details/SelectServiceType";
import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import DateForBooking from "./booking_form/DateForBooking";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import SelectServiceType from "./booking_form/SelectServiceType";
import SelectCars from "./booking_form/SelectcCars";

export const Booking = ({ service, onClose }) => {
  return (
    <Dialog
      open={!service}
      onClose={onClose}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <form
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <DialogTitle>
          {" "}
          <Typography variant="h4"> Book Here</Typography>{" "}
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "350px",
              alignItems: "center",
            }}
          >
            <SelectServiceType sx={{ width: 170 }} />
            <SelectCars sx={{ width: 170 }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "350px",
            }}
          >
            <TextField type="name " label=" name" sx={{ width: 170 }} />
            <TextField type="surname " label="surname" sx={{ width: 170 }} />
          </Box>

          <TextField fullWidth type="email" label="Email" required />
          <PhoneInput
            inputProps={{ name: "phone", required: false }}
            inputStyle={{ height: "56px", width: "100%" }}
            country={"am"}
          />

          <DialogActions> </DialogActions>
          <DateForBooking />
        </DialogContent>
      </form>
    </Dialog>
  );
};

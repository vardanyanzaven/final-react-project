import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import React from "react";
import DateForBooking from "./booking_form/DateForBooking";
import SelectServiceType from "./booking_form/SelectServiceType";
import SelectCars from "./booking_form/SelectcCars";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../../store/slicers/statusSlice";
import { SUCCESS_MESSAGE } from "../../../constants/common";

export const Booking = () => {
  const [page1, setpage1] = useState(true);
  const disp = useDispatch();

  const anotherStep = () => {
    setpage1(false);
    disp(changeMessage(SUCCESS_MESSAGE.booked));
  };
  return page1 ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          width: 1200,
          height: 800,
          mt: 3,
        }}
      >
        <Box
          sx={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            ml: 10,
          }}
        >
          <Typography variant="h4"> Book Here </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "400px",
                alignItems: "center",
              }}
            >
              <SelectServiceType sx={{ width: 195 }} />
              <SelectCars sx={{ width: 195 }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "400px",
              }}
            >
              <TextField type="name " label=" name" sx={{ width: 195 }} />
              <TextField type="surname " label="surname" sx={{ width: 195 }} />
            </Box>

            <TextField fullWidth type="email" label="Email" required />
            <PhoneInput
              inputProps={{ name: "phone", required: false }}
              inputStyle={{ height: "56px", width: "100%" }}
              country={"am"}
            />
            <DateForBooking />
            <Button variant="contained" sx={{ mt: 2 }} onClick={anotherStep}>
              Continue
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: 400, height: 400, border: 1, mr: 6 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1288481.51862053!2d43.89771393241201!3d40.12227924678934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40155684e773bac7%3A0xd0b4757aeb822d23!2sArmenia!5e0!3m2!1sen!2sam!4v1683397947487!5m2!1sen!2sam"
            width="400"
            height="400"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Paper>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: 1000,
          height: 800,
          mt: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mt: 8 }}>
            Booked
          </Typography>

          <Button variant="contained" sx={{ mt: 2 }}>
            finish
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

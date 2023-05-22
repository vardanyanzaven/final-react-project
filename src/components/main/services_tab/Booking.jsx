import { useDispatch, useSelector } from "react-redux";
import { changeMessage } from "../../../store/slicers/statusSlice";
import { SUCCESS_MESSAGE } from "../../../constants/common";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import { addDoc, collection } from "@firebase/firestore";
import { PayPal } from "./PayPal";
import "react-phone-input-2/lib/style.css";
import React from "react";
import DateForBooking from "./booking_form/DateForBooking";
import SelectCars from "./booking_form/SelectcCars";
import dayjs from "dayjs";
import PhoneField from "../../dialog/components/PhoneField";
import MyMap from "./MyMap";
import SelectCarModel from "./booking_form/SelectCarModel";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Booking = () => {
  const [carModel, setCarModel] = useState("");
  const [car, setcar] = useState("");
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setdate] = useState(dayjs(new Date()));
  const [time, settime] = useState(dayjs(Date.now()));
  const [page1, setpage1] = useState(true);
  const [cordinates, setcordinates] = useState();
  const [disabled, setdisabled] = useState(true);
  const [value, setvalue] = useState(50);
  const disp = useDispatch();
  const { cars } = useSelector((state) => state.catalogue);

  const TEXT_FEEDBACK_FOR_USER = `The booking has been successfully done, we inform you that ${car} ${carModel}
  machine will be on the ${cordinates} cordinates you provided, on ${date.$d
    .toString()
    .slice(0, 15)} at ${time.$d
    .toString()
    .slice(16, 21)} time, wish you enjoyable service.`;

  useEffect(() => {
    const newValue = cars.filter((v) => v.carModel === carModel);
    if (newValue.length >= 1 && newValue[0].price) {
      setvalue(newValue[0].price);
    }
  }, [carModel]);

  const anotherStep = async () => {
    return await addDoc(collection(db, "bookings"), {
      name: name,
      surName: surname,
      carModel: carModel,
      car: car,
      email: email,
      date: date.$d && time.$d,
      phoneNumber: phone,
      carriedOut: "",
      id: Math.random(),
    })
      .then(() => {
        setpage1(false);
        disp(changeMessage(SUCCESS_MESSAGE.booked));
      })
      .catch(({ message }) => console.log(message));
  };

  return page1 ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          width: 1200,
          height: 800,
          mt: 3,
        }}>
        <Box
          sx={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            ml: 10,
          }}>
          <Typography variant="h4"> Book Here </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "400px",
                alignItems: "center",
              <SelectCars sx={{ width: 195 }} car={car} setcar={setcar} />
              <SelectCarModel
              <SelectServiceType
                sx={{ width: 195 }}
                carModel={carModel}
                setCarModel={setCarModel}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "400px",
              }}>
              <TextField
                type="name "
                label=" name"
                value={name}
                sx={{ width: 195, mt: 2 }}
                onChange={(e) => setname(e.target.value)}
              />
              <TextField
                type="surname "
                label="surname"
                value={surname}
                sx={{ width: 195, mt: 2 }}
                onChange={(e) => setsurname(e.target.value)}
              />
            </Box>

            <TextField
              fullWidth
              type="email"
              label="Email"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
              sx={{ mt: 2 }}
            />
            <PhoneField phoneSett={[phone, setPhone]} sx={{ mt: 2 }} />
            <DateForBooking
              date={date}
              setdate={setdate}
              time={time}
              settime={settime}
            />
            <PayPal setdisabled={setdisabled} value={value} />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={anotherStep}
              disabled={disabled}
            >
              Continue
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: 600, height: 500, mr: 6, mt: 6 }}>
          <MyMap setcordinates={setcordinates} />
        </Box>
      </Paper>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          width: 800,
          height: 600,
          mt: 10,
        }}>
        <Box>
          <Typography variant="h4" sx={{ mt: 10 }}>
            {TEXT_FEEDBACK_FOR_USER}
          </Typography>
        </Box>
        <Button variant="contained" sx={{ mb: 6 }}>
          <Link to={"/"}>Got it</Link>
        </Button>
      </Paper>
    </Box>
  );
};

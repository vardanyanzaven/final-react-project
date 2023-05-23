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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookScheme } from "../../../utils/validation";
import PhoneInput from "react-phone-input-2";
import { styles } from "../../../shared/auth_dialog/styles";

export const Booking = () => {
  console.log(new Date());
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(bookScheme),
  });
  const [page1, setpage1] = useState(true);
  const [cordinates, setcordinates] = useState();
  const [disabled, setdisabled] = useState(false);
  const [value, setvalue] = useState(10);
  const disp = useDispatch();
  const { cars } = useSelector((state) => state.catalogue);

  // const TEXT_FEEDBACK_FOR_USER = `The booking has been successfully done, we inform you that ${} ${}
  // machine will be on the ${cordinates} cordinates you provided, on ${date.$d
  //   .toString()
  //   .slice(0, 15)} at ${time.$d
  //   .toString()
  //   .slice(16, 21)} time, wish you enjoyable service.`;

  // useEffect(() => {
  //   const newValue = cars.filter((v) => v.carModel === carModel);
  //   if (newValue.length >= 1 && newValue[0].price) {
  //     setvalue(newValue[0].price);
  //   }
  // }, [carModel]);

  const anotherStep = async (data) => {
    const { car, carModel, pickUpDate, phone } = data;
    return await addDoc(collection(db, "bookings"), {
      carModel: carModel,
      car: car,
      bookDate: new Date().getTime,
      phoneNumber: phone,
      carriedOut: "",
      pickUpTime: pickUpDate,
    })
      .then(() => {
        setpage1(false);
        disp(changeMessage(SUCCESS_MESSAGE.booked));
      })
      .catch(({ message }) => console.log(message));
  };

  return page1 ? (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(anotherStep)}
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
              <SelectCars register={register} sx={{ width: 195 }} />
              <SelectCarModel />
            </Box>
            <Controller
              control={control}
              name="phone"
              rules={{ required: true }}
              render={({ field: { ...field } }) => (
                <PhoneInput
                  {...field}
                  inputExtraProps={{
                    required: true,
                    autoComplete: true,
                  }}
                  inputStyle={{
                    ...styles.phone,
                    outline: errors.mobile && "1px solid #D32F2F",
                  }}
                  country="am"
                />
              )}
            />
            {/* <PhoneField phoneSett={[phone, setPhone]} sx={{ mt: 2 }} /> */}
            <TextField type="date" variant="outlined" />
            {/* <DateForBooking
              date={date}
              setdate={setdate}
              time={time}
              settime={settime}
            /> */}
            <PayPal setdisabled={setdisabled} value={value} />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              disabled={disabled}
              component="submit"
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
      }}
    >
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
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mt: 10 }}>
            {/* {TEXT_FEEDBACK_FOR_USER} */}
          </Typography>
        </Box>
        <Button variant="contained" sx={{ mb: 6 }}>
          <Link to={"/"}>Got it</Link>
        </Button>
      </Paper>
    </Box>
  );
};

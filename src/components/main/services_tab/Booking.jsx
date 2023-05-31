import React from "react";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { addDoc, collection } from "@firebase/firestore";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { db } from "../../../firebase";
import { PayPal } from "./PayPal";
import SelectCars from "./booking_form/SelectcCars";
import MyMap from "./MyMap";
import SelectCarModel from "./booking_form/SelectCarModel";
import { bookScheme } from "../../../utils/validation";
import { SUCCESS_MESSAGE } from "../../../constants/common";
import { changeMessage } from "../../../store/slicers/statusSlice";
import { styles } from "../../../shared/auth_dialog/styles";
import { ERROR_MESSAGE } from "../../../constants/common";
import { useAuth } from "../../../hooks/useAuth";
import { bookingStyles, feedBackStyles } from "./styles";

export const Booking = ({ serviceName }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(bookScheme),
  });
  const [page1, setPage1] = useState(true);
  const [cordinates, setcordinates] = useState();
  const [disabled, setDisabled] = useState(true);
  const [modelDisabled, setModelDisabled] = useState(true);
  const [carModels, setCarModels] = useState([]);
  const [value, setValue] = useState(10);
  const [showPrice, setShowPrice] = useState(false);
  const [complitedData, setComplitedData] = useState({});
  const [address, setAddress] = useState("");
  const disp = useDispatch();
  const { id } = useAuth();

  const TEXT_FEEDBACK_FOR_USER = `The booking has been successfuly done, we inform you that the 
  vehicle will arrive to ${address}, on ${complitedData?.pickUpDate
    ?.toString()
    .slice(0, 15)} at ${complitedData?.pickUpDate?.toString().slice(16, 21)}.`;

  const anotherStep = async (data) => {
    const { car, carModel, pickUpDate, phone } = data;
    if (new Date(pickUpDate).getTime() < new Date().getTime()) {
      disp(changeMessage(ERROR_MESSAGE.dateValidate));
      return;
    }

    if (!showPrice) {
      setShowPrice(true);
      setDisabled(true);
      return;
    }

    await addDoc(collection(db, "bookings"), {
      carModel: carModel,
      car: car,
      bookDate: new Date().getTime(),
      phoneNumber: phone,
      carriedOut: false,
      pickUpTime: pickUpDate,
      price: value,
      address: address,
      personId: id,
      service: serviceName,
    })
      .then(() => {
        setPage1(false);
        disp(changeMessage(SUCCESS_MESSAGE.booked));
        setComplitedData(data);
      })
      .catch(({ message }) => console.log(message));
  };

  return page1 ? (
    <Box sx={bookingStyles.mainBox}>
      <Box sx={bookingStyles.secondBox}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(anotherStep)}
          sx={bookingStyles.formBox}>
          <Typography variant="h4" color="#F2B90D">
            {" "}
            Book Here{" "}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}>
            <Box sx={bookingStyles.carBox}>
              <SelectCars
                register={register}
                error={errors.car?.message}
                setDisabled={setModelDisabled}
                setCarModels={setCarModels}
              />
              <SelectCarModel
                register={register}
                error={!!errors.carModel}
                disabled={modelDisabled}
                carModels={carModels}
                setValue={setValue}
              />
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
                    outline: errors.phone && "1px solid #D32F2F",
                  }}
                  country="am"
                />
              )}
            />
            <TextField
              error={!!errors.pickUpDate}
              type="date"
              variant="outlined"
              sx={{
                mb: 2,
                mt: 2,
              }}
              helperText={errors.pickUpDate?.message}
              {...register("pickUpDate")}
            />
            {showPrice && <PayPal setDisabled={setDisabled} value={value} />}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              disabled={disabled}
              type="submit">
              Continue
            </Button>
          </Box>
          {showPrice && (
            <Typography sx={{ mt: 3, fontSize: 25 }}>
              It costs {value}$
            </Typography>
          )}
        </Box>
        <Box sx={{ width: 600, height: 500, mr: 6, mt: 6 }}>
          <MyMap
            setDisabled={setDisabled}
            setcordinates={setcordinates}
            setAddress={setAddress}
          />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box sx={feedBackStyles.mainBox}>
      <Paper sx={feedBackStyles.paper}>
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

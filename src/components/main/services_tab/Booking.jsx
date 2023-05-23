import { useDispatch, useSelector } from "react-redux";
import { changeMessage } from "../../../store/slicers/statusSlice";
import { SUCCESS_MESSAGE } from "../../../constants/common";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import { addDoc, collection } from "@firebase/firestore";
import { PayPal } from "./PayPal";
import "react-phone-input-2/lib/style.css";
import React from "react";
import SelectCars from "./booking_form/SelectcCars";
import MyMap from "./MyMap";
import SelectCarModel from "./booking_form/SelectCarModel";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookScheme } from "../../../utils/validation";
import PhoneInput from "react-phone-input-2";
import { styles } from "../../../shared/auth_dialog/styles";
import { ERROR_MESSAGE } from "../../../constants/common";

export const Booking = () => {
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
  const { cars } = useSelector((state) => state.catalogue);
  const TEXT_FEEDBACK_FOR_USER = `The booking has been successfully done, we inform you that ${
    complitedData.pickUpDate
  } ${"1"}
  machine will be on the ${address} (${cordinates}) cordinates you provided, on ${complitedData?.pickUpDate
    ?.toString()
    .slice(0, 15)} at ${complitedData?.pickUpDate
    ?.toString()
    .slice(16, 21)} time, wish you enjoyable service.`;

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
    })
      .then(() => {
        setPage1(false);
        disp(changeMessage(SUCCESS_MESSAGE.booked));
        setComplitedData(data);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          width: 1200,
          height: 600,
        }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(anotherStep)}
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
                mb: 2,
              }}>
              <SelectCars
                register={register}
                error={errors.car?.message}
                setDisabled={setModelDisabled}
                setCarModels={setCarModels}
              />
              <SelectCarModel
                register={register}
                error={errors.carModel?.message}
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
              error={errors.pickUpDate?.message}
              type="date"
              variant="outlined"
              sx={{ mb: 2, mt: 2 }}
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

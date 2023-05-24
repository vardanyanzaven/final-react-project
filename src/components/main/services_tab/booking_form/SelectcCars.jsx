import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCatalogue } from "../../../../store/slicers/catalogueSlice";
import { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";

export default function SelectCars({
  register,
  error,
  setDisabled,
  setCarModels,
}) {
  const { cars } = useSelector((state) => state.catalogue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCatalogue());
  }, []);

  const handleChooseCar = async (e) => {
    try {
      const value = e.target.value;
      const carsRef = collection(db, "catalogueCars");
      const carQuery = await getDocs(
        query(carsRef, where("carBrand", "==", value))
      );
      const carModels = [];
      carQuery.forEach((car) => {
        const res = car.data();
        carModels.push({ name: res.carModel, price: res.price });
      });
      setCarModels(carModels);
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TextField
      select
      error={error}
      defaultValue=""
      label="Select Car Brand"
      onChange={handleChooseCar}
      inputProps={{ ...register("car") }}
      sx={{ width: 195, mt: 3 }}
      helperText={error}>
      {cars.map((c) => (
        <MenuItem key={Math.random()} value={c.carBrand}>
          {c.carBrand}
        </MenuItem>
      ))}
    </TextField>
  );
}

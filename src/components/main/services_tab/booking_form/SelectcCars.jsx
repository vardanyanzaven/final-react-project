import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCatalogue } from "../../../../store/slicers/catalogueSlice";
import { useEffect } from "react";

export default function SelectCars({ register }) {
  const [open, setOpen] = useState(false);
  const { cars } = useSelector((state) => state.catalogue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCatalogue());
  }, []);

  // const onClose = () => {
  //   setOpen(!open);
  // };

  // const handleChange = (e) => {
  //   setcar(e.target.value);
  // };

  return (
    // <div >
    //   <FormControl  sx={{ width: 195, mt: 3 }}>
    <TextField
      required
      select
      displayEmpty
      open={open}
      // onClose={onClose}
      onClick={() => setOpen(!open)}
      inputProps={{ "aria-label": "Without label", ...register("car") }}
      sx={{ width: 195, mt: 3 }}
    >
      <MenuItem disabled value="">
        <em>Select Car Brand </em>
      </MenuItem>
      {cars.map((c) => (
        <MenuItem key={Math.random()} value={c.carBrand}>
          {c.carBrand}
        </MenuItem>
      ))}
    </TextField>
    /* /* </FormControl> */
    /* </div> */
  );
}

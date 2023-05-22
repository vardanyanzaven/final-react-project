import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { SERVICE_DATA } from "./servicesData";
import { useDispatch, useSelector } from "react-redux";
import { setCatalogue } from "../../../../store/slicers/catalogueSlice";
import { useEffect } from "react";

export default function SelectCarModel({ carModel, setCarModel }) {
  const [open, setOpen] = useState(false);
  const { cars } = useSelector((state) => state.catalogue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCatalogue());
  }, []);

  const onClose = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    setCarModel(e.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 195, mt: 3 }}>
        <Select
          required
          displayEmpty
          value={carModel}
          onChange={handleChange}
          open={open}
          onClose={onClose}
          onClick={() => setOpen(!open)}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Select Car Model </em>
          </MenuItem>
          {cars.map((s) => (
            <MenuItem key={Math.random()} value={s.carModel}>
              {s.carModel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

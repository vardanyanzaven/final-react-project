import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { SERVICE_DATA } from "./servicesData";
import { useDispatch, useSelector } from "react-redux";
import { setCatalogue } from "../../../../store/slicers/catalogueSlice";
import { useEffect } from "react";

export default function SelectCars({ car, setcar }) {
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
    setcar(e.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 195, mt: 3 }}>
        <Select
          required
          displayEmpty
          value={car}
          onChange={handleChange}
          open={open}
          onClose={onClose}
          onClick={() => setOpen(!open)}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Select Car Brand </em>
          </MenuItem>
          {cars.map((c) => (
            <MenuItem key={Math.random()} value={c.carBrand}>
              {c.carBrand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

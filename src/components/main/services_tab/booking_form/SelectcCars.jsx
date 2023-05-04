import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { servicesData } from "./servicesData";

export default function SelectCars() {
  const [car, setCar] = useState("");
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setCar(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 170, mt: 3 }}>
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
            <em>Select Car</em>
          </MenuItem>
          {servicesData.map((c) => (
            <MenuItem key={Math.random()} value={c.car}>
              {c.car}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

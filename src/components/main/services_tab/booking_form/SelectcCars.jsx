import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { SERVICE_DATA } from "./servicesData";

export default function SelectCars({ car, setcar }) {
  const [open, setOpen] = useState(false);

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
            <em>Select Car</em>
          </MenuItem>
          {SERVICE_DATA().map((c) => (
            <MenuItem key={Math.random()} value={c.car}>
              {c.car}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

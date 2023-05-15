import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { SERVICE_DATA } from "./servicesData";

export default function SelectServiceType({ service, setservice }) {
  const [open, setOpen] = useState(false);
  console.log(service);

  const onClose = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    setservice(e.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 195, mt: 3 }}>
        <Select
          required
          displayEmpty
          value={service}
          onChange={handleChange}
          open={open}
          onClose={onClose}
          onClick={() => setOpen(!open)}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Select Service Type</em>
          </MenuItem>
          {SERVICE_DATA().map((s) => (
            <MenuItem key={Math.random()} value={s.name}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

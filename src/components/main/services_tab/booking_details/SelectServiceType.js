import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const names = [
  " Airport ",
  "Wedding",
  "Happy Birthday",
  "Baptizm",
  "Out of city",
  "Casino",
];

export default function SelectServiceType() {
  const [ServiceName, setServiceName] = useState("");
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setServiceName(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 250, mt: 3 }}>
        <Select
          required
          displayEmpty
          value={ServiceName}
          onChange={handleChange}
          open={open}
          onClose={onClose}
          onClick={() => setOpen(!open)}
          inputProps={{ "aria-label": "Without label" }}>
          <MenuItem disabled value="">
            <em>Select Service Type</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

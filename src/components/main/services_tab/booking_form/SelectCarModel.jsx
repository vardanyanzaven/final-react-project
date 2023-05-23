import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";

export default function SelectCarModel({
  register,
  error,
  disabled,
  carModels,
  setValue,
}) {
  const handlePriceChange = (e) => {
    const name = e.target.value;
    const price = carModels.filter((e) => e.name === name)[0].price;
    setValue(Math.round(price / 200));
  };

  return (
    <div>
      <FormControl sx={{ width: 195, mt: 3 }}>
        <TextField
          select
          disabled={disabled}
          error={error}
          label="Select Car Model "
          defaultValue=""
          onChange={handlePriceChange}
          inputProps={{ ...register("carModel") }}
          helperText={error}>
          {carModels.map((model) => (
            <MenuItem key={Math.random()} value={model.name}>
              {model.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </div>
  );
}

import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneField = ({ phoneSett }) => {
  const [phone, setPhone] = phoneSett;
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleOnChange = (value, country) => {
    setPhone(value);
    setSelectedCountry(country.name);
  };

  return (
    <Box sx={{ display: "flex" }} width="100%">
      <PhoneInput
        inputProps={{ name: "phone", required: false }}
        inputStyle={{ height: "56px", width: "100%" }}
        country={selectedCountry || "am"}
        value={phone}
        onChange={handleOnChange}
      />
    </Box>
  );
};

export default PhoneField;

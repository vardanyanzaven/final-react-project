import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneField = ({ ref, field }) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleOnChange = (value, country) => {
    setSelectedCountry(country.name);
  };

  return (
    <PhoneInput
      {...field}
      inputExtraProps={{
        ref,
        required: true,
      }}
      inputProps={{ name: "mobile", required: false }}
      inputStyle={{ height: "56px", width: "100%" }}
      country={selectedCountry || "am"}
    />
  );
};
export default PhoneField;

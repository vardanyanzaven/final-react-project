import React from "react";
import { useState } from "react";
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

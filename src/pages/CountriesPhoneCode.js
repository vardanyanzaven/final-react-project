import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneInputComponent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleOnChange = (value, country) => {
    setPhoneNumber(value);
    setSelectedCountry(country.name);
  };

  return (
    <>
      <PhoneInput
        inputProps={{ name: "phone", required: true }}
        inputStyle={{ height: "56px" }}
        country={"am"}
        value={phoneNumber}
        onChange={handleOnChange}
      />
    </>
  );
}

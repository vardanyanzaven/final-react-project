import * as Yup from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/common";

export const schema = Yup.object().shape({
  fullName: Yup.string()
    .required("Please enter your full name")
    .matches(
      /^[a-zA-Z]+( [a-zA-Z]+)?$/,
      "Enter full name with letters and single space only."
    ),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .matches(
      EMAIL_REGEX,
      "Please enter your email address in the format name@example.com"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      PASSWORD_REGEX,
      "Password must have 8+ chars, uppercase, lowercase, and number."
    ),
  confPass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  mobile: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")
    .required("Phone number is required")
    .min(11, "Write correct mobile"),
  gender: Yup.string().required("Required"),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email"),
  password: Yup.string().required("Password is required"),
});

export const passportSchema = Yup.object().shape({
  passport: Yup.string()
    .required("Passport is required")
    .matches(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/, "Passport is not valid"),
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[A-Za-z\s-]{1,50}$/, "Letters only and in latin"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[A-Za-z\s-]{1,50}$/, "Letters only and in latin"),
});
// AIzaSyCDM7ihQsS_y21HFp7DSjMeck4kvZpir0w

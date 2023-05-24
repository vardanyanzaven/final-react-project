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
  homeAddress: Yup.string().required("Address is required"),
  birthday: Yup.string().required("Birthday is required"),
  passportDate: Yup.string().required("Passport date is required"),
});
// file validation

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};
function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}
export const licenseSchema = Yup.object().shape({
  license: Yup.string()
    .required("license number is required")
    .matches(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/, "Not valid!"),
  photo: Yup.mixed()
    .required("photo is required")
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value.length) return false;
      return isValidFileType(value[0] && value[0].name.toLowerCase(), "image");
    }),
});

//----
export const bookScheme = Yup.object().shape({
  car: Yup.string().required("this filed is required"),
  carModel: Yup.string().required("this field is required"),
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")
    .required("Phone number is required")
    .min(11, "Write correct mobile"),
  pickUpDate: Yup.string().required("date is required"),
});

export const carAddScheme = Yup.object().shape({
  car: Yup.string().required("Car is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.string().required("Year is required"),
  type: Yup.string().required("Type is required"),
});

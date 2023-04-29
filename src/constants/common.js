import { useAuth } from "../hooks/useAuth";

export const HEADER_TAB_LIST = {
  services: "services",
  catalogue: "catalogue",
  about: "about us",
};

export const SORT_OPTIONS = [
  {
    value: "Don't sort",
    sortCondition: () => null,
  },
  {
    value: "A-Z",
    sortCondition: (a, b) =>
      a.carBrand < b.carBrand ? -1 : a.carBrand > b.carBrand ? 1 : 0,
  },
  {
    value: "Price: high to low",
    sortCondition: (a, b) => b.price - a.price,
  },
  {
    value: "Price: low to high",
    sortCondition: (a, b) => a.price - b.price,
  },
  {
    value: "Newest",
    sortCondition: (a, b) => a.carProdYear - b.carProdYear,
  },
  {
    value: "Oldest",
    sortCondition: (a, b) => b.carProdYear - a.carProdYear,
  },
];

export const FILTER_OPTIONS = [
  { value: "All", filterCondition: () => null },
  {
    value: "Limousines",
    filterCondition: (car) => car.carType === "limousine",
  },
  { value: "Sedans", filterCondition: (car) => car.carType === "sedan" },
  { value: "SUVs", filterCondition: (car) => car.carType === "SUV" },
  {
    value: "Sports cars",
    filterCondition: (car) => car.carType === "sports-car",
  },
];

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z]).{8,20}$/;

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const SETTINGS_NAME_LIST = () => {
  const { id, email, userInfo } = useAuth();

  return [
    {
      name: "User ID",
      value: id,
      edit: false,
      editTitle: null,
    },
    {
      name: "Gender",
      value: "male/female",
      edit: true,
      editTitle: "Enter your gender",
    },
    {
      name: "Email",
      value: email,
      edit: true,
      editTitle: "Enter your new Email",
    },
    {
      name: "Mobile",
      value: userInfo.phone,
      edit: true,
      editTitle: "Enter your mobile",
    },
    {
      name: "Fullname",
      value: userInfo.fullName,
      edit: true,
      editTitle: "Enter your new fullname",
    },
  ];
};

export const THEME_SETTINGS_NAME = {};

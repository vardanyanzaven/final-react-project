import { useAuth } from "../hooks/useAuth";

export const HEADER_TAB_LIST = {
  services: "services",
  catalogue: "catalogue",
  about: "about us",
};

export const regex = /^(?=.*\d)(?=.*[A-Z]).{8,20}$/;

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

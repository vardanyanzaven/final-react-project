import { useAuth } from "../hooks/useAuth";

export const HEADER_TAB_LIST = {
  services: "services",
  catalogue: "catalogue",
  about: "about us",
};

export const SORT_OPTIONS = {
  noSort: "Don't sort",
  aToZ: "A-Z",
  highToLow: "Price: highest to lowest",
  lowToHigh: "Price: lowest to highest",
  newest: "Newest",
  oldest: "Oldest",
};

export const FILTER_OPTIONS = {
  all: "All",
  limo: "Limousines",
  sedans: "Sedans",
  suvs: "SUVs",
  sport: "Sports cars",
};

export const regex = [/[A-Z]/, /[0-9]/, /.{8,16}/, /[a-z]/];

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
      value: userInfo.gender,
      edit: "select",
      editTitle: "Enter your gender",
    },
    {
      name: "Email",
      value: email,
      edit: "text",
      editTitle: "Enter your new Email",
    },
    {
      name: "Mobile",
      value: userInfo.phone,
      edit: "text",
      editTitle: "Enter your mobile",
    },
    {
      name: "Fullname",
      value: userInfo.fullName,
      edit: "text",
      editTitle: "Enter your new fullname",
    },
  ];
};

export const Machine = [
  {
    car: "mercedes",
    id: Math.random(),
    type: "sedan",
    url: "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200",
  },
  {
    car: "Range Rover",
    id: Math.random(),
    type: "Jeep",
    url: "https://cdn.pixabay.com/photo/2017/01/28/16/03/range-rover-2015646__340.jpg",
  },
  {
    car: "Lexus",
    id: Math.random(),
    type: "sedan",
    url: "https://images.unsplash.com/photo-1577496549804-8b05f1f67338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGV4dXN8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    car: "BMW",
    id: Math.random(),
    type: "sedan",
    url: "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200",
  },
];

export const ERROR_MESSAGES = {
  invalidPassword: {
    message: "Invalid password!",
    type: "error",
    isOpen: true,
  },
  userNotFound: {
    message: "User not found!",
    type: "error",
    isOpen: true,
  },
  emailExists: {
    message: "Email already exists!",
    type: "error",
    isOpen: true,
  },
  something: {
    message: "Something went wrong!",
    type: "error",
    isOpen: true,
  },
};

export const SUCCESS_MESSAGE = {
  message: "invalid password or email",
  type: "error",
  isOpen: true,
};

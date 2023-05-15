import { useAuth } from "../hooks/useAuth";
import img1 from "../assets/home_page_slider_images/sliderImg1.jpg";
import img2 from "../assets/home_page_slider_images/sliderImg2.jpg";
import img3 from "../assets/home_page_slider_images/sliderImg3.jpg";

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

export const ERROR_MESSAGE = {
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

export const SETTINGS_NAME_LIST = () => {
  const { id, email, userInfo } = useAuth();

  return [
    {
      name: "User ID",
      value: id,
      edit: false,
      editTitle: null,
      type: "readOnly",
    },
    {
      name: "Gender",
      value: userInfo.gender,
      edit: true,
      editTitle: "Enter your gender",
      type: "select",
    },
    {
      name: "Email",
      value: email,
      edit: true,
      editTitle: "Enter your new Email",
      type: "input",
    },
    {
      name: "Mobile",
      value: userInfo.phone,
      edit: true,
      editTitle: "Enter your mobile",
      type: "input",
    },
    {
      name: "Fullname",
      value: userInfo.fullName,
      edit: true,
      editTitle: "Enter your new fullname",
      type: "input",
    },
  ];
};

export const SERVICE_DATA = (f) => {
  const serviceData = [
    {
      url: "https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_960_720.jpg",
      name: "wedding",
      car: "Mercedes",
      title: `A wedding is one of the most special days in anyone's life, and many couples want every detail 
            to be perfect. One detail that can really make a difference on this special day is the wedding car serv
            ice. Choosing the right car service can add a touch of elegance and luxury to the event and make the br
            ide and groom feel like royalty.`,
    },
    {
      url: "https://www.empirelimousine.net/wp-content/uploads/2017/07/Empire_limousine_1.jpg",
      name: "airport",
      car: "BMW",
      title: `
      Airports are important transportation hubs that connect people and
      goods to destinations all over the world. They provide a variety of
      services, including check-in and baggage handling, security screening,
      and various retail and dining options for travelers.
      `,
    },
    {
      url: "https://img.traveltriangle.com/blog/wp-content/uploads/2018/09/hong-kong-casinos-cover.jpg",
      name: "casino",
      title: `A casino is a facility where people can participate in gambling activities such as slot machines, 
            table games, and sports betting. Casinos are usually found in popular tourist destinations and major cities a
            round the world, and they offer a variety of entertainment options in addition to gambling.`,
    },
    {
      url: "https://sevenrooms.com/wp-content/uploads/2022/06/nightclub-girls-768x512.jpg",
      name: "party",
      car: "Lexus",
      title: `
              If you're looking to throw a memorable party, there's no better way to make a statement than by 
              renting a limousine from our service. Our sleek and luxurious limousines provide the perfect backdrop for any 
              celebration, whether it's a birthday, prom, bachelor/bachelorette party, or even a night out on the town.
      `,
    },
    {
      url: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/14/16/istock-945885714.jpg?width=1200",
      name: "birthday",
      title: `
            Happy Birthday! I hope this day is filled with joy, laughter, and all the things that make you happy. May this new 
            year of your life bring you exciting adventures, personal growth, and new opportunities to fulfill your dreams. Enjoy
             your special day and make unforgettable memories that you will cherish for years to come!
      `,
    },
    {
      url: "https://www.bhg.com/thmb/asoM6Zj_sJvoXqq3sGUIoMwzmec=/1983x0/filters:no_upscale():strip_icc()/Obsessed-with-picnicking-2-02de801d4e8d443280c30c1ec3e93453.jpg",
      name: "picnic",
      title: `
      Spending time in nature can be a wonderful way to relax and recharge. Whether you're taking a hike through the mountains,
       strolling through a peaceful forest, or simply
       sitting by a tranquil lake, being surrounded by natural beauty can help calm your mind and reduce stress.
      `,
    },
  ];

  if (f) return serviceData.filter((s) => s.name === f);
  return serviceData;
};

export const SUCCESS_MESSAGE = {
  loggedIn: {
    message: "Welcome! You have successfully logged in.",
    type: "success",
    isOpen: true,
  },
  booked: {
    message: " Your booking has been successfully done",
    type: "success",
    isOpen: true,
  },
};

export const IMAGES_FOR_HOME_PAGE_SLIDER = [
  {
    id: 1,
    title: "Rent a Car Today!",
    subtitle: "Affordable and Flexible Rental Options",
    imgUrl: img1,
  },

  {
    id: 2,
    title: "Explore Your Next Adventure",
    subtitle: "Choose from a Wide Range of Car Models",
    imgUrl: img2,
  },
  {
    id: 3,
    title: "Drive in Style",
    subtitle: "Luxury Cars for Special Occasions",
    imgUrl: img3,
  },
];

export const DRIVER_REGISTER_STEPS = [
  {
    title: "Enter your passport or social card number",
  },
  {
    title: "Upload your driver's license photo file",
  },
  {
    title: "Selfie with your passport",
  },
];

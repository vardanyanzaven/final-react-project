import { useAuth } from "../hooks/useAuth";
import img1 from "../assets/home_page_slider_images/sliderImg1.jpg";
import img2 from "../assets/home_page_slider_images/sliderImg2.jpg";
import img3 from "../assets/home_page_slider_images/sliderImg3.jpg";
import car_rental from "../assets/service_images/car_rental.png";
import long_term_rental from "../assets/service_images/long_term_rental.png";
import airport from "../assets/service_images/airport.png";
import travel from "../assets/service_images/travel.png";
import wedding from "../assets/service_images/wedding.png";
import birthday from "../assets/service_images/birthday.png";



export const HEADER_TAB_LIST = {
  services: "services",
  catalogue: "catalogue",
  about: "about us",
};

export const SORT_OPTIONS = [
  {
    value: "Don't sort",
    sortCondition: null,
  },
  {
    value: "Price: high to low",
    sortCondition: { price: "desc" },
  },
  {
    value: "Price: low to high",
    sortCondition: { price: "asc" },
  },
  {
    value: "Newest",
    sortCondition: { carProdYear: "desc" },
  },
  {
    value: "Oldest",
    sortCondition: { carProdYear: "asc" },
  },
];

export const FILTER_OPTIONS = [
  { value: "All", filterCondition: null },
  {
    value: "Limousines",
    filterCondition: "limousine",
  },
  { value: "Sedans", filterCondition: "sedan" },
  { value: "SUVs", filterCondition: "SUV" },
  {
    value: "Sports cars",
    filterCondition: "sports-car",
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
  invalidEmail: {
    message: "Invalid email",
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
  driverRegError: {
    message: "Something went wrong please try later",
    type: "error",
    isOpen: true,
  },
  dateValidate: {
    message: "Please enter the correct pickup date",
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
      url: car_rental,
      name: "Car Rental",
      car: "Mercedes",
      title: `We offer a wide range of vehicles to cater to your rental needs. Our fleet includes sedans, SUVs, luxury cars, and more. You can choose from our fleet based on your preferences and requirements.`,
    },
    {
      url: airport,
      name: "Airport Pickup and Dropoff",
      car: "BMW",
      title: `
      We understand that travelling can be tiring, and you may need a smooth and easy pickup and dropoff service. We offer airport pickup and dropoff services to ensure that you have a hassle-free experience.
      `,
    },
    {
      url: long_term_rental,
      name: "Long Term Rentals",
      title: `If you are looking for a car rental service for an extended period, we have got you covered. We offer long-term rentals at competitive rates to help you save money.`,
    },
    {
      url: wedding,
      name: "Wedding",
      car: "Lexus",
      title: `
              If you're looking to throw a memorable party, there's no better way to make a statement than by 
              renting a limousine from our service. Our sleek and luxurious limousines provide the perfect backdrop for any 
              celebration, whether it's a wedding, prom, bachelor/bachelorette party, or even a night out on the town.
      `,
    },
    {
      url: birthday,
      name: "Birthdays",
      title: `
            Happy Birthday! I hope this day is filled with joy, laughter, and all the things that make you happy. May this new 
            year of your life bring you exciting adventures, personal growth, and new opportunities to fulfill your dreams. Enjoy
             your special day and make unforgettable memories that you will cherish for years to come!
      `,
    },
    {
      url: travel,
      name: "Car Rental for Tours",
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

  comment: {
    message: " Your comment was successfully done",
    type: "success",
    isOpen: true,
  },
  driverBecomingSuccess: {
    message: "You have successfully become a driver",
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

export const ALL_TYPES = [
  "SUV",
  "Convertible",
  "Pickup",
  "Van/Minivan",
  "Wagon",
  "Sedan",
  "Coupe",
  "Hatchback",
];

export const ALL_MAKES = [
  "Buick",
  "MINI",
  "Volvo",
  "Ford",
  "HUMMER",
  "GMC",
  "Subaru",
  "Mitsubishi",
  "Dodge",
  "Nissan",
  "Honda",
  "Lincoln",
  "Hyundai",
  "BMW",
  "Bentley",
  "Lexus",
  "Chevrolet",
  "Jaguar",
  "Mercedes-Benz",
  "Volkswagen",
  "Aston Martin",
  "Land Rover",
  "Pontiac",
  "Cadillac",
  "FIAT",
  "Saab",
  "Kia",
  "Lamborghini",
  "Audi",
  "Jeep",
  "MAZDA",
  "Suzuki",
  "Toyota",
  "Acura",
  "Saturn",
  "Chrysler",
  "Isuzu",
  "Ferrari",
  "Tesla",
  "INFINITI",
  "Oldsmobile",
  "Ram",
  "Eagle",
  "Porsche",
  "Mercury",
  "Scion",
  "Lotus",
  "Plymouth",
  "Freightliner",
  "Rolls-Royce",
  "SRT",
  "Maybach",
  "Alfa Romeo",
  "Geo",
  "smart",
  "Daewoo",
  "Maserati",
  "Daihatsu",
  "Genesis",
  "McLaren",
  "Fisker",
  "Panoz",
];

import { useAuth } from "../hooks/useAuth";

export const HEADER_TAB_LIST = {
  services: "services",
  catalogue: "catalogue",
  about: "about us",
};

export const regex = /^(?=.*\d)(?=.*[A-Z]).{8,20}$/;

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

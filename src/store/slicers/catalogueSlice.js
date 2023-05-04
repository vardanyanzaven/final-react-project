import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [
    {
      carBrand: "Mercedes",
      carModel: "EQS",
      carProdYear: 2019,
      carType: "sedan",
      price: 105000,
      adPubishDate: "",
      photoURL:
        "https://media.ed.edmunds-media.com/mercedes-benz/eqs/2023/oem/2023_mercedes-benz_eqs_sedan_amg-eqs_fq_oem_1_1280.jpg",
    },
    {
      carBrand: "Porsche",
      carModel: "Cayenne",
      carProdYear: 2022,
      carType: "SUV",
      price: 70000,
      adPubishDate: "",
      photoURL:
        "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/teaser_720x406x2/dam/pnr/2023/Products/The-new-Cayenne/Exterieur-Studio/Asset-Gallery-Studio/Cayenne_S_exterior_3_4_Front__Kopie.jpg/jcr:content/Cayenne_S_exterior_3_4_Front__Kopie.jpg",
    },
    {
      carBrand: "Audi",
      carModel: "R8",
      carProdYear: 2021,
      carType: "sports-car",
      price: 143000,
      adPubishDate: "",
      photoURL:
        "https://audimediacenter-a.akamaihd.net/system/production/media/70272/images/3c92d2acbf6ab5f85be8006f854786f0f0ff36be/A1813681_blog.jpg?1582468430",
    },
    {
      carBrand: "Lamborghini",
      carModel: "Aventador",
      carProdYear: 2018,
      carType: "sports-car",
      price: 790000,
      adPubishDate: "",
      photoURL:
        "https://carwow-uk-wp-1.imgix.net/New-Lamborghini-Revuelto-lead.png?auto=format&cs=tinysrgb&fit=crop&h=800&ixlib=rb-1.1.0&q=60&w=1600",
    },
    {
      carBrand: "Cadillac",
      carModel: "XTS Limo",
      carProdYear: 2023,
      carType: "limousine",
      price: 62000,
      adPubishDate: "",
      photoURL:
       "https://dreamlimousinesdetroit.com/wp-content/uploads/2020/01/CADILLAC-XTS.jpg",
    },
  ],
};

const catalogueSlice = createSlice({
  name: "catalogue",
  initialState,
  reducers: {
    // addCar(state, { payload }) {
    //   state.cars.push(payload);
    // },
    // removeCar(state, { payload }) {
    //   state.cars = state.cars.filter((car) => car.id !== payload);
    // },
    setCatalogue(state, {payload}) {
        
    }
  },
});

export default catalogueSlice.reducer;

export const { addCar, removeCar } = catalogueSlice.actions;

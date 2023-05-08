import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


export const setCatalogue = createAsyncThunk(
  "catalogue/setCatalogue",
  async (filterSortCond, thunkAPI) => {
    const catalogueCarsRef = await getDocs(collection(db, "catalogueCars"));
    const carsData = [];
    catalogueCarsRef.forEach((car) => carsData.push({id: car.id, ...car.data()}));
    console.log(filterSortCond);
    return filterSortCond(carsData) === null ? carsData : filterSortCond(carsData);
  }
);

const initialState = {
  cars: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(setCatalogue.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.cars = [...payload];
    });
  },
});

export default catalogueSlice.reducer;

export const { addCar, removeCar } = catalogueSlice.actions;
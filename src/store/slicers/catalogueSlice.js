import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export const setCatalogue = createAsyncThunk(
  "catalogue/setCatalogue",
  async (actionType, thunkAPI) => {
    try {
      const catalogueCarsRef = collection(db, "catalogueCars");
      const { filterVal, searchVal, sortVal } = thunkAPI.getState().catalogue;
      const carList = [];
      const carQuery = await getDocs(
        query(
          catalogueCarsRef,
          actionType === "filter" && filterVal !== null
            ? where("carType", "==", filterVal)
            : actionType === "search" && searchVal !== ""
            ? or(
                where(
                  "carBrand",
                  "==",
                  searchVal.charAt(0).toUpperCase() + searchVal.slice(1)
                ),
                where(
                  "carModel",
                  "==",
                  searchVal.charAt(0).toUpperCase() + searchVal.slice(1)
                )
              )
            : actionType === "sort" && sortVal !== null
            ? orderBy(Object.keys(sortVal)[0], Object.values(sortVal)[0])
            : ""
        )
      );
      carQuery.forEach((car) => carList.push({ id: car.id, ...car.data() }));

      return carList;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  cars: [],
  filterVal: null,
  searchVal: "",
  sortVal: null,
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
    setFetchVal(state, { payload }) {
      const [prop, value] = payload;
      state[prop] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCatalogue.fulfilled, (state, { payload }) => {
      state.cars = [...payload];
    });
  },
});

export default catalogueSlice.reducer;

export const { setFetchVal } = catalogueSlice.actions;

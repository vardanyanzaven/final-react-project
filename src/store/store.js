import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slicers/userSlice";
import catalogueSlice from "./slicers/catalogueSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    catalogue: catalogueSlice,
  },
});

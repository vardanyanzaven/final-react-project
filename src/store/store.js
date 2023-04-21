import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slicers/userSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
  },
});

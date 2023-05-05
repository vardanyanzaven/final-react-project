import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slicers/userSlice";
import catalogueSlice from "./slicers/catalogueSlice";
import statusSlice from "./slicers/statusSlice";
import serviceSlice from "./slicers/serviceSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    catalogue: catalogueSlice,
    service: serviceSlice,
    status: statusSlice,
  },
});

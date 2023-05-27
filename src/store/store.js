import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slicers/userSlice";
import catalogueSlice from "./slicers/catalogueSlice";
import statusSlice from "./slicers/statusSlice";
import serviceSlice from "./slicers/serviceSlice";
import dialogSlice from "./slicers/dialogSlice";
import commentSlice from "./slicers/commentSlice";
import backgroundSlice from "./slicers/backgroundColor";
import loadingSlice from "./slicers/loadingSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    catalogue: catalogueSlice,
    service: serviceSlice,
    status: statusSlice,
    dialog: dialogSlice,
    comments: commentSlice,
    background: backgroundSlice,
    loading: loadingSlice,
  },
});

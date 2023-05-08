import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    handleOpen(state, { payload }) {},
  },
});

export const { handleOpen } = serviceSlice.actions;

export default serviceSlice.reducer;

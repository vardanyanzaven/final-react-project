import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    handleOpen(state, { payload }) {
      state.value = payload;
    },
  },
});

export const { handleOpen } = serviceSlice.actions;

export default serviceSlice.reducer;

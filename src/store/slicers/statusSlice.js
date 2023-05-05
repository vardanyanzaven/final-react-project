import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
  isOpen: false,
};

const statusSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    changeMessage(state, { payload }) {
      state.message = payload.message;
      state.type = payload.type;
      state.isOpen = payload.isOpen;
    },
  },
});

export const { changeMessage } = statusSlice.actions;

export default statusSlice.reducer;

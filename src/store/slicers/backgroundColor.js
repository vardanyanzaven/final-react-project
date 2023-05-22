import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#ffffff", // Initial background color
};

const backgroundSlice = createSlice({
  name: "backgroundColor",
  initialState,
  reducers: {
    changeColor: (state, { payload }) => {
      state.color = payload;
    },
  },
});

export const { changeColor } = backgroundSlice.actions;

export default backgroundSlice.reducer;

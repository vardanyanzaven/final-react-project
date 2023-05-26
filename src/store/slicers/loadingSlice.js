import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export default loadingSlice.reducer;

export const { startLoading } = loadingSlice.actions;

export const loading = (state) => state.loading.isLoading;

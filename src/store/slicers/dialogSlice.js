import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignUpOpen: false,
  isSignInOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog(state, { payload }) {
      state.isSignUpOpen = payload.isSignUpOpen;
      state.isSignInOpen = payload.isSignInOpen;
    },
  },
});

export const { openDialog } = dialogSlice.actions;
export default dialogSlice.reducer;

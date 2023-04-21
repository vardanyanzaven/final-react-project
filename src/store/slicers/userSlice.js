import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null,
  img: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.email = payload.email;
      state.token = payload.token;
      state.id = payload.id;
    },
    setPhoto(state, { payload }) {
      state.img = payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setPhoto } = userSlice.actions;

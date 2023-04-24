import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.userInfo = payload.userInfo;
      state.email = payload.email;
      state.token = payload.token;
      state.id = payload.id;
    },
    changeUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser, changeUserInfo } = userSlice.actions;

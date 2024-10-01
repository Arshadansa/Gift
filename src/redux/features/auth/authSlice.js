import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initialize state from cookies if available
const userInfo = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null;

const initialState = {
  accessToken: userInfo ? userInfo.accessToken : undefined,
  user: userInfo ? userInfo.user : undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
      // Save user info to cookies
      Cookies.set('userInfo', JSON.stringify({
        accessToken: payload.accessToken,
        user: payload.user
      }), { expires: 7 }); // Set cookie to expire in 7 days
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      // Remove user info from cookies
      Cookies.remove('userInfo');
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;

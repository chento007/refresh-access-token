import { removeRefresh, storeRefresh,secureRefresh } from "@/lib/cryptography";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  access: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.access = action.payload.access;
      secureRefresh(action.payload.refresh);
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
      state.access = null;
      removeRefresh();
      console.log("logout");
    },
  },
});

export const { setCredentials, logout, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state?.auth.user;
export const selectCurrentAccessToken = (state) => state?.auth.access;

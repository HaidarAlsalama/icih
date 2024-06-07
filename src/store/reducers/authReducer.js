import { createSlice } from "@reduxjs/toolkit";
import { decryptData, encryptData } from "../../configs/lib";

import { __admin__, __user__ } from "./../../configs/userAfterEncrypt";

const getUserInfoFromLocal = () => {
  if (sessionStorage.getItem("userInfo"))
    return JSON.parse(decryptData(sessionStorage.getItem("userInfo")));
  else return { role: "guest", token: null };
  // else return JSON.parse(decryptData(__admin__));
  // else return JSON.parse(decryptData(__user__));
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getUserInfoFromLocal(),
  reducers: {
    login: (state, action) => {
      console.log(action);
      
      sessionStorage.setItem(
        "userInfo",
        encryptData(JSON.stringify(action.payload))
      );

      state.role = action.payload.role;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    logout: (state) => {
      sessionStorage.removeItem("userInfo");

      state.role = "guest";
      state.token = null;
      state.email = null;
      state.phone = null;
      state.name = null;
      state.id = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

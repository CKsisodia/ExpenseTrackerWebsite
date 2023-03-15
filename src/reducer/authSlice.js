import { createSlice } from "@reduxjs/toolkit";
import {
  forgottPasswordAction,
  getUserDataAction,
  loginUserAction,
  signUpUserAction,
  updateProfileAction,
} from "./asyncAuthReducer";

const authSlice = createSlice({
  name: "user",
  initialState: {
    loginUserData: undefined,
    signUpUserData: undefined,
    userProfileData: undefined,
    changeMode:false,
    showDarkMode:false,
    showDownloadExpenses:false,
  },
  reducers: {
    logOutUser(state, action) {
      localStorage.removeItem("idToken");
      state.loginUserData = undefined;
      state.userProfileData = undefined;
    },
    changeTheme(state,action){
      state.changeMode = !state.changeMode;
    },
    activatePremium(state,action){
      state.showDarkMode = true;
      state.showDownloadExpenses = true;
    },
    deactivatePremium(state,action){
      state.showDarkMode = false;
      state.showDownloadExpenses = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUserAction.fulfilled, (state, action) => {
      console.log("6", action.payload);
      state.signUpUserData = action.payload;
    });

    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      console.log(6, action.payload);
      state.loginUserData = action.payload;
      localStorage.setItem("idToken", action.payload.idToken);
    });

    builder.addCase(forgottPasswordAction.fulfilled, (state, action) => {});

    builder.addCase(getUserDataAction.fulfilled, (state, action) => {
      console.log("6 getuser data in authslice", action.payload);
      state.userProfileData = action.payload;
    });

    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
    });
  },
});

export default authSlice;
export const authSliceAction = authSlice.actions;

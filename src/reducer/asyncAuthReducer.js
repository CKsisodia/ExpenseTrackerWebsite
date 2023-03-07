import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUserService } from "../services/authApiServices";

export const signUpUserAction = createAsyncThunk(
  "signUpUserAction",
  async (credentials) => {
    console.log("2, Receive from 1 through dispatch ", credentials);
    const response = await apiUserService.UserSignUp(credentials);
    console.log(
      "5, getting response returned from apiServive when response is ok",
      response
    );
    return response;
  }
);

export const loginUserAction = createAsyncThunk(
  "loginUserAction",
  async (credentials, thunkAPI) => {
    console.log("2, Receive from 1 through dispatch ", credentials);

    const response = await apiUserService.UserLogin(credentials);

    setTimeout(() => {
      thunkAPI.dispatch(getUserDataAction());
    }, 1000);

    console.log(
      "5, getting response returned from apiServive when response is ok",
      response
    );
    return response;
  }
);

export const forgottPasswordAction = createAsyncThunk(
  "forgottPasswordAction",
  async (email) => {
    const response = await apiUserService.forgottPassword(email);
    return response;
  }
);

export const getUserDataAction = createAsyncThunk(
  "getUserDataAction",
  async () => {
    const response = await apiUserService.getUserData();
    console.log("5, get user data", response.users[0]);
    return response.users[0];
  }
);

export const updateProfileAction = createAsyncThunk(
  "updateProfileAction",
  async (profileData) => {
    console.log("2, profileData at reducer", profileData);
    const response = await apiUserService.updateUserProfile(profileData);
    console.log("5, profile", response);
    return response;
  }
);

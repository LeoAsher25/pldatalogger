import { createSlice } from "@reduxjs/toolkit";

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "src/utils/localStorage";
import { getProfileMethod, loginMethod } from "./authThunkActions";

interface IInitialAuthState {
  accessToken: string;
  refreshToken: string;
  currentUser: UserTypes.IProfile | null;
}

const initialState: IInitialAuthState = {
  accessToken: getLocalStorage("accessToken"),
  refreshToken: getLocalStorage("refreshToken"),
  currentUser: getLocalStorage("currentUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutMethod: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.currentUser = null;
      removeLocalStorage("accessToken");
      removeLocalStorage("refreshToken");
      removeLocalStorage("currentUser");
    },
    setItem(state, action) {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginMethod.fulfilled, (state, action) => {
      const payload = action.payload as SystemTypes.ILoginResponse;
      state.accessToken = payload.accessToken!;
      state.refreshToken = payload.refreshToken!;
      setLocalStorage("refreshToken", state.refreshToken);
      setLocalStorage("accessToken", state.accessToken);
    });

    builder.addCase(getProfileMethod.fulfilled, (state, action) => {
      const payload = action.payload as UserTypes.IProfile;
      state.currentUser = {
        ...payload,
      };
      setLocalStorage("currentUser", state.currentUser);
    });
  },
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

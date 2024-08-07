import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserTypes } from "src/types";

import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "src/utils/localStorage";

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

const auth = createSlice({
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
    setItem(state, action: PayloadAction<IInitialAuthState>) {
      Object.assign(state, action.payload);
      setLocalStorage("accessToken", action.payload.accessToken);
      setLocalStorage("refreshToken", action.payload.refreshToken);
      setLocalStorage("currentUser", action.payload.currentUser);
    },
  },
  extraReducers: (builder) => {},
});

export const authReducer = auth.reducer;

export const authActions = auth.actions;

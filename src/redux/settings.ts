import { createSlice } from "@reduxjs/toolkit";
import { SystemUI } from "src/types";

export interface IInitialSettingState {
  pageTitle: string;
  breadcrumbs: SystemUI.BreadcrumbItem[];
}

const initialState: IInitialSettingState = {
  pageTitle: "PL Data Logger",
  breadcrumbs: [],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setItem(state, action: { payload: IInitialSettingState }) {
      Object.assign(state, action.payload);
    },
  },
});

export const settingsReducer = settingsSlice.reducer;

export const settingsActions = settingsSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

import axiosInstance from "src/utils/axiosInstance";
import { AppDispatch } from "./rootReducer";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  deviceInfo: {} as any,
  serverConfig: {} as any,
};

const slice = createSlice({
  name: "device",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET DEVICE INFORMATION
    getDeviceInformationSuccess(state, action) {
      state.isLoading = false;
      state.deviceInfo = action.payload;
    },

    // GET SERVER CONFIGURATION
    getServerConfigurationSuccess(state, action) {
      state.isLoading = false;
      state.serverConfig = action.payload;

      console.log("serverConfig: ", state.serverConfig);
    },

    // SAVE SERVER CONFIGURATION
    saveServerConfigurationSuccess(state, action) {
      state.isLoading = false;
      state.serverConfig = action.payload;

      console.log("serverConfig: ", state.serverConfig);
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading } = slice.actions;

// ----------------------------------------------------------------------

export function getDeviceInformation() {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get("/api/setting/device-info");
      dispatch(slice.actions.getDeviceInformationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getServerConfiguration() {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get("/api/setting/api-config");
      dispatch(slice.actions.getServerConfigurationSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function saveServerConfiguration(config: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.post(
        "/api/setting/api-config",
        config
      );
      dispatch(slice.actions.saveServerConfigurationSuccess(config));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

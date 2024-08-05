import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "./rootReducer";
import axiosInstance from "src/utils/axiosInstance";

interface ConfigurationState {
  isLoading: boolean;
  error: null | string;
  sensors: any[];
  connections: any[];
  defines: Record<string, any>;
  sampler: Record<string, any>;
  ftpMain: Record<string, any>;
  ftpSub: Record<string, any>;
  webServer: Record<string, any>;
}

const initialState: ConfigurationState = {
  isLoading: false,
  error: null,
  sensors: [],
  connections: [],
  defines: {},
  sampler: {},
  ftpMain: {},
  ftpSub: {},
  webServer: {},
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action: PayloadAction<string | unknown>) {
      state.isLoading = false;
      state.error = action.payload as string;
    },

    // GET SENSORS
    getSensorSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.sensors = action.payload;
    },

    // GET CONNECTIONS
    getConnectionSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.connections = action.payload;
    },

    // GET DEFINES
    getDefinesSuccess(state, action: PayloadAction<Record<string, any>>) {
      state.isLoading = false;
      state.defines = action.payload;
    },

    // GET SAMPLER
    getSamplerSuccess(state, action: PayloadAction<Record<string, any>>) {
      state.isLoading = false;
      state.sampler = action.payload;
    },

    // GET FTP MAIN
    getFtpMainSuccess(state, action: PayloadAction<Record<string, any>>) {
      state.isLoading = false;
      state.ftpMain = action.payload;
    },

    // GET FTP SUB
    getFtpSubSuccess(state, action: PayloadAction<Record<string, any>>) {
      state.isLoading = false;
      state.ftpSub = action.payload;
    },

    // GET WEBSERVER CONFIG
    getWebServerConfigSuccess(
      state,
      action: PayloadAction<Record<string, any>>
    ) {
      state.isLoading = false;
      state.webServer = action.payload;
    },
  },
});

// Reducer
export default configurationSlice.reducer;

// Actions
export const {
  startLoading,
  hasError,
  getSensorSuccess,
  getConnectionSuccess,
  getDefinesSuccess,
  getSamplerSuccess,
  getFtpMainSuccess,
  getFtpSubSuccess,
  getWebServerConfigSuccess,
} = configurationSlice.actions;

// ----------------------------------------------------------------------

export function getSensors() {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.get("/api/sensors");
      dispatch(getSensorSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createSensor(sensor: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await axiosInstance.post("/api/sensors", sensor);
      await dispatch(getSensors());
      return { success: true, message: "" };
    } catch (error) {
      dispatch(hasError(error));
      return { success: false, message: error };
    }
  };
}

// ----------------------------------------------------------------------

export function updateSensor(sensor: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await axiosInstance.put(`/api/sensors/${sensor?.id}`, sensor);
      await dispatch(getSensors());
      return { success: true, message: "" };
    } catch (error) {
      dispatch(hasError(error));
      return { success: false, message: error };
    }
  };
}

// ----------------------------------------------------------------------

export function deleteSensor(sensorId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await axiosInstance.delete(`/api/sensors/${sensorId}`);
      await dispatch(getSensors());
      return { success: true, message: "" };
    } catch (error) {
      dispatch(hasError(error));
      return { success: false, message: error };
    }
  };
}

// ----------------------------------------------------------------------

export function getConnections() {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.get("/api/connections");
      dispatch(getConnectionSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createConnection(connection: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await axiosInstance.post("/api/connections", connection);
      dispatch(getConnections());
      return { success: true, message: "" };
    } catch (error) {
      dispatch(hasError(error));
      return { success: false, message: error };
    }
  };
}

// ----------------------------------------------------------------------

export function updateConnection(connection: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await axiosInstance.put(`/api/connections/${connection.id}`, connection);
      dispatch(getConnections());
      return { success: true, message: "" };
    } catch (error) {
      dispatch(hasError(error));
      return { success: false, message: error };
    }
  };
}

// ----------------------------------------------------------------------

export function deleteConnection(connectionId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await axiosInstance.delete(`/api/connections/${connectionId}`);
      dispatch(getConnections());
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getDefines() {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.get("/api/data/defines");
      dispatch(getDefinesSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSampler() {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.get("/api/samplers");
      dispatch(getSamplerSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateSampler(sampler: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await axiosInstance.put("/api/samplers", sampler);
      dispatch(getSampler());
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFtpMain() {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.get("/api/setting/ftp-main");
      dispatch(getFtpMainSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFtpSub() {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.get("/api/setting/ftp-sub");
      dispatch(getFtpSubSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateFtpMain(ftp: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await axiosInstance.put("/api/setting/ftp-main", ftp);
      dispatch(getFtpMain());
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateFtpSub(ftp: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      await axiosInstance.put("/api/setting/ftp-sub", ftp);
      dispatch(getFtpSub());
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getWebServerConfig() {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.get("/api/setting/webserver");
      dispatch(getWebServerConfigSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setWebServerConfig(config: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.post(
        "/api/setting/webserver",
        config
      );
      dispatch(getWebServerConfigSuccess(response.data.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

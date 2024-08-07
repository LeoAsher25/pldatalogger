import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "src/redux/rootReducer";
import { SystemTypes } from "src/types";

import axiosInstance from "src/utils/axiosInstance";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  realtime: [],
  lastest: [],
  history: {
    headers: [],
    rows: [],
  },
  charts: {
    times: [] as any[],
    series: [] as any[],
  }, //{id, name, data}
};

const slice = createSlice({
  name: "data",
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

    // GET REALTIME
    getRealtimeSuccess(state, action) {
      state.isLoading = false;
      state.realtime = action.payload;
    },

    // GET LASTEST
    getLastestSuccess(state, action) {
      state.isLoading = false;
      state.lastest = action.payload;
    },

    // GET LASTEST
    getHistorySuccess(state, action) {
      state.isLoading = false;
      state.history = action.payload;
    },

    // INIT CHARTS
    initCharts(state, action) {
      const sensors = action.payload;
      state.charts.times = [];
      state.charts.series = sensors.map((sensor: SystemTypes.SensorData) => {
        return {
          id: sensor.id,
          name: sensor.name,
          data: [],
        };
      });
    },

    // GET LINE SUCCESS
    getLineSuccess(state, action) {
      state.isLoading = false;
      state.charts.times = action.payload.data.times;
      state.charts.series.forEach((serie, index) => {
        if (action.payload.id === serie.id) {
          state.charts.series[index].data = action.payload.data.values;
        }
      });
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getRealtimeSuccess, getLastestSuccess, initCharts } =
  slice.actions;

// ----------------------------------------------------------------------

export function getRealtime() {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get("/api/data/realtime");
      dispatch(slice.actions.getRealtimeSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFtpLastest() {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get("/api/data/ftp-lastest");
      dispatch(slice.actions.getLastestSuccess(response?.data?.data?.sensors));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFtpHistory(from: any, to: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get("/api/data/ftp-history", {
        params: {
          from,
          to,
          page: -1,
          limit: -1,
        },
      });
      dispatch(
        slice.actions.getHistorySuccess({
          headers: response?.data?.data?.headers,
          rows: response?.data?.data?.rows?.reverse(),
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getLine(id: any, from: any, to: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get(`/api/data/${id}`, {
        params: {
          from,
          to,
        },
      });
      dispatch(
        slice.actions.getLineSuccess({
          id: id,
          data: response.data.data,
        })
      );
      return {
        success: true,
        data: id,
      };
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return {
        success: false,
        data: id,
      };
    }
  };
}

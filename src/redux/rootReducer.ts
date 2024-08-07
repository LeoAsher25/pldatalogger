import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "src/redux/auth";
import { settingsReducer } from "src/redux/settings";
import configurationReducer from "src/redux/configuration";
import deviceReducer from "src/redux/device";
import dataReducer from "src/redux/data";

const reducer = combineReducers({
  authState: authReducer,
  settingsState: settingsReducer,
  configurationState: configurationReducer,
  deviceState: deviceReducer,
  dataState: dataReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

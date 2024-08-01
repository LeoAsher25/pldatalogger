import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "src/stores/auth/authSlice";
import { settingsReducer } from "src/stores/settings/settingsSlice";

const reducer = combineReducers({
  authState: authReducer,
  settingsState: settingsReducer,
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

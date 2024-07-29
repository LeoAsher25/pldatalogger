import { createAsyncThunk } from "@reduxjs/toolkit";

import { mockGetProfileApi, mockLoginApi } from "src/utils/mookApi";

export const loginMethod = createAsyncThunk(
  "auth/loginMethod",
  async (data: SystemTypes.ILoginFormData, thunkApi) => {
    try {
      const response = await mockLoginApi(data);
      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getProfileMethod = createAsyncThunk(
  "auth/getProfileMethod",
  async (_, thunkApi) => {
    try {
      const response = await mockGetProfileApi();
      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

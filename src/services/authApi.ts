import { SystemTypes } from "src/types";
import { AxiosResponse } from "axios";
import axiosInstance from "src/utils/axiosInstance";

const authApi = {
  async login(
    data: SystemTypes.ILoginFormData
  ): Promise<AxiosResponse<SystemTypes.ILoginResponse>> {
    return axiosInstance.post("/api/auth/login", data);
  },
};

export default authApi;

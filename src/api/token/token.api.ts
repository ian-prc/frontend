import axiosInstance from "@/axios/axios-instances";

export const refreshTokenApi = async () => {
  const response = await axiosInstance.post("/token/refresh");
  return response.data;
};

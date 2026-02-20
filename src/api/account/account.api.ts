import axiosInstance from "@/axios/axios-instances";

export const getAccountApi = async () => {
  const response = await axiosInstance.get("/account");
  return response.data;
};

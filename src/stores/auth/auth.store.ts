import axiosInstance from "@/axios/axios-instances";
import type { AccountType } from "@/types/account/account.type";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface AuthStoreType {
  user?: AccountType;
  loading: boolean;
  setRegister: (form: Partial<AccountType>) => Promise<boolean>;
  setLogin: (form: Partial<AccountType>) => Promise<boolean>;
  logout: () => Promise<void>;
}

type ApiError = { message?: string };

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: undefined,
  loading: false,

  setRegister: async (form) => {
    set({ loading: true });

    try {
      // Make the request
      const response = await axiosInstance.post("/auth/register", form);

      toast.success(response.data.message || "Registered successfully");
      return true;
    } catch (error: unknown) {
      // Handle Axios errors
      if (axios.isAxiosError<ApiError>(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 409) {
          toast.error(message || "Email already exists");
        } else {
          toast.error(message || "Registration failed");
        }
      } else {
        toast.error("Unexpected error occurred");
      }

      return false;
    } finally {
      set({ loading: false });
    }
  },

  setLogin: async (form) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.post("/auth/login", form);

      const token = response.data.accessToken;
      const user = response.data.user;

      if (token) {
        localStorage.setItem("accessToken", token);
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;
      }

      set({ user });
      toast.success("Login successfully");
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiError>(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 401) {
          toast.error(message || "Incorrect password");
        } else if (status === 404) {
          toast.error(message || "User not found");
        } else {
          toast.error(message || "Login failed");
        }
      } else {
        toast.error("Unexpected error occurred");
      }

      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
    set({ user: undefined });
    toast.success("Logged out successfully");
  },
}));

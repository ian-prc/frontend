import { create } from "zustand";
import axiosInstance from "@/axios/axios-instances";
import type { AccountType } from "@/types/account/account.type";

interface AuthStoreType {
  user?: AccountType;
  loading: boolean;
  setLogin: (form: Partial<AccountType>) => Promise<boolean>;
  setRegister: (form: Partial<AccountType>) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: undefined,
  loading: false,


  setRegister: async (Form) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/auth/register", Form);
      set({ loading: false });
      return true;
    } catch (error) {
      console.error("Register failed:", error);
      set({ loading: false });
      return false;
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
        (axiosInstance.defaults.headers.common as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }

      set({ user, loading: false });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      set({ loading: false });
      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
    delete (axiosInstance.defaults.headers.common as Record<string, string>)["Authorization"];
    set({ user: undefined });
  },
}));

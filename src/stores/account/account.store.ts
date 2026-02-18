// Libraries
import { create } from "zustand";
// Types
import type { AccountStoreType } from "@/types/account/account.type";
// Utils
import { showError } from "@/utils/error/error.utils";
// Api's
import { getAccountApi } from "@/api/account/account.api";

export const useAccountStore = create<AccountStoreType>((set) => ({
  account: null,
  loading: false,

  getAccount: async () => {
    set({ loading: true });
    try {
      const response = await getAccountApi();
      set({ account: response.account });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
  clearAccount: () => set({ account: null }),
}));

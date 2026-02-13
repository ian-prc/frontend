import type { AccountType } from "@/types/account/account.type";

export type AuthStoreType = {
  loading: boolean;
  setRegister: (data: Partial<AccountType>) => Promise<boolean>;
  setLogin: (data: Partial<AccountType>) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

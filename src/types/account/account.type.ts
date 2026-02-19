export type AccountType = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

export type AccountStoreType = {
  account: AccountType | null;
  loading: boolean;
  getAccount: () => Promise<boolean>;
  clearAccount: () => void;
};


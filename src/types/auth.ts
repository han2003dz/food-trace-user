/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAccessTokens {
  accessToken: string;
}

export interface IUserAuth {
  wallet_address: string;
  tokens: IAccessTokens;
}

export interface IUser {
  _id: string;
  wallet_address: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  organization: any;
}

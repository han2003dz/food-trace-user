export interface IAccessTokens {
  accessToken: string;
}

export interface IUserAuth {
  address: string;
  tokens: IAccessTokens;
}

export interface IUser {
  _id: string;
  address: string;
  username: string;
  email: string;
  referral_code: string;
  createdAt: string;
  updatedAt: string;
  referred_by: string;
  referred_by_code: string;
}

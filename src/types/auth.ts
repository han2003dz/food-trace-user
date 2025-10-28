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
  role: number;
  createdAt: string;
  updatedAt: string;
}

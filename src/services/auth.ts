import { api } from "@/config/api";
import type { Address } from "viem";

interface NonceResponse {
  nonce: string;
}

interface LoginRequest {
  wallet_address: Address;
  signature: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    _id: string;
    address: string;
    username: string;
    role: number;
    referral_code: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const getNonce = async (address: Address) => {
  const res = await api().get(`/auth/nonce`, { params: { address } });
  return res.data as NonceResponse;
};

export const login = async (params: LoginRequest): Promise<LoginResponse> => {
  const res = await api().post("/auth/login", params);
  return res.data as LoginResponse;
};

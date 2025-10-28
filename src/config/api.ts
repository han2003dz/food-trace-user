/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/constants/environment";
import useUserStore from "@/stores/useUserStore";
import axios from "axios";

const contentType = "application/json";
const headers = { "Content-Type": contentType };

export function getAccessToken() {
  try {
    const tokens = getToken();
    console.log("tokens", tokens);
    if (!tokens) return null;

    return tokens?.accessToken;
  } catch {
    return null;
  }
}

const getToken = () => useUserStore.getState()?.auth?.tokens;

export const api = () => {
  const accessToken = getAccessToken();
  console.log("accessToken", accessToken);
  const client = accessToken
    ? axios.create({
        baseURL: API_URL,
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
      })
    : axios.create({
        baseURL: API_URL,
        headers,
      });

  const onSuccess = (response: any) => response;
  const onError = (err: any) => {
    if (err.response.status === 401 && accessToken) {
      localStorage.removeItem("user-storage");
      localStorage.removeItem("walletConnected");
      useUserStore.getState().setAuth(null);
      useUserStore.getState().setUserDetail(null);

      window.location.reload();
    }
    return Promise.reject(err);
  };

  client.interceptors.response.use(onSuccess, onError);

  return client;
};

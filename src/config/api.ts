/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { useAuthStore } from "../stores/useAuthStore";
import { API_URL } from "../constants/environment";
import { clearLocalStorage } from "../stores/useLogout";

const contentType = "application/json";
const headers = { "Content-Type": contentType };

export function getAccessToken() {
  try {
    const tokens = useAuthStore.getState()?.auth?.tokens;
    return tokens?.accessToken ?? null;
  } catch {
    return null;
  }
}

export const api = () => {
  const accessToken = getAccessToken();

  const client = axios.create({
    baseURL: API_URL,
    headers: accessToken
      ? { ...headers, Authorization: `Bearer ${accessToken}` }
      : headers,
  });

  const onSuccess = (response: any) => response;

  const onError = (err: any) => {
    const status = err?.response?.status;

    if (status === 401 && accessToken) {
      console.warn("401 Unauthorized → Auto logout");

      clearLocalStorage();
      window.location.reload();
    }

    return Promise.reject(err);
  };

  client.interceptors.response.use(onSuccess, onError);

  return client;
};

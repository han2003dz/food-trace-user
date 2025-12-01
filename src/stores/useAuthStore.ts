import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { StorageStoreName } from "../constants/storage";
import type { IUserAuth } from "../types/auth";

interface AuthState {
  auth: IUserAuth | null;
  setAuth: (auth: IUserAuth | null) => void;
  clearAuth: () => void;
  getToken: () => string | null;
  hasSignedMessage: () => boolean;

  logoutFlag: boolean;
  setLogoutFlag: (value: boolean) => void;

  isLoggingIn: boolean;
  setIsLoggingIn: (value: boolean) => void;

  loginError: boolean;
  setLoginError: (value: boolean) => void;
}

export const useAuthStore = createWithEqualityFn<AuthState>()(
  persist(
    (set, get) => ({
      auth: null,
      setAuth: (auth) => {
        if (!auth) return set({ auth: null });
        set({ auth });
      },
      clearAuth: () => set({ auth: null }),
      getToken: () => {
        try {
          return get().auth?.tokens?.accessToken ?? null;
        } catch {
          return null;
        }
      },

      hasSignedMessage: () => Boolean(get().auth?.tokens?.accessToken),

      logoutFlag: false,
      setLogoutFlag: (value: boolean) => set({ logoutFlag: value }),
      isLoggingIn: false,
      setIsLoggingIn: (v) => set({ isLoggingIn: v }),
      loginError: false,
      setLoginError: (v) => set({ loginError: v }),
    }),
    {
      name: StorageStoreName.AUTH,
      partialize: (state) => ({
        auth: state.auth,
      }),
    }
  )
);

export const selectIsAuthenticated = (s: AuthState) =>
  !!s.auth?.tokens?.accessToken;

export const selectAccessToken = (s: AuthState) =>
  s.auth?.tokens?.accessToken ?? null;

export const selectWalletAddress = (s: AuthState) =>
  s.auth?.wallet_address ?? null;

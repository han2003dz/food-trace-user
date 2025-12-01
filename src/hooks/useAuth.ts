/* eslint-disable @typescript-eslint/no-explicit-any */
import { getNonce, login } from "@/services/auth";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useSignMessage,
  useSmartAccountClient,
} from "@account-kit/react";
import { useCallback, useEffect, useState } from "react";
import { clearLocalStorage, useAppLogout } from "@/stores/useLogout";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";
import { getUserProfile } from "@/services/user";
import { toast } from "sonner";

export const useWalletConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { address } = useSmartAccountClient({});
  const { logout: fullLogout } = useAppLogout();

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);
      openAuthModal();
    } catch (err: any) {
      setError(err?.message || "Failed to connect wallet");
      fullLogout();
    } finally {
      setIsConnecting(false);
    }
  }, [openAuthModal, fullLogout]);

  const disconnectWallet = useCallback(() => {
    fullLogout();
  }, [fullLogout]);

  return {
    connectWallet,
    disconnectWallet,
    isConnecting,
    isConnected: signerStatus.isConnected,
    isAuthenticating:
      signerStatus.isAuthenticating || signerStatus.isInitializing,
    error,
    address,
  };
};

export const useLoginToSystem = () => {
  const isLoggingIn = useAuthStore((s) => s.isLoggingIn);
  const setIsLoggingIn = useAuthStore((s) => s.setIsLoggingIn);

  const loginError = useAuthStore((s) => s.loginError);
  const setLoginError = useAuthStore((s) => s.setLoginError);

  const logoutFlag = useAuthStore((s) => s.logoutFlag);
  const setUserDetail = useUserStore((s) => s.setUserDetail);
  const setAuth = useAuthStore((s) => s.setAuth);
  const accessToken = useAuthStore((s) => s.auth?.tokens?.accessToken ?? null);

  const { client, address } = useSmartAccountClient({});
  const { logout: alchemyLogout } = useLogout();
  const { signMessageAsync } = useSignMessage({ client });
  const loginToSystem = useCallback(async () => {
    if (accessToken || logoutFlag || loginError || !address) return;
    try {
      setIsLoggingIn(true);
      setLoginError(false);
      const nonceRes = await getNonce(address);
      const signature = await signMessageAsync({ message: nonceRes.nonce });

      const loginResponse = await login({ wallet_address: address, signature });

      setAuth({
        tokens: { accessToken: loginResponse.access_token },
        wallet_address: address,
      });

      const profile = await getUserProfile();
      toast.success("Login successful");
      setUserDetail(profile);
    } catch (err: any) {
      console.log("Login error:", err);
      toast.error("Failed to login");
      setLoginError(true);
      alchemyLogout();
      clearLocalStorage();
    } finally {
      setIsLoggingIn(false);
    }
  }, [
    address,
    accessToken,
    logoutFlag,
    setAuth,
    setUserDetail,
    signMessageAsync,
    alchemyLogout,
    setIsLoggingIn,
    setLoginError,
    loginError,
  ]);

  useEffect(() => {
    if (!logoutFlag && address && !accessToken && !isLoggingIn) {
      loginToSystem();
    }
  }, [address, accessToken, logoutFlag, isLoggingIn, loginToSystem]);
  return { isLoggingIn, loginError };
};

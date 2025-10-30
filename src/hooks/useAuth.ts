/* eslint-disable @typescript-eslint/no-explicit-any */
import { getNonce, login } from "@/services/auth";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useSignMessage,
  useSmartAccountClient,
} from "@account-kit/react";
import { useMutation } from "@tanstack/react-query";
import { useUserProfile } from "./useUser";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IUser } from "@/types/auth";

const useGetNonce = () => {
  return useMutation({
    mutationFn: getNonce,
  });
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useAuthentication = () => {
  const { client, address } = useSmartAccountClient({});
  const { logout } = useLogout();

  const { mutateAsync: getNonceAsync } = useGetNonce();
  const { mutateAsync: loginToSystem } = useLogin();
  const { mutateAsync: getUserProfile } = useUserProfile();

  const { setAuth, setUserDetail, hasSignedMessage } = useUserStore.getState();
  const [isSigning, setIsSigning] = useState(false);
  const [shouldShowSignPopup, setShouldShowSignPopup] = useState(
    !hasSignedMessage()
  );
  const isLoggingRef = useRef(false);

  const { signMessageAsync } = useSignMessage({ client });

  useEffect(() => {
    setShouldShowSignPopup(!hasSignedMessage());
  }, [hasSignedMessage]);

  const handleSignMessage = async () => {
    if (!address || !client || isSigning || isLoggingRef.current) return;
    try {
      isLoggingRef.current = true;
      setIsSigning(true);

      const nonce = await getNonceAsync(address);
      const message = typeof nonce.nonce === "string" ? nonce.nonce : "";
      const signature = await signMessageAsync({ message: message });
      const loginResponse = await loginToSystem({
        wallet_address: address,
        signature,
      });

      if (loginResponse?.access_token) {
        setAuth({
          tokens: { accessToken: loginResponse.access_token },
          address,
        });
      }

      const userProfile = await getUserProfile();
      setUserDetail(userProfile as IUser);
      setShouldShowSignPopup(false);
    } catch {
      handleLogout();
    } finally {
      setIsSigning(false);
      isLoggingRef.current = false;
    }
  };

  const handleLogout = () => {
    logout();
    setAuth(null);
    setUserDetail(null);
    setShouldShowSignPopup(false);
    localStorage.clear();
  };

  return {
    handleSignMessage,
    handleLogout,
    isSigning,
    shouldShowSignPopup,
    setShouldShowSignPopup,
  };
};

export const useWalletConnect = () => {
  const { openAuthModal } = useAuthModal();
  const { logout } = useLogout();
  const { address } = useSmartAccountClient({});
  const signerStatus = useSignerStatus();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      openAuthModal();
    } catch (err: any) {
      console.error("Connect wallet error:", err);
      setError(err?.message || "Failed to connect wallet");
      logout();
    } finally {
      setIsConnecting(false);
    }
  };

  const isConnected = signerStatus.isConnected;
  const isAuthenticating =
    signerStatus.isAuthenticating || signerStatus.isInitializing;

  return {
    connectWallet,
    isConnecting,
    isConnected,
    isAuthenticating,
    error,
    logout,
    address,
  };
};

export function useAuthStatus() {
  const { client, address } = useSmartAccountClient({});
  const hasSignedMessage = useUserStore((state) => state.hasSignedMessage());

  const status = useMemo(() => {
    if (!client || !address) return "disconnected";
    if (client && address && !hasSignedMessage) return "connected";
    if (hasSignedMessage) return "authenticated";
    return "connected";
  }, [client, address, hasSignedMessage]);

  const isDisconnected = status === "disconnected";
  const isConnected = status === "connected";
  const isAuthenticated = status === "authenticated";

  return {
    status,
    isDisconnected,
    isConnected,
    isAuthenticated,
    address,
  };
}

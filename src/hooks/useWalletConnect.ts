/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthModal, useSignerStatus } from "@account-kit/react";
import { useState } from "react";

export const useWalletConnect = () => {
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      await openAuthModal();
    } catch (err: any) {
      console.error("Connect wallet error:", err);
      setError(err?.message || "Failed to connect wallet");
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
  };
};

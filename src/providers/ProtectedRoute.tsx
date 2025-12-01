import { selectWalletAddress, useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const walletAddress = useAuthStore(selectWalletAddress);

  const isConnected = Boolean(walletAddress);
  useEffect(() => {
    if (!isConnected) {
      navigate("/", { replace: true });
    }
  }, [navigate, isConnected]);
  return <>{children}</>;
};

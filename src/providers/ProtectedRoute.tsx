import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignerStatus } from "@account-kit/react";
import { FullScreenLoader } from "../components/ui/FullscreenLoader";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const signerStatus = useSignerStatus();

  useEffect(() => {
    if (signerStatus.isAuthenticating) return;

    if (signerStatus.isDisconnected) {
      navigate("/login", { replace: true });
    }
  }, [signerStatus.isDisconnected, signerStatus.isAuthenticating, navigate]);

  if (signerStatus.isAuthenticating) {
    return <FullScreenLoader />;
  }

  if (!signerStatus.isConnected) return null;

  return <>{children}</>;
};

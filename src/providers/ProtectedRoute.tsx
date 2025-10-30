import { useAuthStatus } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { isConnected, isAuthenticated } = useAuthStatus();
  useEffect(() => {
    if (!isConnected || !isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate, isConnected, isAuthenticated]);
  return <>{children}</>;
};

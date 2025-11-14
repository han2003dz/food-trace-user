import { useAuthStatus } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuthStatus();
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/", { replace: true });
  //   }
  // }, [navigate, isAuthenticated]);
  return <>{children}</>;
};

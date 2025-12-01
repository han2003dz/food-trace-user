import { useLogout as alchemyLogoutHook } from "@account-kit/react";
import { useAuthStore } from "./useAuthStore";
import { useUserStore } from "./useUserStore";
import { StorageStoreName } from "@/constants/storage";

export const clearLocalStorage = () => {
  localStorage.removeItem(StorageStoreName.AUTH);
  localStorage.removeItem(StorageStoreName.USER);
  localStorage.removeItem("walletConnected");
};

export const useAppLogout = () => {
  const { logout: alchemyLogout } = alchemyLogoutHook();

  const clearAuth = useAuthStore((s) => s.clearAuth);
  const resetUser = useUserStore((s) => s.resetUser);
  const setLogoutFlag = useAuthStore((s) => s.setLogoutFlag);

  const logout = () => {
    setLogoutFlag(true);

    clearAuth();
    resetUser();
    clearLocalStorage();
    alchemyLogout();

    setTimeout(() => setLogoutFlag(false), 500);
  };

  return { logout };
};

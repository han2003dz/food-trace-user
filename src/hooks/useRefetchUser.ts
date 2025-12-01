import { useCallback } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";
import { getUserProfile } from "@/services/user";

export const useRefreshUserProfile = () => {
  const setUserDetail = useUserStore((s) => s.setUserDetail);
  const accessToken = useAuthStore((s) => s.auth?.tokens?.accessToken ?? null);

  const refresh = useCallback(async () => {
    if (!accessToken) return null;

    try {
      const profile = await getUserProfile();
      setUserDetail(profile);
      return profile;
    } catch (err) {
      console.error("Failed to refresh user profile:", err);
      return null;
    }
  }, [accessToken, setUserDetail]);

  return { refreshUserProfile: refresh };
};

import { getUserProfile } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export const useUserProfile = () => {
  return useMutation({
    mutationFn: getUserProfile,
  });
};

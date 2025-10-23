import { getNonce, login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useGetNonce = () => {
  return useMutation({
    mutationFn: getNonce,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

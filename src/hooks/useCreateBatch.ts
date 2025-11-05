import { createBatch } from "@/services/batches";
import { useMutation } from "@tanstack/react-query";

export const useCreateBatch = () => {
  return useMutation({
    mutationFn: createBatch,
  });
};
